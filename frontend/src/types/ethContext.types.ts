import { Dispatch } from 'react';
import Action from './actions.types';
import State from './state.types';

type EthContextType = {
    state: State;
    dispatch: Dispatch<Action>;
};

export default EthContextType;
