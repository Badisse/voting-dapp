/*[object Object]*/
import { Dispatch } from "react"
import { IAction } from "./actions.types"
import { IState } from "./state.types"

export type IEthContextInterface = {
  state: IState
  dispatch: Dispatch<IAction>
  init: () => Promise<void>
}