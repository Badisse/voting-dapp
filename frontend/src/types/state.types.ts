/*[object Object]*/
import { ethers } from "ethers"
import { IRole } from "./role.types"
import artifact from "../contracts/Voting.sol/Voting.json"

export type IState = {
  artifact?: typeof artifact
  provider?: ethers.providers.Web3Provider | undefined
  signer?: ethers.Signer | undefined
  account?: string | undefined
  networkID?: ethers.providers.Network | undefined
  contract?: ethers.Contract | undefined
  userRole?: IRole | undefined
  workflowStatus?: number | undefined
  loading?: boolean
  isVoter?: boolean
  isOwner?: boolean
}