import React from 'react';

const ContactSection = () => (
  <section id="contact" style={{ padding: '4rem 0' }}>
    <h2>Contact Us</h2>
    <form style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input type="text" placeholder="Your Name" required style={{ padding: '0.5rem' }} />
      <input type="email" placeholder="Your Email" required style={{ padding: '0.5rem' }} />
      <textarea placeholder="Your Message" required style={{ padding: '0.5rem' }} rows={4} />
      <button type="submit" style={{ padding: '0.75rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Send Message</button>
    </form>
    <p style={{ textAlign: 'center' }}>Or email us at <a href="mailto:info@givechaintoken.org">info@givechaintoken.org</a></p>
  </section>
);

export default ContactSection; 