import { Contract, Event } from 'ethers';
import getProposalRegisteredEvents from './getProposalRegisteredEvents';

const getProposalsRegisteredId = async (contract: Contract | undefined): Promise<number[]> => {
    let proposals: number[] = [];
    const events = await getProposalRegisteredEvents(contract);
    events?.forEach((event: Event) => {
        const propId = event.args?.proposalId as number;

        if (propId !== 0) {
            proposals = [...proposals, event.args?.proposalId as number];
        }
    });

    return proposals;
};

export default getProposalsRegisteredId;
