# 🚀 Polygon Mainnet Deployment Guide

## ✅ You Already Have GiveToken Deployed!

Since you've already deployed GiveToken, we just need to deploy the DAO contracts and connect them.

## 📋 What You Need

1. **Your GiveToken Contract Address** (from your deployment)
2. **Your Company Wallet** with MATIC for gas: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
3. **Private Key** in `.env` file

## 🎯 Deployment Steps

### Step 1: Update Deployment Script

Edit `deploy-dao-mainnet.js` and add your GiveToken address:

```javascript
giveTokenAddress: 'YOUR_ACTUAL_GIVETOKEN_ADDRESS_HERE',
```

### Step 2: Deploy DAO Contracts

**Option A: Using Hardhat (if network works)**
```bash
cd /Users/saita/GiveChainToken-Web/givechain-token-web
npx hardhat run deploy-dao-mainnet.js --network polygon
```

**Option B: Using Remix IDE (Recommended)**

#### Deploy TimelockController:
1. Go to Remix: https://remix.ethereum.org/
2. Create file: `TimelockController.sol`
3. Add: `import "@openzeppelin/contracts/governance/TimelockController.sol";`
4. Or use OpenZeppelin's contract directly
5. Deploy with:
   - `minDelay`: `172800` (48 hours)
   - `proposers`: `["0xD78D706Ab222083436e0C200632D64d7f05e867a"]`
   - `executors`: `["0xD78D706Ab222083436e0C200632D64d7f05e867a"]`
   - `admin`: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
6. **Save the Timelock address!**

#### Deploy Governance:
1. Create `GiveTokenGovernance.sol` in Remix
2. Copy content from your local file
3. Compile
4. Deploy with:
   - `_token`: [Your GiveToken address]
   - `_timelock`: [Your Timelock address from above]
5. **Save the Governance address!**

#### Set Up Roles:
1. Go to TimelockController contract
2. Call `grantRole`:
   - `role`: Get `PROPOSER_ROLE()` value
   - `account`: Your Governance address
3. Call `grantRole` again:
   - `role`: Get `EXECUTOR_ROLE()` value
   - `account`: Your Governance address

#### Transfer Ownership:
1. Go to your GiveToken contract
2. Call `transferOwnership`:
   - `newOwner`: Your TimelockController address

## 📝 Save These Addresses

```
GiveToken: [YOUR_EXISTING_ADDRESS]
TimelockController: [NEW_ADDRESS]
GiveTokenGovernance: [NEW_ADDRESS]
```

## ⚠️ Mainnet Checklist

Before deploying:
- [ ] You have enough MATIC for gas (recommend 0.5+ MATIC)
- [ ] You're connected to Polygon Mainnet (not testnet!)
- [ ] Your GiveToken address is correct
- [ ] You've tested the process mentally
- [ ] You have backups of all addresses

After deploying:
- [ ] All 3 contracts deployed successfully
- [ ] Roles granted correctly
- [ ] Ownership transferred to Timelock
- [ ] Contracts verified on PolygonScan
- [ ] Frontend updated with new addresses

## 🔗 PolygonScan Verification

After deployment, verify your contracts:
1. Go to https://polygonscan.com/
2. Search your contract addresses
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Follow the verification wizard

## 🎉 You're Done!

Your DAO will be live on Polygon Mainnet! Token holders can:
- Create proposals
- Vote on proposals  
- Execute approved proposals (after 48-hour timelock)

---

**Ready to deploy? Make sure you have your GiveToken address ready!**