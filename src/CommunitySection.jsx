import React from 'react';

const CommunitySection = () => (
  <section id="community" style={{ 
    padding: '80px 0', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🌍 Join Our Global Community
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Connect with fellow changemakers, stay updated on GiveToken developments, and be part of the charitable revolution
        </p>
      </div>

      {/* Community Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px',
        marginBottom: '40px'
      }}>
        
        {/* Telegram */}
        <a 
          href="https://t.me/+_VP0FZy4Dt4zOTVh" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            textDecoration: 'none',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            display: 'block'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📱</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>Telegram</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            Real-time updates, community discussions, and instant support
          </p>
        </a>

        {/* X (Twitter) */}
        <a 
          href="https://twitter.com/givechain25" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            textDecoration: 'none',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            display: 'block'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🐦</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>X (Twitter)</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            Latest news, announcements, and community engagement
          </p>
        </a>

        {/* Discord */}
        <a 
          href="https://discord.gg/exNQBK5z" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            textDecoration: 'none',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            display: 'block'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎮</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>Discord</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            Voice chats, gaming community, and deeper discussions
          </p>
        </a>

        {/* YouTube */}
        <a 
          href="https://www.youtube.com/@givechain" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            textDecoration: 'none',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            display: 'block'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📺</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>YouTube</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            Educational content, tutorials, and project updates
          </p>
        </a>

      </div>

      {/* Call to Action */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
          🚀 Be Part of the Movement
        </h3>
        <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '20px' }}>
          Join thousands of supporters working together to revolutionize charitable giving through blockchain technology
        </p>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Follow us on all platforms to stay connected and never miss important updates!
        </div>
      </div>

    </div>
  </section>
);

export default CommunitySection; 