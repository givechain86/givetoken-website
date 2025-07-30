import React from 'react';

const teamMembers = [
  { name: 'Sait ALAY', role: 'Co-founder & CEO', icon: '👑' },
  { name: 'Ferhat SARIKAYA', role: 'Chief Technology Officer', icon: '🔧' },
  { name: 'Bobie Johnson', role: 'Full-Stack Developer', icon: '💻' },
  { name: 'Charlie Leems', role: 'Frontend Developer', icon: '🎨' },
  { name: 'Ramazan ISIK', role: 'Backend Developer', icon: '⚙️' },
  { name: 'Fatih DEMIR', role: 'Senior Blockchain Developer', icon: '🔗' },
  { name: 'Ilkay CANITEZ', role: 'Chief Financial Officer', icon: '💰' },
  { name: 'Enes SAHIN', role: 'Financial Analyst', icon: '📊' },
  { name: 'Yasin OKTAY', role: 'Lead Developer', icon: '📢' },
  { name: 'Ahmet YILMAZ', role: 'Senior Developer', icon: '🤝' },
  { name: 'Kadir TEKSAS', role: 'Lead Tester & QA', icon: '🔍' },
];

const TeamSection = () => (
  <section id="team" className="section section-dark">
    <div className="container">
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 className="section-title" style={{ color: 'white' }}>Our Team</h2>
        <p className="section-subtitle" style={{ color: '#94a3b8' }}>
          Meet the passionate individuals building the future of charitable giving through blockchain innovation.
        </p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="team-card animate-fade-up">
            <div className="team-avatar">
              {member.icon}
            </div>
            <div className="team-name">{member.name}</div>
            <div className="team-role">{member.role}</div>
          </div>
        ))}
      </div>
      
      {/* Team Values */}
      <div style={{ marginTop: '5rem', textAlign: 'center' }} className="animate-fade-up">
        <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: 'white' }}>
          Built by Innovators, For Changemakers
        </h3>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Our diverse team combines deep technical expertise with passionate commitment to social impact, ensuring GiveToken serves communities worldwide.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Mission-Driven</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Every team member is committed to creating positive social impact through technology innovation.
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Research-First</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Evidence-based development approach with peer-reviewed protocols and scientific methodology.
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Global Perspective</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              International experience building solutions that work across cultures and communities worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TeamSection; 