import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Admin from './Admin';
import ParticlesBackground from '../components/Particles/ParticlesBackground';
import UserAddr from './UserAddr';
import { ADMIN_ID, VOTER_ID } from '../constants/roles';
import WORKFLOW_STATUS from '../constants/workflowStatus';
import { useEth } from '../contexts/EthContext';
import Home from './Home';
import Voter from './Voter';
import Proposal from '../types/proposal.types';

function Main(): JSX.Element {
    const {
        state: { loading, account, userRole, workflowStatus, contract, isVoter },
    } = useEth();
    const [winningProposalID, setWinningProposalID] = useState<number>();
    const [winningProposal, setWinningProposal] = useState<Proposal>();

    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <ClipLoader color="#fff" size={150} />
            </div>
        );
    }

    if (workflowStatus === WORKFLOW_STATUS.votingSessionEnded) {
        const getWinningProposal = async () => {
            const proposalID = await contract?.winningProposalID();
            setWinningProposalID(proposalID);

            if (isVoter) {
                const proposal = await contract?.getOneProposal(proposalID);
                setWinningProposal(proposal);
            }
        };

        getWinningProposal();
    }

    return (
        <>
            {account && <UserAddr />}
            {!userRole && <Home />}
            {userRole && userRole.id === ADMIN_ID && <Admin />}
            {userRole && userRole.id === VOTER_ID && <Voter />}
            {workflowStatus === WORKFLOW_STATUS.votingSessionEnded && (
                <>
                    <div>Winning Proposal</div>
                    {isVoter ? (
                        <>
                            <div>{winningProposal?.description}</div>
                            <div>{winningProposal?.voteCount.toNumber()}</div>
                        </>
                    ) : (
                        <div>{winningProposalID}</div>
                    )}

                    <ParticlesBackground />
                </>
            )}
        </>
    );
}

export default Main;
