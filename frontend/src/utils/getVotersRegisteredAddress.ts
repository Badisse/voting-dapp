import { Contract, Event } from 'ethers';
import getVoterRegisteredEvents from './events/getVoterRegisteredEvents';

const getVoterRegisteredAddress = async (contract: Contract | undefined): Promise<string[]> => {
    let voters: string[] = [];
    const events = await getVoterRegisteredEvents(contract);
    events?.forEach((event: Event) => {
        voters = [...voters, event.args?.voterAddress as string];
    });

    return voters;
};

export default getVoterRegisteredAddress;
