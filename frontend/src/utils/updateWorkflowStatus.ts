import { Transaction } from 'ethers';
import { Dispatch } from 'react';
import WORKFLOW_STATUS from '../constants/workflowStatus';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import State from '../types/state.types';

const getWorkflowStatus = async (
    transaction: Transaction,
    state: State,
    dispatch: Dispatch<Action>,
) => {
    if (transaction.hash) {
        await state.provider?.waitForTransaction(transaction.hash).then(async () => {
            dispatch({
                type: actions.loading,
            });
            const newWorkflowStatus = (await state.contract?.workflowStatus()) as number;
            dispatch({
                type: actions.updateWorkflowStatus,
                payload: { workflowStatus: newWorkflowStatus },
            });
        });
    }
};

const updateWorkflowStatus = async (state: State, dispatch: Dispatch<Action>): Promise<void> => {
    let transaction: Transaction | undefined;

    switch (state.workflowStatus) {
        case WORKFLOW_STATUS.registeringVoters:
            transaction = (await state.contract?.startProposalsRegistering()) as Transaction;
            await getWorkflowStatus(transaction, state, dispatch);
            break;
        case WORKFLOW_STATUS.proposalsRegistrationStarted:
            transaction = (await state.contract?.endProposalsRegistering()) as Transaction;
            await getWorkflowStatus(transaction, state, dispatch);
            break;
        case WORKFLOW_STATUS.proposalsRegistrationEnded:
            transaction = (await state.contract?.startVotingSession()) as Transaction;
            await getWorkflowStatus(transaction, state, dispatch);
            break;
        case WORKFLOW_STATUS.votingSessionStarted:
            transaction = (await state.contract?.endVotingSession()) as Transaction;
            await getWorkflowStatus(transaction, state, dispatch);
            break;
        default:
            break;
    }
};

export default updateWorkflowStatus;
