import { Dispatch } from 'react';
import { actions } from '../../contexts/EthContext';
import Action from '../../types/actions.types';
import State from '../../types/state.types';
import Voter from '../../types/voter.types';

const getWsVoterRegisteredEvents = async (
    state: State,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    state.wsContract?.on('VoterRegistered', async (voterAddress, event) => {
        dispatch({
            type: actions.updateVotersAddress,
            payload: {
                votersAddress: [...state.votersAddress, voterAddress],
            },
        });

        const transaction = await event.getTransactionReceipt();

        if (transaction.transactionHash) {
            await state.provider?.waitForTransaction(transaction.transactionHash).then(async () => {
                if (state.isVoter) {
                    const tmpVoter = await state.contract?.getVoter(voterAddress);
                    const voter: Voter = {
                        [voterAddress.toLowerCase()]: {
                            hasVoted: tmpVoter.hasVoted,
                            isRegistered: tmpVoter.isRegistered,
                            votedProposalId: tmpVoter.votedProposalId,
                        },
                    };
                    dispatch({
                        type: actions.updateVoters,
                        payload: {
                            voters: { ...state.voters, ...voter },
                        },
                    });
                }
            });
        }
    });
};

export default getWsVoterRegisteredEvents;
