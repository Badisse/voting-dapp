const WORKFLOW_STATUS = {
    registeringVoters: 0,
    proposalsRegistrationStarted: 1,
    proposalsRegistrationEnded: 2,
    votingSessionStarted: 3,
    votingSessionEnded: 4,
};

export default WORKFLOW_STATUS;

export const WORKFLOW_STATUS_STRING = [
    'Registering Voters',
    'Proposals Registration Started',
    'Proposals Registration Ended',
    'Voting Session Started',
    'Voting Session Ended',
];
