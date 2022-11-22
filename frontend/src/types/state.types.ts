import { BigNumber, ethers } from 'ethers';
import Proposal from './proposal.types';
import Role from './role.types';
import Voter from './voter.types';

export type State = {
    provider: ethers.providers.Web3Provider | undefined;
    wsProvider: ethers.providers.WebSocketProvider | undefined;
    signer: ethers.Signer | undefined;
    account: string | undefined;
    networkID: ethers.providers.Network | undefined;
    contract: ethers.Contract | undefined;
    wsContract: ethers.Contract | undefined;
    userRole: Role | undefined;
    workflowStatus: number | undefined;
    loading: boolean;
    isVoter: boolean;
    isOwner: boolean;
    votersAddress: string[];
    proposalsID: BigNumber[];
    voters: Voter;
    proposals: Proposal;
    winningProposalID: BigNumber | undefined;
    winningProposal: Proposal | undefined;
};

export default State;
