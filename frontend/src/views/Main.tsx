import React from 'react';
import { ClipLoader } from 'react-spinners';
import Admin from './Admin';
import ParticlesBackground from '../components/Particles/ParticlesBackground';
import UserAddr from './UserAddr';
import { ADMIN_ID, VOTER_ID } from '../constants/roles';
import WORKFLOW_STATUS from '../constants/workflowStatus';
import { useEth } from '../contexts/EthContext';
import Home from './Home';
import Voter from './Voter';
import ContractAddr from './ContractAddr';

function Main(): JSX.Element {
    const {
        state: { loading, account, userRole, workflowStatus, contract },
    } = useEth();

    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <ClipLoader color="#fff" size={150} />
            </div>
        );
    }

    return (
        <>
            {account && <UserAddr />}
            {contract && <ContractAddr />}
            {!userRole && <Home />}
            {userRole && userRole.id === ADMIN_ID && <Admin />}
            {userRole && userRole.id === VOTER_ID && <Voter />}
            {workflowStatus === WORKFLOW_STATUS.votingSessionEnded && <ParticlesBackground />}
        </>
    );
}

export default Main;
