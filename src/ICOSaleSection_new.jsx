import React, { useState, useEffect } from 'react';
import ICOPurchase from './components/ICOPurchase';

const ICOSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [saleProgress] = useState({
    raised: 2750000, // Current raised amount in USD
    target: 5000000, // Target amount in USD
    tokensSold: 11000000, // Tokens sold
    totalTokens: 20000000, // Total tokens for sale
    currentPrice: 0.25, // Current token price in USD
    participants: 1247 // Number of participants
  });

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
        background: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
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
            Join the revolution in charitable giving. Secure your GIVE tokens with real smart contract integration!
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
        }} className="countdown-grid">
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
            }} className="countdown-card">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }} className="countdown-value">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Main ICO Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }} className="grid-two-columns">
          
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
              }} className="ico-progress-bar">
                <div style={{
                  background: 'linear-gradient(90deg, #10b981, #fbbf24)',
                  height: '100%',
                  width: `${progressPercentage}%`,
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }} className="ico-progress-fill" />
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
              }} className="ico-progress-bar">
                <div style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  height: '100%',
                  width: `${tokensProgressPercentage}%`,
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }} className="ico-progress-fill" />
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
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
                  {saleProgress.participants.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Participants</div>
              </div>
            </div>
          </div>

          {/* Right: Real Smart Contract Purchase Interface */}
          <ICOPurchase />
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
            🎯 ICO Sale Phases
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }} className="sale-phases-grid">
            {[
              { 
                phase: 'Phase 1', 
                status: 'Completed', 
                price: '$0.20', 
                bonus: '25% Bonus',
                color: '#10b981',
                tokens: '5M GIVE'
              },
              { 
                phase: 'Phase 2', 
                status: 'Active', 
                price: '$0.25', 
                bonus: '15% Bonus',
                color: '#fbbf24',
                tokens: '7M GIVE'
              },
              { 
                phase: 'Phase 3', 
                status: 'Upcoming', 
                price: '$0.30', 
                bonus: '10% Bonus',
                color: '#6b7280',
                tokens: '8M GIVE'
              }
            ].map((phase, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center',
                border: `2px solid ${phase.color}40`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: phase.color,
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {phase.status}
                </div>
                
                <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px', marginTop: '10px' }}>
                  {phase.phase}
                </h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: phase.color, marginBottom: '10px' }}>
                  {phase.price}
                </div>
                <div style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '10px' }}>
                  {phase.bonus}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {phase.tokens}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div style={{
          marginTop: '60px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px', color: '#fbbf24' }}>
            🔒 Smart Contract Integration
          </h4>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '20px' }}>
            This ICO is powered by audited smart contracts on Polygon network. 
            Your purchases are secure, transparent, and automatically processed.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              <span>Audited Contract</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
              <span>Instant Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>🔍</span>
              <span>Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ICOSaleSection;


