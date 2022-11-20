import React from 'react';
import { FaFileContract } from 'react-icons/fa';
import useEth from '../contexts/EthContext/useEth';
import CopyClipboard from '../components/CopyClipboard';

function ContractAddr(): JSX.Element {
    const {
        state: { contract },
    } = useEth();

    return (
        <div className="flex items-center gap-3 bg-cyan-600 py-2 px-6 font-semibold text-sm rounded-xl absolute top-4 left-4 drop-shadow-2xl">
            <FaFileContract size="1em" />
            <div>
                {contract?.address.toLocaleLowerCase().substring(0, 6)}
                ...
                {contract?.address.toLocaleLowerCase().substring(contract?.address.length - 4)}
            </div>
            {contract && <CopyClipboard text={contract?.address.toLocaleLowerCase()} />}
        </div>
    );
}

export default ContractAddr;
