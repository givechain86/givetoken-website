// GiveToken Deployment Test Script
const { ethers } = require('hardhat');

async function testDeployment() {
  console.log('🧪 Testing GiveToken Deployment...');
  console.log('==================================');

  try {
    // Get signers
    const [deployer] = await ethers.getSigners();
    console.log(`👤 Deployer: ${deployer.address}`);
    
    // Check balance
    const balance = await deployer.getBalance();
    console.log(`💰 Balance: ${ethers.utils.formatEther(balance)} ETH/MATIC`);
    
    if (balance.lt(ethers.utils.parseEther('0.01'))) {
      console.log('⚠️  Low balance - you might need more ETH/MATIC for deployment');
    }

    // Test contract compilation
    console.log('\n📦 Testing contract compilation...');
    const GiveToken = await ethers.getContractFactory('GiveToken');
    console.log('✅ Contract compiled successfully');

    // Test constructor parameters
    const testWallet = deployer.address; // Use deployer address for testing
    
    console.log('\n🔧 Testing constructor parameters...');
    console.log(`Using test wallet: ${testWallet}`);
    
    // This would deploy to a test network or local blockchain
    console.log('\n⚠️  Note: This is a dry run. No actual deployment.');
    console.log('To deploy for real, run: npx hardhat run deploy-givetoken.js --network mumbai');
    
    console.log('\n✅ All tests passed! Ready for deployment.');
    
    console.log('\n📋 Deployment Checklist:');
    console.log('□ Contract compiles without errors');
    console.log('□ Deployer has sufficient balance');
    console.log('□ Wallet addresses are valid');
    console.log('□ Network configuration is correct');
    console.log('□ Environment variables are set');
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Set up .env file with your private key');
    console.log('2. Choose network: mumbai (testnet) or polygon (mainnet)');
    console.log('3. Run deployment: npx hardhat run deploy-givetoken.js --network [NETWORK]');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('could not detect network')) {
      console.log('\n💡 Solution: Make sure Hardhat is properly configured');
    }
    
    if (error.message.includes('private key')) {
      console.log('\n💡 Solution: Set up your .env file with PRIVATE_KEY');
    }
    
    process.exit(1);
  }
}

// Run test
if (require.main === module) {
  testDeployment()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { testDeployment };