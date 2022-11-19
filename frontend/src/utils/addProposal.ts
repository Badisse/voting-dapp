import { Transaction } from 'ethers';
import { Dispatch } from 'react';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import { State } from '../types/state.types';

const addProposal = async (
    description: string,
    state: State,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    const transaction = (await state.contract?.addProposal(description)) as Transaction;
    dispatch({
        type: actions.loading,
    });

    if (transaction.hash) {
        await state.provider?.waitForTransaction(transaction.hash).then(() => {
            dispatch({
                type: actions.finished,
            });
        });
    }
};

export default addProposal;
