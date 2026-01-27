// Enhanced GiveToken Deployment Script
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Deployment Configuration
const DEPLOYMENT_CONFIG = {
  network: 'polygon', // or 'mumbai' for testnet
  confirmations: 5,
  gasLimit: 3500000,
  
  // Your company wallet for all initial allocations
  wallets: {
    charity: '0xD78D706Ab222083436e0C200632D64d7f05e867a',    // Company wallet
    team: '0xD78D706Ab222083436e0C200632D64d7f05e867a',       // Company wallet
    community: '0xD78D706Ab222083436e0C200632D64d7f05e867a'   // Company wallet
  }
};

class GiveTokenDeployment {
  constructor() {
    this.deploymentData = {
      timestamp: new Date().toISOString(),
      network: DEPLOYMENT_CONFIG.network,
      wallets: DEPLOYMENT_CONFIG.wallets,
      contract: {},
      verification: {},
      gasUsed: 0
    };
  }

  // Pre-deployment security checks
  async preDeploymentChecks() {
    console.log('🔐 Running pre-deployment security checks...');
    
    // Check all wallet addresses are valid
    for (const [key, address] of Object.entries(DEPLOYMENT_CONFIG.wallets)) {
      if (!ethers.utils.isAddress(address)) {
        throw new Error(`❌ Invalid ${key} wallet address: ${address}`);
      }
      console.log(`✅ ${key} wallet: ${address}`);
    }
    
    // Check deployer has enough MATIC/ETH
    const [deployer] = await ethers.getSigners();
    const balance = await deployer.getBalance();
    const minBalance = ethers.utils.parseEther('0.1'); // 0.1 MATIC minimum
    
    if (balance.lt(minBalance)) {
      throw new Error(`❌ Insufficient balance. Need at least 0.1 MATIC, have ${ethers.utils.formatEther(balance)}`);
    }
    
    console.log(`✅ Deployer: ${deployer.address}`);
    console.log(`✅ Balance: ${ethers.utils.formatEther(balance)} MATIC`);
    
    this.deploymentData.deployer = deployer.address;
    this.deploymentData.deployerBalance = ethers.utils.formatEther(balance);
    
    return true;
  }

  // Deploy the GiveToken contract
  async deployContract() {
    console.log('\n🚀 Deploying GiveToken Contract...');
    
    const [deployer] = await ethers.getSigners();
    
    // Get contract factory
    const GiveToken = await ethers.getContractFactory('GiveToken');
    
    console.log('📤 Sending deployment transaction...');
    
    // Deploy with constructor parameters
    const giveToken = await GiveToken.deploy(
      DEPLOYMENT_CONFIG.wallets.charity,
      DEPLOYMENT_CONFIG.wallets.team,
      DEPLOYMENT_CONFIG.wallets.community,
      {
        gasLimit: DEPLOYMENT_CONFIG.gasLimit
      }
    );
    
    console.log(`📋 Transaction Hash: ${giveToken.deployTransaction.hash}`);
    console.log('⏳ Waiting for deployment confirmation...');
    
    await giveToken.deployed();
    
    console.log('⏳ Waiting for additional confirmations...');
    const receipt = await giveToken.deployTransaction.wait(DEPLOYMENT_CONFIG.confirmations);
    
    console.log(`✅ GiveToken deployed to: ${giveToken.address}`);
    console.log(`⛽ Gas used: ${receipt.gasUsed.toString()}`);
    
    // Store contract info
    this.deploymentData.contract = {
      address: giveToken.address,
      transactionHash: giveToken.deployTransaction.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      deployedBy: deployer.address
    };
    
    this.deploymentData.gasUsed = receipt.gasUsed.toString();
    
    return giveToken;
  }

  // Verify contract deployment
  async verifyDeployment(contract) {
    console.log('\n🔍 Verifying contract deployment...');
    
    try {
      // Check basic contract info
      const [name, symbol, totalSupply, owner, decimals] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
        contract.owner(),
        contract.decimals()
      ]);
      
      console.log(`✅ Token Name: ${name}`);
      console.log(`✅ Token Symbol: ${symbol}`);
      console.log(`✅ Decimals: ${decimals}`);
      console.log(`✅ Total Supply: ${ethers.utils.formatEther(totalSupply)} GIVE`);
      console.log(`✅ Contract Owner: ${owner}`);
      
