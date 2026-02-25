#!/bin/bash

# Deployment script for Google Cloud Run

echo "🚀 Deploying Jullian's Portfolio to Google Cloud Run..."

# Set your project ID
PROJECT_ID="your-project-id"
REGION="us-central1"
SERVICE_NAME="jullian-portfolio"

# Set the project
gcloud config set project $PROJECT_ID

# Build and deploy
echo "📦 Building and deploying..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars VITE_OLLAMA_ENDPOINT=http://YOUR_VM_IP:11434

echo "✅ Deployment complete!"
echo "🌐 Your app is now live!"
