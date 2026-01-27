# 🏛️ GiveToken DAO Deployment Guide

## 📋 Overview

Your GiveToken now has a complete DAO governance system! This guide will help you deploy everything.

## 🎯 What You're Deploying

1. **GiveToken** - Your ERC20 token with voting capabilities
2. **TimelockController** - 48-hour delay for proposal execution
3. **GiveTokenGovernance** - The DAO contract that manages everything

## 🚀 Deployment Options

### Option 1: Remix IDE (Recommended - Works Now!)

**Best for:** Quick deployment without network issues

#### Step 1: Open Remix
Go to: https://remix.ethereum.org/

#### Step 2: Create Files
Create these files in Remix:

**File 1: `GiveToken.sol`**
- Copy entire content from `/contracts/GiveToken.sol`

**File 2: `GiveTokenGovernance.sol`**
- Copy entire content from `/contracts/GiveTokenGovernance.sol`

#### Step 3: Install OpenZeppelin
1. In Remix, go to "File Explorer"
2. Click "Create New File"
3. Name it: `remix_packages.json`
4. Add this content:
```json
{
  "remix": {
    "openzeppelin": "^5.0.0"
  }
}
```
5. Remix will auto-install OpenZeppelin contracts

#### Step 4: Compile Contracts
1. Go to "Solidity Compiler" tab
2. Select compiler version: `0.8.19`
3. Compile `GiveToken.sol` first
4. Then compile `GiveTokenGovernance.sol`

#### Step 5: Deploy GiveToken
1. Go to "Deploy & Run Transactions"
2. Environment: "Injected Provider - MetaMask"
3. Connect to Polygon Mainnet
4. Select "GiveToken" contract
5. Deploy with these parameters:
```
_charityWallet: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_teamWallet: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_communityWallet: 0xD78D706Ab222083436e0C200632D64d7f05e867a
```
6. **Copy the GiveToken address!**

#### Step 6: Deploy TimelockController
1. In Remix, you'll need to import TimelockController
2. Or use OpenZeppelin's contract directly
3. Deploy with:
   - `minDelay`: `172800` (48 hours in seconds)
   - `proposers`: `["0xD78D706Ab222083436e0C200632D64d7f05e867a"]`
   - `executors`: `["0xD78D706Ab222083436e0C200632D64d7f05e867a"]`
   - `admin`: Your company wallet address
4. **Copy the TimelockController address!**

#### Step 7: Deploy Governance
1. Select "GiveTokenGovernance" contract
2. Deploy with:
   - `_token`: Your GiveToken address (from Step 5)
   - `_timelock`: Your TimelockController address (from Step 6)
3. **Copy the Governance address!**

#### Step 8: Set Up Roles
1. Go to your TimelockController contract
2. Call `grantRole` with:
   - `role`: `PROPOSER_ROLE` (get this from the contract)
   - `account`: Your Governance contract address
3. Call `grantRole` again with:
   - `role`: `EXECUTOR_ROLE`
   - `account`: Your Governance contract address

#### Step 9: Transfer Ownership
1. Go to your GiveToken contract
2. Call `transferOwnership` with:
   - `newOwner`: Your TimelockController address

✅ **DAO is now live!**

---

### Option 2: Hardhat (When Network Available)

**Best for:** Automated deployment with scripts

#### Prerequisites
- Stable internet connection
- `.env` file with `PRIVATE_KEY` set
- Node.js 22.10.0+ (or use nvm)

#### Deploy Everything
```bash
cd /Users/saita/GiveChainToken-Web/givechain-token-web

# Compile contracts
npx hardhat compile

# Deploy to Mumbai testnet first
npx hardhat run deploy-dao.js --network mumbai

# Or deploy to Polygon mainnet
npx hardhat run deploy-dao.js --network polygon
```

The script will:
- ✅ Deploy GiveToken
- ✅ Deploy TimelockController
- ✅ Deploy Governance
- ✅ Set up all roles
- ✅ Transfer ownership to DAO
- ✅ Save deployment info

---

## 📊 DAO Configuration

