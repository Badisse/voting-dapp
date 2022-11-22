import { Contract } from 'ethers';
import Voter from '../types/voter.types';
import getVoterRegisteredAddress from './getVotersRegisteredAddress';

const asyncForEach = async (array: any[], callback: any) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const getVoters = async (contract: Contract | undefined): Promise<Voter> => {
    let voters: Voter = {};
    const votersAddress = await getVoterRegisteredAddress(contract);

    await asyncForEach(votersAddress, async (address: string) => {
        const tmpVoter = await contract?.getVoter(address);
        const voter: Voter = {
            [address.toLowerCase()]: {
                isRegistered: tmpVoter.isRegistered,
                hasVoted: tmpVoter.hasVoted,
                votedProposalId: tmpVoter.votedProposalId,
            },
        };
        voters = { ...voters, ...voter };
    });

    return voters;
};

export default getVoters;
