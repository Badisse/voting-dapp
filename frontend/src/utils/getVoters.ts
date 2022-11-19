import State from '../types/state.types';
import Voter from '../types/voter.types';
import getVoterRegisteredAddress from './getVotersRegisteredAddress';

const getVoters = async (state: State): Promise<{ address: string; data: Voter }[]> => {
    const voterAddress = await getVoterRegisteredAddress(state.contract);
    let voters: { address: string; data: Voter }[] = [];

    for (const address of voterAddress) {
        const voter = (await state.contract?.getVoter(address)) as Voter;
        voters = [...voters, { address, data: voter }];
    }

    return voters;
};

export default getVoters;
