import React, { useState, useEffect } from 'react';
import ICOPurchase from './components/ICOPurchase';

const ICOSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [saleProgress, setSaleProgress] = useState({
    raised: 2750000, // Current raised amount in USD
    target: 5000000, // Target amount in USD
    tokensSold: 11000000, // Tokens sold
    totalTokens: 20000000, // Total tokens for sale
    currentPrice: 0.25, // Current token price in USD
    participants: 1247 // Number of participants
  });

  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');

  // ICO end date - Set to 30 days from now for demo
  const icoEndDate = new Date();
  icoEndDate.setDate(icoEndDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = icoEndDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPercentage = (saleProgress.raised / saleProgress.target) * 100;
  const tokensProgressPercentage = (saleProgress.tokensSold / saleProgress.totalTokens) * 100;

  const handlePurchase = async () => {
    if (!purchaseAmount || purchaseAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    try {
      // Step 1: Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        alert('🦊 Please install MetaMask to purchase GIVE tokens!\n\nDownload from: https://metamask.io');
        return;
      }

      // Step 2: Connect to MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        alert('Please connect your MetaMask wallet first');
        return;
      }

      // Step 3: Check if user is on Polygon network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x89') { // Polygon Mainnet chain ID
        alert('🔄 Please switch to Polygon Network in MetaMask!\n\nChain ID: 137\nRPC URL: https://polygon-rpc.com/');
        return;
      }

      // Step 4: Show purchase confirmation
      const tokensToReceive = (parseFloat(purchaseAmount) * (selectedCurrency === 'ETH' ? 2500 : selectedCurrency === 'MATIC' ? 0.45 : 1) / saleProgress.currentPrice);
      
      const confirmPurchase = confirm(
        `🚀 PURCHASE CONFIRMATION\n\n` +
        `Amount: ${purchaseAmount} ${selectedCurrency}\n` +
        `You will receive: ~${tokensToReceive.toLocaleString()} GIVE tokens\n` +
        `Price: $${saleProgress.currentPrice} per GIVE\n\n` +
        `⚠️ DEMO MODE: This is a demonstration\n` +
        `In production, this would:\n` +
        `1. Process payment via smart contract\n` +
        `2. Transfer GIVE tokens to your wallet\n` +
        `3. Update your investor dashboard\n\n` +
        `Continue with demo?`
      );

      if (confirmPurchase) {
        // Simulate processing time
        alert('🔄 Processing purchase...\n\nIn production this would:\n• Execute smart contract\n• Transfer tokens\n• Update balances');
        
        // Simulate success
        setTimeout(() => {
          alert(`✅ DEMO PURCHASE SUCCESSFUL!\n\n${tokensToReceive.toLocaleString()} GIVE tokens would be added to your wallet!\n\nContract: 0xf45092BAddf17f6E4fBe18962814C90f8F983e34`);
        }, 2000);
      }

    } catch (error) {
      console.error('Purchase error:', error);
      alert('❌ Purchase failed: ' + error.message);
    }
  };

  const copyContractAddress = () => {
    navigator.clipboard.writeText('0xf45092BAddf17f6E4fBe18962814C90f8F983e34');
    alert('Contract address copied to clipboard!');
  };

  return (
    <section id="ico-sale" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #fff, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🚀 GIVE Token ICO - Live Now!
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Join the revolution in charitable giving. Secure your GIVE tokens at early bird pricing!
          </p>
        </div>

        {/* Countdown Timer */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px auto'
        }}>
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>
                {item.value.toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Main ICO Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          
          {/* Left: ICO Progress */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#fbbf24' }}>
              📊 ICO Progress
            </h3>

            {/* Funds Raised Progress */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Funds Raised</span>
                <span style={{ fontWeight: 'bold' }}>
                  ${saleProgress.raised.toLocaleString()} / ${saleProgress.target.toLocaleString()}
                </span>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                height: '20px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, #10b981, #fbbf24)',
                  height: '100%',
                  width: `${progressPercentage}%`,
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '0.9rem' }}>
                {progressPercentage.toFixed(1)}% Complete
              </div>
            </div>

            {/* Tokens Sold Progress */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Tokens Sold</span>
                <span style={{ fontWeight: 'bold' }}>
                  {saleProgress.tokensSold.toLocaleString()} / {saleProgress.totalTokens.toLocaleString()}
                </span>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                height: '20px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  height: '100%',
                  width: `${tokensProgressPercentage}%`,
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '0.9rem' }}>
                {tokensProgressPercentage.toFixed(1)}% Sold
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
                  ${saleProgress.currentPrice}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current Price</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                  {saleProgress.participants.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Participants</div>
              </div>
            </div>
          </div>

          {/* Right: Real ICO Purchase Interface */}
          <ICOPurchase />

            {/* Currency Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {['ETH', 'MATIC', 'USDT', 'USDC'].map(currency => (
                  <button
                    key={currency}
                    onClick={() => setSelectedCurrency(currency)}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: selectedCurrency === currency ? '2px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.3)',
                      background: selectedCurrency === currency ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Amount ({selectedCurrency})
              </label>
              <input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder={`Enter ${selectedCurrency} amount`}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
              {purchaseAmount && (
                <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>
                  ≈ {(parseFloat(purchaseAmount) * (selectedCurrency === 'ETH' ? 2500 : selectedCurrency === 'MATIC' ? 0.45 : 1) / saleProgress.currentPrice).toLocaleString()} GIVE tokens
                </div>
              )}
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(45deg, #10b981, #fbbf24)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '20px',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🚀 Buy GIVE Tokens Now
            </button>

            {/* Contract Info */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '15px',
              fontSize: '0.9rem'
            }}>
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Contract Address:</div>
              <div style={{ 
                wordBreak: 'break-all', 
                fontFamily: 'monospace',
                cursor: 'pointer',
                color: '#fbbf24'
              }} onClick={copyContractAddress}>
                0xf45092BAddf17f6E4fBe18962814C90f8F983e34 📋
              </div>
            </div>

            {/* Bonus Information */}
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🎁 Early Bird Bonus</div>
              <div style={{ fontSize: '0.9rem' }}>Get 20% extra tokens for purchases over $1,000!</div>
            </div>
          </div>
        </div>

        {/* Sale Phases */}
        <div style={{ marginTop: '60px' }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '40px',
            color: '#fbbf24'
          }}>
            🏆 ICO Sale Phases
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { phase: 'Private Sale', price: '$0.15', status: 'Completed', color: '#10b981' },
              { phase: 'Pre-Sale', price: '$0.20', status: 'Completed', color: '#10b981' },
              { phase: 'Public Sale', price: '$0.25', status: 'Live Now', color: '#fbbf24' },
              { phase: 'Exchange Listing', price: '$0.35', status: 'Coming Soon', color: '#6b7280' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center',
                border: `2px solid ${item.color}`,
                position: 'relative'
              }}>
                {item.status === 'Live Now' && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#fbbf24',
                    color: '#000',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    LIVE
                  </div>
                )}
                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {item.phase}
                </h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: item.color, marginBottom: '10px' }}>
                  {item.price}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ICOSaleSection; 