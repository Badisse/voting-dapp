import { BigNumber, Contract } from 'ethers';
import Proposal from '../types/proposal.types';
import getProposalsRegisteredId from './getProposalsRegisteredId';

const asyncForEach = async (array: any[], callback: any) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const getProposals = async (contract: Contract | undefined): Promise<Proposal> => {
    let proposals: Proposal = {};
    const proposalsID = await getProposalsRegisteredId(contract);

    await asyncForEach(proposalsID, async (id: BigNumber) => {
        const tmpProposal = await contract?.getOneProposal(id);
        const proposal: Proposal = {
            [id.toNumber()]: {
                description: tmpProposal.description,
                voteCount: tmpProposal.voteCount,
            },
        };
        proposals = { ...proposals, ...proposal };
    });

    return proposals;
};

export default getProposals;
