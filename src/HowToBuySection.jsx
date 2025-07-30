import React from 'react';

const HowToBuySection = () => (
  <section id="how-to-buy" style={{ padding: '4rem 0', background: '#fafafa' }}>
    <h2>How to Buy GIVE</h2>
    <ol style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'left' }}>
      <li>Install a crypto wallet (e.g., MetaMask).</li>
      <li>Fund your wallet with MATIC (Polygon network).</li>
      <li>Go to <a href="https://quickswap.exchange/" target="_blank" rel="noopener noreferrer">QuickSwap</a>.</li>
      <li>Connect your wallet and search for GIVE using the contract address.</li>
      <li>Swap MATIC for GIVE tokens.</li>
      <li>Confirm the transaction and check your wallet for GIVE.</li>
    </ol>
  </section>
);

export default HowToBuySection; 