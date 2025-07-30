import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeSection from './HomeSection';
import AboutSection from './AboutSection';
import TokenomicsSection from './TokenomicsSection';
import HowToBuySection from './HowToBuySection';
import RoadmapSection from './RoadmapSection';
import CommunitySection from './CommunitySection';
import ContactSection from './ContactSection';
import TeamSection from './TeamSection';
import WhitepaperSection from './WhitepaperSection';
import logo from './assets/givetoken-logo.svg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav style={{ position: 'sticky', top: 0, background: '#fff', padding: '1rem', zIndex: 100, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', marginRight: '2rem', textDecoration: 'none' }}>
                      <img src={logo} alt="GiveToken Logo" style={{ height: 40, marginRight: 8 }} />
                              <span style={{ fontWeight: 'bold', color: '#2563EB', fontSize: 20 }}>GiveToken</span>
        </a>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '8px',
            width: '30px',
            height: '30px',
            position: 'relative'
          }}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'nav-open' : ''}`} style={{ flex: 1 }}>
          <a href="#about" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>About GIVE</a>
          <a href="#tokenomics" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>Tokenomics</a>
          <a href="#how-to-buy" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>How to Buy</a>
          <a href="#roadmap" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>Roadmap</a>
          <a href="#team" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>Team</a>
          <a href="#whitepaper" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>Whitepaper</a>
          <a href="#community" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>Community</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} style={{ margin: '0 1rem' }}>Contact</a>
        </div>
      </nav>
      {/* Sections */}
      <HomeSection />
      <AboutSection />
      <TokenomicsSection />
      <HowToBuySection />
      <RoadmapSection />
      <TeamSection />
      <WhitepaperSection />
      <CommunitySection />
      <ContactSection />
    </div>
  );
}

export default App