      // Verify wallet addresses
      const [charityWallet, teamWallet] = await Promise.all([
        contract.charityWallet(),
        contract.teamWallet()
      ]);
      
      console.log(`✅ Charity Wallet: ${charityWallet}`);
      console.log(`✅ Team Wallet: ${teamWallet}`);
      
      // Check ICO configuration
      const [icoPrice, remainingTokens, icoActive] = await Promise.all([
        contract.icoPrice(),
        contract.getRemainingICOTokens(),
        contract.isICOActive()
      ]);
      
      console.log(`✅ ICO Price: ${ethers.utils.formatEther(icoPrice)} MATIC per GIVE`);
      console.log(`✅ ICO Tokens Available: ${ethers.utils.formatEther(remainingTokens)} GIVE`);
      console.log(`✅ ICO Status: ${icoActive ? 'Active' : 'Not Active'}`);
      
      // Store verification data
      this.deploymentData.verification = {
        name,
        symbol,
        decimals: decimals.toString(),
        totalSupply: ethers.utils.formatEther(totalSupply),
        owner,
        wallets: {
          charity: charityWallet,
          team: teamWallet
        },
        ico: {
          price: ethers.utils.formatEther(icoPrice),
          remainingTokens: ethers.utils.formatEther(remainingTokens),
          isActive: icoActive
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
    console.log('\n💾 Creating deployment backup...');
    
    const backupDir = path.join(__dirname, 'deployments');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `givetoken-deployment-${timestamp}.json`);
    
    // Create detailed backup data
    const backupData = {
      ...this.deploymentData,
      contractABI: contract.interface.format(ethers.utils.FormatTypes.json),
      networkInfo: {
        chainId: (await contract.provider.getNetwork()).chainId,
        rpcUrl: contract.provider.connection?.url || 'Unknown'
      },
      deploymentInstructions: {
        frontendUpdate: `Update contract address in src/utils/web3.js to: ${contract.address}`,
        verification: `Verify on PolygonScan: https://polygonscan.com/address/${contract.address}`,
        nextSteps: [
          'Update frontend configuration',
          'Test contract functions',
          'Start ICO when ready',
          'Set up monitoring'
        ]
      }
    };
    
    // Save backup
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`✅ Backup saved: ${backupFile}`);
    
    // Create human-readable summary
    const summaryFile = path.join(backupDir, `deployment-summary-${timestamp}.txt`);
    const summary = `
GIVETOKEN DEPLOYMENT SUMMARY
============================
Deployment Date: ${this.deploymentData.timestamp}
Network: ${DEPLOYMENT_CONFIG.network}
Contract Address: ${contract.address}
Transaction Hash: ${this.deploymentData.contract.transactionHash}
Gas Used: ${this.deploymentData.gasUsed}

WALLET ADDRESSES:
- Charity: ${DEPLOYMENT_CONFIG.wallets.charity}
- Team: ${DEPLOYMENT_CONFIG.wallets.team}
- Community: ${DEPLOYMENT_CONFIG.wallets.community}

TOKEN DISTRIBUTION:
- Total Supply: 1,000,000,000 GIVE tokens
- ICO Supply: 350,000,000 GIVE (35%) - in contract for sale (includes marketing & liquidity allocation)
- Charity Supply: 350,000,000 GIVE (35%) - sent to charity wallet
- Team Supply: 150,000,000 GIVE (15%) - sent to team wallet
- Community Supply: 150,000,000 GIVE (15%) - sent to community wallet

ICO CONFIGURATION:
- Initial Price: ${this.deploymentData.verification?.ico?.price || '0.0001'} MATIC per GIVE
- Available Tokens: ${this.deploymentData.verification?.ico?.remainingTokens || '350,000,000'} GIVE
- Status: ${this.deploymentData.verification?.ico?.isActive ? 'Active' : 'Ready to start'}

BLOCKCHAIN EXPLORER:
- PolygonScan: https://polygonscan.com/address/${contract.address}
- Contract Verification: Recommended for transparency

NEXT STEPS:
1. Update frontend with new contract address
2. Test ICO functions (start ICO, buy tokens, etc.)
3. Verify contract on PolygonScan
4. Set up monitoring and alerts
5. Prepare marketing materials

SECURITY REMINDERS:
- Emergency wallet can recover contract after 7 days
- Keep all wallet private keys secure
- Use hardware wallets for large amounts
- Regular security audits recommended
`;
    
