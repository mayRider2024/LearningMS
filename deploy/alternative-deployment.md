# Alternative Deployment Methods (No gcloud CLI needed)

## Option 1: Google Cloud Console Web UI

### Step 1: Create Resources via Web Console
1. Go to https://console.cloud.google.com
2. Create a new project or select existing one

### Step 2: Create Cloud SQL Instance
1. Navigate to SQL → Create Instance → MySQL
2. Configure:
   - Instance ID: `frappe-learning-db`
   - Version: MySQL 8.0
   - Region: us-central1
   - Machine type: db-f1-micro (for testing)
   - Storage: 10GB SSD

### Step 3: Create Redis Instance
1. Navigate to Memorystore → Redis → Create Instance
2. Configure:
   - Instance ID: `frappe-learning-redis`
   - Region: us-central1
   - Capacity: 1GB Basic Tier

### Step 4: Deploy via Cloud Build
1. Navigate to Cloud Build → Triggers → Create Trigger
2. Connect your GitHub repository
3. Use this build configuration:

```yaml
steps:
# Build the container image
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-f', 'deploy/Dockerfile.gcp', '-t', 'gcr.io/$PROJECT_ID/frappe-learning:latest', '.']
# Push the container image to Container Registry
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'gcr.io/$PROJECT_ID/frappe-learning:latest']
# Deploy container image to Cloud Run
- name: 'gcr.io/cloud-builders/gcloud'
  args:
  - 'run'
  - 'deploy'
  - 'frappe-learning'
  - '--image'
  - 'gcr.io/$PROJECT_ID/frappe-learning:latest'
  - '--region'
  - 'us-central1'
  - '--allow-unauthenticated'
  - '--set-env-vars'
  - 'DB_HOST=YOUR_DB_IP,REDIS_HOST=YOUR_REDIS_IP,SITE_NAME=your-domain.com'
```

## Option 2: GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Google Cloud Run

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - id: 'auth'
      uses: 'google-github-actions/auth@v0'
      with:
        credentials_json: '${{ secrets.GCP_SA_KEY }}'
        
    - name: 'Set up Cloud SDK'
      uses: 'google-github-actions/setup-gcloud@v0'
      
    - name: 'Build and Push Image'
      run: |
        gcloud builds submit --tag gcr.io/${{ secrets.GCP_PROJECT }}/frappe-learning:latest -f deploy/Dockerfile.gcp .
        
    - name: 'Deploy to Cloud Run'
      run: |
        gcloud run deploy frappe-learning \
          --image gcr.io/${{ secrets.GCP_PROJECT }}/frappe-learning:latest \
          --region us-central1 \
          --allow-unauthenticated \
          --set-env-vars DB_HOST=${{ secrets.DB_HOST }},REDIS_HOST=${{ secrets.REDIS_HOST }}
```

## Option 3: Docker + Local Build + Manual Upload

```powershell
# Build locally
docker build -f deploy/Dockerfile.gcp -t frappe-learning .

# Tag for Google Container Registry
docker tag frappe-learning gcr.io/YOUR_PROJECT_ID/frappe-learning:latest

# Configure Docker for GCR (one-time setup)
gcloud auth configure-docker

# Push to GCR
docker push gcr.io/YOUR_PROJECT_ID/frappe-learning:latest
```

Then deploy via Cloud Console → Cloud Run → Create Service → Select your image.

## Option 4: Use Frappe Cloud (Managed Hosting)

The easiest option mentioned in the original README:
1. Go to https://frappecloud.com/lms/signup
2. Sign up for managed hosting
3. No setup required - they handle everything

Choose the method that works best for your setup!
