import React from 'react';
import { EthProvider } from './contexts/EthContext';
import MainLayout from './components/MainLayout';

function App(): JSX.Element {
    return (
        <EthProvider>
            <div className="bg-sky-900 text-white">
                <MainLayout />
            </div>
        </EthProvider>
    );
}

export default App;
