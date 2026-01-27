// DonateToken V2 Deployment Script with Enhanced Security
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Deployment Configuration
const DEPLOYMENT_CONFIG = {
  network: 'polygon', // or 'mumbai' for testnet
  confirmations: 5,
  gasLimit: 3000000,
  
  // Wallet addresses - Using company wallet for initial deployment
  wallets: {
    charity: '0xD78D706Ab222083436e0C200632D64d7f05e867a',    // Company wallet
    team: '0xD78D706Ab222083436e0C200632D64d7f05e867a',       // Company wallet
    community: '0xD78D706Ab222083436e0C200632D64d7f05e867a',  // Company wallet
    marketing: '0xD78D706Ab222083436e0C200632D64d7f05e867a',  // Company wallet
    liquidity: '0xD78D706Ab222083436e0C200632D64d7f05e867a',  // Company wallet
    emergency: '0xD78D706Ab222083436e0C200632D64d7f05e867a'   // Company wallet - CRITICAL!
  }
};

class SecureDeployment {
  constructor() {
    this.deploymentData = {
      timestamp: new Date().toISOString(),
      network: DEPLOYMENT_CONFIG.network,
      wallets: {},
      contract: {},
      backups: []
    };
  }

  // Pre-deployment security checks
  async preDeploymentChecks() {
    console.log('🔐 Running pre-deployment security checks...');
    
    // Check all wallet addresses are set
    for (const [key, address] of Object.entries(DEPLOYMENT_CONFIG.wallets)) {
      if (address === '0x0000000000000000000000000000000000000000') {
        throw new Error(`❌ ${key} wallet address not set! Please update DEPLOYMENT_CONFIG.`);
      }
      console.log(`✅ ${key} wallet: ${address}`);
    }
    
    // Check deployer has enough MATIC
    const [deployer] = await ethers.getSigners();
    const balance = await deployer.getBalance();
    const minBalance = ethers.utils.parseEther('0.1'); // 0.1 MATIC minimum
    
    if (balance.lt(minBalance)) {
      throw new Error(`❌ Insufficient MATIC balance. Need at least 0.1 MATIC, have ${ethers.utils.formatEther(balance)}`);
    }
    
    console.log(`✅ Deployer balance: ${ethers.utils.formatEther(balance)} MATIC`);
    console.log(`✅ Deployer address: ${deployer.address}`);
    
    this.deploymentData.deployer = deployer.address;
    this.deploymentData.deployerBalance = ethers.utils.formatEther(balance);
    
    return true;
  }

  // Deploy the contract
  async deployContract() {
    console.log('\n🚀 Deploying DonateToken V2...');
    
    const [deployer] = await ethers.getSigners();
    
    // Get contract factory
    const DonateToken = await ethers.getContractFactory('DonateToken');
    
    // Deploy with constructor parameters
    const donateToken = await DonateToken.deploy(
      DEPLOYMENT_CONFIG.wallets.charity,
      DEPLOYMENT_CONFIG.wallets.team,
      DEPLOYMENT_CONFIG.wallets.community,
      DEPLOYMENT_CONFIG.wallets.marketing,
      DEPLOYMENT_CONFIG.wallets.liquidity,
      DEPLOYMENT_CONFIG.wallets.emergency,
      {
        gasLimit: DEPLOYMENT_CONFIG.gasLimit
      }
    );
    
    console.log('⏳ Waiting for deployment confirmation...');
    await donateToken.deployed();
    
    console.log('⏳ Waiting for additional confirmations...');
    await donateToken.deployTransaction.wait(DEPLOYMENT_CONFIG.confirmations);
    
    console.log(`✅ DonateToken V2 deployed to: ${donateToken.address}`);
    console.log(`📋 Transaction hash: ${donateToken.deployTransaction.hash}`);
    
      // Store contract info
      this.deploymentData.contract = {
        address: donateToken.address,
        transactionHash: donateToken.deployTransaction.hash,
        blockNumber: donateToken.deployTransaction.blockNumber,
        gasUsed: donateToken.deployTransaction.gasLimit.toString(),
        deployedBy: deployer.address
      };
      
      return donateToken;
  }

