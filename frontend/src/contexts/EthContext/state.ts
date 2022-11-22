import { ethers } from 'ethers';
import Action from '../../types/actions.types';
import Proposal from '../../types/proposal.types';
import State from '../../types/state.types';

const GENESIS: Proposal = {
    0: {
        description: 'GENESIS',
        voteCount: ethers.BigNumber.from(0),
    },
};

const actions = {
    loading: 'LOADING',
    finished: 'FINISHED',
    init: 'INIT',
    setRole: 'UPDATE_ROLE',
    setContract: 'UPDATE_CONTRACT',
    updateWorkflowStatus: 'UPDATE_WORKFLOW_STATUS',
    updateVotersAddress: 'UPDATE_VOTERS_ADDRESS',
    updateProposalsID: 'UPDATE_PROPOSALS_ID',
    updateVoters: 'UPDATE_VOTERS',
    updateProposals: 'UPDATE_PROPOSALS',
};

const initialState: State = {
    provider: undefined,
    wsProvider: undefined,
    signer: undefined,
    account: undefined,
    networkID: undefined,
    contract: undefined,
    wsContract: undefined,
    userRole: undefined,
    workflowStatus: undefined,
    loading: false,
    isVoter: false,
    isOwner: false,
    votersAddress: [],
    proposalsID: [ethers.BigNumber.from(0)],
    voters: {},
    proposals: { ...GENESIS },
    winningProposalID: undefined,
    winningProposal: undefined,
};

const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;

    switch (type) {
        case actions.loading:
            return { ...state, loading: true };
        case actions.finished:
            return { ...state, loading: false };
        case actions.init:
            return { ...initialState, ...payload, loading: false };
        case actions.setRole:
            return { ...state, ...payload };
        case actions.setContract:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case actions.updateWorkflowStatus:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case actions.updateVotersAddress:
            return {
                ...state,
                ...payload,
            };
        case actions.updateProposalsID:
            return {
                ...state,
                ...payload,
            };
        case actions.updateVoters:
            return {
                ...state,
                ...payload,
            };
        case actions.updateProposals:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error('Undefined reducer action type');
    }
};

export { actions, initialState, reducer };
