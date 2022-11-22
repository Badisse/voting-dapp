import { BigNumber } from 'ethers';
import { Dispatch } from 'react';
import WORKFLOW_STATUS from '../../constants/workflowStatus';
import { actions } from '../../contexts/EthContext';
import Action from '../../types/actions.types';
import Proposal from '../../types/proposal.types';
import State from '../../types/state.types';

const getWsWorkflowStatusChangeEvents = async (
    state: State,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    state.wsContract?.on('WorkflowStatusChange', async (_previousStatus, workflowStatus, event) => {
        const transaction = await event.getTransactionReceipt();
        let winningProposalID: BigNumber | undefined;
        let winningProposal: Proposal | undefined;
        dispatch({
            type: actions.loading,
        });
        await transaction;

        if (transaction.transactionHash) {
            await state.provider?.waitForTransaction(transaction.transactionHash).then(async () => {
                if (workflowStatus === WORKFLOW_STATUS.votingSessionEnded) {
                    winningProposalID = await state.contract?.winningProposalID();

                    if (winningProposalID && state.isVoter) {
                        const tmpWinningProposal = await state.contract?.getOneProposal(
                            winningProposalID,
                        );
                        winningProposal = {
                            [winningProposalID.toNumber()]: {
                                description: tmpWinningProposal.description,
                                voteCount: tmpWinningProposal.voteCount,
                            },
                        };
                    }
                }

                dispatch({
                    type: actions.updateWorkflowStatus,
                    payload: {
                        workflowStatus,
                        winningProposalID:
                            winningProposalID !== undefined
                                ? winningProposalID
                                : state.winningProposalID,
                        winningProposal:
                            winningProposal !== undefined ? winningProposal : state.winningProposal,
                    },
                });
            });
        }
    });
};

export default getWsWorkflowStatusChangeEvents;
