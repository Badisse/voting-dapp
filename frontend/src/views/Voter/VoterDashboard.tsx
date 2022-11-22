import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS from '../../constants/workflowStatus';
import { addProposal, setVote } from '../../utils';
import DisplayWorkflowStatus from '../../components/DisplayWorkflowStatus';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Input as AntInput, List } from 'antd';
import getWsVoterRegisteredEvents from '../../utils/wsEvents/getWsVoterRegisteredEvents';
import getWsWorkflowStatusChangeEvents from '../../utils/wsEvents/getWsWorkflowStatusChangeEvents';
import AntCustomTheme from '../../themes/AntCustomTheme';
import getWsProposalRegisteredEvents from '../../utils/wsEvents/getWsProposalRegisteredEvents';
import getWsVotedEvents from '../../utils/wsEvents/getWsVotedEvents';

const { TextArea } = AntInput;

function VoterDashboard(): JSX.Element {
    const { state, dispatch } = useEth();
    const [proposalDesc, setProposalDesc] = useState<string>('');

    const handleAddProposal = async () => {
        addProposal(proposalDesc, state, dispatch);
    };

    useEffect(() => {
        const updateVoters = async () => {
            await getWsVoterRegisteredEvents(state, dispatch);
        };

        const updateWorkflowStatus = async () => {
            await getWsWorkflowStatusChangeEvents(state, dispatch);
        };

        updateVoters();
        updateWorkflowStatus();
    }, []);

    useEffect(() => {
        const updateProposals = async () => {
            await getWsProposalRegisteredEvents(state, dispatch);
        };

        const voted = async () => {
            await getWsVotedEvents(state, dispatch);
        };

        updateProposals();
        voted();
    }, [state]);

    const handleVote = async (id: number): Promise<void> => {
        setVote(id, state, dispatch);
    };

    return (
        <AntCustomTheme>
            <div className="container flex justify-around items-center w-full h-4/5">
                {state.workflowStatus !== WORKFLOW_STATUS.votingSessionEnded ? (
                    <>
                        {state.workflowStatus === WORKFLOW_STATUS.registeringVoters ? (
                            <div className="container flex items-center justify-around w-full">
                                <div className="w-1/3">
                                    <Card className="h-1/3">
                                        <div className="flex flex-col items-center justify-between h-full w-full">
                                            <div className="font-semibold text-xl">
                                                Workflow Status
                                            </div>
                                            <div className="overflow-auto">
                                                <DisplayWorkflowStatus
                                                    currentWorkflowStatus={state.workflowStatus}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="w-1/3 h-full">
                                    <Card className="h-1/5">
                                        <div className="font-semibold text-xl">Voters</div>
                                        <div className="overflow-auto w-full">
                                            <List>
                                                {Object.entries(state.voters).map(
                                                    ([address, voter]) => {
                                                        return (
                                                            <List.Item key={address}>
                                                                <div className="flex justify-between w-full">
                                                                    <div>{address}</div>
                                                                    <div>
                                                                        {voter.votedProposalId.toNumber()}
                                                                    </div>
                                                                </div>
                                                            </List.Item>
                                                        );
                                                    },
                                                )}
                                            </List>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <div className="container flex flex-col items-center gap-10 w-1/3 h-full">
                                <Card>
                                    <div className="flex flex-col items-center justify-between h-full w-full">
                                        <div className="font-semibold text-xl">Workflow Status</div>
                                        <div className="overflow-auto">
                                            <DisplayWorkflowStatus
                                                currentWorkflowStatus={state.workflowStatus}
                                            />
                                        </div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="font-semibold text-xl">Voters</div>
                                    <div className="overflow-auto w-full">
                                        <List>
                                            {Object.entries(state.voters).map(
                                                ([address, voter]) => {
                                                    return (
                                                        <List.Item key={address}>
                                                            <div className="flex justify-between w-full">
                                                                <div>{address}</div>
                                                                <div>
                                                                    {voter.votedProposalId.toNumber()}
                                                                </div>
                                                            </div>
                                                        </List.Item>
                                                    );
                                                },
                                            )}
                                        </List>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {state.workflowStatus !== WORKFLOW_STATUS.registeringVoters && (
                            <div className="flex flex-col items-center gap-10 w-1/3 h-full  max-h-screen">
                                {state.workflowStatus ===
                                    WORKFLOW_STATUS.proposalsRegistrationStarted && (
                                    <Card>
                                        <>
                                            <div className="font-semibold text-xl">
                                                Add a Proposal
                                            </div>
                                            <TextArea
                                                rows={4}
                                                placeholder="Proposal Description"
                                                onChange={(e) => setProposalDesc(e.target.value)}
                                                value={proposalDesc}
                                            />
                                            <Button>
                                                <button
                                                    type="button"
                                                    className="p-3"
                                                    onClick={handleAddProposal}
                                                >
                                                    Add
                                                </button>
                                            </Button>
                                        </>
                                    </Card>
                                )}

                                {state.workflowStatus !== undefined &&
                                    state.workflowStatus > WORKFLOW_STATUS.registeringVoters && (
                                        <Card>
                                            <>
                                                <div className="font-semibold text-xl">
                                                    Proposals
                                                </div>
                                                <div className="overflow-auto w-full h-full">
                                                    <List>
                                                        {Object.entries(state.proposals).map(
                                                            ([id, proposal]) => {
                                                                return (
                                                                    <List.Item key={id}>
                                                                        <div className="flex justify-between w-full">
                                                                            <div>
                                                                                {
                                                                                    proposal.description
                                                                                }
                                                                            </div>

                                                                            {state.workflowStatus ===
                                                                                WORKFLOW_STATUS.votingSessionStarted && (
                                                                                <div className="flex items-center gap-4">
                                                                                    <div className="flex flex-col items-center">
                                                                                        <div>
                                                                                            {proposal.voteCount.toNumber()}
                                                                                        </div>

                                                                                        <div>
                                                                                            Votes
                                                                                        </div>
                                                                                    </div>
                                                                                    {state.account !==
                                                                                        undefined &&
                                                                                        !state
                                                                                            .voters[
                                                                                            state.account.toLocaleLowerCase()
                                                                                        ]
                                                                                            .hasVoted && (
                                                                                            <Button>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="p-3"
                                                                                                    onClick={() =>
                                                                                                        handleVote(
                                                                                                            id as unknown as number,
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    Vote
                                                                                                </button>
                                                                                            </Button>
                                                                                        )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </List.Item>
                                                                );
                                                            },
                                                        )}
                                                    </List>
                                                </div>
                                            </>
                                        </Card>
                                    )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-1/2">
                        <Card>
                            <div className="flex flex-col justify-around items-center w-full h-full">
                                <div className="font-medium text-2xl">Winning Proposal</div>

                                <div className="font-medium text-xl">
                                    {state.winningProposalID !== undefined &&
                                        state.winningProposal?.[state.winningProposalID?.toNumber()]
                                            .description}
                                </div>
                                <div className="font-medium text-xl">
                                    {state.winningProposalID !== undefined && (
                                        <div>
                                            With{' '}
                                            {state.winningProposal?.[
                                                state.winningProposalID?.toNumber()
                                            ].voteCount.toNumber()}{' '}
                                            votes
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AntCustomTheme>
    );
}

export default VoterDashboard;
