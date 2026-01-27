import React, { useState } from 'react';

const LegalComplianceSection = () => {
  const [activeDocument, setActiveDocument] = useState('terms');

  const documents = {
    terms: {
      title: 'Terms of Service',
      content: [
        {
          section: '1. Token Sale Terms',
          content: `
            • GIVE tokens are utility tokens designed for charitable donations and governance
            • Minimum purchase: $100 USD equivalent
            • Maximum purchase: $50,000 USD equivalent per individual
            • KYC/AML verification required for purchases over $1,000
            • Token distribution occurs within 48 hours of payment confirmation
          `
        },
        {
          section: '2. Eligibility',
          content: `
            • Participants must be 18+ years old
            • Residents of restricted jurisdictions are prohibited from participating
            • Accredited investors only for purchases over $10,000
            • Corporate entities require additional documentation
          `
        },
        {
          section: '3. Risk Disclosure',
          content: `
            • Cryptocurrency investments are highly speculative and risky
            • Token value may fluctuate significantly
            • No guarantee of returns or profits
            • Regulatory changes may affect token utility
            • Smart contract risks and technical vulnerabilities exist
          `
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      content: [
        {
          section: 'Data Collection',
          content: `
            We collect personal information necessary for KYC/AML compliance including:
            • Full name and date of birth
            • Government-issued identification
            • Proof of address
            • Financial information for large purchases
            • Transaction history and wallet addresses
          `
        },
        {
          section: 'Data Usage',
          content: `
            Your data is used exclusively for:
            • Regulatory compliance and reporting
            • Transaction processing and verification
            • Customer support and communication
            • Security and fraud prevention
            • Legal obligations and law enforcement requests
          `
        },
        {
          section: 'Data Protection',
          content: `
            • All data encrypted using industry-standard protocols
            • Access limited to authorized personnel only
            • Regular security audits and penetration testing
            • GDPR and CCPA compliance
            • Data retention policies strictly enforced
          `
        }
      ]
    },
    disclaimer: {
      title: 'Investment Disclaimer',
      content: [
        {
          section: 'Not an Investment Contract',
          content: `
            GIVE tokens are utility tokens, not securities or investment contracts.
            They provide access to charitable donation features and governance rights
            within the GiveToken ecosystem. This token sale is not an offer of securities
            in any jurisdiction.
          `
        },
        {
          section: 'No Financial Advice',
          content: `
            Nothing on this website constitutes financial, investment, legal, or tax advice.
            Participants should consult with qualified professionals before making any
            investment decisions. Past performance does not indicate future results.
          `
        },
        {
          section: 'Regulatory Compliance',
          content: `
            GiveToken complies with applicable laws and regulations. Participants are
            responsible for compliance with their local laws. This offering may not be
            suitable for all investors and jurisdictions.
          `
        }
      ]
    }
  };

  const restrictedCountries = [
     'Irak', 'North Korea', 'Iran', 'Syria', 'Russia', 'Belarus'
  ];

  return (
    <section id="legal-compliance" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      color: 'white'
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
            ⚖️ Legal & Compliance
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Important legal information, terms of service, and regulatory compliance details
          </p>
        </div>

        {/* Document Tabs */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {Object.entries(documents).map(([key, doc]) => (
            <button
              key={key}
              onClick={() => setActiveDocument(key)}
              style={{
                padding: '15px 30px',
                margin: '0 10px',
                background: activeDocument === key ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                border: 'none',
                borderBottom: activeDocument === key ? '3px solid #fbbf24' : '3px solid transparent',
                color: activeDocument === key ? '#fbbf24' : 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              {doc.title}
            </button>
          ))}
        </div>

        {/* Document Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          
          {/* Main Document */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              marginBottom: '30px',
              color: '#fbbf24'
            }}>
              {documents[activeDocument].title}
            </h3>

            {documents[activeDocument].content.map((section, index) => (
              <div key={index} style={{ marginBottom: '30px' }}>
                <h4 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  marginBottom: '15px',
                  color: '#e5e7eb'
                }}>
                  {section.section}
                </h4>
                <div style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.6', 
                  opacity: 0.9,
                  whiteSpace: 'pre-line'
                }}>
                  {section.content}
                </div>
              </div>
            ))}

            {/* Legal Footer */}
            <div style={{
              marginTop: '40px',
              padding: '20px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#fbbf24' }}>
                ⚠️ Important Notice
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                By participating in the GIVE token sale, you acknowledge that you have read, 
                understood, and agree to be bound by these terms and conditions. This document 
                was last updated on July 03, 2025.
              </div>
            </div>
          </div>

          {/* Sidebar Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* KYC Requirements */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: '#fbbf24'
              }}>
                🔍 KYC Requirements
              </h4>
              
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Tier 1 ($100 - $999):</strong><br/>
                  • Email verification<br/>
                  • Basic personal information
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong>Tier 2 ($1,000 - $9,999):</strong><br/>
                  • Government ID verification<br/>
                  • Proof of address<br/>
                  • Enhanced due diligence
                </div>
                
                <div>
                  <strong>Tier 3 ($10,000+):</strong><br/>
                  • Accredited investor status<br/>
                  • Source of funds verification<br/>
                  • Additional documentation
                </div>
              </div>
            </div>

            {/* Restricted Jurisdictions */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: '#fbbf24'
              }}>
                🚫 Restricted Countries
              </h4>
              
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
                <div style={{ marginBottom: '15px' }}>
                  Residents of the following jurisdictions are not eligible to participate:
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '8px',
                  marginBottom: '15px'
                }}>
                  {restrictedCountries.map(country => (
                    <span key={country} style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                      {country}
                    </span>
                  ))}
                </div>
                
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                  This list may be updated based on regulatory developments.
                </div>
              </div>
            </div>

            {/* Contact Legal */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: '#fbbf24'
              }}>
                📞 Legal Contact
              </h4>
              
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Legal Department</strong><br/>
                  legal@givetoken.org
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Compliance Office</strong><br/>
                  compliance@givetoken.org
                </div>
                
                <div>
                  <strong>Business Hours</strong><br/>
                  Monday - Friday, 9 AM - 6 PM UTC
                </div>
              </div>

              <button style={{
                width: '100%',
                padding: '12px',
                marginTop: '20px',
                borderRadius: '10px',
                border: '1px solid rgba(251, 191, 36, 0.5)',
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#fbbf24',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(251, 191, 36, 0.2)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(251, 191, 36, 0.1)'}
              >
                📧 Contact Legal Team
              </button>
            </div>
          </div>
        </div>

        {/* Security Certifications */}
        <div style={{ marginTop: '60px' }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '40px',
            color: '#fbbf24'
          }}>
            🔒 Security & Certifications
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { 
                title: 'Smart Contract Audit', 
                status: 'Completed', 
                provider: 'CertiK', 
                icon: '🛡️',
                color: '#10b981'
              },
              { 
                title: 'KYC Provider', 
                status: 'Verified', 
                provider: 'Jumio', 
                icon: '🔍',
                color: '#3b82f6'
              },
              { 
                title: 'Legal Opinion', 
                status: 'Obtained', 
                provider: 'TokenLegal', 
                icon: '⚖️',
                color: '#8b5cf6'
              },
              { 
                title: 'Security Assessment', 
                status: 'Passed', 
                provider: 'BlockSec', 
                icon: '🔒',
                color: '#f59e0b'
              }
            ].map((cert, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center',
                border: `1px solid ${cert.color}40`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{cert.icon}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {cert.title}
                </h4>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: cert.color, marginBottom: '5px' }}>
                  {cert.status}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>by {cert.provider}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalComplianceSection; 