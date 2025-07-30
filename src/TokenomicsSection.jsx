import React from 'react';

const TokenomicsSection = () => (
  <section id="tokenomics" style={{ padding: '4rem 0', background: 'white' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: '#2563EB' }} className="animate-fade-up">
        Tokenomics
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        {/* Pie Chart Visualization */}
        <div style={{ textAlign: 'center' }} className="animate-fade-left">
          <div style={{ 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: 'conic-gradient(#FFC300 0deg 144deg, #2563EB 144deg 252deg, #22C55E 252deg 324deg, #F59E0B 324deg 360deg)',
            margin: '0 auto 2rem',
            position: 'relative',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }} className="pie-chart card-hover">
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2563EB'
            }}>
              1B GIVE
            </div>
          </div>
        </div>
        
        {/* Distribution Details */}
        <div className="animate-fade-right">
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#2563EB', marginBottom: '1rem' }}>Total Supply: 1,000,000,000 GIVE</h3>
            
            {/* Contract Information */}
            <div style={{ 
              background: '#f8fafc', 
              padding: '1.5rem', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ color: '#2563EB', marginBottom: '1rem', fontSize: '1.1rem' }}>📋 Token Contract Details</h4>
              <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div><strong>Network:</strong> Polygon (MATIC)</div>
                <div><strong>Token Standard:</strong> ERC-20</div>
                <div><strong>Symbol:</strong> GIVE</div>
                <div><strong>Decimals:</strong> 18</div>
                <div style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.8rem', 
                  wordBreak: 'break-all',
                  background: 'white',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}>
                  <strong>Contract:</strong> 0x513C3D662558641e73C643dDf3b22AAB1B6f4322
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://polygonscan.com/token/0x513C3D662558641e73C643dDf3b22AAB1B6f4322"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#2563EB',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    transition: 'all 0.3s ease'
                  }}
                  className="btn-animated"
                >
                  🔍 View on PolygonScan
                </a>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('0x513C3D662558641e73C643dDf3b22AAB1B6f4322');
                    alert('Contract address copied to clipboard!');
                  }}
                  style={{
                    background: '#FFC300',
                    color: '#000',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="btn-animated"
                >
                  📋 Copy Address
                </button>
                
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
                    background: '#22C55E',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="btn-animated"
                >
                  🦊 Add to MetaMask
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #FFC300'
            }} className="card-hover">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }} className="pulse-icon">💰</div>
              <div>
                <strong>Public Sale: 40%</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>400,000,000 GIVE</div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #2563EB'
            }} className="card-hover">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }} className="pulse-icon">💝</div>
              <div>
                <strong>Charity Fund: 30%</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>300,000,000 GIVE</div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #22C55E'
            }} className="card-hover">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }} className="pulse-icon">👥</div>
              <div>
                <strong>Team & Advisors: 20%</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>200,000,000 GIVE</div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #F59E0B'
            }} className="card-hover">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }} className="pulse-icon">🎁</div>
              <div>
                <strong>Community Rewards: 10%</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>100,000,000 GIVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Utility Features */}
      <div style={{ marginTop: '4rem', textAlign: 'center' }} className="animate-fade-up">
        <h3 style={{ color: '#2563EB', marginBottom: '2rem' }}>Token Utility</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '2px solid #f0f0f0'
          }} className="card-hover">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="pulse-icon">🎯</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Donations</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Power charitable giving worldwide</p>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '2px solid #f0f0f0'
          }} className="card-hover">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="pulse-icon">🗳️</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Voting</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Participate in governance decisions</p>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '2px solid #f0f0f0'
          }} className="card-hover">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="pulse-icon">🏆</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Rewards</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Earn rewards for participation</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TokenomicsSection; 