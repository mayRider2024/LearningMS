# Simple Manual Deployment Guide

## Step 1: Create Resources via Google Cloud Console

### 1.1 Create Cloud SQL Database
1. Go to https://console.cloud.google.com/sql
2. Click "Create Instance"
3. Choose MySQL
4. Configure:
   - Instance ID: `frappe-db`
   - Root password: `SecurePassword123!`
   - Region: `us-central1`
   - Machine type: `db-f1-micro`
5. Click "Create"
6. Note the **Public IP address** from the Overview tab

### 1.2 Create Redis Instance  
1. Go to https://console.cloud.google.com/memorystore/redis
2. Click "Create Instance"
3. Configure:
   - Instance ID: `frappe-redis`
   - Region: `us-central1`
   - Capacity: `1 GB`
   - Tier: `Basic`
4. Click "Create"
5. Note the **IP address** from the instance details

### 1.3 Build and Deploy Container

#### Option A: Using Cloud Shell (Recommended)
1. Go to https://console.cloud.google.com
2. Click the terminal icon (⌨️) to open Cloud Shell
3. Run these commands:

```bash
# Clone your repository (if not already done)
git clone https://github.com/frappe/lms.git
cd lms

# Build the container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/frappe-learning:latest -f deploy/Dockerfile.gcp .

# Deploy to Cloud Run
gcloud run deploy frappe-learning \
    --image gcr.io/YOUR_PROJECT_ID/frappe-learning:latest \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8000 \
    --memory 2Gi \
    --cpu 1 \
    --set-env-vars DB_HOST=YOUR_DB_IP,DB_ROOT_PASSWORD=SecurePassword123!,REDIS_HOST=YOUR_REDIS_IP,SITE_NAME=your-domain.com,ADMIN_PASSWORD=admin123
```

Replace:
- `YOUR_PROJECT_ID` with your actual project ID
- `YOUR_DB_IP` with the Cloud SQL IP address
- `YOUR_REDIS_IP` with the Redis IP address

#### Option B: Using GitHub Actions (Automated)
1. Fork the repository to your GitHub account
2. Add these secrets in your GitHub repo settings:
   - `GCP_PROJECT`: Your project ID
   - `GCP_SA_KEY`: Service account JSON key
   - `DB_HOST`: Cloud SQL IP
   - `REDIS_HOST`: Redis IP

The GitHub Actions workflow will automatically deploy when you push code.

## Step 2: Access Your Application

After deployment:
1. Go to https://console.cloud.google.com/run
2. Click on your `frappe-learning` service
3. Copy the service URL
4. Open the URL in your browser
5. Add `/lms` to the end of the URL

Login credentials:
- Username: Administrator
- Password: admin123 (or whatever you set)

## Step 3: Custom Domain (Optional)

To use your own domain:
1. In Cloud Run, click "Manage Custom Domains"
2. Add your domain
3. Update your DNS records as instructed

That's it! Your Frappe Learning system is now running on Google Cloud.
