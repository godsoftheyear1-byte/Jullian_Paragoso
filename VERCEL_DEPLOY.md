# Deploy to Vercel - Quick Guide

## Option 1: Deploy with Fallback AI (No Ollama Server Needed)

This is the easiest option - the AI chat will use predefined responses.

### Step 1: Push to GitHub (Already Done!)

Your code is already on GitHub.

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository: `godsoftheyear1-byte/Jullian_Paragoso`
5. Configure environment variables:
   - Click "Environment Variables"
   - Add: `VITE_USE_FALLBACK` = `true`
6. Click "Deploy"

That's it! Your site will be live in 2-3 minutes.

### Step 3: Get Your Live URL

After deployment, you'll get a URL like:
```
https://jullian-paragoso.vercel.app
```

Share this URL with anyone - it's live 24/7!

---

## Option 2: Deploy with Real Ollama AI

If you want the full AI experience, you need to deploy Ollama first.

### Step 1: Deploy Ollama to Cloud (See CLOUD_OLLAMA_SETUP.md)

Follow the guide to set up Ollama on Google Cloud VM.

### Step 2: Deploy to Vercel with Ollama

1. Go to https://vercel.com
2. Import your repository
3. Configure environment variables:
   - Add: `VITE_OLLAMA_ENDPOINT` = `http://YOUR_VM_IP:11434`
   - Add: `VITE_USE_FALLBACK` = `false`
4. Click "Deploy"

---

## Update Deployment

After making code changes:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy!

---

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., jullianparagoso.com)
4. Follow DNS configuration instructions

---

## Troubleshooting

### AI Chat Not Working

If using fallback mode (Option 1), the AI should always work with predefined responses.

If using Ollama (Option 2):
- Verify your VM is running: `gcloud compute instances list`
- Test Ollama endpoint: `curl http://YOUR_VM_IP:11434/api/tags`
- Check Vercel environment variables are correct

### Build Errors

Check Vercel deployment logs:
1. Go to your project on Vercel
2. Click "Deployments"
3. Click on the failed deployment
4. View logs

---

## Cost

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Automatic CI/CD

**Cost: $0/month** (unless you exceed free tier limits)

---

## Quick Commands

```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy from command line
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

---

## What You Get

✅ Always online (24/7)
✅ Fast global CDN
✅ Automatic HTTPS
✅ Auto-deploy on git push
✅ Preview deployments for branches
✅ Analytics dashboard
✅ Custom domains support

Your portfolio is production-ready!
