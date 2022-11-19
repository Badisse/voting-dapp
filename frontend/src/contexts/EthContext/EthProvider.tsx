import React, { useReducer, useEffect, useMemo, ReactNode } from 'react';
import EthContext from './EthContext';
import { reducer, initialState } from './state';
import connectWallet from '../../utils/connectWallet';
import EthWindow from '../../types/ethWindow.types';

type Props = {
    children: ReactNode;
};

function EthProvider({ children }: Props): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const events = ['chainChanged', 'accountsChanged'];
        const handleChange = (): void => {
            connectWallet(dispatch);
        };
        events.forEach((e) => (window as unknown as EthWindow).ethereum.on(e, handleChange));

        return () => {
            events.forEach((e) =>
                (window as unknown as EthWindow).ethereum.removeListener(e, handleChange),
            );
        };
    }, [connectWallet]);

    return (
        <EthContext.Provider
            value={useMemo(
                () => ({
                    state,
                    dispatch,
                }),
                [state, dispatch],
            )}
        >
            {children}
        </EthContext.Provider>
    );
}

export default EthProvider;
