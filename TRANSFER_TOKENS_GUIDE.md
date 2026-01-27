# 🔄 How to Transfer GIVE Tokens from Contract to Your Wallet

## Overview
The contract holds 350M GIVE tokens for the ICO. To add liquidity, you need to transfer some tokens from the contract to your wallet.

## ⚠️ Important Note
**The contract has been updated** with a new function `transferFromContract()` that allows you to transfer tokens. However, if your deployed contract doesn't have this function yet, you can use the standard `transfer` function method below.

## Method 1: Using the New Function (If Contract Updated)

### Step 1: Go to PolygonScan
1. Visit: https://polygonscan.com/address/0xf45092BAddf17f6E4fBe18962814C90f8F983e34
2. Click "Contract" tab
3. Click "Write Contract"
4. Connect your wallet (the one that deployed the contract - has ADMIN_ROLE)

### Step 2: Call transferFromContract Function
1. Find function: `transferFromContract`
2. Fill in:
   - `_to`: Your wallet address (e.g., `0xD78D706Ab222083436e0C200632D64d7f05e867a`)
   - `_amount`: Amount in wei (e.g., for 10M tokens: `10000000000000000000000000`)
3. Click "Write"
4. Confirm in MetaMask

### Amount Examples:
- **10M GIVE**: `10000000000000000000000000` (10,000,000 * 10^18)
- **50M GIVE**: `50000000000000000000000000` (50,000,000 * 10^18)
- **100M GIVE**: `100000000000000000000000000` (100,000,000 * 10^18)

## Method 2: Using Standard Transfer (Current Deployed Contract)

Since your current contract might not have `transferFromContract`, you can use the standard ERC20 `transfer` function, but you need to call it **as the contract itself**.

### Option A: Via Remix IDE (Easiest)

1. **Open Remix:**
   - Go to https://remix.ethereum.org/
   - Connect to Polygon Mainnet

2. **Load Your Contract:**
   - Go to "Deploy & Run Transactions"
   - In "Deployed Contracts", find your GiveToken contract
   - Or paste the contract address: `0xf45092BAddf17f6E4fBe18962814C90f8F983e34`
   - Load the ABI

3. **Call Transfer:**
   - Find `transfer` function
   - `to`: Your wallet address
   - `amount`: Amount in wei (e.g., `10000000000000000000000000` for 10M)
   - Click "transact"
   - Confirm in MetaMask

### Option B: Via PolygonScan (If Contract Allows)

1. **Go to PolygonScan:**
   - https://polygonscan.com/address/0xf45092BAddf17f6E4fBe18962814C90f8F983e34#writeContract

2. **Find `transfer` function:**
   - Look in "Write Contract" section
   - Note: This might not work if the contract can't call transfer on itself

3. **Alternative - Use Contract Interaction:**
   - Go to "Contract" → "Write as Proxy" (if available)
   - Or use "Read/Write Contract" tab

## Method 3: Add Function to Contract (Recommended for Future)

I've added a `transferFromContract()` function to your contract code. If you want to use it:

1. **The function is already in the updated contract code**
2. **You would need to deploy a new version** OR
3. **Use Method 2 above for now**

## 📊 Quick Reference

### Your Details:
- **Contract Address**: `0xf45092BAddf17f6E4fBe18962814C90f8F983e34`
- **Your Wallet**: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
- **Contract Balance**: 350,000,000 GIVE (350M tokens)

### Recommended Transfer Amounts for Liquidity:
- **Small Pool**: 10M - 20M GIVE
- **Medium Pool**: 50M - 100M GIVE
- **Large Pool**: 100M - 200M GIVE

### Amount Conversion (Tokens to Wei):
```
1 GIVE = 1,000,000,000,000,000,000 wei (10^18)
10M GIVE = 10,000,000 * 10^18 = 10000000000000000000000000
50M GIVE = 50,000,000 * 10^18 = 50000000000000000000000000
```

## ✅ Step-by-Step: Transfer 10M GIVE for Liquidity

### Using Remix (Recommended):

1. **Open Remix**: https://remix.ethereum.org/
2. **Connect Wallet**: MetaMask → Polygon Mainnet
3. **Go to Deploy Tab**
4. **At Address**: Enter `0xf45092BAddf17f6E4fBe18962814C90f8F983e34`
5. **Load Contract**: Click "At Address"
6. **Find `transfer` function**
7. **Enter:**
   - `to`: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
   - `amount`: `10000000000000000000000000` (10M GIVE)
8. **Click "transact"**
9. **Confirm in MetaMask**
10. **Wait for confirmation** (~2-5 seconds)

## 🔍 Verify Transfer

After transferring:
1. Check your wallet balance on PolygonScan
2. You should see the GIVE tokens in your wallet
3. Then proceed to add liquidity on QuickSwap

## ⚠️ Important Notes

1. **You need ADMIN_ROLE** to transfer from contract
2. **Gas fees** are very low on Polygon (~0.01-0.1 MATIC)
3. **Don't transfer all tokens** - keep some in contract for ICO
4. **Recommended**: Transfer 50M-100M GIVE for initial liquidity

## 🚀 After Transfer

Once tokens are in your wallet:
1. Go to QuickSwap: https://quickswap.exchange/
2. Add Liquidity (see LIQUIDITY_GUIDE.md)
3. Pair with MATIC
4. Lock liquidity for trust

---

**Need Help?** If you can't find the transfer function, the contract might need the new `transferFromContract` function added. Let me know if you want me to help you add it to a new deployment!
