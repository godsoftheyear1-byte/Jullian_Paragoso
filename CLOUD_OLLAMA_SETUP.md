# Cloud Ollama Setup Guide

## Option 1: Deploy Ollama on Google Cloud VM (Recommended)

### Step 1: Create a VM Instance
```bash
gcloud compute instances create ollama-server \
  --zone=us-central1-a \
  --machine-type=n1-standard-2 \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB \
  --tags=ollama-server
```

### Step 2: SSH into the VM
```bash
gcloud compute ssh ollama-server --zone=us-central1-a
```

### Step 3: Install Ollama on the VM
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Step 4: Configure Ollama to Accept External Connections
```bash
# Create systemd override directory
sudo mkdir -p /etc/systemd/system/ollama.service.d

# Create override file
sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### Step 5: Pull Your Model
```bash
ollama pull hooper216xo/openclaw:latest
```

### Step 6: Create Firewall Rule
```bash
gcloud compute firewall-rules create allow-ollama \
  --allow=tcp:11434 \
  --target-tags=ollama-server \
  --source-ranges=0.0.0.0/0 \
  --description="Allow Ollama API access"
```

### Step 7: Get Your VM's External IP
```bash
gcloud compute instances describe ollama-server \
  --zone=us-central1-a \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
```

Save this IP address - you'll use it as: `http://YOUR_VM_IP:11434`

---

## Option 2: Use Ollama Cloud Service (If Available)

Check https://ollama.com for hosted options.

---

## Security Recommendations

### Add Authentication (Recommended for Production)
Use nginx as a reverse proxy with basic auth:

```bash
sudo apt update
sudo apt install nginx apache2-utils -y

# Create password file
sudo htpasswd -c /etc/nginx/.htpasswd ollama

# Configure nginx
sudo tee /etc/nginx/sites-available/ollama > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        auth_basic "Ollama API";
        auth_basic_user_file /etc/nginx/.htpasswd;
        
        proxy_pass http://localhost:11434;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/ollama /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Use HTTPS with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## Cost Estimation

- n1-standard-2 VM: ~$50/month
- 50GB disk: ~$8/month
- Network egress: Variable

**Total: ~$60-80/month**

To reduce costs:
- Use preemptible instances (cheaper but can be shut down)
- Use smaller machine type for lighter models
- Stop VM when not in use

---

## Monitoring

Check if Ollama is running:
```bash
curl http://YOUR_VM_IP:11434/api/tags
```

View logs:
```bash
sudo journalctl -u ollama -f
```
