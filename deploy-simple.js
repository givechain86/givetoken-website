// Simple DonateToken Deployment Script (No Hardhat Required)
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Contract ABI and Bytecode (we'll need to compile first)
const CONTRACT_CONFIG = {
  // Your company wallet
  companyWallet: '0xD78D706Ab222083436e0C200632D64d7f05e867a',
  
  // Network configuration
  networks: {
    polygon: {
      name: 'Polygon Mainnet',
      rpcUrl: 'https://polygon-rpc.com/',
      chainId: 137,
      gasPrice: '35000000000' // 35 gwei
    },
    mumbai: {
      name: 'Polygon Mumbai Testnet',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
      chainId: 80001,
      gasPrice: '35000000000' // 35 gwei
    }
  }
};

class SimpleDeployment {
  constructor(networkName = 'mumbai') {
    this.networkConfig = CONTRACT_CONFIG.networks[networkName];
    this.provider = new ethers.providers.JsonRpcProvider(this.networkConfig.rpcUrl);
    
    if (!process.env.PRIVATE_KEY) {
      throw new Error('PRIVATE_KEY not found in .env file');
    }
    
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    console.log(`🔑 Deploying from: ${this.wallet.address}`);
    console.log(`🌐 Network: ${this.networkConfig.name}`);
  }

  // Get contract bytecode and ABI from compiled artifacts
  getContractData() {
    try {
      // Try to read from Hardhat artifacts first
      const artifactPath = path.join(__dirname, 'artifacts/contracts/DonateToken.sol/DonateToken.json');
      if (fs.existsSync(artifactPath)) {
        const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
        return {
          abi: artifact.abi,
          bytecode: artifact.bytecode
        };
      }
      
      // If no artifacts, we need to compile manually
      throw new Error('Contract not compiled. Please compile first.');
      
    } catch (error) {
      console.error('❌ Error reading contract data:', error.message);
      console.log('\n💡 To compile the contract, run:');
      console.log('npx hardhat compile');
      console.log('\nOr use Remix IDE: https://remix.ethereum.org/');
      throw error;
    }
  }

  async checkBalance() {
    const balance = await this.provider.getBalance(this.wallet.address);
    const balanceEth = ethers.utils.formatEther(balance);
    
    console.log(`💰 Wallet Balance: ${balanceEth} ${this.networkConfig.chainId === 137 ? 'MATIC' : 'Test MATIC'}`);
    
    const minBalance = ethers.utils.parseEther('0.1');
    if (balance.lt(minBalance)) {
      throw new Error(`❌ Insufficient balance. Need at least 0.1 MATIC, have ${balanceEth}`);
    }
    
    return balance;
  }

  async deployContract() {
    console.log('\n🚀 Starting DonateToken deployment...');
    
    // Check balance
    await this.checkBalance();
    
    // Get contract data
    const { abi, bytecode } = this.getContractData();
    
    // Create contract factory
    const contractFactory = new ethers.ContractFactory(abi, bytecode, this.wallet);
    
    // Deploy contract
    console.log('📤 Sending deployment transaction...');
    
    const deployTx = await contractFactory.deploy(
      CONTRACT_CONFIG.companyWallet, // charity
      CONTRACT_CONFIG.companyWallet, // team
      CONTRACT_CONFIG.companyWallet, // community
      CONTRACT_CONFIG.companyWallet, // marketing
      CONTRACT_CONFIG.companyWallet, // liquidity
      CONTRACT_CONFIG.companyWallet, // emergency
      {
        gasPrice: this.networkConfig.gasPrice,
        gasLimit: 3000000
      }
    );
    
    console.log(`📋 Transaction Hash: ${deployTx.deployTransaction.hash}`);
    console.log('⏳ Waiting for confirmation...');
    
    // Wait for deployment
    await deployTx.deployed();
    
    console.log(`✅ DonateToken deployed to: ${deployTx.address}`);
    
    // Verify deployment
    await this.verifyDeployment(deployTx);
    
    // Save deployment info
    this.saveDeploymentInfo(deployTx);
    
    return deployTx;
  }

  async verifyDeployment(contract) {
    console.log('\n🔍 Verifying deployment...');
    
    try {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const totalSupply = await contract.totalSupply();
      const owner = await contract.owner();
      
      console.log(`✅ Token Name: ${name}`);
      console.log(`✅ Token Symbol: ${symbol}`);
      console.log(`✅ Total Supply: ${ethers.utils.formatEther(totalSupply)} ${symbol}`);
      console.log(`✅ Owner: ${owner}`);
      
      return true;
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return false;
    }
  }

  saveDeploymentInfo(contract) {
    const deploymentInfo = {
      network: this.networkConfig.name,
      chainId: this.networkConfig.chainId,
      contractAddress: contract.address,
      transactionHash: contract.deployTransaction.hash,
      deployer: this.wallet.address,
      companyWallet: CONTRACT_CONFIG.companyWallet,
      timestamp: new Date().toISOString(),
      blockNumber: contract.deployTransaction.blockNumber
    };
    
    const filename = `deployment-${this.networkConfig.chainId}-${Date.now()}.json`;
    const filepath = path.join(__dirname, 'deployments', filename);
    
    // Create deployments directory if it doesn't exist
    const deploymentsDir = path.join(__dirname, 'deployments');
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir);
    }
    
    fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));
    console.log(`💾 Deployment info saved: ${filepath}`);
    
    // Update frontend config
    this.updateFrontendConfig(contract.address);
    
    return deploymentInfo;
  }

  updateFrontendConfig(contractAddress) {
    try {
      const configPath = path.join(__dirname, 'src/utils/web3.js');
      let config = fs.readFileSync(configPath, 'utf8');
      
      // Update contract address
      config = config.replace(
        /address:\s*"0x[a-fA-F0-9]{40}"/,
        `address: "${contractAddress}"`
      );
      
      fs.writeFileSync(configPath, config);
      console.log('✅ Frontend config updated with new contract address');
      
    } catch (error) {
      console.error('❌ Failed to update frontend config:', error.message);
      console.log(`⚠️  Please manually update contract address to: ${contractAddress}`);
    }
  }

  printInstructions(contract) {
    console.log('\n🎉 DEPLOYMENT SUCCESSFUL!');
    console.log('========================');
    console.log(`🏷️  Contract: DonateToken (DONATE)`);
    console.log(`📍 Address: ${contract.address}`);
    console.log(`🌐 Network: ${this.networkConfig.name}`);
    console.log(`👤 Owner: ${this.wallet.address}`);
    console.log(`🏢 Company Wallet: ${CONTRACT_CONFIG.companyWallet}`);
    
    console.log('\n📊 Token Distribution:');
    console.log('- Charity: 350M DONATE (35%)');
    console.log('- Team: 150M DONATE (15%)');
    console.log('- Community: 150M DONATE (15%)');
    console.log('- Marketing: 70M DONATE (7%)');
    console.log('- Liquidity: 80M DONATE (8%)');
    console.log('- ICO: 200M DONATE (20%) - in contract');
    
    console.log('\n🔗 Blockchain Explorer:');
    if (this.networkConfig.chainId === 137) {
      console.log(`https://polygonscan.com/address/${contract.address}`);
    } else {
      console.log(`https://mumbai.polygonscan.com/address/${contract.address}`);
    }
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Test the contract functions');
    console.log('2. Update your website with the new contract');
    console.log('3. Start your ICO!');
  }
}

// Main function
async function main() {
  try {
    // Get network from command line argument
    const network = process.argv[2] || 'mumbai';
    
    if (!['mumbai', 'polygon'].includes(network)) {
      throw new Error('Invalid network. Use: mumbai or polygon');
    }
    
    console.log(`🔧 DonateToken Simple Deployment`);
    console.log(`Network: ${network}`);
    
    const deployment = new SimpleDeployment(network);
    const contract = await deployment.deployContract();
    deployment.printInstructions(contract);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { SimpleDeployment };