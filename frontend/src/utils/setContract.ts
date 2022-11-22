import { Contract, ContractInterface, ethers, Signer } from 'ethers';
import { Dispatch } from 'react';
import artifact from '../constants/artifact';
import { ADMIN_ID, VOTER_ID } from '../constants/roles';
import { actions } from '../contexts/EthContext';
import Action from '../types/actions.types';
import State from '../types/state.types';
import getProposals from './getProposals';
import getProposalsRegisteredId from './getProposalsRegisteredId';
import getVoters from './getVoters';
import getVoterRegisteredAddress from './getVotersRegisteredAddress';

export const getContract = (address: string, signer: Signer | undefined): Contract => {
    return new ethers.Contract(address, artifact?.abi as ContractInterface, signer);
};

export const getWsContract = (
    address: string,
    provider: ethers.providers.WebSocketProvider | undefined,
): Contract => {
    return new ethers.Contract(address, artifact?.abi as ContractInterface, provider);
};

const checkOwnership = (owner: string, account: string | undefined): boolean => {
    return owner.toLowerCase() === account?.toLowerCase();
};

const setContract = async (
    dispatch: Dispatch<Action>,
    address: string,
    state: State,
): Promise<void> => {
    if (!ethers.utils.isAddress(address)) return;

    const contract = getContract(address, state.signer);
    const wsContract = getWsContract(address, state.wsProvider);
    const workflowStatus = await contract.workflowStatus();
    const winningProposalID = await contract.winningProposalID();
    const votersAddress = await getVoterRegisteredAddress(contract);
    const proposalsID = await getProposalsRegisteredId(contract);

    let owner;
    let isOwner;
    let isVoter;
    let voters;
    let proposals;
    let winningProposal;

    switch (state.userRole?.id) {
        case ADMIN_ID:
            owner = await contract.owner();
            isOwner = await checkOwnership(owner, state.account);

            dispatch({
                type: actions.setContract,
                payload: {
                    contract,
                    wsContract,
                    workflowStatus,
                    isOwner,
                    votersAddress,
                    proposalsID: [...state.proposalsID, ...proposalsID],
                    winningProposalID,
                },
            });
            break;
        case VOTER_ID:
            isVoter = await contract.getVoter(state.account);
            isVoter = isVoter.isRegistered;
            voters = await getVoters(contract);
            proposals = await getProposals(contract);
            winningProposal = await contract.getOneProposal(winningProposalID);

            dispatch({
                type: actions.setContract,
                payload: {
                    contract,
                    wsContract,
                    workflowStatus,
                    isVoter,
                    votersAddress,
                    proposalsID: [...state.proposalsID, ...proposalsID],
                    voters,
                    proposals: { ...state.proposals, ...proposals },
                    winningProposalID,
                    winningProposal,
                },
            });
            break;
        default:
            break;
    }
};

export default setContract;
