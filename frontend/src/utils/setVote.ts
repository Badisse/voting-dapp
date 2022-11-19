import { Transaction } from 'ethers';
import { Dispatch } from 'react';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import State from '../types/state.types';

const setVote = async (id: number, state: State, dispatch: Dispatch<Action>): Promise<void> => {
    const transaction = (await state.contract?.setVote(id)) as Transaction;
    dispatch({
        type: actions.loading,
        payload: undefined,
    });

    if (transaction.hash) {
        await state.provider?.waitForTransaction(transaction.hash).then(() => {
            dispatch({
                type: actions.finished,
                payload: undefined,
            });
        });
    }
};

export default setVote;
