# 🏛️ GiveToken DAO - Quick Reference

## 📍 Contract Addresses (After Deployment)

```
GiveToken: [YOUR_GIVETOKEN_ADDRESS]
TimelockController: [YOUR_TIMELOCK_ADDRESS]
GiveTokenGovernance: [YOUR_GOVERNANCE_ADDRESS]
```

## 🗳️ Proposal Categories

```javascript
// Category Enum Values
0 = PlatformUpgrade    // 1M GIVE threshold, 7 days, 50% approval
1 = CharityApproval    // 500K GIVE threshold, 5 days, 66.67% approval
2 = EconomicPolicy     // 2M GIVE threshold, 10 days, 75% approval
3 = Emergency          // 5M GIVE threshold, 2 days, 50% approval
```

## 📝 Common Operations

### Check Voting Power
```javascript
const votingPower = await governance.token.getPastVotes(
    userAddress, 
    await ethers.provider.getBlockNumber() - 1
);
console.log(`Voting Power: ${ethers.utils.formatEther(votingPower)} GIVE`);
```

### Create Platform Upgrade Proposal
```javascript
const targets = [giveTokenAddress];
const values = [0];
const calldatas = [
    giveToken.interface.encodeFunctionData("updatePrice", [
        ethers.utils.parseEther("0.0002")
    ])
];
const description = "Update ICO price to 0.0002 MATIC";

const tx = await governance.proposeWithCategory(
    targets,
    values,
    calldatas,
    description,
    0 // PlatformUpgrade
);
const receipt = await tx.wait();
const proposalId = receipt.events.find(e => e.event === "ProposalCreated").args.proposalId;
```

### Vote on Proposal
```javascript
// 0 = Against, 1 = For, 2 = Abstain
await governance.castVote(proposalId, 1); // Vote FOR
```

### Check Proposal Status
```javascript
const state = await governance.state(proposalId);
// 0=Pending, 1=Active, 2=Canceled, 3=Defeated, 4=Succeeded, 5=Queued, 6=Expired, 7=Executed
```

### Queue Proposal (after success)
```javascript
await governance.queue(proposalId);
```

### Execute Proposal (after 48-hour timelock)
```javascript
await governance.execute(proposalId);
```

## 🔢 Key Numbers

- **Quorum:** 5% of total supply (50M GIVE)
- **Timelock:** 48 hours
- **Voting Delay:** 1 day
- **1 GIVE = 1 Vote**

## 🎯 Proposal Examples

### Example 1: Start ICO
```javascript
const calldatas = [
    giveToken.interface.encodeFunctionData("startICO", [30]) // 30 days
];
await governance.proposeWithCategory(
    [giveTokenAddress],
    [0],
    calldatas,
    "Start 30-day ICO",
    0 // PlatformUpgrade
);
```

### Example 2: Update Charity Wallet
```javascript
const calldatas = [
    giveToken.interface.encodeFunctionData("updateCharityWallet", [
        newCharityWalletAddress
    ])
];
await governance.proposeWithCategory(
    [giveTokenAddress],
    [0],
    calldatas,
    "Update charity wallet address",
    2 // EconomicPolicy
);
```

### Example 3: Pause Contract (Emergency)
```javascript
const calldatas = [
    giveToken.interface.encodeFunctionData("pause", [])
];
await governance.proposeWithCategory(
    [giveTokenAddress],
    [0],
    calldatas,
    "Pause contract due to security concern",
    3 // Emergency
);
```

## 🔍 Useful Queries

### Get All Proposals
```javascript
// You'll need to track proposal IDs from events
const filter = governance.filters.ProposalCreated();
const events = await governance.queryFilter(filter);
events.forEach(event => {
    console.log(`Proposal ${event.args.proposalId}: ${event.args.description}`);
});
```

### Get Proposal Votes
```javascript
const votes = await governance.proposalVotes(proposalId);
console.log(`For: ${ethers.utils.formatEther(votes.forVotes)}`);
console.log(`Against: ${ethers.utils.formatEther(votes.againstVotes)}`);
console.log(`Abstain: ${ethers.utils.formatEther(votes.abstainVotes)}`);
```

### Check Quorum
```javascript
const blockNumber = await ethers.provider.getBlockNumber();
const requiredQuorum = await governance.quorum(blockNumber);
const currentVotes = votes.forVotes + votes.againstVotes + votes.abstainVotes;
console.log(`Required: ${ethers.utils.formatEther(requiredQuorum)}`);
console.log(`Current: ${ethers.utils.formatEther(currentVotes)}`);
```

## ⚡ Quick Commands

```bash
# Deploy DAO
npx hardhat run deploy-dao.js --network polygon

# Verify contracts
npx hardhat verify --network polygon [CONTRACT_ADDRESS] [CONSTRUCTOR_ARGS]

# Check deployment
cat deployments/dao-deployment-*.json
```

## 🎨 Frontend Integration

```javascript
// Connect to governance
const governance = new ethers.Contract(
    governanceAddress,
    governanceABI,
    signer
);

// Get user's voting power
const votingPower = await governance.token.getPastVotes(
    userAddress,
    await provider.getBlockNumber() - 1
);

// Create proposal UI
// Show proposal form with category selection
// Encode function calls
// Submit proposal
```

---

**Keep this reference handy for DAO operations! 📚**