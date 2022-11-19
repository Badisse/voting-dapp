import React, { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';
import { getVoters, updateWorkflowStatus, addVoter } from '../../utils';

function ManageSession(): JSX.Element {
    const { state, dispatch } = useEth();
    const [voterAddress, setVoterAddress] = useState<string>('');
    const [voters, setVoters] = useState<string[]>([]);

    useEffect(() => {
        getVoters(state.contract).then((voters) => {
            setVoters([...new Set(voters)]);
        });
    }, []);

    const handleUpdateWorkflowStatus = async () => {
        updateWorkflowStatus(state, dispatch);
    };

    const handleAddVoter = async () => {
        addVoter(voterAddress, state, dispatch);
    };

    return (
        <div>
            <div>
                <div>
                    Current Workflow Status:
                    {state.workflowStatus !== undefined
                        ? WORKFLOW_STATUS_STRING[state.workflowStatus]
                        : null}
                </div>
                {state.workflowStatus !== WORKFLOW_STATUS.votingSessionEnded && (
                    <>
                        <div>Update Workflow Status</div>
                        <button
                            type="button"
                            className="border"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={handleUpdateWorkflowStatus}
                        >
                            Update
                        </button>
                    </>
                )}
            </div>
            {state.workflowStatus === WORKFLOW_STATUS.registeringVoters && (
                <div>
                    <div>Add voter</div>
                    <input
                        type="text"
                        className="text-gray-800"
                        onChange={(e) => setVoterAddress(e.target.value)}
                        value={voterAddress}
                    />
                    <button
                        type="button"
                        className="border"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={handleAddVoter}
                    >
                        Add
                    </button>
                </div>
            )}
            {voters?.map((voter) => (
                <div key={voter}>{voter}</div>
            ))}
        </div>
    );
}

export default ManageSession;
