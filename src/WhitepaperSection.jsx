import React from 'react';

const WhitepaperSection = () => (
  <section id="whitepaper" style={{ padding: '4rem 0', background: '#f8f9fa' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: '#2563EB' }} className="animate-fade-up">
        Whitepaper
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        {/* Whitepaper Overview */}
        <div className="animate-fade-left">
          <h3 style={{ color: '#2563EB', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            Revolutionizing Charitable Giving Through Blockchain Technology
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#666' }}>
            Our comprehensive whitepaper details how GiveToken addresses the fundamental challenges in charitable giving through innovative blockchain solutions, transparent governance and community-driven impact.
          </p>
          
          <div style={{ 
            background: '#e3f2fd', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            border: '1px solid #2196f3'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#1976d2' }}>
              <strong>📋 Latest Update:</strong> Whitepaper v3.0 includes updated 7-category tokenomics, comprehensive vesting schedules, and anti-dump protection mechanisms. Use "Generate Updated PDF" button for the latest PDF version.
            </p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#2563EB', marginBottom: '1rem' }}>Key Topics Covered:</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#FFC300', marginRight: '0.5rem', fontSize: '1.2rem' }}>📊</span>
                Updated 7-category tokenomics with comprehensive vesting schedules
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#FFC300', marginRight: '0.5rem', fontSize: '1.2rem' }}>🔧</span>
                Technical architecture and smart contract design
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#FFC300', marginRight: '0.5rem', fontSize: '1.2rem' }}>🗳️</span>
                CharityDAO governance and community participation
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#FFC300', marginRight: '0.5rem', fontSize: '1.2rem' }}>🎯</span>
                Real-world use cases and impact measurement
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#FFC300', marginRight: '0.5rem', fontSize: '1.2rem' }}>🚀</span>
                Development roadmap and future vision
              </li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href="/GiveToken_Whitepaper_v3.md" 
              target="_blank"
              style={{ 
                padding: '1rem 2rem', 
                background: '#10b981', 
                color: '#fff', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className="btn-animated"
            >
              <span>🆕</span>
              Latest v3.0 (Updated Tokenomics)
            </a>
            <a 
              href="/GiveToken_Whitepaper.html" 
              target="_blank"
              style={{ 
                padding: '1rem 2rem', 
                background: '#FFC300', 
                color: '#000', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className="btn-animated"
            >
              <span>🌐</span>
              View Online (Updated)
            </a>
            <button
              onClick={() => {
                alert('📄 PDF Update Instructions:\n\n1. Visit the HTML version (🌐 View Online)\n2. Press Ctrl+P (or Cmd+P on Mac)\n3. Select "Save as PDF"\n4. This will give you the updated PDF with new tokenomics!\n\nThe PDF will include all 7 token categories, vesting schedules, and anti-dump protection.');
              }}
              style={{ 
                padding: '1rem 2rem', 
                background: '#2563EB', 
                color: '#fff', 
                borderRadius: '8px', 
                border: 'none',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
              className="btn-animated"
            >
              <span>📄</span>
              Generate Updated PDF
            </button>
          </div>
        </div>
        
        {/* Whitepaper Highlights */}
        <div className="animate-fade-right">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            border: '2px solid #f0f0f0'
          }} className="card-hover">
            <h4 style={{ color: '#2563EB', marginBottom: '1.5rem', textAlign: 'center' }}>
              Whitepaper Highlights
            </h4>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="pulse-icon">🌍</div>
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Global Impact</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                  Addressing the $590B charitable giving market with blockchain innovation
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="pulse-icon">🔒</div>
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Security First</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                  Multi-signature wallets, time-locks, and comprehensive audit protocols
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="pulse-icon">📈</div>
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Sustainable Growth</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                  Deflationary tokenomics with 5% APY staking rewards and community governance
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="pulse-icon">🤝</div>
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#2563EB' }}>Partnership Ready</h5>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                  Roadmap for 500+ global charity partners and mainstream adoption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
          

      {/* Executive Summary Preview */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }} className="animate-fade-up">
        <h3 style={{ color: '#2563EB', marginBottom: '2rem' }}>Executive Summary</h3>
        <div style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#666' }}>
            <strong style={{ color: '#2563EB' }}>GiveToken (GIVE)</strong> represents a paradigm shift in charitable giving, leveraging blockchain technology to create a transparent, efficient and globally accessible donation ecosystem. Our mission is to eliminate the barriers between generous donors and those in need while ensuring complete transparency and accountability in every transaction.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#666' }}>
            Through smart contracts and the <strong style={{ color: '#2563EB' }}>CharityDAO governance model</strong>, we ensure every donation is traceable, every decision is community-driven, and every impact is measurable. Built on Polygon blockchain for low costs and high scalability.
          </p>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px',
            borderLeft: '4px solid #FFC300'
          }}>
            <p style={{ margin: 0, fontSize: '1rem', color: '#2563EB', fontWeight: 'bold' }}>
              "Together, we can build a more charitable world through blockchain innovation."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhitepaperSection; 