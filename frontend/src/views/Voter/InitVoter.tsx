import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { setContract } from '../../utils';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

type Props = {
    children: ReactNode;
};

function InitVoter({ children }: Props): JSX.Element {
    const {
        state: { signer, account, userRole },
        dispatch,
    } = useEth();
    const [address, setAddress] = useState('');

    const handleAccessSession = async () => {
        setContract(dispatch, address, signer, account, userRole);
    };

    return (
        <div className="flex lg:justify-around md:w-2/3 h-1/2">
            <Card>
                <>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-medium">Access</div>
                        <div>Access a voting session</div>
                    </div>
                    {children}
                    <Input placeHolder="Contract Address" value={address} onChange={setAddress} />
                    <Button>
                        <button type="button" className="p-3" onClick={handleAccessSession}>
                            Access
                        </button>
                    </Button>
                </>
            </Card>
        </div>
    );
}

InitVoter.propTypes = {
    children: PropTypes.node.isRequired,
};

export default InitVoter;
