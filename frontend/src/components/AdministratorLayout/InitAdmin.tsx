import React, { ReactNode, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import Card from '../Utils/Card';
import Button from '../Utils/Button';
import { setContract, deployContract } from '../../utils';

type Props = {
    children: ReactNode;
};

function InitAdmin({ children }: Props): JSX.Element {
    const {
        state: { signer, account },
        dispatch,
    } = useEth();
    const [address, setAddress] = useState('');

    const handleCreateContract = async () => {
        deployContract(signer, dispatch);
    };

    const handleManageSession = async () => {
        setContract(dispatch, address, signer, account);
    };

    return (
        <div className="flex justify-around w-2/3 h-1/2">
            <Card>
                <>
                    <div>
                        <div className="text-2xl font-medium">New Voting Session</div>
                        <div>Create a voting session</div>
                    </div>
                    <Button>
                        <button
                            type="button"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={handleCreateContract}
                        >
                            Create
                        </button>
                    </Button>
                </>
            </Card>
            <Card>
                <>
                    <div className="text-2xl font-medium">Manage a voting session</div>
                    <input
                        type="text"
                        className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300 border-2
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-cyan-300 focus:outline-none"
                        placeholder="Contract Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button>
                        <button
                            type="button"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={handleManageSession}
                        >
                            Manage
                        </button>
                    </Button>
                </>
            </Card>
            {children}
        </div>
    );
}

export default InitAdmin;
