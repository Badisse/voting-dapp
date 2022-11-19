import { createContext } from 'react';
import EthContextType from '../../types/ethContext.types';
import { initialState } from './state';

const EthContext = createContext<EthContextType>({
    state: initialState,
    dispatch: () => null,
});

export default EthContext;