  // Verify contract deployment
  async verifyDeployment(contract) {
    console.log('\n🔍 Verifying contract deployment...');
    
    try {
      // Check basic contract info
      const name = await contract.name();
      const symbol = await contract.symbol();
      const totalSupply = await contract.totalSupply();
      const owner = await contract.owner();
      
      console.log(`✅ Token Name: ${name}`);
      console.log(`✅ Token Symbol: ${symbol}`);
      console.log(`✅ Total Supply: ${ethers.utils.formatEther(totalSupply)} GIVE`);
      console.log(`✅ Contract Owner: ${owner}`);
      
      // Verify wallet addresses
      const charityWallet = await contract.charityWallet();
      const teamWallet = await contract.teamWallet();
      
      console.log(`✅ Charity Wallet: ${charityWallet}`);
      console.log(`✅ Team Wallet: ${teamWallet}`);
      
      // Store verification data
      this.deploymentData.verification = {
        name,
        symbol,
        totalSupply: ethers.utils.formatEther(totalSupply),
        owner,
        wallets: {
          charity: charityWallet,
          team: teamWallet,
          emergency: emergencyWallet
        }
      };
      
      return true;
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return false;
    }
  }

  // Create comprehensive backup
  async createBackup(contract) {
    console.log('\n💾 Creating comprehensive backup...');
    
    const backupDir = path.join(__dirname, 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `donate-token-v2-${timestamp}.json`);
    
    // Create detailed backup data
    const backupData = {
      ...this.deploymentData,
      contractABI: contract.interface.format(ethers.utils.FormatTypes.json),
      networkInfo: {
        chainId: (await contract.provider.getNetwork()).chainId,
        rpcUrl: contract.provider.connection?.url || 'Unknown'
      },
      importantNotes: [
        'KEEP THIS FILE SAFE - IT CONTAINS ALL CONTRACT DEPLOYMENT INFO',
        'BACKUP YOUR WALLET SEED PHRASES SEPARATELY',
        'NEVER SHARE PRIVATE KEYS OR SEED PHRASES',
        'USE HARDWARE WALLETS FOR LARGE AMOUNTS',
        'EMERGENCY WALLET CAN RECOVER CONTRACT OWNERSHIP AFTER 7 DAYS'
      ]
    };
    
    // Save backup
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`✅ Backup saved to: ${backupFile}`);
    
    // Create human-readable summary
    const summaryFile = path.join(backupDir, `deployment-summary-${timestamp}.txt`);
    const summary = `
DONATE TOKEN V2 DEPLOYMENT SUMMARY
==================================
Deployment Date: ${this.deploymentData.timestamp}
Network: ${DEPLOYMENT_CONFIG.network}
Contract Address: ${contract.address}
Transaction Hash: ${this.deploymentData.contract.transactionHash}

WALLET ADDRESSES:
- Charity: ${DEPLOYMENT_CONFIG.wallets.charity}
- Team: ${DEPLOYMENT_CONFIG.wallets.team}
- Community: ${DEPLOYMENT_CONFIG.wallets.community}
- Marketing: ${DEPLOYMENT_CONFIG.wallets.marketing}
- Liquidity: ${DEPLOYMENT_CONFIG.wallets.liquidity}
- Emergency Recovery: ${DEPLOYMENT_CONFIG.wallets.emergency}

CRITICAL SECURITY REMINDERS:
1. BACKUP ALL WALLET SEED PHRASES IMMEDIATELY
2. Store backups in multiple secure locations
3. Never share private keys or seed phrases
4. Use hardware wallets for large amounts
5. Emergency wallet can recover contract after 7 days

CONTRACT FEATURES:
- Total Supply: 1,000,000,000 DONATE tokens
- ICO Supply: 200,000,000 DONATE (20%)
- Charity Supply: 350,000,000 DONATE (35%)
- Team Supply: 150,000,000 DONATE (15%)
- Community Supply: 150,000,000 DONATE (15%)
- Marketing Supply: 70,000,000 DONATE (7%)
- Liquidity Supply: 80,000,000 DONATE (8%)

NEXT STEPS:
1. Update frontend with new contract address
2. Test all contract functions
3. Set up monitoring and alerts
4. Prepare for ICO launch
`;
    
