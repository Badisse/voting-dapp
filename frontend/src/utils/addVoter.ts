import { Transaction } from 'ethers';
import { Dispatch } from 'react';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import State from '../types/state.types';

const addVoter = async (
    voterAddress: string,
    state: State,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    const transaction = (await state.contract?.addVoter(voterAddress)) as Transaction;
    dispatch({
        type: actions.loading,
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

export default addVoter;
