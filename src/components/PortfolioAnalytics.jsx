import React, { useState, useEffect } from 'react';

const PortfolioAnalytics = ({ investorData }) => {
  const [timeframe, setTimeframe] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState({
    priceHistory: [
      { date: '2024-07-01', price: 0.18, volume: 125000 },
      { date: '2024-07-05', price: 0.22, volume: 180000 },
      { date: '2024-07-10', price: 0.28, volume: 220000 },
      { date: '2024-07-15', price: 0.32, volume: 195000 },
      { date: '2024-07-20', price: 0.35, volume: 240000 }
    ],
    tokenomicsBreakdown: {
      publicSale: 200000000,        // 20% - Public Sale (ICO)
      presaleStrategic: 50000000,   // 5% - Presale/Strategic
      charityFund: 350000000,       // 35% - Charity Fund (Treasury)
      teamAdvisors: 150000000,      // 15% - Team & Advisors
      communityStaking: 150000000,  // 15% - Community Rewards & Staking
      liquidityPools: 80000000,     // 8% - Liquidity Pools
      marketing: 70000000           // 7% - Marketing & Partnerships
    },
    marketMetrics: {
      marketCap: 157500000,
      volume24h: 2400000,
      holders: 12547,
      transactions24h: 1847
    },
    riskMetrics: {
      volatility: 0.24,
      sharpeRatio: 1.85,
      maxDrawdown: 0.18,
      beta: 0.92
    }
  });

  const [predictions, setPredictions] = useState({
    nextWeek: { price: 0.38, confidence: 0.72, trend: 'bullish' },
    nextMonth: { price: 0.45, confidence: 0.65, trend: 'bullish' },
    nextQuarter: { price: 0.52, confidence: 0.58, trend: 'bullish' }
  });

  // Calculate portfolio performance metrics
  const calculateMetrics = () => {
    const currentPrice = 0.35;
    const avgBuyPrice = investorData.totalInvested / investorData.tokensOwned;
    const totalValue = investorData.tokensOwned * currentPrice;
    const roi = ((totalValue - investorData.totalInvested) / investorData.totalInvested) * 100;
    
    return {
      avgBuyPrice: avgBuyPrice.toFixed(4),
      currentPrice: currentPrice.toFixed(4),
      totalValue: totalValue.toFixed(2),
      roi: roi.toFixed(2),
      dailyChange: '+2.8%',
      weeklyChange: '+12.4%',
      monthlyChange: '+34.7%'
    };
  };

  const metrics = calculateMetrics();

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
          📈 Advanced Portfolio Analytics
        </h3>
        
        {/* Timeframe Selector */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {['7d', '30d', '90d', '1y'].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: timeframe === period ? '2px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.3)',
                background: timeframe === period ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
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
            ${metrics.currentPrice}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current Price</div>
          <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px' }}>
            {metrics.dailyChange} (24h)
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
            ${metrics.avgBuyPrice}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Avg Buy Price</div>
          <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px' }}>
            {metrics.weeklyChange} (7d)
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
            +{metrics.roi}%
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total ROI</div>
          <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px' }}>
            {metrics.monthlyChange} (30d)
          </div>
        </div>

        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
            ${analyticsData.marketMetrics.volume24h.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>24h Volume</div>
          <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px' }}>
            {analyticsData.marketMetrics.transactions24h} txns
          </div>
        </div>
      </div>

      {/* Price Chart Simulation */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          📊 Price Performance ({timeframe})
        </h4>
        <div style={{
          height: '250px',
          background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(251, 191, 36, 0.1))',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Mock Chart Background */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(16, 185, 129, 0.1) 20%, 
              rgba(251, 191, 36, 0.1) 40%, 
              rgba(59, 130, 246, 0.1) 60%, 
              rgba(139, 92, 246, 0.1) 80%, 
              transparent 100%)`
          }} />
          
          {/* Mock Chart Line */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <path 
              d="M 50 200 Q 150 180, 250 120 T 450 80 T 650 60" 
              stroke="#10b981" 
              strokeWidth="3" 
              fill="none"
              opacity="0.8"
            />
            <path 
              d="M 50 200 Q 150 180, 250 120 T 450 80 T 650 60 L 650 250 L 50 250 Z" 
              fill="url(#gradient)" 
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
          
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Price Trend: Bullish 🚀
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Your portfolio has grown {metrics.roi}% in the selected timeframe
            </div>
          </div>
        </div>
      </div>

      {/* Tokenomics Breakdown */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          🪙 Live Tokenomics Data
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            {Object.entries(analyticsData.tokenomicsBreakdown).map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                marginBottom: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ fontWeight: 'bold' }}>
                  {key === 'publicSale' ? '💰 Public Sale (20%)' :
                   key === 'presaleStrategic' ? '🎯 Presale/Strategic (5%)' :
                   key === 'charityFund' ? '💝 Charity Fund (35%)' :
                   key === 'teamAdvisors' ? '👥 Team & Advisors (15%)' :
                   key === 'communityStaking' ? '🎁 Community & Staking (15%)' :
                   key === 'liquidityPools' ? '🏊 Liquidity Pools (8%)' :
                   '📢 Marketing (7%)'}:
                </span>
                <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>
                  {(value / 1000000).toFixed(0)}M
                </span>
              </div>
            ))}
          </div>
          
          <div>
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', color: '#3b82f6' }}>
                📊 Market Health
              </h5>
              <div style={{ display: 'grid', gap: '10px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Market Cap:</span>
                  <span style={{ fontWeight: 'bold' }}>${(analyticsData.marketMetrics.marketCap / 1000000).toFixed(1)}M</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Holders:</span>
                  <span style={{ fontWeight: 'bold' }}>{analyticsData.marketMetrics.holders.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Volatility:</span>
                  <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>{(analyticsData.riskMetrics.volatility * 100).toFixed(1)}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sharpe Ratio:</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981' }}>{analyticsData.riskMetrics.sharpeRatio}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Price Predictions */}
      <div>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fbbf24' }}>
          🤖 AI Price Predictions
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {Object.entries(predictions).map(([period, prediction]) => (
            <div key={period} style={{
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                {prediction.trend === 'bullish' ? '🚀' : prediction.trend === 'bearish' ? '📉' : '➡️'}
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '5px' }}>
                ${prediction.price.toFixed(3)}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px', textTransform: 'capitalize' }}>
                {period.replace('next', 'Next ')}
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: prediction.confidence > 0.7 ? '#10b981' : prediction.confidence > 0.6 ? '#f59e0b' : '#ef4444',
                fontWeight: 'bold'
              }}>
                {(prediction.confidence * 100).toFixed(0)}% Confidence
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>
                Trend: {prediction.trend}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(251, 191, 36, 0.1)',
          borderRadius: '10px',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          fontSize: '0.9rem',
          opacity: 0.9
        }}>
          <strong>⚠️ Disclaimer:</strong> These predictions are based on technical analysis and market trends. 
          Cryptocurrency investments are highly volatile and unpredictable. Always do your own research and 
          never invest more than you can afford to lose.
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
