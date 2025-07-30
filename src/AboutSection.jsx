import React from 'react';

const AboutSection = () => (
  <section id="about" className="section section-light">
    <div className="container">
      <div className="animate-fade-up">
        <h2 className="section-title">Our World Is Changing. Together, We Can Change It For The Better.</h2>
        <p className="section-subtitle">
          GiveToken is a proof-of-stake blockchain platform: the first charitable giving solution to be founded on peer-reviewed research and developed through evidence-based methods.
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
        <div className="animate-fade-left">
          <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: '#1e293b' }}>
            Define Your Possible. Change Your World.
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#64748b' }}>
            GiveToken (GIVE) is a decentralized token designed to revolutionize charitable giving. By leveraging blockchain technology, GIVE ensures transparency, security, and global reach for donations.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', color: '#64748b' }}>
            We combine pioneering technologies to provide unparalleled security and sustainability to charitable organizations, donation systems, and social impact initiatives.
          </p>
          <div style={{ 
            background: 'linear-gradient(135deg, #e0f2fe, #f3e5f5)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            borderLeft: '4px solid #2563EB'
          }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#2563EB', fontWeight: 500 }}>
              "With a leading team of engineers, GiveToken exists to redistribute power from unaccountable structures to the margins – to individuals – and be an enabling force for positive change and progress."
            </p>
          </div>
        </div>
        
        <div className="animate-fade-right">
          <div className="feature-grid" style={{ margin: 0 }}>
            <div className="feature-card">
              <div className="feature-icon">💝</div>
              <h3 className="feature-title">Transparent Charity</h3>
              <p className="feature-description">
                Every donation is tracked on-chain with complete visibility into fund utilization and impact measurement.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3 className="feature-title">Blockchain Security</h3>
              <p className="feature-description">
                Built on Polygon with enterprise-grade security, smart contracts, and decentralized governance.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '2rem', color: '#1e293b' }}>
          A History Of Impossible, Made Possible
        </h3>
      </div>
      
      <div className="feature-grid">
        <div className="feature-card animate-fade-up">
          <div className="feature-icon">🛡️</div>
          <h3 className="feature-title">Proof-of-Stake Protocol</h3>
          <p className="feature-description">
            The most environmentally sustainable blockchain protocol with 99.9% lower energy consumption than traditional systems.
          </p>
        </div>
        
        <div className="feature-card animate-fade-up">
          <div className="feature-icon">🔬</div>
          <h3 className="feature-title">Evidence-Based Development</h3>
          <p className="feature-description">
            Research-driven approach to platform development with peer-reviewed protocols and academic partnerships.
          </p>
        </div>
        
        <div className="feature-card animate-fade-up">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-title">Secure Transactions</h3>
          <p className="feature-description">
            Enterprise-grade security protecting donor data and ensuring safe, reliable charitable transactions.
          </p>
        </div>
        
        <div className="feature-card animate-fade-up">
          <div className="feature-icon">🎯</div>
          <h3 className="feature-title">Incentivized Participation</h3>
          <p className="feature-description">
            Token rewards for community governance, charity verification, and long-term platform engagement.
          </p>
        </div>
        
        <div className="feature-card animate-fade-up">
          <div className="feature-icon">♻️</div>
          <h3 className="feature-title">Scalable & Sustainable</h3>
          <p className="feature-description">
            Designed for global scale with sustainable tokenomics and environmental responsibility at its core.
          </p>
        </div>
        
        <div className="feature-card animate-fade-up">
          <div className="feature-icon">🌐</div>
          <h3 className="feature-title">Open Ecosystem</h3>
          <p className="feature-description">
            Inclusive platform welcoming all charitable organizations, donors, and communities worldwide.
          </p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div style={{ textAlign: 'center', marginTop: '5rem' }} className="animate-fade-up">
        <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>
          GiveToken restores trust to global charitable systems
        </h3>
        <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Creating, through science, a more secure, transparent, and sustainable foundation for individuals to donate, organizations to operate, and communities to thrive.
        </p>
        <a href="#tokenomics" className="btn-primary">
          <span>📊</span>
          Explore Tokenomics
        </a>
      </div>
    </div>
  </section>
);

export default AboutSection; 