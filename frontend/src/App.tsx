import React from 'react';
import { EthProvider } from './contexts/EthContext';
import Main from './views/Main';

function App(): JSX.Element {
    return (
        <EthProvider>
            <div className="bg-sky-900 text-white">
                <div className="mx-8">
                    <Main />
                </div>
            </div>
        </EthProvider>
    );
}

export default App;
