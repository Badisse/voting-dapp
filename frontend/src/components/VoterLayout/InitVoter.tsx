/*[object Object]*/
import React, { ReactNode, useState } from 'react'
import { ContractInterface, ethers } from 'ethers'
import PropTypes from 'prop-types'
import useEth from '../../contexts/EthContext/useEth'
import { actions } from '../../contexts/EthContext/state'

type Props = {
  children: ReactNode
}

function InitVoter ({ children }: Props): JSX.Element {
  const { state: { signer, artifact, account }, dispatch } = useEth()
  const [inputAddress, setInputAddress] = useState('')

  const getContract = async (): Promise<void> => {
    dispatch({
      type: actions.loading,
      payload: undefined
    })
    const contract = new ethers.Contract(inputAddress, artifact?.abi as ContractInterface, signer)
    let workflowStatus: undefined | number
    let isVoter = false
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await contract?.workflowStatus().then((res: number) => {
      workflowStatus = res
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await contract?.getVoter(account).then(() => {
        isVoter = true
    })  
    dispatch({
      type: actions.setContract,
        payload: { contract, workflowStatus, isVoter }  
    })   
  }

  return (
    <div className="h-screen">
      <div>Access a voting session</div>
      <input
        type="text"
        className="text-gray-800"
        placeholder="Contract Address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => await getContract()}
      >
        Access
      </button>
      {children}
    </div>
  )
}

InitVoter.propTypes = {
  children: PropTypes.node.isRequired
}

export default InitVoter
