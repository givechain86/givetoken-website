# 🚀 How to Start the Development Server

## Quick Start

1. **Open Terminal** (Terminal.app or iTerm)

2. **Navigate to project:**
   ```bash
   cd /Users/saita/GiveChainToken-Web/givechain-token-web
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - The server will show a URL (usually `http://localhost:5173`)
   - Or manually open: http://localhost:5173

## If Port 5173 is Busy

The server will automatically use the next available port (5174, 5175, etc.)
Check the terminal output for the actual URL.

## Troubleshooting

### "Cannot find module" errors:
```bash
npm install
```

### Port already in use:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Then start again
npm run dev
```

### Permission errors:
Make sure you're running the command in YOUR terminal, not through the IDE agent.

## Expected Output

When successful, you should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Then open http://localhost:5173 in your browser!
