import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS from '../../constants/workflowStatus';
import { addProposal, setVote, getProposals } from '../../utils';
import Proposal from '../../types/proposal.types';
import Voter from '../../types/voter.types';
import DisplayWorkflowStatus from '../../components/DisplayWorkflowStatus';
import Card from '../../components/Card';
import AntCustomTheme from '../../themes/AntCustomTheme';
import { List } from 'antd';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Input as AntInput } from 'antd';
import { ethers } from 'ethers';

const { TextArea } = AntInput;

function VoterDashboard(): JSX.Element {
    const { state, dispatch } = useEth();
    const [proposalDesc, setProposalDesc] = useState<string>('');
    const [proposals, setProposals] = useState<{ id: number; data: Proposal }[]>([]);
    const [voterAddress, setVoterAddress] = useState<string>('');
    const [voter, setVoter] = useState<Voter>();
    const [winningProposal, setWinningProposal] = useState<Proposal>();

    state.contract?.on('WorkflowStatusChange', (event) => {
        console.log(`event: ${event}`);
    });

    useEffect(() => {
        if (state.workflowStatus === WORKFLOW_STATUS.votingSessionEnded) {
            const getWinningProposal = async () => {
                const proposalID = await state.contract?.winningProposalID();
                const proposal = await state.contract?.getOneProposal(proposalID);
                setWinningProposal(proposal);
            };

            getWinningProposal();
        }
    }, [state.workflowStatus]);

    const handleAddProposal = async () => {
        addProposal(proposalDesc, state, dispatch);
    };

    const handleVote = async (id: number): Promise<void> => {
        setVote(id, state, dispatch);
    };

    useEffect(() => {
        const get = async () => {
            const res = await getProposals(state);
            setProposals(res);
        };

        get();
    }, []);

    const getVoter = async (): Promise<void> => {
        if (!ethers.utils.isAddress(voterAddress)) return;
        await state.contract?.getVoter(voterAddress).then((voter: Voter) => {
            setVoter(voter);
        });
    };

    return (
        <>
            <div className="flex justify-center items-center w-full h-2/3">
                {state.workflowStatus !== WORKFLOW_STATUS.votingSessionEnded ? (
                    <>
                        <div className="flex flex-col items-center w-full gap-10">
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
                                <div className="flex flex-col items-center gap-3">
                                    <div className="font-semibold text-xl">Get Voter Data</div>
                                    <div className="flex items-center gap-5">
                                        <Input
                                            value={voterAddress}
                                            placeHolder="Voeer Address"
                                            onChange={setVoterAddress}
                                        />
                                        <Button>
                                            <button
                                                type="button"
                                                className="p-3"
                                                onClick={getVoter}
                                            >
                                                Get
                                            </button>
                                        </Button>
                                    </div>
                                    {voter && (
                                        <>
                                            <div>
                                                {voter.isRegistered
                                                    ? 'Registered'
                                                    : 'Not Registered'}
                                            </div>
                                            {voter.hasVoted && (
                                                <div>
                                                    Voted for proposal:{' '}
                                                    {voter.votedProposalId.toNumber()}
                                                </div>
                                            )}
                                            {state.workflowStatus !== undefined &&
                                                state.workflowStatus >
                                                    WORKFLOW_STATUS.registeringVoters &&
                                                voter.isRegistered &&
                                                !voter.hasVoted && <div>Has not voted yet</div>}
                                        </>
                                    )}
                                </div>
                            </Card>
                        </div>

                        <div className="flex flex-col items-center w-full h-full gap-10">
                            {state.workflowStatus ===
                                WORKFLOW_STATUS.proposalsRegistrationStarted && (
                                <Card>
                                    <>
                                        <div className="font-semibold text-xl">Add a Proposal</div>
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
                            <Card>
                                {state.workflowStatus !== undefined &&
                                    state.workflowStatus > WORKFLOW_STATUS.registeringVoters && (
                                        <>
                                            <div className="font-semibold text-xl">Proposals</div>
                                            <div className="overflow-auto w-full">
                                                <AntCustomTheme>
                                                    <List
                                                        itemLayout="horizontal"
                                                        dataSource={proposals}
                                                        renderItem={(item) => {
                                                            return (
                                                                <List.Item>
                                                                    <div className="flex justify-between w-full">
                                                                        <div>
                                                                            {item.data.description}
                                                                        </div>

                                                                        {state.workflowStatus ===
                                                                            WORKFLOW_STATUS.votingSessionStarted && (
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="flex flex-col items-center">
                                                                                    <div>
                                                                                        {item.data.voteCount.toNumber()}
                                                                                    </div>

                                                                                    <div>Votes</div>
                                                                                </div>
                                                                                <Button>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="p-3"
                                                                                        onClick={() =>
                                                                                            handleVote(
                                                                                                item.id,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Vote
                                                                                    </button>
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </List.Item>
                                                            );
                                                        }}
                                                    />
                                                </AntCustomTheme>
                                            </div>
                                        </>
                                    )}

                                {state.workflowStatus === WORKFLOW_STATUS.votingSessionStarted && (
                                    <Button>
                                        <button
                                            type="button"
                                            className="p-3"
                                            onClick={() => handleVote(0)}
                                        >
                                            Blank Vote
                                        </button>
                                    </Button>
                                )}
                            </Card>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-1/2">
                        <Card>
                            <div className="flex flex-col justify-around items-center w-full h-full">
                                <div className="font-medium text-2xl">Winning Proposal</div>

                                <div className="font-medium text-xl">
                                    {winningProposal?.description}
                                </div>
                                <div className="font-medium text-xl">
                                    With {winningProposal?.voteCount.toNumber()} votes
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}

export default VoterDashboard;
