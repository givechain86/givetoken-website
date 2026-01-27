// DAO Governance Deployment Script for GiveToken - MAINNET
// Use this if you already have GiveToken deployed
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const DEPLOYMENT_CONFIG = {
  network: 'polygon', // Polygon Mainnet
  timelockDelay: 48 * 3600, // 48 hours in seconds
  
  // Your deployed GiveToken address (UPDATE THIS!)
  giveTokenAddress: 'YOUR_DEPLOYED_GIVETOKEN_ADDRESS_HERE',
  
  // Your company wallet
  companyWallet: '0xD78D706Ab222083436e0C200632D64d7f05e867a',
  
  // Timelock executors (who can execute proposals after timelock)
  timelockExecutors: [
    '0xD78D706Ab222083436e0C200632D64d7f05e867a' // Company wallet
  ],
  
  // Timelock proposers (who can create timelock operations)
  timelockProposers: [
    '0xD78D706Ab222083436e0C200632D64d7f05e867a' // Company wallet
  ],
  
  // Timelock admins (who can manage timelock)
  timelockAdmins: [
    '0xD78D706Ab222083436e0C200632D64d7f05e867a' // Company wallet
  ]
};

class MainnetDAODeployment {
  constructor() {
    this.deploymentData = {
      timestamp: new Date().toISOString(),
      network: 'Polygon Mainnet',
      existingToken: DEPLOYMENT_CONFIG.giveTokenAddress,
      contracts: {}
    };
  }

  async verifyGiveToken() {
    console.log('🔍 Verifying existing GiveToken contract...');
    
    if (DEPLOYMENT_CONFIG.giveTokenAddress === 'YOUR_DEPLOYED_GIVETOKEN_ADDRESS_HERE') {
      throw new Error('❌ Please update giveTokenAddress in DEPLOYMENT_CONFIG!');
    }
    
    const [deployer] = await ethers.getSigners();
    const giveToken = await ethers.getContractAt('GiveToken', DEPLOYMENT_CONFIG.giveTokenAddress);
    
    // Verify it's a valid contract
    try {
      const name = await giveToken.name();
      const symbol = await giveToken.symbol();
      const totalSupply = await giveToken.totalSupply();
      
      console.log(`✅ GiveToken verified:`);
      console.log(`   Name: ${name}`);
      console.log(`   Symbol: ${symbol}`);
      console.log(`   Total Supply: ${ethers.utils.formatEther(totalSupply)} ${symbol}`);
      console.log(`   Address: ${DEPLOYMENT_CONFIG.giveTokenAddress}`);
      
      // Check if it supports voting
      try {
        const votes = await giveToken.getPastVotes(deployer.address, await ethers.provider.getBlockNumber() - 1);
        console.log(`   ✅ Voting support: Yes (${ethers.utils.formatEther(votes)} votes)`);
      } catch (e) {
        console.log(`   ⚠️  Warning: Contract may not support voting`);
      }
      
      return giveToken;
    } catch (error) {
      throw new Error(`❌ Invalid GiveToken contract at ${DEPLOYMENT_CONFIG.giveTokenAddress}: ${error.message}`);
    }
  }

  async deployTimelockController() {
    console.log('\n⏰ Step 1: Deploying TimelockController...');
    
    const [deployer] = await ethers.getSigners();
    const TimelockController = await ethers.getContractFactory('TimelockController');
    
    console.log(`   Deployer: ${deployer.address}`);
    console.log(`   Min Delay: ${DEPLOYMENT_CONFIG.timelockDelay / 3600} hours`);
    
    const timelock = await TimelockController.deploy(
      DEPLOYMENT_CONFIG.timelockDelay,
      DEPLOYMENT_CONFIG.timelockProposers,
      DEPLOYMENT_CONFIG.timelockExecutors,
      deployer.address // admin
    );
    
    await timelock.deployed();
    console.log(`✅ TimelockController deployed: ${timelock.address}`);
    
    this.deploymentData.contracts.timelock = timelock.address;
    return timelock;
  }

  async deployGovernance(timelock) {
    console.log('\n🗳️  Step 2: Deploying GiveTokenGovernance...');
    
    const [deployer] = await ethers.getSigners();
    const giveToken = await ethers.getContractAt('GiveToken', DEPLOYMENT_CONFIG.giveTokenAddress);
    
    const GiveTokenGovernance = await ethers.getContractFactory('GiveTokenGovernance');
    const governance = await GiveTokenGovernance.deploy(
      giveToken.address,
      timelock.address
    );
    
    await governance.deployed();
    console.log(`✅ GiveTokenGovernance deployed: ${governance.address}`);
    
    this.deploymentData.contracts.governance = governance.address;
    return governance;
  }

