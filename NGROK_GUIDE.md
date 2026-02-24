# How to Share Your Portfolio Online with ngrok

ngrok creates a secure tunnel to your local development server, giving you a public URL to share your portfolio with anyone!

## Quick Start (You have ngrok 3.36.0 installed!)

### Step 1: Start Your Portfolio
First, run your portfolio locally:
```bash
npm run dev
```

Your portfolio will run on `http://localhost:5173` (or similar port - check the terminal output)

### Step 2: Open a New Terminal
Keep the first terminal running, and open a NEW terminal window.

### Step 3: Run ngrok
In the new terminal, run:
```bash
ngrok http 5173
```

Replace `5173` with your actual port number if different.

### Step 4: Get Your Public URL
ngrok will display something like:
```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:5173
```

Copy the `https://abc123.ngrok-free.app` URL and share it with anyone!

## Important Notes

⚠️ **AI Chat Limitation**: The AI chatbot won't work through ngrok because it connects to `localhost:11434` (Ollama). Only you can use the AI chat locally.

✅ **What Works**:
- All animations and design
- Navigation and scrolling
- Project and skill modals
- Contact links
- Everything except AI chat

## Common Issues

**"Blocked request" or "Host not allowed"**
- Your vite.config.js is now configured to allow ngrok hosts
- The configuration includes: `allowedHosts: ['jone-uncharmed-tomeka.ngrok-free.dev']`
- If you get a new ngrok domain, add it to the allowedHosts array in vite.config.js

**"ngrok not found"**
- ngrok is installed! Just make sure you're in the right directory
- Try: `cd "C:\Users\qgee123\OneDrive\Desktop\jullian paragoso4\jullian-paragoso"`

**Wrong Port**
- Check your `npm run dev` output for the actual port
- Usually it's 5173 for Vite, but could be 3000, 8080, etc.
- Use that port number: `ngrok http YOUR_PORT`

**Tunnel Closed**
- Free ngrok tunnels close when you stop ngrok
- Just run `ngrok http 5173` again to get a new URL

**Session Expired**
- Free ngrok sessions expire after 2 hours
- Just restart ngrok to get a new URL

## Advanced: Custom Domain (Optional)

If you want a custom subdomain (requires ngrok account):
```bash
ngrok http 5173 --domain=your-custom-name.ngrok-free.app
```

## Step-by-Step Example

1. **Terminal 1** (Portfolio):
   ```bash
   cd jullian-paragoso
   npm run dev
   ```
   Output: `Local: http://localhost:5173`

2. **Terminal 2** (ngrok):
   ```bash
   ngrok http 5173
   ```
   Output: `Forwarding https://abc123.ngrok-free.app`

3. **Share**: Send `https://abc123.ngrok-free.app` to anyone!

## Tips

- Keep both terminals running while sharing
- The URL changes each time you restart ngrok (free version)
- Great for showing your portfolio to clients or recruiters
- Works on any device with internet access
- Secure HTTPS connection automatically
- **Mobile Optimized**: Your portfolio is now fully responsive and works great on phones and tablets!

## Mobile Optimization Features

Your portfolio now includes:
- ✅ Responsive navigation that adapts to screen size
- ✅ Touch-friendly buttons and links (larger tap targets)
- ✅ Optimized font sizes for mobile readability
- ✅ Proper spacing and layout for small screens
- ✅ Smooth scrolling and touch gestures
- ✅ No horizontal scrolling issues
- ✅ All sections work perfectly on mobile (Home, About, Experience, Projects, Contact)
- ✅ AI Chat modal is mobile-friendly
- ✅ Project and Skill modals work great on mobile

## Stopping ngrok

Press `Ctrl+C` in the ngrok terminal to stop the tunnel.

---

Need help? The ngrok dashboard shows all active tunnels: https://dashboard.ngrok.com
