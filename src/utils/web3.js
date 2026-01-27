// Web3 utilities for GiveToken ICO
import { ethers } from 'ethers';

// Contract configuration
export const CONTRACT_CONFIG = {
  // GiveToken contract deployed on Polygon Mainnet
  address: "0xf45092BAddf17f6E4fBe18962814C90f8F983e34", // Deployed: Polygon Mainnet
  chainId: 137, // Polygon Mainnet
  chainName: "Polygon",
  rpcUrl: "https://polygon-rpc.com/",
  blockExplorer: "https://polygonscan.com",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  }
};

// Enhanced Contract ABI (Application Binary Interface)
export const CONTRACT_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function owner() view returns (address)",
  
  // ICO functions
  "function icoPrice() view returns (uint256)",
  "function icoTokensSold() view returns (uint256)",
  "function icoActive() view returns (bool)",
  "function icoStartTime() view returns (uint256)",
  "function icoEndTime() view returns (uint256)",
  "function minPurchase() view returns (uint256)",
  "function maxPurchase() view returns (uint256)",
  "function totalMaticRaised() view returns (uint256)",
  
  // Wallet functions
  "function charityWallet() view returns (address)",
  "function teamWallet() view returns (address)",
  "function communityWallet() view returns (address)",
  
  // Whitelist functions
  "function whitelist(address) view returns (bool)",
  "function whitelistEnabled() view returns (bool)",
  "function purchaseHistory(address) view returns (uint256)",
  
  // Write functions
  "function buyTokens() payable",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  
  // Admin functions (for contract owner)
  "function startICO(uint256 durationInDays)",
  "function endICO()",
  "function updatePrice(uint256 newPrice)",
  "function updatePurchaseLimits(uint256 minPurchase, uint256 maxPurchase)",
  "function setWhitelistEnabled(bool enabled)",
  "function updateWhitelist(address[] calldata users, bool status)",
  "function withdrawETH()",
  "function pause()",
  "function unpause()",
  
  // Events
  "event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event ICOStarted(uint256 startTime, uint256 endTime)",
  "event ICOEnded(uint256 totalSold, uint256 totalRaised)",
  "event PriceUpdated(uint256 newPrice)",
  "event WhitelistUpdated(address indexed user, bool status)"
];