    fs.writeFileSync(summaryFile, summary);
    console.log(`✅ Summary saved to: ${summaryFile}`);
    
    return { backupFile, summaryFile };
  }

  // Update frontend configuration
  async updateFrontendConfig(contract) {
    console.log('\n🔧 Updating frontend configuration...');
    
    const configFile = path.join(__dirname, '../src/utils/web3.js');
    
    try {
      let config = fs.readFileSync(configFile, 'utf8');
      
      // Update contract address
      const oldAddressPattern = /address:\s*"0x[a-fA-F0-9]{40}"/;
      const newAddress = `address: "${contract.address}"`;
      config = config.replace(oldAddressPattern, newAddress);
      
      // Add deployment timestamp comment
      const deploymentComment = `  // Deployed: ${this.deploymentData.timestamp}\n  // Transaction: ${this.deploymentData.contract.transactionHash}\n  `;
      config = config.replace(/address:\s*"[^"]+",/, `${deploymentComment}address: "${contract.address}",`);
      
      fs.writeFileSync(configFile, config);
      console.log(`✅ Frontend config updated: ${configFile}`);
      
    } catch (error) {
      console.error('❌ Failed to update frontend config:', error.message);
      console.log('⚠️  Please manually update the contract address in src/utils/web3.js');
    }
  }

  // Print final instructions
  printFinalInstructions(backupFiles) {
    console.log('\n🎉 DONATE TOKEN DEPLOYMENT COMPLETED SUCCESSFULLY!');
    console.log('=================================================');
    
    console.log('\n📋 IMMEDIATE ACTION ITEMS:');
    console.log('1. ✅ Contract deployed and verified');
    console.log('2. ✅ Backups created');
    console.log('3. ⚠️  BACKUP YOUR WALLET SEED PHRASES NOW!');
    console.log('4. ⚠️  Store backups in multiple secure locations');
    console.log('5. ⚠️  Test contract functions before going live');
    
    console.log('\n💾 BACKUP FILES CREATED:');
    console.log(`- ${backupFiles.backupFile}`);
    console.log(`- ${backupFiles.summaryFile}`);
    
    console.log('\n🔐 SECURITY CHECKLIST:');
    console.log('□ Wallet seed phrases backed up');
    console.log('□ Private keys secured');
    console.log('□ Hardware wallets configured');
    console.log('□ Emergency wallet secured');
    console.log('□ Team members notified');
    console.log('□ Contract functions tested');
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('1. Test the contract on frontend');
    console.log('2. Run ICO simulation');
    console.log('3. Set up monitoring');
    console.log('4. Prepare marketing materials');
    console.log('5. Plan public launch');
    
    console.log('\n⚠️  CRITICAL REMINDERS:');
    console.log('- NEVER share private keys or seed phrases');
    console.log('- Use multi-signature wallets for team funds');
    console.log('- Keep emergency wallet completely separate');
    console.log('- Regular security audits recommended');
  }
}

// Main deployment function
async function main() {
  const deployment = new SecureDeployment();
  
  try {
    // Pre-deployment checks
    await deployment.preDeploymentChecks();
    
    // Deploy contract
    const contract = await deployment.deployContract();
    
    // Verify deployment
    const verified = await deployment.verifyDeployment(contract);
    if (!verified) {
      throw new Error('Contract verification failed');
    }
    
    // Create backups
    const backupFiles = await deployment.createBackup(contract);
    
    // Update frontend
    await deployment.updateFrontendConfig(contract);
    
    // Print final instructions
    deployment.printFinalInstructions(backupFiles);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Export for testing
module.exports = { SecureDeployment, DEPLOYMENT_CONFIG };

// Run deployment if called directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}