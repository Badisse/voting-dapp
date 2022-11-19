import { BytesLike, ContractFactory, ContractInterface, ethers, Signer } from 'ethers';
import artifact from '../constants/artifact';

const getContractFactory = (signer: Signer | undefined): ContractFactory => {
    return new ethers.ContractFactory(
        artifact?.abi as ContractInterface,
        artifact?.bytecode as BytesLike,
        signer,
    );
};

export default getContractFactory;
