import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import InitVoter from './InitVoter';
import VoterDashboard from './VoterDashboard';

function Voter(): JSX.Element {
    const {
        state: { contract, workflowStatus, isVoter },
    } = useEth();

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {!isVoter ? (
                <InitVoter>
                    {typeof contract !== undefined && typeof workflowStatus !== 'number' && (
                        <div className="text-red-700 font-medium">
                            Please enter a valid contract address
                        </div>
                    )}
                    {typeof workflowStatus === 'number' && (
                        <div className="text-red-700">You are not registered</div>
                    )}
                </InitVoter>
            ) : (
                <VoterDashboard />
            )}
        </div>
    );
}

export default Voter;