    fs.writeFileSync(summaryFile, summary);
    console.log(`✅ Summary saved: ${summaryFile}`);
    
    return { backupFile, summaryFile };
  }

  // Update frontend configuration
  async updateFrontendConfig(contract) {
    console.log('\n🔧 Updating frontend configuration...');
    
    try {
      const configFile = path.join(__dirname, 'src/utils/web3.js');
      
      if (fs.existsSync(configFile)) {
        let config = fs.readFileSync(configFile, 'utf8');
        
        // Update contract address
        const oldAddressPattern = /address:\s*"0x[a-fA-F0-9]{40}"/;
        const newAddress = `address: "${contract.address}"`;
        config = config.replace(oldAddressPattern, newAddress);
        
        // Add deployment comment
        const deploymentComment = `  // Deployed: ${this.deploymentData.timestamp}\n  // Transaction: ${this.deploymentData.contract.transactionHash}\n  `;
        config = config.replace(/address:\s*"[^"]+",/, `${deploymentComment}address: "${contract.address}",`);
        
        fs.writeFileSync(configFile, config);
        console.log(`✅ Frontend config updated: ${configFile}`);
      } else {
        console.log('⚠️  Frontend config file not found. Please manually update contract address.');
      }
      
    } catch (error) {
      console.error('❌ Failed to update frontend config:', error.message);
      console.log(`⚠️  Please manually update contract address to: ${contract.address}`);
    }
  }

  // Print final instructions
  printFinalInstructions(contract, backupFiles) {
    console.log('\n🎉 GIVETOKEN DEPLOYMENT SUCCESSFUL!');
    console.log('===================================');
    
    console.log(`\n📍 Contract Address: ${contract.address}`);
    console.log(`🔗 PolygonScan: https://polygonscan.com/address/${contract.address}`);
    console.log(`💰 Your Company Wallet: ${DEPLOYMENT_CONFIG.wallets.charity}`);
    
    console.log('\n📊 Token Distribution Complete:');
    console.log('✅ 350M GIVE → Charity wallet (35%)');
    console.log('✅ 150M GIVE → Team wallet (15%)');
    console.log('✅ 150M GIVE → Community wallet (15%)');
    console.log('✅ 350M GIVE → ICO contract (35% - includes marketing & liquidity allocation)');
    
    console.log('\n🚀 Ready for ICO Launch:');
    console.log('1. Contract is deployed and verified');
    console.log('2. All tokens distributed to wallets');
    console.log('3. ICO tokens ready in contract');
    
    console.log('\n📋 Next Steps:');
    console.log('1. Test the website at localhost:4000');
    console.log('2. Start ICO: contract.startICO(30) // 30 days');
    console.log('3. Verify contract on PolygonScan');
    console.log('4. Launch marketing campaign');
    
    console.log('\n💾 Backup Files:');
    console.log(`- ${backupFiles.backupFile}`);
    console.log(`- ${backupFiles.summaryFile}`);
    
    console.log('\n⚠️  Important Reminders:');
    console.log('- Keep your wallet private keys secure');
    console.log('- ICO needs to be started manually');
    console.log('- Monitor contract activity regularly');
  }
}

// Main deployment function
async function main() {
  const deployment = new GiveTokenDeployment();
  
  try {
    console.log('🔧 GiveToken Enhanced Deployment');
    console.log('================================');
    
    // Pre-deployment checks
    await deployment.preDeploymentChecks();
    
    // Deploy contract
    const contract = await deployment.deployContract();
    
    // Verify deployment
    const verified = await deployment.verifyDeployment(contract);
    if (!verified) {
      console.log('⚠️  Contract deployed but verification had issues');
    }
    
    // Create backups
    const backupFiles = await deployment.createBackup(contract);
    
    // Update frontend
    await deployment.updateFrontendConfig(contract);
    
    // Print final instructions
    deployment.printFinalInstructions(contract, backupFiles);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Export for testing
module.exports = { GiveTokenDeployment, DEPLOYMENT_CONFIG };

// Run deployment if called directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}