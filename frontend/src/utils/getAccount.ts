import { ethers } from 'ethers';

const getAccount = async (provider: ethers.providers.Web3Provider): Promise<string | undefined> => {
    const account = await provider
        .send('eth_requestAccounts', [])
        .then((accnt: string[]) => {
            if (accnt.length > 0) {
                const [account] = accnt;

                return account;
            }
        })
        .catch(() => {
            return undefined;
        });

    return account;
};

export default getAccount;
