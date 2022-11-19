import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';
import { addProposal, setVote, getProposals } from '../../utils';
import Proposal from '../../types/proposal.types';
import Voter from '../../types/voter.types';

function VoterDashboard(): JSX.Element {
    const { state, dispatch } = useEth();
    const [proposalDesc, setProposalDesc] = useState<string>('');
    const [proposalId, setProposalId] = useState<number>(0);
    const [proposals, setProposals] = useState<{ id: number; data: Proposal }[]>([]);
    const [voterAddress, setVoterAddress] = useState<string>('');
    const [voter, setVoter] = useState<Voter>();

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
        await state.contract?.getVoter(voterAddress).then((voter: Voter) => {
            setVoter(voter);
        });
    };

    return (
        <div className="h-screen">
            <div>
                Current Workflow Status:
                {state.workflowStatus ? WORKFLOW_STATUS_STRING[state.workflowStatus] : null}
            </div>
            {state.workflowStatus === WORKFLOW_STATUS.proposalsRegistrationStarted && (
                <div>
                    <div>Add proposal</div>
                    <input
                        type="text"
                        className="text-gray-800"
                        placeholder="Contract Address"
                        value={proposalDesc}
                        onChange={(e) => setProposalDesc(e.target.value)}
                    />
                    <button type="button" onClick={handleAddProposal}>
                        Add
                    </button>
                </div>
            )}
            {state.workflowStatus === WORKFLOW_STATUS.votingSessionStarted && (
                <div>
                    <div>Vote</div>
                    <input
                        type="text"
                        className="text-gray-800"
                        placeholder="Contract Address"
                        value={proposalId}
                        onChange={(e) => setProposalId(parseInt(e.target.value))}
                    />
                    <button type="button" onClick={() => handleVote(proposalId)}>
                        Vote
                    </button>
                </div>
            )}
            <div>
                <input
                    type="text"
                    className="text-gray-800"
                    placeholder="Voter Address"
                    value={voterAddress}
                    onChange={(e) => setVoterAddress(e.target.value)}
                />
                <button type="button" onClick={getVoter}>
                    Get Voter
                </button>
                <div>{voter?.isRegistered}</div>
                <div>{voter?.hasVoted}</div>
                <div>{voter?.votedProposalId.toNumber()}</div>
            </div>
            {state.workflowStatus === WORKFLOW_STATUS.votingSessionStarted && (
                <button type="button" onClick={() => handleVote(0)}>
                    Blank Vote
                </button>
            )}
            <ul>
                {proposals.map((proposal) => {
                    return (
                        <ul key={proposal.id}>
                            <li>{proposal.data.description}</li>
                            <li>{proposal.data.voteCount.toNumber()}</li>
                            {state.workflowStatus === WORKFLOW_STATUS.votingSessionStarted && (
                                <button type="button" onClick={() => handleVote(proposal.id)}>
                                    Vote
                                </button>
                            )}
                        </ul>
                    );
                })}
            </ul>
        </div>
    );
}

export default VoterDashboard;
