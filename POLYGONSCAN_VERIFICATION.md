# PolygonScan Contract Verification Guide

## Contract Details
- **Contract Address**: `0xf45092BAddf17f6E4fBe18962814C90f8F983e34`
- **Network**: Polygon Mainnet
- **PolygonScan**: https://polygonscan.com/address/0xf45092BAddf17f6E4fBe18962814C90f8F983e34

## Verification Settings (From Remix Deployment)

### Compiler Settings
- **Compiler Version**: `0.8.20+commit.a1b79de6.Emscripten.clang`
- **Optimization**: **Enabled**
- **Runs**: **1**
- **EVM Version**: Default (or "paris"/"shanghai")

### OpenZeppelin Version
- **Version**: v5.0.0 (from GitHub imports)
- **Source**: https://github.com/OpenZeppelin/openzeppelin-contracts/tree/v5.0.0

## Step-by-Step Verification

### Option 1: Via Remix (Easiest)

1. **In Remix IDE:**
   - Go to "Solidity Compiler" tab
   - Make sure compiler is **0.8.20**
   - Optimizer enabled, Runs: **1**
   - Compile the contract

2. **Get Flattened Contract:**
   - In Remix, click the "Flattener" plugin (or use online flattener)
   - Or use: https://github.com/poanetwork/solidity-flattener
   - This combines all imports into one file

3. **On PolygonScan:**
   - Go to your contract page
   - Click "Contract" tab → "Verify and Publish"
   - Select: **"Via Standard JSON Input"** or **"Via Remix"**
   - If using Remix: Connect Remix and select the contract
   - Fill in:
     - Compiler: **0.8.20**
     - Optimization: **Yes**
     - Runs: **1**
     - Constructor arguments: (see below)

### Option 2: Manual Verification

1. **Get Flattened Contract:**
   - Use Remix's flattener or online tool
   - Copy the entire flattened code

2. **On PolygonScan:**
   - Go to contract → "Verify and Publish"
   - Select: **"Solidity (Single file)"**
   - Compiler: **0.8.20**
   - License: **MIT**
   - Optimization: **Yes**
   - Runs: **1**
   - Paste flattened contract code
   - Constructor arguments: (see below)

## Constructor Arguments

Your constructor takes 3 addresses:
```solidity
constructor(
    address _charityWallet,
    address _teamWallet,
    address _communityWallet
)
```

**ABI-Encoded Constructor Arguments:**
```
000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a
```

Or use PolygonScan's constructor arguments encoder:
- `_charityWallet`: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
- `_teamWallet`: `0xD78D706Ab222083436e0C200632D64d7f05e867a`
- `_communityWallet`: `0xD78D706Ab222083436e0C200632D64d7f05e867a`

## Common Issues & Solutions

### Issue: "Unable to find matching Contract Bytecode"
**Solution:**
- Make sure compiler version matches exactly: **0.8.20**
- Enable optimizer with **Runs: 1**
- Use the exact same code that was deployed
- Try "Via Remix" option if available

### Issue: "Constructor arguments mismatch"
**Solution:**
- Use PolygonScan's ABI encoder
- Or use the encoded string provided above
- Make sure all 3 addresses are correct

### Issue: "OpenZeppelin imports not found"
**Solution:**
- Use flattened contract (combines all imports)
- Or verify via Remix which handles imports automatically

## Quick Verification Checklist

- [ ] Compiler version: **0.8.20**
- [ ] Optimization: **Enabled**
- [ ] Optimization runs: **1**
- [ ] Contract code matches deployed version
- [ ] Constructor arguments encoded correctly
- [ ] All 3 wallet addresses are correct

## Alternative: Use Remix Verification Plugin

1. In Remix, install "Etherscan Verification" plugin
2. Enter your contract address
3. Enter PolygonScan API key (get from https://polygonscan.com/myapikey)
4. Click "Verify"
5. Remix handles everything automatically!

---

**Need Help?** If verification still fails, try:
1. Use Remix's built-in verification plugin
2. Contact PolygonScan support with your transaction hash
3. Double-check all compiler settings match deployment
