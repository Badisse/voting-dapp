/*[object Object]*/
import { IState } from "./state.types"

export type IAction = {
  type: string
  payload?: IState
}