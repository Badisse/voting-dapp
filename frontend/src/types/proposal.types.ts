import { BigNumber } from 'ethers';

export type Proposal = {
    description: string;
    voteCount: BigNumber;
};

export default Proposal;
