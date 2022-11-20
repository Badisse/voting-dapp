import Proposal from '../types/proposal.types';
import State from '../types/state.types';
import getProposalsRegisteredId from './getProposalsRegisteredId';

const getProposals = async (state: State): Promise<{ id: number; data: Proposal }[]> => {
    const proposalsId = await getProposalsRegisteredId(state.contract);
    let proposals: { id: number; data: Proposal }[] = [];

    for (const id of proposalsId) {
        const proposal = await state.contract?.getOneProposal(id);
        proposals = [...proposals, { id, data: proposal }];
    }

    return proposals;
};

export default getProposals;
