import React, { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS from '../../constants/workflowStatus';
import { updateWorkflowStatus, addVoter, getVotersRegisteredAddress } from '../../utils';
import DisplayWorkflowStatus from '../../components/DisplayWorkflowStatus';
import InfinitScrollVoters from '../../components/InfinitScrollVoters';
import getProposalsRegisteredId from '../../utils/getProposalsRegisteredId';

function ManageSession(): JSX.Element {
    const { state, dispatch } = useEth();
    const [voterAddress, setVoterAddress] = useState<string>('');
    const [votersAddress, setVotersAddress] = useState<string[]>([]);
    const [proposalsNumber, setProposalsNumber] = useState<number>();

    useEffect(() => {
        getVotersRegisteredAddress(state.contract).then((voters) => {
            setVotersAddress([...new Set(voters)]);
        });
        getProposalsRegisteredId(state.contract).then((proposalsId) => {
            setProposalsNumber(proposalsId.length);
        });
    }, []);

    const handleUpdateWorkflowStatus = async () => {
        updateWorkflowStatus(state, dispatch);
    };

    const handleAddVoter = async () => {
        addVoter(voterAddress, state, dispatch);
    };

    return (
        <div className="flex flex-col items-center gap-10 h-1/2">
            <div className="font-medium">
                Contract Address:{' '}
                <span className="">{state.contract?.address.toLocaleLowerCase()}</span>
            </div>
            <div className="flex justify-around items-center w-full">
                {state.workflowStatus !== WORKFLOW_STATUS.votingSessionEnded && (
                    <div className="flex flex-col justify-between items-center h-full">
                        <div>Workflow Status</div>
                        <DisplayWorkflowStatus currentWorkflowStatus={state.workflowStatus} />
                        <button
                            type="button"
                            className="border"
                            onClick={handleUpdateWorkflowStatus}
                        >
                            Update
                        </button>
                    </div>
                )}
                <div className="flex flex-col justify-between items-center h-full">
                    <InfinitScrollVoters voters={votersAddress} />

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
                    {state.workflowStatus !== undefined &&
                        state.workflowStatus > WORKFLOW_STATUS.registeringVoters && (
                            <div>
                                <div>{proposalsNumber}</div>
                                <div>Proposals are registered</div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ManageSession;
