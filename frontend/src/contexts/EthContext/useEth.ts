import { useContext } from 'react';
import EthContextType from '../../types/ethContext.types';
import EthContext from './EthContext';

const useEth = (): EthContextType => useContext(EthContext);

export default useEth;
