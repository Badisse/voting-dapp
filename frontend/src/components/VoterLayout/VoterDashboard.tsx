/*[object Object]*/
import React, { useState } from 'react'
import useEth from '../../contexts/EthContext/useEth'
import { actions } from '../../contexts/EthContext/state'
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus'
import { ethers } from 'ethers'
import { IProposal } from '../../types/proposal.types'
import { IVoter } from '../../types/voter.types'

function VoterDashboard (): JSX.Element {
  const { state: { contract, provider, workflowStatus }, dispatch } = useEth()
  const [proposalDesc, setProposalDesc] = useState<string>('')
  const [proposalId, setProposalId] = useState<string>('')
  const [voterAddress, setVoterAddress] = useState<string>('')
  const [oneProposalId, setOneProposalId] = useState<string>('')
  const [voter, setVoter] = useState<IVoter>()
  const [proposal, setProposal] = useState<IProposal>()

  const addProposal = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const transaction = await contract?.addProposal(proposalDesc) as ethers.Transaction
    dispatch({
      type: actions.loading,
      payload: undefined
    })

    if(transaction.hash){
      await provider?.waitForTransaction(transaction.hash).then(() => {
            dispatch({
              type: actions.finished,
              payload: undefined
            })
          })
    }
  }

  // TODO: Limit vote to proposal size, forbid 1
  const vote = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const transaction = await contract?.setVote(proposalId) as ethers.Transaction
    dispatch({
      type: actions.loading,
      payload: undefined
    })

    if(transaction.hash){
      await provider?.waitForTransaction(transaction.hash).then(() => {
            dispatch({
              type: actions.finished,
              payload: undefined
            })
          })
    }
  }

  const getVoter = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const res = await contract?.getVoter(voterAddress) as IVoter
      console.log(res.isRegistered)
      setVoter(res)
    } catch (err) {
      console.log(err)
    }
  }

  const getOneProposal = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const res = await contract?.getOneProposal(oneProposalId) as IProposal
      setProposal(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="h-screen">
      <div>
        Current Workflow Status:
        {workflowStatus ? WORKFLOW_STATUS_STRING[workflowStatus] : null}
      </div>
      {
        workflowStatus === WORKFLOW_STATUS.proposalsRegistrationStarted &&
        (
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
              onClick={async () => addProposal()}
            >
              Add
            </button>
          </div>
        )
      }
      {
        workflowStatus === WORKFLOW_STATUS.votingSessionStarted &&
        (
          <div>
            <div>Vote</div>
            <input
              type="text"
              className="text-gray-800"
              placeholder="Contract Address"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
            />
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await vote()}
            >
              Vote
            </button>
          </div>
        )
      }
      <div>
        <div>Get Voter</div>
        <input
          type="text"
          className="text-gray-800"
          placeholder="Voter Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <button
          type="button"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await getVoter()}
        >
          Get
        </button>
        <div>
          {
            (voter !== undefined)
              ? (
                <>
                  <div>{voter.isRegistered ? 'registered' : 'not registered'}</div>
                  <div>{voter.hasVoted ? 'has voted' : 'not voted yet'}</div>
                  <div>{voter.votedProposalId.toNumber()}</div>
                </>
                )
              : undefined
          }

        </div>
      </div>
      <div>
        {
          workflowStatus && workflowStatus >= WORKFLOW_STATUS.proposalsRegistrationStarted &&
          (
            <>
              <div>Get One Proposal</div>
              <input
                type="text"
                className="text-gray-800"
                placeholder="Proposal Id"
                value={oneProposalId}
                onChange={(e) => setOneProposalId(e.target.value)}
              />
              <button
                type="button"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => await getOneProposal()}
              >
                Get
              </button>
              {
                (proposal !== undefined)
                  ? (
                    <>
                      <div>{proposal.description}</div>
                      <div>{proposal.voteCount.toNumber()}</div>
                    </>
                    )
                  : undefined
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default VoterDashboard
