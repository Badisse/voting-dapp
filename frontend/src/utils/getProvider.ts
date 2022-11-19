import { ethers } from 'ethers';
import EthWindow from '../types/ethWindow.types';

const getProvider = (): ethers.providers.Web3Provider => {
    return new ethers.providers.Web3Provider((window as unknown as EthWindow).ethereum);
};

export default getProvider;
