/*[object Object]*/
import React, { ReactNode, useState } from 'react'
import { BigNumber, BytesLike, ContractInterface, ethers } from 'ethers'
import useEth from '../../contexts/EthContext/useEth'
import { actions } from '../../contexts/EthContext/state'
import Card from '../Utils/Card'
import Button from '../Utils/Button'

type Props = {
  children: ReactNode
}

function InitAdmin ({ children }: Props): JSX.Element {
  const { state: { signer, artifact, account }, dispatch } = useEth()
  const [inputAddress, setInputAddress] = useState('')

  const deployContract = async (): Promise<void> => {
    console.log('test')
    const factory = new ethers.ContractFactory(artifact?.abi as ContractInterface, artifact?.bytecode as BytesLike, signer)
    const contract = await factory.deploy()
    const isOwner = true
    dispatch({
      type: actions.loading,
      payload: undefined
    })
    let workflowStatus
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await contract?.workflowStatus().then((res: BigNumber) => {
      workflowStatus = res
    })
    dispatch({
      type: actions.setContract,
      payload: { contract, workflowStatus, isOwner }
    })
  }

  const getContract = async (): Promise<void> => {
    dispatch({
      type: actions.loading,
      payload: undefined
    })
    const contract = new ethers.Contract(inputAddress, artifact?.abi as ContractInterface, signer)
    let workflowStatus
    let isOwner
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await contract?.workflowStatus().then((res: BigNumber) => {
      workflowStatus = res
    })

    if (typeof workflowStatus === 'number') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const owner = await contract?.owner() as string
      isOwner = owner.toLowerCase() === account?.toLowerCase()
    }
    dispatch({
      type: actions.setContract,
      payload: { contract, workflowStatus, isOwner }
    })
  }

  return (
    <div className="flex justify-around w-2/3 h-1/2">
      <Card>
        <>
          <div>
            <div className="text-2xl font-medium">New Voting Session</div>
            <div>Create a voting session</div>
          </div>
          <Button>
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await deployContract()}
            >
              Create
            </button>
          </Button>
        </>
      </Card>
      <Card>
        <>
          <div className="text-2xl font-medium">Manage a voting session</div>
          <input
            type="text"
            className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300 border-2
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-cyan-300 focus:outline-none"
            placeholder="Contract Address"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
          />
          <Button>
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await getContract()}
            >
              Manage
            </button>
          </Button>
        </>
      </Card>
      {children}
    </div>
  )
}

export default InitAdmin
