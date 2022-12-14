import { BigNumber } from 'ethers';
import { Dispatch } from 'react';
import { actions } from '../../contexts/EthContext';
import Action from '../../types/actions.types';
import State from '../../types/state.types';

const getWsVotedEvents = async (state: State, dispatch: Dispatch<Action>): Promise<void> => {
    state.wsContract?.on('Voted', async (voterAddress: string, proposalID: BigNumber, event) => {
        const transaction = await event.getTransactionReceipt();

        if (transaction.transactionHash) {
            await state.provider?.waitForTransaction(transaction.transactionHash).then(async () => {
                const proposals = state.proposals;
                const proposal = await state.contract?.getOneProposal(proposalID);

                const voters = state.voters;
                voters[voterAddress.toLocaleLowerCase()].hasVoted = true;

                if (proposals[proposalID.toNumber()]) {
                    proposals[proposalID.toNumber()].voteCount = proposal.voteCount;

                    dispatch({
                        type: actions.updateVotersAddress,
                        payload: {
                            voters,
                            proposals,
                        },
                    });
                }
            });
        }
    });
};

export default getWsVotedEvents;
