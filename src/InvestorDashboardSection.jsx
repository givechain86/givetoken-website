import React, { useState } from 'react';
import TokenomicsController from './components/TokenomicsController.jsx';
import PortfolioAnalytics from './components/PortfolioAnalytics.jsx';

const InvestorDashboardSection = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [referralCode] = useState('GIVE-REF-2024');

  // Mock investor data
  const investorData = {
    totalInvested: 5000,
    tokensOwned: 22500,
    currentValue: 7875,
    profitLoss: 2875,
    profitPercentage: 57.5,
    referralEarnings: 450,
    referrals: 12
  };

  const transactions = [
    { date: '2024-07-20', type: 'Purchase', amount: '2000 GIVE', price: '$0.20', status: 'Confirmed' },
    { date: '2024-07-18', type: 'Purchase', amount: '1500 GIVE', price: '$0.22', status: 'Confirmed' },
    { date: '2024-07-15', type: 'Referral Bonus', amount: '250 GIVE', price: '$0.00', status: 'Confirmed' },
    { date: '2024-07-12', type: 'Purchase', amount: '3000 GIVE', price: '$0.18', status: 'Confirmed' }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://givetoken.org?ref=${referralCode}`);
    alert('Referral link copied to clipboard!');
  };

  const downloadReport = () => {
    alert('Investment report downloaded!');
  };

  return (
    <section id="investor-dashboard" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📊 Investor Dashboard
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Track your GIVE token investments, earnings, and portfolio performance
          </p>
        </div>

        {/* Portfolio Overview Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💰</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '5px' }}>
              ${investorData.totalInvested.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Invested</div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🪙</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
              {investorData.tokensOwned.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>GIVE Tokens Owned</div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '5px' }}>
              ${investorData.currentValue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current Value</div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚀</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '5px' }}>
              +{investorData.profitPercentage}%
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Profit (+${investorData.profitLoss.toLocaleString()})
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {[
            { id: 'portfolio', label: '📊 Portfolio', icon: '📊' },
            { id: 'tokenomics', label: '🎛️ Sales Control', icon: '🎛️' },
            { id: 'transactions', label: '💳 Transactions', icon: '💳' },
            { id: 'referrals', label: '🤝 Referrals', icon: '🤝' },
            { id: 'analytics', label: '📈 Analytics', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '15px 30px',
                margin: '0 10px',
                background: activeTab === tab.id ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #fbbf24' : '3px solid transparent',
                color: activeTab === tab.id ? '#fbbf24' : 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '400px' }}>
          
          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
              
              {/* Portfolio Chart Area */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#fbbf24' }}>
                  📊 Portfolio Performance
                </h3>
                
                {/* Mock Chart */}
                <div style={{ 
                  height: '300px', 
                  background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(16, 185, 129, 0.1))',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'relative'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📈</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                      Portfolio Growth: +{investorData.profitPercentage}%
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      Your investment has grown from ${investorData.totalInvested.toLocaleString()} to ${investorData.currentValue.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Mock trend line */}
                  <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <path 
                      d="M 50 250 Q 150 200, 250 150 T 450 100" 
                      stroke="#fbbf24" 
                      strokeWidth="3" 
                      fill="none"
                      opacity="0.8"
                    />
                  </svg>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#fbbf24' }}>
                  ⚡ Quick Actions
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <button style={{
                    padding: '15px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(45deg, #10b981, #fbbf24)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    🚀 Buy More GIVE
                  </button>
                  
                  <button 
                    onClick={downloadReport}
                    style={{
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    📄 Download Report
                  </button>
                  
                  <button style={{
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    💎 Stake Tokens
                  </button>
                </div>

                {/* Token Distribution */}
                <div style={{ marginTop: '30px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px' }}>
                    🪙 Token Breakdown
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Available:</span>
                      <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                        {(investorData.tokensOwned * 0.8).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Staked:</span>
                      <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>
                        {(investorData.tokensOwned * 0.2).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tokenomics Sales Control Tab */}
          {activeTab === 'tokenomics' && (
            <TokenomicsController 
              userAddress="0x..." 
              tokenBalance={investorData.tokensOwned}
            />
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#fbbf24' }}>
                💳 Transaction History
              </h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#fbbf24' }}>Date</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#fbbf24' }}>Type</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#fbbf24' }}>Amount</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#fbbf24' }}>Price</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#fbbf24' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <td style={{ padding: '15px' }}>{tx.date}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '5px 10px',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            background: tx.type === 'Purchase' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            color: tx.type === 'Purchase' ? '#3b82f6' : '#10b981'
                          }}>
                            {tx.type}
                          </span>
                        </td>
                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{tx.amount}</td>
                        <td style={{ padding: '15px' }}>{tx.price}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '5px 10px',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#22c55e'
                          }}>
                            ✅ {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              
              {/* Referral Stats */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#fbbf24' }}>
                  🤝 Referral Program
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
                      {investorData.referrals}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Referrals</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '5px' }}>
                      ${investorData.referralEarnings}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Earnings</div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(251, 191, 36, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>🎁 Referral Rewards:</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    • 5% commission on referred investments<br/>
                    • 100 bonus DONATE tokens per referral<br/>
                    • Monthly referral contests with prizes
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '15px',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace'
                }}>
                  <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Your Referral Code:</div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ color: '#fbbf24' }}>{referralCode}</span>
                    <button 
                      onClick={copyReferralCode}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: 'none',
                        background: '#fbbf24',
                        color: '#000',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}
                    >
                      📋 Copy Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Referrals */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#fbbf24' }}>
                  👥 Recent Referrals
                </h3>
                
                {[
                  { name: 'Alex K.', amount: '$1,500', date: '2024-07-20', reward: '$75' },
                  { name: 'Sarah M.', amount: '$2,000', date: '2024-07-18', reward: '$100' },
                  { name: 'Mike R.', amount: '$800', date: '2024-07-15', reward: '$40' },
                  { name: 'Lisa T.', amount: '$1,200', date: '2024-07-12', reward: '$60' }
                ].map((referral, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    padding: '15px',
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{referral.name}</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        Invested {referral.amount} • {referral.date}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', color: '#10b981' }}>{referral.reward}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Your Reward</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <PortfolioAnalytics investorData={investorData} />
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestorDashboardSection; 