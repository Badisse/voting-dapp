/*[object Object]*/
import { createContext } from 'react'
import { IEthContextInterface } from '../../types/ethContext.types'
import { initialState } from './state'



const EthContext = createContext<IEthContextInterface>({
  state: initialState,
  dispatch: () => null,
  init: async () => await new Promise(resolve => resolve())
})

export default EthContext
