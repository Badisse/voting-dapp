import React from 'react';
import InitAdmin from './InitAdmin';
import useEth from '../../contexts/EthContext/useEth';
import ManageSession from './ManageSession';

function Admin(): JSX.Element {
    const {
        state: { isOwner, contract, workflowStatus },
    } = useEth();
    console.log(contract && typeof workflowStatus !== 'number');

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {!isOwner ? (
                <InitAdmin>
                    {typeof contract !== undefined && typeof workflowStatus !== 'number' && (
                        <div className="text-red-500 font-medium text-center">
                            Please enter a valid contract address
                        </div>
                    )}
                    {typeof workflowStatus === 'number' && (
                        <div className="text-red-700">You are not the owner</div>
                    )}
                </InitAdmin>
            ) : (
                <ManageSession />
            )}
        </div>
    );
}

export default Admin;
