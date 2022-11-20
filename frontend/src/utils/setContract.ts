import { Contract, ContractInterface, ethers, Signer } from 'ethers';
import { Dispatch } from 'react';
import artifact from '../constants/artifact';
import { ADMIN_ID, VOTER_ID } from '../constants/roles';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import Role from '../types/role.types';

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
    role: Role | undefined,
): Promise<void> => {
    if (!ethers.utils.isAddress(address)) return;

    const contract = getContract(address, signer);
    const workflowStatus: number = await contract.workflowStatus();

    dispatch({
        type: actions.loading,
    });
    const owner: string = await contract.owner();

    switch (role?.id) {
        case ADMIN_ID:
            const isOwner = await checkOwnership(owner, account);
            dispatch({
                type: actions.setContract,
                payload: { contract, workflowStatus, isOwner },
            });
            break;
        case VOTER_ID:
            const isVoter = await contract.getVoter(account).catch(() => {
                return;
            });
            dispatch({
                type: actions.setContract,
                payload: { contract, workflowStatus, isVoter },
            });
            break;
        default:
            break;
    }
};

export default setContract;
