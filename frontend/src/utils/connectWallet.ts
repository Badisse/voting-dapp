import { ethers } from 'ethers';
import { Dispatch } from 'react';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import getAccount from './getAccount';
import getProvider from './getProvider';

const connectWallet = (dispatch: Dispatch<Action>): Promise<void> => {
    const init = async () => {
        const provider = getProvider();
        const account = await getAccount(provider);
        const networkID = await provider.getNetwork();
        const signer = provider.getSigner();
        let wsProvider;

        switch (networkID.chainId) {
            case 31337:
                wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545/');
                break;
            default:
                break;
        }

        dispatch({
            type: actions.loading,
        });

        dispatch({
            type: actions.init,
            payload: {
                provider,
                wsProvider,
                signer,
                account,
                networkID,
            },
        });
    };

    return init();
};

export default connectWallet;
