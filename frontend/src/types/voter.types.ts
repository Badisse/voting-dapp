/*[object Object]*/
import { BigNumber } from "ethers"

export type IVoter = {
  isRegistered: boolean
  hasVoted: boolean
  votedProposalId: BigNumber
}