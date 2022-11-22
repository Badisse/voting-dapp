import { Dispatch } from 'react';
import { actions } from '../../contexts/EthContext';
import Action from '../../types/actions.types';
import Proposal from '../../types/proposal.types';
import State from '../../types/state.types';

const getWsProposalRegisteredEvents = async (
    state: State,
    dispatch: Dispatch<Action>,
): Promise<void> => {
    state.wsContract?.on('ProposalRegistered', async (id) => {
        if (state.isVoter) {
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

            await waitFor(500);

            const tmpProposal = await state.contract?.getOneProposal(id);
            const proposal: Proposal = {
                [id.toNumber()]: {
                    description: tmpProposal.description,
                    voteCount: tmpProposal.voteCount,
                },
            };

            dispatch({
                type: actions.updateProposalsID,
                payload: {
                    proposalsID: [...state.proposalsID, id],
                    proposals:
                        proposal !== undefined
                            ? { ...state.proposals, ...proposal }
                            : state.proposals,
                },
            });
        } else {
            dispatch({
                type: actions.updateProposalsID,
                payload: {
                    proposalsID: [...state.proposalsID, id],
                },
            });
        }
    });
};

export default getWsProposalRegisteredEvents;
