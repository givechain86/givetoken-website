import React, { useState, useEffect } from 'react';
import { web3Manager, formatNumber, formatAddress, formatCurrency } from '../utils/web3.js';

const ICOPurchase = () => {
  // State management
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [contractInfo, setContractInfo] = useState(null);
  const [userBalance, setUserBalance] = useState('0');
  const [ethBalance, setEthBalance] = useState('0');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [calculatedTokens, setCalculatedTokens] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const connection = await web3Manager.connectWallet();
      setAccount(connection.account);
      setIsConnected(true);
      
      // Load contract info and balances
      await loadContractData();
      await loadUserBalances(connection.account);
      
      setSuccess('Wallet connected successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Connection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load contract data
  const loadContractData = async () => {
    try {
      const info = await web3Manager.getContractInfo();
      setContractInfo(info);
    } catch (err) {
      console.error('Error loading contract data:', err);
      setError('Failed to load contract information');
    }
  };

  // Load user balances
  const loadUserBalances = async (userAddress) => {
    try {
      const [tokenBalance, ethBal] = await Promise.all([
        web3Manager.getUserBalance(userAddress),
        web3Manager.getETHBalance(userAddress)
      ]);
      
      setUserBalance(tokenBalance);
      setEthBalance(ethBal);
    } catch (err) {
      console.error('Error loading balances:', err);
    }
  };

  // Calculate tokens when purchase amount changes
  useEffect(() => {
    const calculateTokens = async () => {
      if (purchaseAmount && contractInfo && parseFloat(purchaseAmount) > 0) {
        try {
          const tokens = await web3Manager.calculateTokens(purchaseAmount);
          setCalculatedTokens(tokens);
        } catch (err) {
          console.error('Error calculating tokens:', err);
          setCalculatedTokens('0');
        }
      } else {
        setCalculatedTokens('0');
      }
    };

    calculateTokens();
  }, [purchaseAmount, contractInfo]);

  // Purchase tokens
  const purchaseTokens = async () => {
    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) {
      setError('Please enter a valid purchase amount');
      return;
    }

    if (!contractInfo) {
      setError('Contract information not loaded');
      return;
    }

    const amount = parseFloat(purchaseAmount);
    const minPurchase = parseFloat(contractInfo.minPurchase);
    const maxPurchase = parseFloat(contractInfo.maxPurchase);

    if (amount < minPurchase) {
      setError(`Minimum purchase is ${minPurchase} MATIC`);
      return;
    }

    if (amount > maxPurchase) {
      setError(`Maximum purchase is ${maxPurchase} MATIC`);
      return;
    }

    if (amount > parseFloat(ethBalance)) {
      setError('Insufficient MATIC balance');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const result = await web3Manager.buyTokens(purchaseAmount);
      setTransactionHash(result.hash);
      setSuccess(`Purchase successful! Transaction: ${result.hash}`);
      
      // Wait for transaction confirmation
      await result.transaction.wait();
      
      // Reload balances
      await loadUserBalances(account);
      await loadContractData();
      
      // Clear form
      setPurchaseAmount('');
      setCalculatedTokens('0');
      
    } catch (err) {
      setError(err.message || 'Purchase failed');
      console.error('Purchase error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    web3Manager.disconnect();
    setIsConnected(false);
    setAccount('');
    setContractInfo(null);
    setUserBalance('0');
    setEthBalance('0');
    setPurchaseAmount('');
    setCalculatedTokens('0');
    setError('');
    setSuccess('');
    setTransactionHash('');
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          color: '#fbbf24'
        }}>
          🚀 Purchase GIVE Tokens
        </h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Join the charitable revolution with GIVE tokens
        </p>
      </div>

      {/* Connection Status */}
      {!isConnected ? (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(45deg, #10b981, #fbbf24)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? '🔄 Connecting...' : '🦊 Connect MetaMask Wallet'}
          </button>
        </div>
      ) : (
        <div>
          {/* Account Info */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px' }}>
              Connected Account:
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {formatAddress(account)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <span>MATIC Balance: {formatNumber(ethBalance, 4)}</span>
              <span>GIVE Balance: {formatNumber(userBalance, 2)}</span>
            </div>
          </div>

          {/* Contract Info */}
          {contractInfo && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                ICO Status: {contractInfo.isActive ? '🟢 Active' : '🔴 Inactive'}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                <div>Price: {formatNumber(contractInfo.icoPrice, 6)} MATIC per GIVE</div>
                <div>Sold: {formatNumber(contractInfo.icoTokensSold)} GIVE</div>
                <div>Remaining: {formatNumber(contractInfo.remainingTokens)} GIVE</div>
              </div>
            </div>
          )}

          {/* Purchase Form */}
          {contractInfo && contractInfo.isActive && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Purchase Amount (MATIC):
                </label>
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  placeholder={`Min: ${contractInfo.minPurchase} MATIC`}
                  min={contractInfo.minPurchase}
                  max={contractInfo.maxPurchase}
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
                <div style={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.7, 
                  marginTop: '5px' 
                }}>
                  Min: {contractInfo.minPurchase} MATIC | Max: {contractInfo.maxPurchase} MATIC
                </div>
              </div>

              {/* Token Calculation */}
              {calculatedTokens !== '0' && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    You will receive: {formatNumber(calculatedTokens, 2)} GIVE tokens
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              <button
                onClick={purchaseTokens}
                disabled={isLoading || !purchaseAmount || parseFloat(purchaseAmount) <= 0}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isLoading || !purchaseAmount ? 
                    'rgba(255, 255, 255, 0.3)' : 
                    'linear-gradient(45deg, #10b981, #fbbf24)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: (isLoading || !purchaseAmount) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isLoading ? '⏳ Processing...' : '💰 Purchase GIVE Tokens'}
              </button>
            </div>
          )}

          {/* Disconnect Button */}
          <button
            onClick={disconnectWallet}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'transparent',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '15px',
              opacity: 0.7,
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.opacity = '1'}
            onMouseOut={(e) => e.target.style.opacity = '0.7'}
          >
            🔌 Disconnect Wallet
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '15px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '15px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#6ee7b7'
        }}>
          ✅ {success}
          {transactionHash && (
            <div style={{ marginTop: '8px' }}>
              <a 
                href={`https://polygonscan.com/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fbbf24', textDecoration: 'underline' }}
              >
                View on PolygonScan 🔗
              </a>
            </div>
          )}
        </div>
      )}

      {/* Info Footer */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        fontSize: '0.8rem',
        opacity: 0.8
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          ℹ️ Important Information:
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Ensure you're on Polygon network</li>
          <li>Keep some MATIC for transaction fees</li>
          <li>Transactions are irreversible</li>
          <li>GIVE tokens will appear in your wallet after purchase</li>
        </ul>
      </div>
    </div>
  );
};

export default ICOPurchase;


