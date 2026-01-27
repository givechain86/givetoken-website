# GiveToken Website Deployment Guide

## 🚀 Production Deployment Steps

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Domain name configured (givetoken.org)
- Hosting platform account (Vercel, Netlify, or custom server)

### 1. Environment Setup
Create `.env.production` file:
```bash
VITE_APP_ENV=production
VITE_APP_NAME=GiveToken
VITE_APP_URL=https://givetoken.org
VITE_CONTRACT_ADDRESS=0xf45092BAddf17f6E4fBe18962814C90f8F983e34
VITE_NETWORK_NAME=Polygon
VITE_CHAIN_ID=137
VITE_RPC_URL=https://polygon-rpc.com/
VITE_EXPLORER_URL=https://polygonscan.com
```

### 2. Build for Production
```bash
# Install dependencies
npm install

# Run production build
npm run build:prod

# Test production build locally
npm run serve
```

### 3. Deployment Options

#### Option A: Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure custom domain: `givetoken.org`
5. Deploy automatically on push to main branch

#### Option B: Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure custom domain and SSL

#### Option C: GitHub Pages
```bash
# Deploy to GitHub Pages
npm run deploy
```

#### Option D: Custom Server
1. Upload `dist` folder contents to web server
2. Configure web server to serve static files
3. Set up SSL certificate
4. Configure domain DNS

### 4. Post-Deployment Checklist

#### SEO & Analytics
- [ ] Verify Google Search Console setup
- [ ] Add Google Analytics tracking code
- [ ] Submit sitemap.xml to search engines
- [ ] Test Open Graph tags on social media

#### Performance
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test loading speed with GTmetrix
- [ ] Verify mobile responsiveness
- [ ] Check all external links work

#### Security
- [ ] Verify SSL certificate is active
- [ ] Test HTTPS redirect
- [ ] Check CSP headers if applicable
- [ ] Verify no sensitive data in client code

#### Functionality
- [ ] Test all navigation links
- [ ] Verify contract address copy functionality
- [ ] Test MetaMask integration
- [ ] Check responsive design on multiple devices
- [ ] Test contact form (if backend connected)

### 5. Monitoring & Maintenance

#### Regular Tasks
- Update dependencies monthly
- Monitor website uptime
- Check for broken links
- Update content as needed
- Monitor smart contract interactions

#### Performance Monitoring
- Set up error tracking (Sentry recommended)
- Monitor Core Web Vitals
- Track user analytics
- Monitor server/CDN performance

### 6. Backup & Recovery
- Keep source code in version control (GitHub)
- Regular backups of any dynamic content
- Document deployment process
- Maintain staging environment for testing

## 🔧 Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version compatibility
2. **Assets not loading**: Verify base URL in vite.config.js
3. **MetaMask not working**: Check network configuration
4. **SEO issues**: Verify meta tags in index.html

### Support
- Technical issues: Check GitHub issues
- Deployment help: Refer to hosting platform docs
- Smart contract questions: Verify on PolygonScan

---

**Last Updated**: October 29, 2024
**Version**: 1.0.0



