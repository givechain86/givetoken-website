import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers'; // Temporarily commented for build

const QuickSwapIntegration = ({ tokenAddress = "YOUR_GIVE_TOKEN_ADDRESS" }) => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [tokenBalance, setTokenBalance] = useState('0');
  const [maticBalance, setMaticBalance] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // QuickSwap URLs
  const quickSwapUrls = {
    trade: `https://quickswap.exchange/#/swap?outputCurrency=${tokenAddress}`,
    addLiquidity: `https://quickswap.exchange/#/add/ETH/${tokenAddress}`,
    analytics: `https://info.quickswap.exchange/token/${tokenAddress}`
  };

  // Polygon network configuration
  const polygonConfig = {
    chainId: '0x89', // 137 in hex
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com/'],
  };

  useEffect(() => {
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await updateBalances(accounts[0]);
          await checkNetwork();
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      updateBalances(accounts[0]);
    } else {
      setAccount(null);
      setTokenBalance('0');
      setMaticBalance('0');
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await switchToPolygon();
        await updateBalances(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: polygonConfig.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [polygonConfig],
          });
        } catch (addError) {
          console.error('Error adding Polygon network:', addError);
          setError('Failed to add Polygon network. Please add it manually.');
        }
      } else {
        console.error('Error switching to Polygon:', switchError);
        setError('Please switch to Polygon network in MetaMask.');
      }
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setNetwork(chainId === polygonConfig.chainId ? 'Polygon' : 'Wrong Network');
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  const updateBalances = async (userAddress) => {
    try {
      // TODO: Re-enable when ethers is properly configured
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Mock balances for now
      setMaticBalance('2.45');
      setTokenBalance('22500');
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  const addTokenToWallet = async () => {
    if (!window.ethereum || !tokenAddress || tokenAddress === "YOUR_GIVE_TOKEN_ADDRESS") {
      setError('Token address not configured or MetaMask not available.');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: 'GIVE',
            decimals: 18,
            image: 'https://givetoken.org/logo.png', // Add your token logo URL
          },
        },
      });
    } catch (error) {
      console.error('Error adding token to wallet:', error);
      setError('Failed to add token to wallet.');
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '30px', 
        color: '#fbbf24',
        textAlign: 'center'
      }}>
        🚀 Trade GIVE on QuickSwap
      </h3>

      {!account ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            Connect your wallet to start trading GIVE tokens on QuickSwap DEX
          </p>
          <button
            onClick={connectWallet}
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: loading ? '#6b7280' : 'linear-gradient(45deg, #10b981, #fbbf24)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'Connecting...' : '🦊 Connect MetaMask'}
          </button>
        </div>
      ) : (
        <>
          {/* Wallet Info */}
          <div style={{ 
            marginBottom: '25px', 
            padding: '15px', 
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              <p><strong>Connected:</strong> {account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
              <p><strong>Network:</strong> {network || 'Loading...'}</p>
              <p><strong>MATIC Balance:</strong> {parseFloat(maticBalance).toFixed(4)} MATIC</p>
              <p><strong>GIVE Balance:</strong> {parseFloat(tokenBalance).toFixed(2)} GIVE</p>
            </div>
          </div>

          {/* Network Warning */}
          {network !== 'Polygon' && (
            <div style={{
              marginBottom: '20px',
              padding: '15px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ color: '#ef4444', fontWeight: 'bold' }}>
                ⚠️ Please switch to Polygon network to trade GIVE tokens
              </p>
              <button
                onClick={switchToPolygon}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Switch to Polygon
              </button>
            </div>
          )}

          {/* Trading Actions */}
          <div style={{ display: 'grid', gap: '15px' }}>
            
            {/* Buy GIVE Tokens */}
            <a
              href={quickSwapUrls.trade}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '15px',
                borderRadius: '10px',
                background: 'linear-gradient(45deg, #10b981, #059669)',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 'bold',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              💰 Buy GIVE Tokens on QuickSwap
            </a>
          </div>
        </>
      )}

      {error && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {/* Contract Info */}
      {tokenAddress && tokenAddress !== "YOUR_GIVE_TOKEN_ADDRESS" && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          fontSize: '0.9rem'
        }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Contract Address:</div>
          <div style={{
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            cursor: 'pointer',
            color: '#fbbf24'
          }} onClick={() => {
            navigator.clipboard.writeText(tokenAddress);
            alert('Contract address copied to clipboard!');
          }}>
            {tokenAddress} 📋
          </div>
        </div>
      )}

      {/* Trading Info */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(251, 191, 36, 0.1)',
        borderRadius: '10px',
        border: '1px solid rgba(251, 191, 36, 0.3)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#fbbf24' }}>
          💡 Trading Tips
        </div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: '1.5' }}>
          • Always check slippage tolerance before trading<br/>
          • Start with small amounts to test the process<br/>
          • Ensure you have enough MATIC for gas fees<br/>
          • Consider providing liquidity to earn trading fees
        </div>
      </div>
    </div>
  );
};

export default QuickSwapIntegration;


