import { BigNumber, Contract, Event } from 'ethers';
import getProposalRegisteredEvents from './events/getProposalRegisteredEvents';

const getProposalsRegisteredId = async (contract: Contract | undefined): Promise<BigNumber[]> => {
    let proposalsID: BigNumber[] = [];
    const events = await getProposalRegisteredEvents(contract);
    events?.forEach((event: Event) => {
        const propId = event.args?.proposalId;

        if (propId !== 0) {
            proposalsID = [...proposalsID, event.args?.proposalId];
        }
    });

    return proposalsID;
};

export default getProposalsRegisteredId;
