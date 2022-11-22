# Voting Dapp

>This project allow you to create, manage or access a voting session.

## Video

You can find a video [here](https://drive.google.com/file/d/1bcwMYK3s9fj0DDfgvR5qGV3l_zK2dzA-/view?usp=sharing)


## Demo

You can find a demo [here](https://voting-dapp-mu.vercel.app/)


## Documentation

[Documentation](https://github.com/Badisse/voting-dapp/tree/main/hardhat/docs)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Tests description](#tests-description)


## General Informations
- Work with:
  - Goerli
  - localhost

## Technologies Used
- Docker - version 20.10.18
- Docker Compose - version 3.8
- Hardhat - version 2.12.0
- Typescript - version 4.8.4
- React - version 18.*


## Setup
### Requirements
Before using this repo, make sure you have installed:
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run Locally
First you have to get the repo
```bash
# Clone the repo 
git clone https://github.com/Badisse/voting-dapp.git

# Get into the repo
cd voting-dapp
```

You can now run the project:

```bash
# Build containers
make build

# Run containers
make start

# install node_modules
make yarn-install

# Compile contract
make compile

# Run tests
make test

# Run tests with coverage
make coverage
```

You can also run test with Github Actions, by running the **Build Project 2** workflow.

## Tests description

| Tests 	| Description 	|
|---	|---	|
| Initial state 	| <ul>   <li>Check if the deployed contract address is an address</li>   <li>Check if the initial workflow status is `RegisteringVoters`</li>   <li>Check if the initial winning proposal ID is set to 0</li> </ul> 	|
| Registering Voters 	| <ul>   <li>Check if `addVoter` function work  and emit a `VoterRegistered` event</li>   <li>Check if `addVoter` function revert when not called by the owner</li>   <li>Check if `getVoter` function return voter with attribute isRegistered set to `true`</li>   <li>Check if `getVoter` function call with a registered voter, which have not yet voted, a voter with attribute `votedProposalId` init with 0   <li>Check if `getVoter` function call with a non registered voter return a voter with attribute `isRegistered` set to `false`</li>   <li>Check if `getVoter` function revert when not called by a voter</li> </ul> 	|
| Registering Proposals 	| <ul>   <li>Check if `startProposalsRegistering` function a emit `WorkflowStatusChange` event and set the `workflowStatus` to `ProposalsRegistrationStarted`</li>   <li>Check if `startProposalsRegistering` function revert when not in the good workflow status</li>  <li>Check if `startProposalsRegistering` function revert when not called by the owner</li>   <li>Check if `getOneProposal` function return the proposal `GENESIS` with the id equal to 0</li>   <li>Check if `addProposal` function work and emit a `ProposalRegistered` event</li>  <li>Check if `addProposal` function revert when not called by a voter</li> <li>Check if `addProposal` function revert when not in good workflow status</li> <li>Check if `addProposal` function revert when empty proposal</li> <li>Check if `getOneProposal` function return the good proposal</li> <li>Check if `getOneProposal` function revert when not called by a voter</li> <li>Check if `endProposalsRegistering` function a emit `WorkflowStatusChange` event and set the `workflowStatus` to `ProposalsRegistrationEnded`</li> <li>Check if `endProposalsRegistering` function revert when not in the good workflow status</li> <li>Check if `endProposalsRegistering` function revert when not called by the owner</li> </ul> 	|
| Voting session 	|  <ul>   <li>Check if `startProposalsRegistering` function a emit `WorkflowStatusChange` event and set the `workflowStatus` to `VotingSessionStarted`</li>   <li>Check if `startVotingSession` function revert when not in the good workflow status</li>  <li>Check if `startVotingSession` function revert when not called by the owner</li>   <li>Check if `setVote` function work and emit a `VoterRegistered` event</li>  <li>Check if `setVote` function revert when not called by a voter</li> <li>Check if `setVote` function revert when not in good workflow status</li> <li>Check if `setVote` function revert when already voted</li> <li>Check if `setVote` function revert when proposal don't exist</li> <li>Check if `setVote` function set voter attribute `hasVoted` to `true`</li> <li>Check if `setVote` function set voter attribute `votedProposalId`</li> <li>Check if `endVotingSession` function a emit `WorkflowStatusChange` event and set the `workflowStatus` to `VotingSessionEnded`</li>	<li>Check if `endVotingSession` function revert when not in the good workflow status</li>  <li>Check if `endVotingSession` function revert when not called by the owner</li> <li>Check if we have the good vote count after a voting session</li> |
| Vote tallied 	| <ul>   <li>Check if `tallyVotes` function a emit `WorkflowStatusChange` event and set the `workflowStatus` to `VotesTallied`</li>   <li>Check if `tallyVotes` function revert when not in the good workflow status</li>  <li>Check if `tallyVotes` function revert when not called by the owner</li>   <li>Check if we have the good `winningProposalID` after votes bein tallied</li>  </ul> 