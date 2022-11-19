import { ethers } from 'ethers';

type ExtensionForProvider = {
    on: (event: string, callback: (...params: any) => void) => void;
    removeListener: (event: string, callback: (...params: any) => void) => void;
};

type EthersProvider = ethers.providers.ExternalProvider & ExtensionForProvider;

type EthWindow = {
    ethereum: EthersProvider;
} & Window;

export default EthWindow;
