import { ethers } from 'ethers';
import artifact from '../contracts/Voting.sol/Voting.json';
import Role from './role.types';

export type State = {
    artifact?: typeof artifact;
    provider?: ethers.providers.Web3Provider | undefined;
    signer?: ethers.Signer | undefined;
    account?: string | undefined;
    networkID?: ethers.providers.Network | undefined;
    contract?: ethers.Contract | undefined;
    userRole?: Role | undefined;
    workflowStatus?: number | undefined;
    loading?: boolean;
    isVoter?: boolean;
    isOwner?: boolean;
};

export default State;
