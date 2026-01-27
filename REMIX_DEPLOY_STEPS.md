# 🚀 Remix IDE Deployment - Step by Step

## ⚡ Quick Start (5 Minutes!)

### Step 1: Open Remix
👉 Go to: **https://remix.ethereum.org/**

### Step 2: Create GiveToken.sol
1. Click **"Create New File"** in the left sidebar
2. Name it: `GiveToken.sol`
3. Copy the ENTIRE content from: `/contracts/GiveToken.sol`
4. Paste into Remix

### Step 3: Install OpenZeppelin
1. In Remix, click **"File Explorer"** tab
2. Look for **"remix_packages"** folder (or create it)
3. Remix will auto-detect OpenZeppelin imports and install them
4. Wait for installation to complete (you'll see a notification)

### Step 4: Compile GiveToken
1. Click **"Solidity Compiler"** tab (left sidebar)
2. Select compiler: **0.8.20** (NOT 0.8.24 - to avoid mcopy opcode issue)
3. **Delete OpenZeppelin package** (if already installed):
   - In "File Explorer", delete the `remix_packages` folder
   - This forces Remix to reinstall compatible version
4. **Enable Optimizer** (IMPORTANT for contract size):
   - Check **"Enable optimization"**
   - Set **"Runs"** to **1** (optimizes for smaller bytecode size)
5. Click **"Compile GiveToken.sol"**
6. ✅ Should show green checkmark if successful
7. ⚠️ If you see a warning about contract size > 24KB, the optimizer should fix it

### Step 5: Connect MetaMask
1. Make sure MetaMask is installed
2. Connect to **Polygon Mainnet**:
   - Network Name: Polygon Mainnet
   - RPC URL: https://polygon-rpc.com/
   - Chain ID: 137
   - Currency: MATIC
   - Explorer: https://polygonscan.com

### Step 6: Deploy GiveToken
1. Click **"Deploy & Run Transactions"** tab
2. Environment: **"Injected Provider - MetaMask"**
3. Account: Should show your company wallet `0xD78D706Ab222083436e0C200632D64d7f05e867a`
4. Contract: Select **"GiveToken"**
5. Click the **▼** arrow to expand constructor parameters
6. Fill in (all your company wallet):
   ```
   _charityWallet: 0xD78D706Ab222083436e0C200632D64d7f05e867a
   _teamWallet: 0xD78D706Ab222083436e0C200632D64d7f05e867a
   _communityWallet: 0xD78D706Ab222083436e0C200632D64d7f05e867a
   ```
   ⚠️ **Note**: Emergency recovery wallet parameter has been removed to reduce contract size.
7. Click **"Deploy"**
8. MetaMask will popup - **Confirm transaction**
9. ⏳ Wait for confirmation
10. **📋 COPY THE CONTRACT ADDRESS!** (You'll see it under "Deployed Contracts")

### Step 7: Deploy TimelockController
1. In Remix, you need to import TimelockController
2. Create new file: `TimelockController.sol`
3. Add this import at the top:
   ```solidity
   import "@openzeppelin/contracts/governance/TimelockController.sol";
   ```
4. Actually, better approach - use OpenZeppelin's contract directly:
   - In "Deploy & Run", look for OpenZeppelin contracts
   - Or create a simple wrapper:
   
   Create file `DeployTimelock.sol`:
   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.19;
   import "@openzeppelin/contracts/governance/TimelockController.sol";
   ```
5. Compile it
6. Deploy with:
   - `minDelay`: `172800` (48 hours = 48 * 3600 seconds)
   - `proposers`: `["0xD78D706Ab222083436e0C200632D64d7f05e867a"]`
   - `executors`: `["0xD78D706Ab222083436e0C200632D64d7f05e867a"]`
   - `admin`: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
7. **📋 COPY THE TIMELOCK ADDRESS!**

### Step 8: Deploy Governance
1. Create file: `GiveTokenGovernance.sol`
2. Copy content from: `/contracts/GiveTokenGovernance.sol`
3. **Compile with Optimizer** (CRITICAL - contract is large):
   - In "Solidity Compiler" tab
   - Select compiler: **0.8.20** (NOT 0.8.24)
   - **Enable optimization** ✅
   - Set **"Runs"** to **1** (for smaller bytecode)
   - Click **"Compile GiveTokenGovernance.sol"**
   - ⚠️ Without optimizer, you'll get "contract size > 24KB" error
4. Deploy with:
   - `_token`: [Your GiveToken address from Step 6]
   - `_timelock`: [Your Timelock address from Step 7]
5. **📋 COPY THE GOVERNANCE ADDRESS!**

### Step 9: Set Up Roles
1. Go to your **TimelockController** contract (in Deployed Contracts)
2. Find `grantRole` function
3. Get role hashes:
   - Call `PROPOSER_ROLE()` - copy the result
   - Call `EXECUTOR_ROLE()` - copy the result
4. Grant PROPOSER role:
   - `role`: [PROPOSER_ROLE hash]
   - `account`: [Your Governance address]
   - Click "transact"
5. Grant EXECUTOR role:
   - `role`: [EXECUTOR_ROLE hash]
   - `account`: [Your Governance address]
   - Click "transact"

### Step 10: Transfer Ownership
1. Go to your **GiveToken** contract
2. Find `transferOwnership` function
3. `newOwner`: [Your TimelockController address]
4. Click "transact"
5. ✅ **DAO is now live!**

---

## 📝 Save Your Addresses

```
GiveToken: [PASTE FROM STEP 6]
TimelockController: [PASTE FROM STEP 7]
GiveTokenGovernance: [PASTE FROM STEP 8]
```

**Save these addresses - you'll need them for everything!**

---

## ✅ Verification Checklist

- [ ] GiveToken deployed and address saved
- [ ] TimelockController deployed and address saved
- [ ] Governance deployed and address saved
- [ ] PROPOSER role granted to Governance
- [ ] EXECUTOR role granted to Governance
- [ ] GiveToken ownership transferred to Timelock
- [ ] All addresses saved securely

---

## 🎉 You're Done!

Your DAO is now live on Polygon! Token holders can:
- Create proposals
- Vote on proposals
- Execute approved proposals (after 48-hour timelock)

**Next:** Update your frontend with the new contract addresses!