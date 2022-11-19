/*[object Object]*/
import React, {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  ReactNode
} from 'react'
import { ethers } from 'ethers'
import EthContext from './EthContext'
import { reducer, actions, initialState } from './state'
import { IEthWindow } from '../../types/ethWindow.types'

type Props = {
  children: ReactNode
}

function EthProvider ({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const init = useCallback(async () => {
    dispatch({
      type: actions.loading,
      payload: undefined
    })
    const provider = new ethers.providers.Web3Provider(((window as unknown) as IEthWindow).ethereum)
    const signer = provider.getSigner()
    let account
    provider.send('eth_requestAccounts', [])
      .then((accnt: string[]) => {
        if (accnt.length > 0) [account] = accnt
      })
      .catch((e) => console.log(e))
    const networkID = await provider.getNetwork()
    dispatch({
      type: actions.init,
      payload: {
        provider, signer, account, networkID
      }
    })
  }, [])

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged']
    const handleChange = (): void => {
      init().catch((err) => console.log(err))
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    events.forEach((e) => ((window as unknown) as IEthWindow).ethereum.on(e, handleChange))

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      events.forEach((e) => ((window as unknown) as IEthWindow).ethereum.removeListener(e, handleChange))
    }
  }, [init, state.artifact])

  return (
    <EthContext.Provider value={
      useMemo(() => ({
        state, dispatch, init
      }), [state, dispatch])
    }
    >
      {children}
    </EthContext.Provider>
  )
}

export default EthProvider
