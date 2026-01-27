# PolygonScan Verification - Exact Settings

## ⚠️ IMPORTANT: Version Mismatch Issue

The flattened file uses OpenZeppelin 5.4.0, but you deployed with 5.0.0 from GitHub.
**Solution**: Use Remix verification plugin OR use the exact settings below.

## ✅ Exact Compiler Settings (Must Match!)

### Compiler Configuration
- **Compiler Version**: `0.8.20+commit.a1b79de6.Emscripten.clang`
  - Select: `v0.8.20+commit.a1b79de6`
- **Optimization**: Enabled** ✅
- **Optimization Runs**: `1`
- **EVM Version**: `default` (or leave blank)
- **License**: `MIT`

## Constructor Arguments (ABI-Encoded)

**Your constructor arguments:**
```
0xD78D706Ab222083436e0C200632D64d7f05e867a
0xD78D706Ab222083436e0C200632D64d7f05e867a
0xD78D706Ab222083436e0C200632D64d7f05e867a
```

**ABI-Encoded (paste this):**
```
000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a
```

## Step-by-Step Verification

### Option 1: Use Remix Verification Plugin (RECOMMENDED)

1. **In Remix IDE:**
   - Go to "Plugin Manager"
   - Search for "Etherscan Verification"
   - Install the plugin
   - Open the plugin

2. **Configure:**
   - **Contract Address**: `0xf45092BAddf17f6E4fBe18962814C90f8F983e34`
   - **Network**: Polygon
   - **API Key**: Get from https://polygonscan.com/myapikey
   - **Compiler**: 0.8.20
   - **Optimization**: Yes, Runs: 1

3. **Click "Verify"**
   - Remix will automatically use the exact code you deployed!

### Option 2: Manual Verification (If Remix doesn't work)

1. **On PolygonScan:**
   - Go to: https://polygonscan.com/address/0xf45092BAddf17f6E4fBe18962814C90f8F983e34
   - Click "Contract" tab
   - Click "Verify and Publish"

2. **Select Verification Type:**
   - Choose: **"Via Standard JSON Input"** (NOT single file)
   - This allows you to specify compiler settings exactly

3. **Fill in Settings:**
   - **Compiler Version**: `0.8.20+commit.a1b79de6.Emscripten.clang`
   - **Open Source License Type**: `MIT License (MIT)`
   - **Compiler Settings**:
     ```json
     {
       "optimizer": {
         "enabled": true,
         "runs": 1
       },
       "evmVersion": "default"
     }
     ```
   - **Constructor Arguments**: 
     ```
     000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a000000000000000000000000d78d706ab222083436e0c200632d64d7f05e867a
     ```

4. **Contract Code:**
   - Use the code from `contracts/GiveToken.sol` (with GitHub imports)
   - OR use the flattened file but be aware of version mismatch

## 🔧 Troubleshooting

### Error: "Unable to find matching Contract Bytecode"

**Causes:**
1. Compiler version mismatch
2. Optimization settings mismatch
3. OpenZeppelin version mismatch (5.0.0 vs 5.4.0)

**Solutions:**
1. ✅ Use Remix verification plugin (handles everything automatically)
2. ✅ Try "Via Standard JSON Input" instead of "Single file"
3. ✅ Double-check compiler version is exactly `0.8.20`
4. ✅ Make sure optimizer is enabled with runs: `1`

### If Still Failing:

1. **Get the exact compiler output from Remix:**
   - In Remix, after compiling, check the compiler output
   - Look for the exact compiler version string
   - Use that exact version in PolygonScan

2. **Check the deployment transaction:**
   - Go to your deployment transaction on PolygonScan
   - Look at the "Input Data" section
   - Verify constructor arguments match

3. **Contact PolygonScan Support:**
   - Provide your contract address
   - Provide deployment transaction hash
   - They can help verify manually

## ✅ Quick Checklist

- [ ] Compiler: `0.8.20` (exact match)
- [ ] Optimization: Enabled
- [ ] Runs: `1`
- [ ] Constructor args: All 3 addresses encoded correctly
- [ ] Using Remix plugin OR Standard JSON Input
- [ ] OpenZeppelin version matches (5.0.0 from GitHub)

---

**Best Solution**: Use Remix's Etherscan Verification plugin - it uses the exact same code and settings you deployed with!
