/*[object Object]*/
import { useContext } from 'react'
import { IEthContextInterface } from '../../types/ethContext.types'
import EthContext from './EthContext'

const useEth = (): IEthContextInterface => useContext(EthContext)

export default useEth