### Proposal Categories

| Category | Threshold | Voting Period | Approval Required |
|----------|-----------|---------------|-------------------|
| **Platform Upgrades** | 1M GIVE | 7 days | 50% |
| **Charity Approval** | 500K GIVE | 5 days | 66.67% |
| **Economic Policy** | 2M GIVE | 10 days | 75% |
| **Emergency** | 5M GIVE | 2 days | 50% |

### Governance Parameters
- **Voting Delay:** 1 day
- **Quorum:** 5% of total supply
- **Timelock Delay:** 48 hours
- **Voting Power:** 1 GIVE = 1 Vote

---

## 🗳️ How to Use the DAO

### Creating a Proposal

1. **Check your voting power:**
   ```solidity
   governance.token().getPastVotes(yourAddress, block.number - 1)
   ```

2. **Create proposal:**
   ```solidity
   governance.proposeWithCategory(
       targets,      // Array of contract addresses to call
       values,       // Array of ETH values to send
       calldatas,    // Array of function calldatas
       description,  // Proposal description
       category      // 0=Platform, 1=Charity, 2=Economic, 3=Emergency
   )
   ```

3. **Example - Update ICO Price:**
   ```javascript
   const targets = [giveTokenAddress];
   const values = [0];
   const calldatas = [
       giveToken.interface.encodeFunctionData("updatePrice", [
           ethers.utils.parseEther("0.0002") // New price
       ])
   ];
   const description = "Update ICO price to 0.0002 MATIC per GIVE";
   const category = 0; // Platform Upgrade
   
   await governance.proposeWithCategory(
       targets,
       values,
       calldatas,
       description,
       category
   );
   ```

### Voting on Proposals

1. **Get proposal ID** (from proposal creation event)

2. **Vote:**
   ```solidity
   governance.castVote(proposalId, support)
   // support: 0=Against, 1=For, 2=Abstain
   ```

3. **Or vote with reason:**
   ```solidity
   governance.castVoteWithReason(proposalId, support, reason)
   ```

### Executing Proposals

After voting period ends and proposal succeeds:

1. **Queue the proposal:**
   ```solidity
   governance.queue(proposalId)
   ```

2. **Wait 48 hours** (timelock delay)

3. **Execute:**
   ```solidity
   governance.execute(proposalId)
   ```

---

## 🔐 Security Features

✅ **Timelock Protection** - 48-hour delay prevents rushed decisions
✅ **Quorum Requirement** - 5% must vote for validity
✅ **Category Thresholds** - Different requirements for different proposal types
✅ **Role-Based Access** - Only governance can execute proposals
✅ **Ownership Transfer** - GiveToken admin functions require DAO approval

---

## 📝 Important Notes

1. **Token Distribution:**
   - 800M GIVE → Your company wallet
   - 200M GIVE → ICO contract
   - All tokens have voting power!

2. **DAO Control:**
   - After deployment, GiveToken ownership is transferred to Timelock
   - All admin functions now require DAO proposals
   - This makes it fully decentralized!

3. **First Proposals:**
   - You'll need at least 500K-5M GIVE to create proposals
   - Consider distributing tokens to community for participation
   - Or use your company wallet holdings to create initial proposals

---

## 🆘 Troubleshooting

### "Insufficient voting power"
- You need the minimum threshold for the proposal category
- Check your balance: `giveToken.balanceOf(yourAddress)`

### "Proposal failed"
- Check quorum (5% must vote)
- Check approval percentage (category-specific)
- Check voting period hasn't ended

### "Cannot execute"
- Make sure proposal is in Succeeded state
- Must be queued first
- Must wait 48 hours after queuing

---

## 🎉 Next Steps After Deployment

1. ✅ **Verify contracts on PolygonScan**
2. ✅ **Create your first proposal** (e.g., start ICO)
3. ✅ **Set up governance frontend** (for users to vote)
4. ✅ **Distribute tokens** to community for participation
5. ✅ **Launch your DAO!**

---

**Your GiveToken is now a fully decentralized, community-governed charitable giving platform! 🌟**