import React, { useState, useEffect } from 'react';

const TokenomicsController = ({ userAddress, tokenBalance = 0 }) => {
  const [saleSettings, setSaleSettings] = useState({
    enableSales: true,
    maxSalePercentage: 20, // Max 20% of holdings per transaction
    cooldownPeriod: 24, // 24 hours between sales
    minimumHolding: 1000, // Minimum tokens to keep
    maxWalletLimit: 5000000, // Max 5M DONATE per wallet (ICO limit)
    vestingEnabled: true,
    antiDumpProtection: true,
    liquidityLockPeriod: 730 // 2 years for liquidity pools
  });

  const [saleHistory, setSaleHistory] = useState([
    { date: '2024-07-20', amount: 1000, price: 0.35, value: 350, type: 'Manual Sale' },
    { date: '2024-07-18', amount: 500, price: 0.32, value: 160, type: 'Auto Sale' },
    { date: '2024-07-15', amount: 750, price: 0.28, value: 210, type: 'Manual Sale' }
  ]);

  const [vestingSchedule] = useState([
    { phase: 'Immediate (20%)', percentage: 20, unlocked: true, amount: tokenBalance * 0.20, category: 'Public Sale' },
    { phase: '6 Months', percentage: 15, unlocked: true, amount: tokenBalance * 0.15, unlockDate: '2025-01-21', category: 'Public Sale' },
    { phase: '12 Months', percentage: 25, unlocked: false, amount: tokenBalance * 0.25, unlockDate: '2025-07-21', category: 'Public Sale' },
    { phase: '18 Months', percentage: 20, unlocked: false, amount: tokenBalance * 0.20, unlockDate: '2026-01-21', category: 'Public Sale' },
    { phase: '24 Months', percentage: 20, unlocked: false, amount: tokenBalance * 0.20, unlockDate: '2026-07-21', category: 'Team Vesting' }
  ]);

  const [saleAmount, setSaleAmount] = useState('');
  const [saleType, setSaleType] = useState('market'); // market, limit, dca
  const [limitPrice, setLimitPrice] = useState('');
  const [dcaSettings, setDcaSettings] = useState({
    totalAmount: '',
    frequency: 'daily',
    duration: 30
  });

  // Calculate available tokens for sale
  const availableForSale = () => {
    const unlockedTokens = vestingSchedule
      .filter(phase => phase.unlocked)
      .reduce((sum, phase) => sum + phase.amount, 0);
    
    const maxSellable = Math.min(
      unlockedTokens,
      (tokenBalance * saleSettings.maxSalePercentage) / 100
    );
    
    return Math.max(0, maxSellable - saleSettings.minimumHolding);
  };

  // Calculate tokenomics impact
  const calculateImpact = (saleAmount) => {
    const salePercentage = (saleAmount / tokenBalance) * 100;
    const marketImpact = salePercentage > 10 ? 'High' : salePercentage > 5 ? 'Medium' : 'Low';
    const priceImpact = salePercentage * 0.02; // Estimated 2% price impact per 1% of supply sold
    
    return {
      salePercentage: salePercentage.toFixed(2),
      marketImpact,
      estimatedPriceImpact: priceImpact.toFixed(2),
      remainingBalance: tokenBalance - saleAmount,
      vestingStatus: getVestingStatus(saleAmount)
    };
  };

  const getVestingStatus = (saleAmount) => {
    const availableNow = availableForSale();
    if (saleAmount <= availableNow) return 'Fully Available';
    if (saleAmount <= tokenBalance * 0.5) return 'Partially Vested';
    return 'Mostly Locked';
  };

  const handleSaleExecution = () => {
    const amount = parseFloat(saleAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid sale amount');
      return;
    }

    const available = availableForSale();
    if (amount > available) {
      alert(`Sale amount exceeds available tokens. Maximum available: ${available.toLocaleString()} DONATE`);
      return;
    }

    // Add to sale history
    const newSale = {
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      price: 0.35, // Mock current price
      value: amount * 0.35,
      type: saleType === 'market' ? 'Market Sale' : saleType === 'limit' ? 'Limit Order' : 'DCA Sale'
    };

    setSaleHistory([newSale, ...saleHistory]);
    setSaleAmount('');
    alert(`Sale order placed successfully! ${amount.toLocaleString()} DONATE tokens`);
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '30px', 
        color: '#fbbf24',
        textAlign: 'center'
      }}>
        🎛️ Tokenomics Sales Controller
      </h3>

      {/* Tokenomics Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
            {tokenBalance.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Holdings</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>
            Max: {saleSettings.maxWalletLimit.toLocaleString()} DONATE
          </div>
        </div>

        <div style={{
          background: 'rgba(251, 191, 36, 0.1)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(251, 191, 36, 0.3)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
            {availableForSale().toLocaleString()}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Available for Sale</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>
            Max {saleSettings.maxSalePercentage}% per transaction
          </div>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
            {((availableForSale() / tokenBalance) * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Unlocked Ratio</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>
            {saleSettings.cooldownPeriod}h cooldown
          </div>
        </div>
      </div>

      {/* New Tokenomics Rules */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          📋 Tokenomics Rules & Limits
        </h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '15px' 
        }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', color: '#3b82f6' }}>
              🎯 ICO Sale Limits
            </h5>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              • <strong>Max per wallet:</strong> 5M DONATE tokens<br/>
              • <strong>Vesting:</strong> 80% locked 12-18 months<br/>
              • <strong>Immediate unlock:</strong> 20% available<br/>
              • <strong>Sale limit:</strong> Max 20% per transaction
            </div>
          </div>

          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', color: '#8b5cf6' }}>
              🔒 Vesting Schedule
            </h5>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              • <strong>Team:</strong> 4-5 years linear vesting<br/>
              • <strong>Charity Fund:</strong> 5 years timelock<br/>
              • <strong>Liquidity:</strong> 70% locked 2 years<br/>
              • <strong>Community:</strong> 3 years distribution
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', color: '#10b981' }}>
              🛡️ Anti-Dump Protection
            </h5>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              • <strong>Cooldown:</strong> 24 hours between sales<br/>
              • <strong>Min holding:</strong> 1,000 DONATE tokens<br/>
              • <strong>Market impact:</strong> Limited to unlocked tokens<br/>
              • <strong>Price protection:</strong> Gradual release schedule
            </div>
          </div>
        </div>
      </div>

      {/* Vesting Schedule */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          🔒 Vesting Schedule
        </h4>
        <div style={{ display: 'grid', gap: '10px' }}>
          {vestingSchedule.map((phase, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              background: phase.unlocked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
              borderRadius: '10px',
              border: `1px solid ${phase.unlocked ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.3)'}`
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{phase.phase}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {phase.amount.toLocaleString()} DONATE ({phase.percentage}%)
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, color: '#fbbf24' }}>
                  {phase.category}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {phase.unlocked ? (
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Unlocked</span>
                ) : (
                  <div>
                    <div style={{ color: '#6b7280', fontWeight: 'bold' }}>🔒 Locked</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Until {phase.unlockDate}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sale Controls */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          💰 Execute Sale
        </h4>
        
        {/* Sale Type Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Sale Type:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { id: 'market', label: '🚀 Market Sale', desc: 'Instant sale at current price' },
              { id: 'limit', label: '🎯 Limit Order', desc: 'Sell when price reaches target' },
              { id: 'dca', label: '📊 DCA Sale', desc: 'Dollar-cost averaging over time' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSaleType(type.id)}
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  border: saleType === type.id ? '2px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.3)',
                  background: saleType === type.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  flex: '1',
                  minWidth: '150px',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{type.label}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sale Amount Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Sale Amount (DONATE):
          </label>
          <input
            type="number"
            value={saleAmount}
            onChange={(e) => setSaleAmount(e.target.value)}
            placeholder={`Max: ${availableForSale().toLocaleString()}`}
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
          
          {/* Quick Amount Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {[25, 50, 75, 100].map(percentage => (
              <button
                key={percentage}
                onClick={() => setSaleAmount(Math.floor(availableForSale() * (percentage / 100)))}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {percentage}%
              </button>
            ))}
          </div>
        </div>

        {/* Additional Settings for Limit/DCA */}
        {saleType === 'limit' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Target Price ($):
            </label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder="e.g., 0.40"
              step="0.01"
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
          </div>
        )}

        {saleType === 'dca' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Frequency:
              </label>
              <select
                value={dcaSettings.frequency}
                onChange={(e) => setDcaSettings({...dcaSettings, frequency: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Duration (days):
              </label>
              <input
                type="number"
                value={dcaSettings.duration}
                onChange={(e) => setDcaSettings({...dcaSettings, duration: parseInt(e.target.value)})}
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
            </div>
          </div>
        )}

        {/* Impact Analysis */}
        {saleAmount && (
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', color: '#3b82f6' }}>
              📊 Sale Impact Analysis
            </h5>
            {(() => {
              const impact = calculateImpact(parseFloat(saleAmount) || 0);
              return (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.9rem' }}>
                  <div>
                    <strong>Sale Percentage:</strong> {impact.salePercentage}%
                  </div>
                  <div>
                    <strong>Market Impact:</strong> 
                    <span style={{ 
                      color: impact.marketImpact === 'High' ? '#ef4444' : 
                            impact.marketImpact === 'Medium' ? '#f59e0b' : '#10b981',
                      marginLeft: '5px'
                    }}>
                      {impact.marketImpact}
                    </span>
                  </div>
                  <div>
                    <strong>Est. Price Impact:</strong> -{impact.estimatedPriceImpact}%
                  </div>
                  <div>
                    <strong>Remaining Balance:</strong> {impact.remainingBalance.toLocaleString()}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Execute Sale Button */}
        <button
          onClick={handleSaleExecution}
          disabled={!saleAmount || parseFloat(saleAmount) <= 0 || parseFloat(saleAmount) > availableForSale()}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            background: (!saleAmount || parseFloat(saleAmount) <= 0 || parseFloat(saleAmount) > availableForSale()) 
              ? '#6b7280' 
              : 'linear-gradient(45deg, #ef4444, #f59e0b)',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: (!saleAmount || parseFloat(saleAmount) <= 0 || parseFloat(saleAmount) > availableForSale()) 
              ? 'not-allowed' 
              : 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => {
            if (!e.target.disabled) e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            if (!e.target.disabled) e.target.style.transform = 'translateY(0)';
          }}
        >
          {saleType === 'market' ? '🚀 Execute Market Sale' : 
           saleType === 'limit' ? '🎯 Place Limit Order' : 
           '📊 Start DCA Sale'}
        </button>
      </div>

      {/* Sale History */}
      <div>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          📈 Recent Sales
        </h4>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {saleHistory.map((sale, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              marginBottom: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{sale.amount.toLocaleString()} DONATE</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{sale.date} • {sale.type}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#10b981' }}>${sale.value.toFixed(2)}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>${sale.price.toFixed(3)}/DONATE</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsController;
