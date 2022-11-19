import { BigNumber } from 'ethers';

type Voter = {
    isRegistered: boolean;
    hasVoted: boolean;
    votedProposalId: BigNumber;
};

export default Voter;
