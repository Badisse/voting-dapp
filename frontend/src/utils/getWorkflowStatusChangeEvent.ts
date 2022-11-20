import { Contract, Event } from 'ethers';

const getWorkflowStatusChangeEvent = async (
    contract: Contract | undefined,
): Promise<Event[] | undefined> => {
    const eventFilter = contract?.filters.WorkflowStatusChange();
    const events: Event[] | undefined = eventFilter
        ? await contract?.queryFilter(eventFilter)
        : undefined;

    return events;
};

export default getWorkflowStatusChangeEvent;
