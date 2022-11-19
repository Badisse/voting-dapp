import { Dispatch } from 'react';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import getAccount from './getAccount';
import getProvider from './getProvider';

const connectWallet = (dispatch: Dispatch<Action>): Promise<void> => {
    const init = async () => {
        const provider = getProvider();
        dispatch({
            type: actions.loading,
        });
        const signer = provider.getSigner();
        const account = await getAccount(provider);
        const networkID = await provider.getNetwork();
        dispatch({
            type: actions.init,
            payload: {
                provider,
                signer,
                account,
                networkID,
            },
        });
    };

    return init();
};

export default connectWallet;
