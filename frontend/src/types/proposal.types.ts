import { BigNumber } from 'ethers';

export type Proposal = {
    [id: number]: {
        description: string;
        voteCount: BigNumber;
    };
};

export default Proposal;
