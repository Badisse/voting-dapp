/*[object Object]*/
import React from 'react'
import useEth from '../../contexts/EthContext/useEth'
import { actions } from '../../contexts/EthContext/state'
import { IRole } from '../../types/role.types'

type Props = {
  userRole: IRole
}

function RoleButton ({ userRole }: Props): JSX.Element {
  const { dispatch } = useEth()

  const handleClick = (): void => {
    dispatch({
      type: actions.setRole,
      payload: { userRole }
    })
  }

  return (
    <button
      type="button"
      className="bg-cyan-300 p-3 font-semibold rounded-lg text-sky-800 hover:scale-110 transition ease-in-out duration-300 animate-pulse"
      onClick={handleClick}
    >
      {userRole?.name}
    </button>
  )
}

export default RoleButton
