import React, { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';
import { addProposal, setVote } from '../../utils';

function VoterDashboard(): JSX.Element {
    const { state, dispatch } = useEth();
    const [proposalDesc, setProposalDesc] = useState<string>('');
    const [proposalId, setProposalId] = useState<number>(0);

    const handleAddProposal = async () => {
        addProposal(proposalDesc, state, dispatch);
    };

    const handleVote = async (id: number): Promise<void> => {
        setVote(id, state, dispatch);
    };

    /** 
  const getVoter = async (): Promise<void> => {
    await state.contract?.getVoter(voterAddress).then((voter: Voter) => {
      setVoter(voter)
    })
  }

  const getOneProposal = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const res = await state.contract?.getOneProposal(oneProposalId) as Proposal
      setProposal(res)
    } catch (err) {
      console.log(err)
    }
  }
  */

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
                    <button
                        type="button"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={handleAddProposal}
                    >
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
                    <button
                        type="button"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={() => handleVote(proposalId)}
                    >
                        Vote
                    </button>
                </div>
            )}
        </div>
    );
}

export default VoterDashboard;
