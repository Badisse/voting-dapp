# Voting

*Badisse Bouabdallah*

> A voting system

This contract allow you to create a voting system



## Methods

### addProposal

```solidity
function addProposal(string _desc) external nonpayable
```

Add a proposal

*Must be called by a registered voters. Emit a ProposalRegistered event*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _desc | string | the description of the proposal |

### addVoter

```solidity
function addVoter(address _addr) external nonpayable
```

Add a voter

*Must be called by the owner of the contract. Emit a VoterRegistered event*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _addr | address | the address of the voter  |

### endProposalsRegistering

```solidity
function endProposalsRegistering() external nonpayable
```

End proposal registering session

*Must be called the owner of the contract. Emit a WorkflowStatusChange event*


### endVotingSession

```solidity
function endVotingSession() external nonpayable
```

End a voting session

*Must be called the owner of the contract. Emit a WorkflowStatusChange event*


### getOneProposal

```solidity
function getOneProposal(uint256 _id) external view returns (struct Voting.Proposal)
```

Get a Proposal

*Must be called by a registered voter*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | the id of a proposal |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.Proposal | the Proposal |

### getVoter

```solidity
function getVoter(address _addr) external view returns (struct Voting.Voter)
```

Return a voter

*Must be called by a registered voter*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _addr | address | the address of the voter |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.Voter | the Voter |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### setVote

```solidity
function setVote(uint256 _id) external nonpayable
```

Vote for a proposal

*Must be called by a voter. Emit a Voted event*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | the id of the proposal |

### startProposalsRegistering

```solidity
function startProposalsRegistering() external nonpayable
```

Start proposal registering session

*Must be called the owner of the contract. Emit a WorkflowStatusChange event*


### startVotingSession

```solidity
function startVotingSession() external nonpayable
```

Start a voting session

*Must be called the owner of the contract. Emit a WorkflowStatusChange event*


### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### winningProposalID

```solidity
function winningProposalID() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### workflowStatus

```solidity
function workflowStatus() external view returns (enum Voting.WorkflowStatus)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum Voting.WorkflowStatus | undefined |



## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### ProposalRegistered

```solidity
event ProposalRegistered(uint256 proposalId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |

### Voted

```solidity
event Voted(address voter, uint256 proposalId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| voter  | address | undefined |
| proposalId  | uint256 | undefined |

### VoterRegistered

```solidity
event VoterRegistered(address voterAddress)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| voterAddress  | address | undefined |

### WorkflowStatusChange

```solidity
event WorkflowStatusChange(enum Voting.WorkflowStatus previousStatus, enum Voting.WorkflowStatus newStatus)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousStatus  | enum Voting.WorkflowStatus | undefined |
| newStatus  | enum Voting.WorkflowStatus | undefined |



