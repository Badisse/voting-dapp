/*[object Object]*/
import React, { useState, useEffect } from 'react'
import useEth from '../../contexts/EthContext/useEth'
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus'
import { actions } from '../../contexts/EthContext/state'
import { ethers } from 'ethers'

function ManageSession (): JSX.Element {
  const { state: { workflowStatus, contract, provider }, dispatch } = useEth()
  const [voterAddress, setVoterAddress] = useState<string>('')
  const [voters, setVoters] = useState<string[]>([])

  const getVoterRegisteredEvents = async (): Promise<ethers.Event[] | undefined> => {
    const eventFilter = contract?.filters.VoterRegistered()
    const events = eventFilter
      ? await contract?.queryFilter(eventFilter)
      : undefined

    return events
  }

  const getVoters = async (): Promise<void> => {
    const events = await getVoterRegisteredEvents()
    events?.forEach((event) => {
      console.log(event.args?.voterAddress)
      setVoters((current) => {
        const voterAddr = event.args?.voterAddress as string

        if (current.includes(voterAddr)) {
          return [...current]
        }

        return [...current, voterAddr]
      })
    })
  }

  useEffect(() => {
    getVoters().catch((err) => console.log(err))
  }, [])

  const getWorkFlowStatus = async (transaction: ethers.Transaction) => {
    if(transaction.hash){
      await provider?.waitForTransaction(transaction.hash).then(async () => {
        dispatch({
            type: actions.loading,
            payload: undefined
          })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const newWorkflowStatus = await contract?.workflowStatus() as number
        dispatch({
          type: actions.updateWorkflowStatus,
          payload: { workflowStatus: newWorkflowStatus }
        })
      })
    }
  }

  const updateWorkflowStatus = async (): Promise<void> => {
    let transaction: ethers.Transaction

    switch (workflowStatus) {
      case WORKFLOW_STATUS.registeringVoters:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        transaction = await contract?.startProposalsRegistering() as ethers.Transaction
        await getWorkFlowStatus(transaction)
        break
      case WORKFLOW_STATUS.proposalsRegistrationStarted:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        transaction = await contract?.endProposalsRegistering() as ethers.Transaction
        await getWorkFlowStatus(transaction)
        break
      case WORKFLOW_STATUS.proposalsRegistrationEnded:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        transaction = await contract?.startVotingSession() as ethers.Transaction
        await getWorkFlowStatus(transaction)
        break
      case WORKFLOW_STATUS.votingSessionStarted:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        transaction = await contract?.endVotingSession() as ethers.Transaction
        await getWorkFlowStatus(transaction)
        break
      default:
        break
    }
  }

  const addVoter = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const transaction = await contract?.addVoter(voterAddress) as ethers.Transaction
    dispatch({
      type: actions.loading,
      payload: undefined
    })

    if (transaction.hash) {
      await provider?.waitForTransaction(transaction.hash).then(() => {
        dispatch({
          type: actions.finished,
          payload: undefined
        })
      })
    }
  }

  return (
    <div>
      <div>
        <div>
          Current Workflow Status:
          {workflowStatus !== undefined ? WORKFLOW_STATUS_STRING[workflowStatus] : null}
        </div>
        {
          workflowStatus !== WORKFLOW_STATUS.votingSessionEnded &&
          (
            <>
              <div>Update Workflow Status</div>
              <button
                type="button"
                className="border"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => await updateWorkflowStatus()}
              >
                Update
              </button>
            </>
          )
        }
      </div>
      {workflowStatus === WORKFLOW_STATUS.registeringVoters &&
        (
          <div>
            <div>
              Add voter
            </div>
            <input
              type="text"
              className="text-gray-800"
              onChange={
                (e) => setVoterAddress(e.target.value)
              }
              value={voterAddress}
            />
            <button
              type="button"
              className="border"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await addVoter()}
            >
              Add
            </button>
          </div>
        )}
      {
        voters?.map((voter) => <div key={voter}>{voter}</div>)
      }
    </div>
  )
}

export default ManageSession
