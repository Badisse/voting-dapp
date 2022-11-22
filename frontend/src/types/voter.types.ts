import { BigNumber } from 'ethers';

type Voter = {
    [address: string]: {
        isRegistered: boolean;
        hasVoted: boolean;
        votedProposalId: BigNumber;
    };
};

export default Voter;