// Web3 Provider Management
export class Web3Manager {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.account = null;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  // Connect to MetaMask
  async connectWallet() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your MetaMask wallet.');
      }

      // Set up provider and signer
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.account = accounts[0];

      // Check if we're on the correct network
      await this.checkNetwork();

      // Initialize contract
      this.contract = new ethers.Contract(
        CONTRACT_CONFIG.address,
        CONTRACT_ABI,
        this.signer
      );

      return {
        account: this.account,
        provider: this.provider,
        contract: this.contract
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  // Check and switch to Polygon network
  async checkNetwork() {
    const network = await this.provider.getNetwork();
    
    if (network.chainId !== CONTRACT_CONFIG.chainId) {
      try {
        // Try to switch to Polygon
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${CONTRACT_CONFIG.chainId.toString(16)}` }]
        });
      } catch (switchError) {
        // If network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${CONTRACT_CONFIG.chainId.toString(16)}`,
              chainName: CONTRACT_CONFIG.chainName,
              rpcUrls: [CONTRACT_CONFIG.rpcUrl],
              blockExplorerUrls: [CONTRACT_CONFIG.blockExplorer],
              nativeCurrency: CONTRACT_CONFIG.nativeCurrency
            }]
          });
        } else {
          throw switchError;
        }
      }
    }
  }

  // Get enhanced contract information
  async getContractInfo() {
    if (!this.contract) {
      throw new Error('Contract not initialized. Please connect wallet first.');
    }

    try {
      // Get basic info
      const [
        name,
        symbol,
        decimals,
        totalSupply,
        owner,
        whitelistEnabled
      ] = await Promise.all([
        this.contract.name(),
        this.contract.symbol(),
        this.contract.decimals(),
        this.contract.totalSupply(),
        this.contract.owner(),
        this.contract.whitelistEnabled()
      ]);

      // Get ICO information (individual calls since getICOStats was removed)
      const [
        icoPrice,
        icoTokensSold,
        totalMaticRaised,
        icoActive,
        icoStartTime,
        icoEndTime,
        charityWallet,
        teamWallet
      ] = await Promise.all([
        this.contract.icoPrice(),
        this.contract.icoTokensSold(),
        this.contract.totalMaticRaised(),
        this.contract.icoActive(),
        this.contract.icoStartTime(),
        this.contract.icoEndTime(),
        this.contract.charityWallet(),
        this.contract.teamWallet()
      ]);

      // Calculate remaining tokens (ICO_SUPPLY - icoTokensSold)
      const ICO_SUPPLY = ethers.BigNumber.from("350000000000000000000000000"); // 350M tokens
      const remainingTokens = ICO_SUPPLY.sub(icoTokensSold);
      
      // Check if ICO is currently active
      const currentTime = Math.floor(Date.now() / 1000);
      const isActive = icoActive && 
                       currentTime >= icoStartTime.toNumber() && 
                       currentTime <= icoEndTime.toNumber();

      return {
        // Basic token info
        name,
        symbol,
        decimals,
        totalSupply: ethers.utils.formatEther(totalSupply),
        owner,
        
        // ICO information
        icoTokensSold: ethers.utils.formatEther(icoTokensSold),
        remainingTokens: ethers.utils.formatEther(remainingTokens),
        totalEthRaised: ethers.utils.formatEther(totalMaticRaised),
        icoPrice: ethers.utils.formatEther(icoPrice),
        isActive: isActive,
        
        // Security features
        whitelistEnabled,
        
        // Wallet addresses
        wallets: {
          charity: charityWallet,
          team: teamWallet
        }
      };
    } catch (error) {
      console.error('Error getting contract info:', error);
      throw error;
    }
  }

  // Get user-specific information
  async getUserInfo(userAddress) {
    if (!this.contract) {
      throw new Error('Contract not initialized.');
    }

    try {
      const [
        tokenBalance,
        ethBalance,
        purchaseHistory,
        isWhitelisted
      ] = await Promise.all([
        this.contract.balanceOf(userAddress),
        this.provider.getBalance(userAddress),
        this.contract.purchaseHistory(userAddress),
        this.contract.whitelist(userAddress)
      ]);

      return {
        address: userAddress,
        tokenBalance: ethers.utils.formatEther(tokenBalance),
        ethBalance: ethers.utils.formatEther(ethBalance),
        totalPurchased: ethers.utils.formatEther(purchaseHistory),
        isWhitelisted
      };
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }

  // Calculate tokens for MATIC amount (calculated locally since function was removed)
  async calculateTokens(maticAmount) {
    if (!this.contract) {
      throw new Error('Contract not initialized.');
    }

    try {
      // Get ICO price from contract
      const icoPrice = await this.contract.icoPrice();
      const maticAmountWei = ethers.utils.parseEther(maticAmount.toString());
      
      // Calculate: tokens = (maticAmount * 10^18) / icoPrice
      const tokenAmount = maticAmountWei.mul(ethers.BigNumber.from(10).pow(18)).div(icoPrice);
      return ethers.utils.formatEther(tokenAmount);
    } catch (error) {
      console.error('Error calculating tokens:', error);
      throw error;
    }
  }

  // Purchase tokens
  async buyTokens(ethAmount) {
    if (!this.contract) {
      throw new Error('Contract not initialized. Please connect wallet first.');
    }

    try {
      const ethAmountWei = ethers.utils.parseEther(ethAmount.toString());
      
      // Estimate gas
      const gasEstimate = await this.contract.estimateGas.buyTokens({
        value: ethAmountWei
      });

      // Add 20% buffer to gas estimate
      const gasLimit = gasEstimate.mul(120).div(100);

      // Execute transaction
      const transaction = await this.contract.buyTokens({
        value: ethAmountWei,
        gasLimit: gasLimit
      });

      return {
        hash: transaction.hash,
        transaction
      };
    } catch (error) {
      console.error('Error buying tokens:', error);
      throw error;
    }
  }

  // Get user's token balance
  async getUserBalance(userAddress) {
    if (!this.contract) {
      throw new Error('Contract not initialized.');
    }

    try {
      const balance = await this.contract.balanceOf(userAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting user balance:', error);
      throw error;
    }
  }

  // Get user's ETH balance
  async getETHBalance(userAddress) {
    if (!this.provider) {
      throw new Error('Provider not initialized.');
    }

    try {
      const balance = await this.provider.getBalance(userAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting ETH balance:', error);
      throw error;
    }
  }

  // Listen for events
  listenForEvents(callback) {
    if (!this.contract) {
      throw new Error('Contract not initialized.');
    }

    // Listen for token purchases
    this.contract.on('TokensPurchased', (buyer, ethAmount, tokenAmount, event) => {
      callback({
        type: 'TokensPurchased',
        buyer,
        ethAmount: ethers.utils.formatEther(ethAmount),
        tokenAmount: ethers.utils.formatEther(tokenAmount),
        transactionHash: event.transactionHash
      });
    });

    // Listen for transfers
    this.contract.on('Transfer', (from, to, value, event) => {
      callback({
        type: 'Transfer',
        from,
        to,
        value: ethers.utils.formatEther(value),
        transactionHash: event.transactionHash
      });
    });
  }

  // Disconnect wallet
  disconnect() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.account = null;
  }
}

// Utility functions
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatNumber = (number, decimals = 2) => {
  return Number(number).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Export singleton instance
export const web3Manager = new Web3Manager();



