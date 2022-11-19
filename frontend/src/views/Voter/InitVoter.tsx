import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { setContract } from '../../utils';

type Props = {
    children: ReactNode;
};

function InitVoter({ children }: Props): JSX.Element {
    const {
        state: { signer, account },
        dispatch,
    } = useEth();
    const [address, setAddress] = useState('');

    const handleAccessSession = async () => {
        setContract(dispatch, address, signer, account);
    };

    return (
        <div className="h-screen">
            <div>Access a voting session</div>
            <input
                type="text"
                className="text-gray-800"
                placeholder="Contract Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button
                type="button"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleAccessSession}
            >
                Access
            </button>
            {children}
        </div>
    );
}

InitVoter.propTypes = {
    children: PropTypes.node.isRequired,
};

export default InitVoter;
