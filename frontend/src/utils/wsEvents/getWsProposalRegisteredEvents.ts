import { Dispatch } from 'react';
import { actions } from '../../contexts/EthContext';
import Action from '../../types/actions.types';
import Proposal from '../../types/proposal.types';
import State from '../../types/state.types';

const getWsProposalRegisteredEvents = async (
    state: State,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    state.wsContract?.on('ProposalRegistered', async (id, event) => {
        const transaction = await event.getTransactionReceipt();

        if (transaction.transactionHash) {
            await state.provider?.waitForTransaction(transaction.transactionHash).then(async () => {
                if (state.isVoter) {
                    const tmpProposal = await state.contract?.getOneProposal(id);
                    const proposal: Proposal = {
                        [id.toNumber()]: {
                            description: tmpProposal.description,
                            voteCount: tmpProposal.voteCount,
                        },
                    };

                    dispatch({
                        type: actions.updateProposalsID,
                        payload: {
                            proposalsID: [...state.proposalsID, id],
                            proposals:
                                proposal !== undefined
                                    ? { ...state.proposals, ...proposal }
                                    : state.proposals,
                        },
                    });
                } else {
                    dispatch({
                        type: actions.updateProposalsID,
                        payload: {
                            proposalsID: [...state.proposalsID, id],
                        },
                    });
                }
            });
        }
    });
};

export default getWsProposalRegisteredEvents;
