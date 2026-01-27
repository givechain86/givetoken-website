# 🌐 Deploy DonateToken Using Remix IDE (No Node.js Required)

## Why Use Remix?
- ✅ No Node.js compatibility issues
- ✅ Web-based - works in any browser
- ✅ Built-in compiler and deployer
- ✅ Easy MetaMask integration

## Step-by-Step Deployment

### 1. Open Remix IDE
Go to: https://remix.ethereum.org/

### 2. Create New File
- Click "Create New File"
- Name it: `DonateToken.sol`

### 3. Copy Contract Code
Copy the entire content from: `/contracts/DonateToken.sol`

### 4. Compile Contract
- Go to "Solidity Compiler" tab (left sidebar)
- Select compiler version: `0.8.19`
- Click "Compile DonateToken.sol"
- ✅ Should compile without errors

### 5. Connect MetaMask
- Install MetaMask if not already installed
- Connect to Polygon Network:
  - Network Name: Polygon Mainnet
  - RPC URL: https://polygon-rpc.com/
  - Chain ID: 137
  - Currency Symbol: MATIC
  - Block Explorer: https://polygonscan.com/

### 6. Deploy Contract
- Go to "Deploy & Run Transactions" tab
- Environment: Select "Injected Provider - MetaMask"
- Account: Should show your company wallet `0xD78D706Ab222083436e0C200632D64d7f05e867a`
- Contract: Select "DonateToken"

### 7. Constructor Parameters
Fill in the deployment parameters (all your company wallet):

```
_CHARITYWALLET: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_TEAMWALLET: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_COMMUNITYWALLET: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_MARKETINGWALLET: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_LIQUIDITYWALLET: 0xD78D706Ab222083436e0C200632D64d7f05e867a
_EMERGENCYRECOVERYWALLET: 0xD78D706Ab222083436e0C200632D64d7f05e867a
```

### 8. Deploy!
- Click "Deploy" button
- MetaMask will popup - confirm the transaction
- Wait for confirmation
- ✅ Your contract is deployed!

### 9. Get Contract Address
- After deployment, you'll see the contract in "Deployed Contracts"
- Copy the contract address
- This is your new DonateToken contract address!

### 10. Update Frontend
Replace the contract address in `/src/utils/web3.js`:
```javascript
address: "YOUR_NEW_CONTRACT_ADDRESS_HERE"
```

## 🎯 Quick Test Deployment (Mumbai Testnet)

For testing, use Mumbai testnet first:

**Mumbai Network Settings:**
- Network Name: Polygon Mumbai
- RPC URL: https://rpc-mumbai.maticvigil.com/
- Chain ID: 80001
- Currency Symbol: MATIC
- Block Explorer: https://mumbai.polygonscan.com/

**Get Test MATIC:**
- Go to: https://faucet.polygon.technology/
- Enter your wallet address
- Get free test MATIC

## ✅ Advantages of Remix
- No Node.js version conflicts
- Visual interface
- Built-in verification tools
- Direct MetaMask integration
- Immediate deployment

## 🔗 Useful Links
- Remix IDE: https://remix.ethereum.org/
- Polygon Faucet: https://faucet.polygon.technology/
- PolygonScan: https://polygonscan.com/
- MetaMask: https://metamask.io/

---

**This is the easiest way to deploy your DonateToken without any Node.js issues!**