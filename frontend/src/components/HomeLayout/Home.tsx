import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { BiWallet } from 'react-icons/bi';
import useEth from '../../contexts/EthContext/useEth';
import ChooseRole from './ChooseRole';
import connectWallet from '../../utils/connectWallet';

function Home(): JSX.Element {
    const {
        state: { account },
        dispatch,
    } = useEth();

    const handleConnect = async () => {
        connectWallet(dispatch);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-10">
            <div className="text-5xl font-bold">
                {!account ? (
                    <Typewriter
                        words={['Welcome to The Voting DApp']}
                        cursor
                        loop={1}
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                ) : (
                    <div>Welcome to The Voting DApp</div>
                )}
            </div>
            <h2 className="text-2xl text-gray-200 font-light">
                This Web3 App allow you to create, manage or access a voting session !
            </h2>
            {!account ? (
                <button
                    className="bg-cyan-800 drop-shadow-2xl flex items-center gap-5 p-5 font-semibold rounded-2xl animate-pulse hover:scale-125 transition ease-in-out duration-300"
                    type="button"
                    onClick={handleConnect}
                >
                    <BiWallet size="2em" />
                    <div>Connect Your Wallet</div>
                </button>
            ) : (
                <ChooseRole />
            )}
        </div>
    );
}

export default Home;
