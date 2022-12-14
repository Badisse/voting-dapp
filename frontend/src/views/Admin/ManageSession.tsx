import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS from '../../constants/workflowStatus';
import { updateWorkflowStatus, addVoter } from '../../utils';
import DisplayWorkflowStatus from '../../components/DisplayWorkflowStatus';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { List } from 'antd';
import AntCustomTheme from '../../themes/AntCustomTheme';
import Input from '../../components/Input';
import getWsVoterRegisteredEvents from '../../utils/wsEvents/getWsVoterRegisteredEvents';
import getWsProposalRegisteredEvents from '../../utils/wsEvents/getWsProposalRegisteredEvents';
import getWsWorkflowStatusChangeEvents from '../../utils/wsEvents/getWsWorkflowStatusChangeEvents';

function ManageSession(): JSX.Element {
    const { state, dispatch } = useEth();
    const [voterAddress, setVoterAddress] = useState<string>('');

    const handleUpdateWorkflowStatus = async () => {
        updateWorkflowStatus(state, dispatch);
    };

    const handleAddVoter = async () => {
        addVoter(voterAddress, state, dispatch);
    };

    useEffect(() => {
        const updateVotersAddress = async () => {
            await getWsVoterRegisteredEvents(state, dispatch);
        };

        const updateWorkflowStatus = async () => {
            await getWsWorkflowStatusChangeEvents(state, dispatch);
        };

        updateVotersAddress();
        updateWorkflowStatus();
    }, []);

    useEffect(() => {
        const updateProposals = async () => {
            await getWsProposalRegisteredEvents(state, dispatch);
        };

        updateProposals();
    }, [state]);

    return (
        <div className="flex justify-center items-center gap-40 w-full h-3/5">
            {state.workflowStatus !== WORKFLOW_STATUS.votingSessionEnded ? (
                <>
                    <div className="w-1/3 h-full">
                        <Card>
                            <div className="font-semibold text-xl">Workflow Status</div>
                            <div className="overflow-auto">
                                <DisplayWorkflowStatus
                                    currentWorkflowStatus={state.workflowStatus}
                                />
                            </div>

                            <Button>
                                <button
                                    type="button"
                                    className="p-3"
                                    onClick={handleUpdateWorkflowStatus}
                                >
                                    Update
                                </button>
                            </Button>
                        </Card>
                    </div>

                    <div className="w-1/3 h-full">
                        <Card>
                            <div className="font-semibold text-xl">Voters</div>
                            <div className="overflow-auto">
                                <AntCustomTheme>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={state.votersAddress}
                                        renderItem={(item) => <List.Item>{item}</List.Item>}
                                    />
                                </AntCustomTheme>
                            </div>

                            {state.workflowStatus === WORKFLOW_STATUS.registeringVoters && (
                                <div className="flex gap-5">
                                    <Input
                                        value={voterAddress}
                                        placeHolder="Contract Address"
                                        onChange={setVoterAddress}
                                    />
                                    <Button>
                                        <button
                                            type="button"
                                            className="p-3"
                                            onClick={handleAddVoter}
                                        >
                                            Add
                                        </button>
                                    </Button>
                                </div>
                            )}
                            {state.workflowStatus !== undefined &&
                                state.workflowStatus > WORKFLOW_STATUS.registeringVoters && (
                                    <div className="flex gap-3 bg-cyan-600 p-3 rounded-lg font-medium">
                                        <div>{state.proposalsID?.length}</div>
                                        <div>Proposals registered</div>
                                    </div>
                                )}
                        </Card>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center w-full h-1/2">
                    <Card>
                        <div className="flex flex-col justify-around items-center w-full h-full">
                            <div className="font-medium text-2xl">Winning Proposal ID</div>

                            <div className="font-medium text-8xl">
                                {state.winningProposalID?.toNumber()}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default ManageSession;
