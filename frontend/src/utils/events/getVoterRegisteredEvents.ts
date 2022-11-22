import { Contract, Event } from 'ethers';

const getVoterRegisteredEvents = async (
    contract: Contract | undefined,
): Promise<Event[] | undefined> => {
    const eventFilter = contract?.filters.VoterRegistered();
    const events: Event[] | undefined = eventFilter
        ? await contract?.queryFilter(eventFilter)
        : undefined;

    return events;
};

export default getVoterRegisteredEvents;
