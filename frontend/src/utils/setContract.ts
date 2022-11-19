import { Contract, ContractInterface, ethers, Signer } from 'ethers';
import { Dispatch } from 'react';
import artifact from '../constants/artifact';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';

export const getContract = (address: string, signer: Signer | undefined): Contract => {
    return new ethers.Contract(address, artifact?.abi as ContractInterface, signer);
};

const checkOwnership = (owner: string, account: string | undefined): boolean => {
    return owner.toLowerCase() === account?.toLowerCase();
};

const setContract = async (
    dispatch: Dispatch<Action>,
    address: string,
    signer: Signer | undefined,
    account: string | undefined,
): Promise<void> => {
    const contract = getContract(address, signer);
    dispatch({
        type: actions.loading,
    });
    const workflowStatus: number = await contract.workflowStatus();
    const owner: string = await contract.owner();
    const isOwner = checkOwnership(owner, account);
    const isVoter = contract.getVoter(account);
    dispatch({
        type: actions.setContract,
        payload: { contract, workflowStatus, isOwner, isVoter },
    });
};

export default setContract;
