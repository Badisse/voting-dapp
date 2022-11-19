import State from './state.types';

type Action = {
    type: string;
    payload?: State;
};

export default Action;
