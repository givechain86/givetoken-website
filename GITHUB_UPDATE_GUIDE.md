# 📤 How to Update on GitHub

## Quick Steps

### Step 1: Check Your Changes
```bash
cd /Users/saita/GiveChainToken-Web/givechain-token-web
git status
```

### Step 2: Add All Changes
```bash
git add .
```

Or add specific files:
```bash
git add src/ImpactMissionSection.jsx
```

### Step 3: Commit Changes
```bash
git commit -m "Update ImpactMissionSection: 2025 dates and 3-5% fees"
```

### Step 4: Push to GitHub
```bash
git push origin main
```

---

## 📝 Detailed Instructions

### Option 1: Command Line (Recommended)

1. **Open Terminal** and navigate to your project:
   ```bash
   cd /Users/saita/GiveChainToken-Web/givechain-token-web
   ```

2. **Check what changed:**
   ```bash
   git status
   ```
   This shows all modified files.

3. **Add your changes:**
   ```bash
   # Add all changes
   git add .
   
   # OR add specific files only
   git add src/ImpactMissionSection.jsx
   ```

4. **Commit with a message:**
   ```bash
   git commit -m "Update ImpactMissionSection: 2025 dates and 3-5% fees"
   ```
   
   Good commit messages:
   - `"Update ImpactMissionSection: 2025 dates and 3-5% fees"`
   - `"Update website content: 2025 data and fee adjustments"`
   - `"Update ImpactMissionSection.jsx with latest statistics"`

5. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   
   If you're asked for credentials:
   - Use a **Personal Access Token** (not your password)
   - Or use SSH keys

6. **Verify on GitHub:**
   - Go to: https://github.com/givechain86/givetoken-website
   - You should see your latest commit!

---

### Option 2: Using GitHub Desktop (Easier)

1. **Download GitHub Desktop** (if not installed):
   - https://desktop.github.com/

2. **Open GitHub Desktop:**
   - It will show all your changes
   - Review the files that changed

3. **Write commit message:**
   - "Update ImpactMissionSection: 2025 dates and 3-5% fees"

4. **Click "Commit to main"**

5. **Click "Push origin"** to upload to GitHub

---

### Option 3: Using VS Code / Cursor

1. **Open Source Control** (Ctrl+Shift+G or Cmd+Shift+G)

2. **Stage Changes:**
   - Click "+" next to files you want to commit
   - Or click "+" next to "Changes" to add all

3. **Write Commit Message:**
   - "Update ImpactMissionSection: 2025 dates and 3-5% fees"

4. **Click "Commit"** (checkmark icon)

5. **Click "Sync Changes"** or "Push" to upload

---

## 🔐 Authentication Issues?

If `git push` asks for credentials:

### Use Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use it as password when pushing

### Or Use SSH:
```bash
# Check if you have SSH key
ls -la ~/.ssh

# If not, generate one:
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub:
# 1. Copy public key: cat ~/.ssh/id_ed25519.pub
# 2. Go to: https://github.com/settings/keys
# 3. Add new SSH key
```

---

## ✅ Complete Example

```bash
# Navigate to project
cd /Users/saita/GiveChainToken-Web/givechain-token-web

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Update ImpactMissionSection: 2025 dates and 3-5% fees"

# Push to GitHub
git push origin main
```

---

## 🎯 What Gets Updated?

Your changes include:
- ✅ `src/ImpactMissionSection.jsx` - Updated dates and fees
- ✅ Other modified files in your project

All changes will be pushed to:
**https://github.com/givechain86/givetoken-website**

---

## 🚀 After Pushing

If you're using **Vercel** or **Netlify**:
- They will **automatically deploy** your changes!
- Check your deployment dashboard for status

If using **GitHub Pages**:
- Run: `npm run deploy` after pushing
- Or enable GitHub Actions for auto-deploy

---

## ❓ Troubleshooting

### "Permission denied"
→ Use Personal Access Token or SSH keys

### "Branch is behind"
```bash
git pull origin main
# Then push again
git push origin main
```

### "Nothing to commit"
→ Your changes are already committed, just push:
```bash
git push origin main
```

---

**Your repository:** https://github.com/givechain86/givetoken-website

Ready to push! 🚀
