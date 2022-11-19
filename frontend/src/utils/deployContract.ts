import { Signer } from 'ethers';
import { Dispatch } from 'react';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import getContractFactory from './getContractFactory';

const deployContract = async (
    signer: Signer | undefined,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    const factory = getContractFactory(signer);
    const contract = await factory.deploy();
    const isOwner = true;
    dispatch({
        type: actions.loading,
    });
    const workflowStatus = await contract.workflowStatus();
    dispatch({
        type: actions.setContract,
        payload: { contract, workflowStatus, isOwner },
    });
};

export default deployContract;