  async setupRoles(timelock, governance) {
    console.log('\n🔐 Step 3: Setting up roles...');
    
    // Grant PROPOSER role to governance contract
    const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
    const tx1 = await timelock.grantRole(PROPOSER_ROLE, governance.address);
    await tx1.wait();
    console.log('✅ Granted PROPOSER role to governance contract');
    
    // Grant EXECUTOR role to governance contract
    const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
    const tx2 = await timelock.grantRole(EXECUTOR_ROLE, governance.address);
    await tx2.wait();
    console.log('✅ Granted EXECUTOR role to governance contract');
    
    // Grant CANCELLER role to governance contract
    const CANCELLER_ROLE = await timelock.CANCELLER_ROLE();
    const tx3 = await timelock.grantRole(CANCELLER_ROLE, governance.address);
    await tx3.wait();
    console.log('✅ Granted CANCELLER role to governance contract');
  }

  async transferOwnership(giveToken, timelock) {
    console.log('\n👑 Step 4: Transferring GiveToken ownership to Timelock...');
    
    try {
      const currentOwner = await giveToken.owner();
      console.log(`   Current owner: ${currentOwner}`);
      
      if (currentOwner.toLowerCase() === timelock.address.toLowerCase()) {
        console.log('✅ Ownership already transferred to Timelock');
        return;
      }
      
      const tx = await giveToken.transferOwnership(timelock.address);
      await tx.wait();
      console.log('✅ GiveToken ownership transferred to Timelock');
      console.log('   All admin functions now require DAO proposals');
    } catch (error) {
      console.error('⚠️  Could not transfer ownership:', error.message);
      console.log('   You may need to transfer ownership manually');
    }
  }

  async saveDeploymentInfo(giveToken, timelock, governance) {
    const deploymentDir = path.join(__dirname, 'deployments');
    if (!fs.existsSync(deploymentDir)) {
      fs.mkdirSync(deploymentDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const file = path.join(deploymentDir, `dao-mainnet-${timestamp}.json`);
    
    const data = {
      ...this.deploymentData,
      deploymentInfo: {
        giveToken: DEPLOYMENT_CONFIG.giveTokenAddress,
        timelock: timelock.address,
        governance: governance.address,
        network: 'Polygon Mainnet',
        chainId: 137
      },
      explorer: {
        giveToken: `https://polygonscan.com/address/${DEPLOYMENT_CONFIG.giveTokenAddress}`,
        timelock: `https://polygonscan.com/address/${timelock.address}`,
        governance: `https://polygonscan.com/address/${governance.address}`
      }
    };
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`\n💾 Deployment info saved: ${file}`);
    
    return file;
  }

  printSummary(giveToken, timelock, governance) {
    console.log('\n🎉 DAO DEPLOYMENT COMPLETE ON POLYGON MAINNET!');
    console.log('================================================');
    
    console.log('\n📍 Contract Addresses:');
    console.log(`   GiveToken: ${DEPLOYMENT_CONFIG.giveTokenAddress}`);
    console.log(`   TimelockController: ${timelock.address}`);
    console.log(`   GiveTokenGovernance: ${governance.address}`);
    
    console.log('\n🔗 PolygonScan Links:');
    console.log(`   GiveToken: https://polygonscan.com/address/${DEPLOYMENT_CONFIG.giveTokenAddress}`);
    console.log(`   Timelock: https://polygonscan.com/address/${timelock.address}`);
    console.log(`   Governance: https://polygonscan.com/address/${governance.address}`);
    
    console.log('\n✅ Your DAO is now live on Polygon Mainnet!');
    console.log('\n🚀 Next Steps:');
    console.log('1. Update frontend with contract addresses');
    console.log('2. Verify contracts on PolygonScan');
    console.log('3. Create your first proposal');
    console.log('4. Start your ICO!');
  }
}

async function main() {
  const deployment = new MainnetDAODeployment();
  
  try {
    // Verify existing GiveToken
    const giveToken = await deployment.verifyGiveToken();
    
    // Deploy TimelockController
    const timelock = await deployment.deployTimelockController();
    
    // Deploy Governance
    const governance = await deployment.deployGovernance(timelock);
    
    // Set up roles
    await deployment.setupRoles(timelock, governance);
    
    // Transfer ownership
    await deployment.transferOwnership(giveToken, timelock);
    
    // Save deployment info
    await deployment.saveDeploymentInfo(giveToken, timelock, governance);
    
    // Print summary
    deployment.printSummary(giveToken, timelock, governance);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = { MainnetDAODeployment };