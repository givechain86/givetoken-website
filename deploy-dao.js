// DAO Governance Deployment Script for GiveToken
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const DEPLOYMENT_CONFIG = {
  network: 'polygon',
  timelockDelay: 48 * 3600, // 48 hours in seconds (as per whitepaper)
  
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

class DAODeployment {
  constructor() {
    this.deploymentData = {
      timestamp: new Date().toISOString(),
      network: DEPLOYMENT_CONFIG.network,
      contracts: {}
    };
  }

  async deployDAO() {
    console.log('🏛️  Deploying GiveToken DAO Governance System...');
    console.log('================================================');
    
    const [deployer] = await ethers.getSigners();
    console.log(`👤 Deployer: ${deployer.address}`);
    
    // Step 1: Deploy GiveToken (if not already deployed)
    console.log('\n📝 Step 1: Deploying GiveToken...');
    const GiveToken = await ethers.getContractFactory('GiveToken');
    const giveToken = await GiveToken.deploy(
      DEPLOYMENT_CONFIG.companyWallet, // charity
      DEPLOYMENT_CONFIG.companyWallet, // team
      DEPLOYMENT_CONFIG.companyWallet  // community
    );
    await giveToken.deployed();
    console.log(`✅ GiveToken deployed: ${giveToken.address}`);
    this.deploymentData.contracts.giveToken = giveToken.address;
    
    // Step 2: Deploy TimelockController
    console.log('\n⏰ Step 2: Deploying TimelockController...');
    const TimelockController = await ethers.getContractFactory('TimelockController');
    const timelock = await TimelockController.deploy(
      DEPLOYMENT_CONFIG.timelockDelay,
      DEPLOYMENT_CONFIG.timelockProposers,
      DEPLOYMENT_CONFIG.timelockExecutors,
      deployer.address // admin (can be zero address for no admin)
    );
    await timelock.deployed();
    console.log(`✅ TimelockController deployed: ${timelock.address}`);
    console.log(`   Timelock delay: ${DEPLOYMENT_CONFIG.timelockDelay / 3600} hours`);
    this.deploymentData.contracts.timelock = timelock.address;
    
    // Step 3: Deploy Governance Contract
    console.log('\n🗳️  Step 3: Deploying GiveTokenGovernance...');
    const GiveTokenGovernance = await ethers.getContractFactory('GiveTokenGovernance');
    const governance = await GiveTokenGovernance.deploy(
      giveToken.address,
      timelock.address
    );
    await governance.deployed();
    console.log(`✅ GiveTokenGovernance deployed: ${governance.address}`);
    this.deploymentData.contracts.governance = governance.address;
    
    // Step 4: Grant roles
    console.log('\n🔐 Step 4: Setting up roles...');
    
    // Grant PROPOSER role to governance contract
    const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
    await timelock.grantRole(PROPOSER_ROLE, governance.address);
    console.log('✅ Granted PROPOSER role to governance contract');
    
    // Grant EXECUTOR role to governance contract
    const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
    await timelock.grantRole(EXECUTOR_ROLE, governance.address);
    console.log('✅ Granted EXECUTOR role to governance contract');
    
    // Grant CANCELLER role to governance contract (optional)
    const CANCELLER_ROLE = await timelock.CANCELLER_ROLE();
    await timelock.grantRole(CANCELLER_ROLE, governance.address);
    console.log('✅ Granted CANCELLER role to governance contract');
    
    // Step 5: Transfer ownership of GiveToken to Timelock (optional but recommended)
    console.log('\n👑 Step 5: Transferring GiveToken ownership to Timelock...');
    await giveToken.transferOwnership(timelock.address);
    console.log('✅ GiveToken ownership transferred to Timelock');
    console.log('   All GiveToken admin functions now require DAO proposals');
    
    // Step 6: Save deployment info
    await this.saveDeploymentInfo(giveToken, timelock, governance);
    
    // Step 7: Print summary
    this.printSummary(giveToken, timelock, governance);
    
    return { giveToken, timelock, governance };
  }

  async saveDeploymentInfo(giveToken, timelock, governance) {
    const deploymentDir = path.join(__dirname, 'deployments');
    if (!fs.existsSync(deploymentDir)) {
      fs.mkdirSync(deploymentDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const file = path.join(deploymentDir, `dao-deployment-${timestamp}.json`);
    
    const data = {
      ...this.deploymentData,
      governance: {
        votingDelay: '1 day',
        votingPeriod: '7 days (default)',
        proposalThreshold: '1M GIVE',
        quorum: '5%',
        timelockDelay: '48 hours'
      },
      proposalCategories: {
        PlatformUpgrade: {
          threshold: '1M GIVE',
          votingPeriod: '7 days',
          approvalRequired: '50%'
        },
        CharityApproval: {
          threshold: '500K GIVE',
          votingPeriod: '5 days',
          approvalRequired: '66.67%'
        },
        EconomicPolicy: {
          threshold: '2M GIVE',
          votingPeriod: '10 days',
          approvalRequired: '75%'
        },
        Emergency: {
          threshold: '5M GIVE',
          votingPeriod: '2 days',
          approvalRequired: '50%'
        }
      }
    };
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`\n💾 Deployment info saved: ${file}`);
  }

  printSummary(giveToken, timelock, governance) {
    console.log('\n🎉 DAO DEPLOYMENT COMPLETE!');
    console.log('===========================');
    console.log(`\n📍 Contract Addresses:`);
    console.log(`   GiveToken: ${giveToken.address}`);
    console.log(`   TimelockController: ${timelock.address}`);
    console.log(`   GiveTokenGovernance: ${governance.address}`);
    
    console.log(`\n🗳️  Governance Features:`);
    console.log(`   ✅ 1 GIVE = 1 Vote`);
    console.log(`   ✅ Proposal categories with different thresholds`);
    console.log(`   ✅ 5% quorum requirement`);
    console.log(`   ✅ 48-hour timelock for execution`);
    console.log(`   ✅ Category-specific voting periods`);
    console.log(`   ✅ Category-specific approval requirements`);
    
    console.log(`\n📊 Proposal Thresholds:`);
    console.log(`   Platform Upgrades: 1M GIVE`);
    console.log(`   Charity Approval: 500K GIVE`);
    console.log(`   Economic Policy: 2M GIVE`);
    console.log(`   Emergency: 5M GIVE`);
    
    console.log(`\n🔗 Blockchain Explorer:`);
    const explorer = DEPLOYMENT_CONFIG.network === 'polygon' 
      ? 'https://polygonscan.com'
      : 'https://mumbai.polygonscan.com';
    console.log(`   ${explorer}/address/${governance.address}`);
    
    console.log(`\n🚀 Next Steps:`);
    console.log(`   1. Token holders can now create proposals`);
    console.log(`   2. Community votes on proposals`);
    console.log(`   3. Approved proposals execute after 48-hour timelock`);
    console.log(`   4. All GiveToken admin functions require DAO approval`);
  }
}

async function main() {
  const deployment = new DAODeployment();
  await deployment.deployDAO();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = { DAODeployment };