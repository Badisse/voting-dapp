/*[object Object]*/
import React from 'react'
import { BiWallet } from 'react-icons/bi'
import useEth from '../contexts/EthContext/useEth'

function UserAddr (): JSX.Element {
  const { state: { account } } = useEth()
  console.log('usrAddr')

  return (
    <div
      className="flex items-center gap-2 bg-cyan-600 py-2 px-6 font-semibold text-sm rounded-xl absolute top-4 right-4 drop-shadow-2xl"
    >
      <BiWallet size="1em" />
      <div>
        {account?.substring(0, 6)}
        ...
        {account?.substring(account.length - 4)}
      </div>
    </div>
  )
}

export default UserAddr
