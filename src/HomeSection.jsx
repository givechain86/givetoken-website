import React from 'react';
import logo from './assets/givetoken-logo.svg';

const HomeSection = () => (
  <section id="home" className="hero-section">
    {/* Background Pattern */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="40" cy="40" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      opacity: 0.5
    }}></div>
    
    <div className="hero-content">
      <div className="animate-fade-up">
        <img src={logo} alt="GiveToken Logo" style={{ height: 100, marginBottom: 32 }} className="animate-bounce" />
        
        <h1 className="hero-title">
          Making Charitable Giving Work Better For All
        </h1>
        
        <p className="hero-subtitle">
          The Future of Transparent Philanthropy
        </p>
        
        <p className="hero-description">
          GiveToken is a blockchain platform for changemakers, innovators, and visionaries, with the tools and technologies required to create possibility for transparent charitable giving and bring about positive global change.
        </p>
        
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.15)', 
            backdropFilter: 'blur(10px)',
            padding: '1rem 2rem', 
            borderRadius: '50px', 
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '2rem'
          }}>
                         <strong style={{ color: '#FFC300' }}>Contract Address:</strong>
             <div style={{ 
               fontFamily: 'monospace', 
               fontSize: '0.85rem',
               marginTop: '0.5rem',
               cursor: 'pointer',
               transition: 'all 0.3s ease'
             }}
             onClick={() => navigator.clipboard.writeText('0x513C3D662558641e73C643dDf3b22AAB1B6f4322')}
             title="Click to copy full address"
             onMouseEnter={(e) => e.target.style.color = '#FFC300'}
             onMouseLeave={(e) => e.target.style.color = 'white'}>
               0x513C3D662558641e73C643dDf3b22AAB1B6f4322
             </div>
             
             {/* Interactive Buttons */}
             <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
               <a 
                 href="https://polygonscan.com/token/0x513C3D662558641e73C643dDf3b22AAB1B6f4322"
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   background: 'rgba(255,255,255,0.2)',
                   padding: '0.5rem 1rem',
                   borderRadius: '20px',
                   textDecoration: 'none',
                   color: 'white',
                   fontSize: '0.8rem',
                   border: '1px solid rgba(255,255,255,0.3)',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => {
                   e.target.style.background = 'rgba(255,195,0,0.3)';
                   e.target.style.borderColor = '#FFC300';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.background = 'rgba(255,255,255,0.2)';
                   e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                 }}
               >
                 🔍 View on PolygonScan
               </a>
               
               <button
                 onClick={async () => {
                   try {
                     if (typeof window.ethereum !== 'undefined') {
                       await window.ethereum.request({
                         method: 'wallet_watchAsset',
                         params: {
                           type: 'ERC20',
                           options: {
                             address: '0x513C3D662558641e73C643dDf3b22AAB1B6f4322',
                             symbol: 'GIVE',
                             decimals: 18,
                             image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x513C3D662558641e73C643dDf3b22AAB1B6f4322/logo.png',
                           },
                         },
                       });
                       alert('GIVE token added to MetaMask successfully! 🎉');
                     } else {
                       alert('Please install MetaMask first!\n\nGet it from: https://metamask.io');
                     }
                   } catch (error) {
                     console.error('Error adding token:', error);
                     alert('Failed to add token. Please add manually:\n\nContract: 0x513C3D662558641e73C643dDf3b22AAB1B6f4322\nSymbol: GIVE\nDecimals: 18');
                   }
                 }}
                 style={{
                   background: 'rgba(255,255,255,0.2)',
                   padding: '0.5rem 1rem',
                   borderRadius: '20px',
                   border: '1px solid rgba(255,255,255,0.3)',
                   color: 'white',
                   fontSize: '0.8rem',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => {
                   e.target.style.background = 'rgba(255,195,0,0.3)';
                   e.target.style.borderColor = '#FFC300';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.background = 'rgba(255,255,255,0.2)';
                   e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                 }}
               >
                 🦊 Add to MetaMask
               </button>
             </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#how-to-buy" className="btn-primary">
            <span>🚀</span>
            Get GIVE Token
          </a>
          <a href="#whitepaper" className="btn-secondary">
            <span>📄</span>
            Read Whitepaper
          </a>
        </div>
      </div>
      
      {/* Value Proposition Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2rem', 
        marginTop: '5rem',
        maxWidth: '900px',
        margin: '5rem auto 0'
      }} className="animate-fade-up">
        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Complete Transparency</h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Every donation tracked on blockchain with real-time impact visibility
          </p>
        </div>
        
        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Lower Costs</h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Reduce overhead from 20-40% to less than 5% through automation
          </p>
        </div>
        
        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Global Impact</h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Borderless donations operating 24/7 without geographic restrictions
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HomeSection; 