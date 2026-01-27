# 🔄 How to Update the Website

## Quick Overview

Your changes to `ImpactMissionSection.jsx` are already saved. Here's how to see them and deploy:

---

## 📍 Option 1: View Changes Locally (Development)

### Step 1: Start Development Server
```bash
cd /Users/saita/GiveChainToken-Web/givechain-token-web
npm run dev
```

### Step 2: Open Browser
- Go to: **http://localhost:5000**
- Changes will **automatically reload** (Hot Module Replacement)
- No need to refresh manually!

### What You'll See:
- ✅ Updated dates: 2024 → 2025
- ✅ Updated fees: 1-2% → 3-5%
- ✅ All your changes reflected immediately

---

## 🚀 Option 2: Build & Deploy to Production

### Step 1: Build for Production
```bash
cd /Users/saita/GiveChainToken-Web/givechain-token-web
npm run build
```

This creates an optimized `dist` folder with your updated website.

### Step 2: Test Production Build Locally
```bash
npm run serve
```
Then open: **http://localhost:4000** to preview the production build.

### Step 3: Deploy to Production

#### **Option A: Vercel (Recommended - Easiest)**

1. **If you haven't connected yet:**
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

2. **If already connected:**
   - Just push to GitHub:
   ```bash
   git add .
   git commit -m "Update ImpactMissionSection: 2025 dates and 3-5% fees"
   git push
   ```
   - Vercel will **automatically deploy** your changes!

#### **Option B: Netlify**

1. Go to https://netlify.com
2. Drag & drop your `dist` folder, OR
3. Connect GitHub repo for auto-deployments

#### **Option C: GitHub Pages**

```bash
npm run deploy
```

This will deploy to: `https://donatetoken.org` (or your configured domain)

#### **Option D: Manual Upload**

1. After `npm run build`, upload the `dist` folder contents to your web server
2. Replace old files with new ones

---

## 📝 Summary of Your Changes

You updated:
- ✅ **Dates**: 2024 → 2025 (Giving USA reports)
- ✅ **Fees**: 1-2% → 3-5% (GiveToken fees)
- ✅ All references to "Giving USA 2024" → "Giving USA 2025"

These changes are in: `src/ImpactMissionSection.jsx`

---

## 🔍 Verify Changes

### Before Deploying:
1. ✅ Check locally: `npm run dev` → http://localhost:5000
2. ✅ Test production build: `npm run build` → `npm run serve`
3. ✅ Verify all text updates are correct
4. ✅ Check mobile responsiveness

### After Deploying:
1. ✅ Visit your live website
2. ✅ Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to clear cache
3. ✅ Verify changes are visible
4. ✅ Test on mobile device

---

## ⚡ Quick Commands Reference

```bash
# Development (see changes live)
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve

# Deploy to GitHub Pages
npm run deploy
```

---

## 🎯 Recommended Workflow

1. **Make changes** (you've done this ✅)
2. **Test locally**: `npm run dev` → http://localhost:5000
3. **Verify everything looks good**
4. **Build**: `npm run build`
5. **Deploy**: Push to GitHub (if using Vercel/Netlify) or run `npm run deploy`

---

## ❓ Need Help?

- **Changes not showing?** → Hard refresh browser (Ctrl+Shift+R)
- **Build errors?** → Check Node.js version (need 18+)
- **Deployment issues?** → Check your hosting platform's documentation

---

**Your changes are ready!** Just start the dev server to see them, or build and deploy when ready! 🚀
