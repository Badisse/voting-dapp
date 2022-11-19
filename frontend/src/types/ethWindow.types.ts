/*[object Object]*/
import { ethers } from "ethers";

type IExtensionForProvider = {
  on: (event: string, callback: (...params: any) => void) => void;
  removeListener: (event: string, callback: (...params: any) => void) => void;
}

type EthersProvider = ethers.providers.ExternalProvider & IExtensionForProvider;

export type IEthWindow = {
  ethereum: EthersProvider
} & Window