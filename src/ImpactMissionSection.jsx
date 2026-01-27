import React from 'react';

const ImpactMissionSection = () => {
  const impactStats = [
    {
      number: '1.1B+',
      label: 'People in Need',
      description: 'Living in extreme poverty globally (UN 2025)',
      icon: '🌍'
    },
    {
      number: '$557B+',
      label: 'US Giving 2025',
      description: 'American charitable donations (Giving USA 2025)',
      icon: '💝'
    },
    {
      number: '20-30%',
      label: 'Lost to Overhead',
      description: 'Traditional charity administrative costs',
      icon: '📉'
    },
    {
      number: '3-5%',
      label: 'GiveToken Fees',
      description: 'Blockchain-powered minimal costs',
      icon: '✨'
    }
  ];

  const missionPoints = [
    {
      title: 'Complete Transparency',
      description: 'Every donation tracked on Polygon blockchain with real-time visibility. Unlike traditional charities with 20-30% overhead, see exactly where funds go.',
      icon: '🔍',
      color: '#3b82f6'
    },
    {
      title: 'Direct Impact',
      description: 'Connect donors directly with verified causes, eliminating intermediaries and ensuring maximum impact per dollar donated through smart contracts.',
      icon: '🎯',
      color: '#10b981'
    },
    {
      title: 'Global Accessibility',
      description: 'Borderless charitable giving enabling anyone, anywhere to support causes instantly via MetaMask and crypto wallets.',
      icon: '🌐',
      color: '#f59e0b'
    },
    {
      title: 'Community Governance',
      description: 'DONATE token holders participate in platform decisions through DAO voting, ensuring the ecosystem serves charitable goals.',
      icon: '🗳️',
      color: '#8b5cf6'
    },
    {
      title: 'Smart Automation',
      description: 'AI-powered automated distribution, milestone-based releases and programmable giving for maximum efficiency and impact.',
      icon: '🤖',
      color: '#ef4444'
    },
    {
      title: 'Verified Recipients',
      description: 'KYC-verified charities and recipients with on-chain reputation scores ensure donations reach legitimate causes.',
      icon: '✅',
      color: '#06b6d4'
    }
  ];

  const useCases = [
    {
      title: 'Emergency Relief',
      description: 'Instant global response to natural disasters and humanitarian crises',
      example: 'Ukraine aid, Turkey earthquake relief - funds distributed within hours',
      icon: '🚨'
    },
    {
      title: 'Education Access',
      description: 'Supporting schools, scholarships and educational programs worldwide',
      example: 'AI-powered personalized learning and quantum education platforms',
      icon: '📚'
    },
    {
      title: 'Healthcare Support',
      description: 'Medical treatments, equipment and healthcare infrastructure',
      example: 'AI diagnostics, robotic surgery access, personalized medicine',
      icon: '🏥'
    },
    {
      title: 'Climate Action',
      description: 'Carbon removal, renewable energy and sustainability initiatives',
      example: 'Verified carbon credits, solar installations in developing nations',
      icon: '🌱'
    }
  ];

  return (
    <section id="impact-mission" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #2563EB, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🌟 Our Mission & Global Impact
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Revolutionizing charitable giving through blockchain technology to create a transparent, 
            efficient and globally accessible platform. Based on Giving USA 2025 data, we're building the future of philanthropy.
          </p>
        </div>

        {/* Impact Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px',
          marginBottom: '80px'
        }}>
          {impactStats.map((stat, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            className="hover-lift"
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{stat.icon}</div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: '#2563EB',
                marginBottom: '10px'
              }}>
                {stat.number}
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                {stat.label}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#64748b',
                lineHeight: '1.4'
              }}>
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Points */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '50px',
            color: '#1e293b'
          }}>
            🎯 How We're Changing Charitable Giving
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '30px'
          }}>
            {missionPoints.map((point, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: `3px solid ${point.color}20`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              className="hover-lift"
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '20px'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginRight: '15px',
                    padding: '10px',
                    background: `${point.color}15`,
                    borderRadius: '15px'
                  }}>
                    {point.icon}
                  </div>
                  <h4 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 'bold', 
                    color: point.color,
                    margin: 0
                  }}>
                    {point.title}
                  </h4>
                </div>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.6', 
                  color: '#64748b',
                  margin: 0
                }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '50px',
            color: '#1e293b'
          }}>
            💡 Real-World Impact Areas
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '25px'
          }}>
            {useCases.map((useCase, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '25px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.3s ease'
              }}
              className="hover-lift"
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  textAlign: 'center',
                  marginBottom: '15px'
                }}>
                  {useCase.icon}
                </div>
                <h4 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#2563EB',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  {useCase.title}
                </h4>
                <p style={{ 
                  fontSize: '0.95rem', 
                  lineHeight: '1.5', 
                  color: '#64748b',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  {useCase.description}
                </p>
                <div style={{
                  background: '#f1f5f9',
                  padding: '12px',
                  borderRadius: '10px',
                  borderLeft: '3px solid #10b981'
                }}>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#10b981',
                    fontWeight: 'bold',
                    marginBottom: '4px'
                  }}>
                    Example:
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#475569',
                    fontStyle: 'italic'
                  }}>
                    {useCase.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Source Credibility */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#1e293b'
          }}>
            📊 Data-Driven Impact
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            Our statistics are sourced from authoritative organizations including{' '}
            <a href="https://givingusa.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', fontWeight: 'bold' }}>
              Giving USA 2025 Annual Report
            </a>
            , the nation's longest-running comprehensive report on philanthropy with over 40 years of data.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563EB' }}>40+</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Years of Data</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>350+</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Page Report</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>$557B</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>US Giving 2025</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          background: 'linear-gradient(135deg, #2563EB, #10b981)',
          borderRadius: '25px',
          padding: '50px 30px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ 
            fontSize: '2.2rem', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            margin: 0
          }}>
            🚀 Join the Charitable Revolution
          </h3>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '30px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '20px auto 30px'
          }}>
            Join the revolution transforming $557B+ in annual giving (Giving USA 2025). 
            Every DONATE token helps build a transparent, efficient blockchain-powered charitable ecosystem.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a 
              href="#ico-sale"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '15px 30px',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              className="cta-button"
            >
              🎯 Join ICO Sale
            </a>
            <a 
              href="#whitepaper"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '15px 30px',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              className="cta-button"
            >
              📄 Read Whitepaper
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .cta-button:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default ImpactMissionSection;
