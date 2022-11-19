/*[object Object]*/
import React from 'react'
import InitAdmin from './InitAdmin'
import useEth from '../../contexts/EthContext/useEth'
import ManageSession from './ManageSession'

function Admin (): JSX.Element {
  const { state: { isOwner, contract, workflowStatus } } = useEth()

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {
        !isOwner
          ? (
            <InitAdmin>
              {
                contract && (typeof workflowStatus !== 'number') && (<div>Please enter a valid contract address</div>)
              }
              {
                (typeof workflowStatus === 'number') && (<div>You are not the owner</div>)
              }
            </InitAdmin>
            )
          : <ManageSession />
      }
    </div>
  )
}

export default Admin
