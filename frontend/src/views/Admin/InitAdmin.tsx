import React, { ReactNode, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import useEth from '../../contexts/EthContext/useEth';
import { setContract, deployContract } from '../../utils';

type Props = {
    children: ReactNode;
};

function InitAdmin({ children }: Props): JSX.Element {
    const {
        state: { signer, account, userRole },
        dispatch,
    } = useEth();
    const [address, setAddress] = useState('');

    const handleCreateContract = async () => {
        deployContract(signer, dispatch);
    };

    const handleManageSession = async () => {
        setContract(dispatch, address, signer, account, userRole);
    };

    return (
        <div className="flex lg:justify-around md:w-2/3 h-1/2">
            <Card>
                <>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-medium">Create</div>
                        <div>Create a voting session</div>
                    </div>
                    <Button>
                        <button type="button" className="p-3" onClick={handleCreateContract}>
                            Create
                        </button>
                    </Button>
                </>
            </Card>
            <Card>
                <>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-medium">Manage</div>
                        <div>Manage a voting session</div>
                    </div>
                    <div>
                        <Input
                            placeHolder="Contract Address"
                            value={address}
                            onChange={setAddress}
                        />
                        {children}
                    </div>

                    <Button>
                        <button type="button" className="p-3" onClick={handleManageSession}>
                            Manage
                        </button>
                    </Button>
                </>
            </Card>
        </div>
    );
}

export default InitAdmin;
