import { Contract, Event } from 'ethers';

const getProposalRegisteredEvents = async (
    contract: Contract | undefined,
): Promise<Event[] | undefined> => {
    const eventFilter = contract?.filters.ProposalRegistered();
    const events: Event[] | undefined = eventFilter
        ? await contract?.queryFilter(eventFilter)
        : undefined;

    return events;
};

export default getProposalRegisteredEvents;
