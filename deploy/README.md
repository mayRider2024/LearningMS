# Frappe Learning - Google Cloud Platform Deployment

This directory contains configuration files and scripts to deploy Frappe Learning on Google Cloud Platform.

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Google Cloud SDK** installed locally
3. **Docker** installed (for local builds)
4. **Project permissions**: Editor or Owner role

## Quick Deployment

### 1. Setup Google Cloud CLI

```bash
# Install gcloud CLI (if not already installed)
# Visit: https://cloud.google.com/sdk/docs/install

# Login and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud auth configure-docker
```

### 2. Clone and Deploy

```bash
# Clone the repository (if not already done)
git clone https://github.com/frappe/lms.git
cd lms

# Make deployment script executable
chmod +x deploy/deploy-gcp.sh

# Edit the script to set your project ID
nano deploy/deploy-gcp.sh
# Change: PROJECT_ID="your-gcp-project-id" to your actual project ID

# Run deployment
./deploy/deploy-gcp.sh
```

### 3. Custom Configuration

Edit `deploy/cloudrun-service.yaml` before deployment to customize:
- Memory and CPU limits
- Environment variables
- Domain name
- Database passwords

## Architecture

- **Cloud Run**: Hosts the Frappe application container
- **Cloud SQL**: MySQL 8.0 database (managed)
- **Redis**: In-memory cache and queue management
- **Container Registry**: Stores the Docker image

## Files Overview

- `Dockerfile.gcp`: Production Docker image
- `init-gcp.sh`: Container startup script
- `cloudrun-service.yaml`: Cloud Run service configuration
- `deploy-gcp.sh`: Automated deployment script

## Manual Deployment Steps

If you prefer manual control:

### 1. Create Database
```bash
gcloud sql instances create frappe-learning-db \
    --database-version=MYSQL_8_0 \
    --tier=db-f1-micro \
    --region=us-central1
```

### 2. Create Redis
```bash
gcloud redis instances create frappe-learning-redis \
    --size=1 \
    --region=us-central1
```

### 3. Build Image
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/frappe-learning:latest -f deploy/Dockerfile.gcp .
```

### 4. Deploy Service
```bash
gcloud run deploy frappe-learning \
    --image gcr.io/PROJECT_ID/frappe-learning:latest \
    --region us-central1 \
    --allow-unauthenticated
```

## Monitoring & Maintenance

- **Logs**: `gcloud run logs tail frappe-learning --region=us-central1`
- **Metrics**: Available in Google Cloud Console
- **Scaling**: Auto-scales based on traffic
- **Updates**: Re-run deployment script with new image

## Cost Optimization

- Use `db-f1-micro` tier for development
- Enable auto-scaling with min instances = 0
- Set up budget alerts
- Use preemptible instances for non-critical workloads

## Security Notes

- Change default admin password after deployment
- Use Secret Manager for sensitive environment variables
- Enable Cloud SQL SSL connections
- Configure VPC for private networking (optional)

## Troubleshooting

- Check Cloud Run logs for application errors
- Verify database connectivity
- Ensure all required APIs are enabled
- Check IAM permissions

## Backup Strategy

- Cloud SQL automatic backups enabled
- Export application data regularly
- Version control your configurations
