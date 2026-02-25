# Complete Deployment Guide - Always Online Portfolio

This guide will help you deploy your portfolio so it's accessible 24/7, even when your computer is off.

## Prerequisites

- Google Cloud account (free tier available)
- gcloud CLI installed and configured

## Step 1: Deploy Ollama Server (AI Backend)

### Create and Configure VM

```bash
# Create VM instance
gcloud compute instances create ollama-server \
  --zone=us-central1-a \
  --machine-type=n1-standard-2 \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB \
  --tags=ollama-server

# SSH into the VM
gcloud compute ssh ollama-server --zone=us-central1-a
```

### Inside the VM, install Ollama:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Configure to accept external connections
sudo mkdir -p /etc/systemd/system/ollama.service.d
sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF

# Restart Ollama
sudo systemctl daemon-reload
sudo systemctl restart ollama

# Pull your model
ollama pull hooper216xo/openclaw:latest

# Exit VM
exit
```

### Open Firewall

```bash
gcloud compute firewall-rules create allow-ollama \
  --allow=tcp:11434 \
  --target-tags=ollama-server \
  --source-ranges=0.0.0.0/0
```

### Get VM IP Address

```bash
gcloud compute instances describe ollama-server \
  --zone=us-central1-a \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
```

**Save this IP!** You'll need it in the next step.

## Step 2: Configure Your App

### Update .env file

```bash
# Edit .env file
nano .env
```

Replace with your VM IP:
```
VITE_OLLAMA_ENDPOINT=http://YOUR_VM_IP:11434
```

### Test locally (optional)

```bash
npm run dev
```

Open the AI chat and verify it connects to your cloud Ollama instance.

## Step 3: Deploy Frontend to Cloud Run

### Update deploy.sh

```bash
nano deploy.sh
```

Replace:
- `your-project-id` with your Google Cloud project ID
- `YOUR_VM_IP` with your Ollama VM IP address

### Make script executable and run

```bash
chmod +x deploy.sh
./deploy.sh
```

Or deploy manually:

```bash
gcloud run deploy jullian-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars VITE_OLLAMA_ENDPOINT=http://YOUR_VM_IP:11434
```

## Step 4: Get Your Live URL

After deployment completes, you'll see:

```
Service URL: https://jullian-portfolio-xxxxx-uc.a.run.app
```

**This is your always-online URL!** Share it with anyone.

## Alternative: Deploy to Vercel (Easier, but requires separate Ollama setup)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Set environment variable
vercel env add VITE_OLLAMA_ENDPOINT

# Enter your Ollama endpoint when prompted
# http://YOUR_VM_IP:11434

# Deploy
vercel --prod
```

## Cost Breakdown

### Google Cloud Run (Frontend)
- Free tier: 2 million requests/month
- After free tier: ~$0.40 per million requests
- **Estimated: $0-5/month**

### Google Compute Engine (Ollama VM)
- n1-standard-2: ~$50/month
- 50GB disk: ~$8/month
- **Estimated: ~$60/month**

### Total: ~$60-65/month

## Cost Optimization Tips

1. **Use Preemptible VM** (saves 60-80%):
```bash
gcloud compute instances create ollama-server \
  --preemptible \
  --zone=us-central1-a \
  --machine-type=n1-standard-2
```

2. **Stop VM when not needed**:
```bash
# Stop
gcloud compute instances stop ollama-server --zone=us-central1-a

# Start
gcloud compute instances start ollama-server --zone=us-central1-a
```

3. **Use smaller machine** for lighter models:
```bash
--machine-type=e2-medium  # ~$25/month
```

## Monitoring

### Check if services are running:

```bash
# Check Ollama
curl http://YOUR_VM_IP:11434/api/tags

# Check Cloud Run
curl https://your-app-url.run.app
```

### View logs:

```bash
# Ollama logs
gcloud compute ssh ollama-server --zone=us-central1-a
sudo journalctl -u ollama -f

# Cloud Run logs
gcloud run services logs read jullian-portfolio --region=us-central1
```

## Troubleshooting

### AI Chat not connecting:

1. Verify Ollama is running:
```bash
curl http://YOUR_VM_IP:11434/api/tags
```

2. Check firewall rules:
```bash
gcloud compute firewall-rules list
```

3. Verify environment variable:
```bash
gcloud run services describe jullian-portfolio --region=us-central1
```

### Update deployment:

```bash
# After making code changes
./deploy.sh
```

## Security Recommendations

1. **Add CORS restrictions** to Ollama
2. **Use HTTPS** for Ollama (setup nginx with Let's Encrypt)
3. **Add rate limiting** to prevent abuse
4. **Use Cloud Armor** for DDoS protection

See CLOUD_OLLAMA_SETUP.md for detailed security setup.

## Success!

Your portfolio is now:
- ✅ Always online (24/7)
- ✅ Accessible from anywhere
- ✅ AI chat fully functional
- ✅ Automatically scaled
- ✅ Professional domain-ready

Share your live URL with potential employers and clients!
