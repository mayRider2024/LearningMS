#!/bin/bash

# Google Cloud Platform Deployment Script for Frappe Learning
# Run this script to deploy the entire project to GCP

set -e

PROJECT_ID="your-gcp-project-id"
REGION="us-central1"
ZONE="us-central1-a"
SERVICE_NAME="frappe-learning"
DB_INSTANCE_NAME="frappe-learning-db"
REDIS_INSTANCE_NAME="frappe-learning-redis"

echo "🚀 Deploying Frappe Learning to Google Cloud Platform..."

# 1. Enable required APIs
echo "📋 Enabling required Google Cloud APIs..."
gcloud services enable run.googleapis.com
gcloud services enable sql.googleapis.com
gcloud services enable redis.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable container.googleapis.com

# 2. Create Cloud SQL instance (MySQL 8.0)
echo "🗄️ Creating Cloud SQL MySQL instance..."
gcloud sql instances create $DB_INSTANCE_NAME \
    --database-version=MYSQL_8_0 \
    --tier=db-f1-micro \
    --region=$REGION \
    --root-password="$(openssl rand -base64 32)" \
    --storage-auto-increase \
    --backup \
    --maintenance-release-channel=production \
    --maintenance-window-day=SUN \
    --maintenance-window-hour=02

# Create database
gcloud sql databases create frappe_learning --instance=$DB_INSTANCE_NAME

# Get database IP
DB_IP=$(gcloud sql instances describe $DB_INSTANCE_NAME --format="value(ipAddresses[0].ipAddress)")
echo "Database IP: $DB_IP"

# 3. Create Redis instance
echo "🔴 Creating Redis instance..."
gcloud redis instances create $REDIS_INSTANCE_NAME \
    --size=1 \
    --region=$REGION \
    --redis-version=redis_6_x \
    --tier=basic

# Get Redis IP
REDIS_IP=$(gcloud redis instances describe $REDIS_INSTANCE_NAME --region=$REGION --format="value(host)")
echo "Redis IP: $REDIS_IP"

# 4. Build and push Docker image
echo "🐳 Building and pushing Docker image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME:latest -f deploy/Dockerfile.gcp .

# 5. Update Cloud Run service configuration
echo "📝 Updating service configuration..."
sed -i.bak "s/PROJECT_ID/$PROJECT_ID/g" deploy/cloudrun-service.yaml
sed -i.bak "s/YOUR_CLOUD_SQL_IP/$DB_IP/g" deploy/cloudrun-service.yaml
sed -i.bak "s/YOUR_REDIS_IP/$REDIS_IP/g" deploy/cloudrun-service.yaml

# 6. Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run services replace deploy/cloudrun-service.yaml --region=$REGION

# 7. Allow unauthenticated access
echo "🔓 Allowing public access..."
gcloud run services add-iam-policy-binding $SERVICE_NAME \
    --region=$REGION \
    --member="allUsers" \
    --role="roles/run.invoker"

# 8. Get service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your Frappe Learning is available at: $SERVICE_URL"
echo "👤 Admin Username: Administrator"
echo "🔑 Admin Password: secure-admin-password (change this in production)"
echo ""
echo "📊 Resources created:"
echo "  - Cloud Run Service: $SERVICE_NAME"
echo "  - Cloud SQL Instance: $DB_INSTANCE_NAME"
echo "  - Redis Instance: $REDIS_INSTANCE_NAME"
echo ""
echo "💡 Next steps:"
echo "  1. Configure your custom domain (optional)"
echo "  2. Set up SSL certificate"
echo "  3. Configure backup policies"
echo "  4. Monitor your application"
