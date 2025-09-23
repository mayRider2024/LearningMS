#!/bin/bash

echo "Starting Frappe Learning on Google Cloud Run..."

export PATH="${NVM_DIR}/versions/node/v${NODE_VERSION_DEVELOP}/bin/:${PATH}"

# Initialize bench if it doesn't exist
if [ -d "/home/frappe/frappe-bench/apps/frappe" ]; then
    echo "Bench already exists, starting..."
    cd frappe-bench
else
    echo "Creating new bench..."
    bench init --skip-redis-config-generation frappe-bench
    cd frappe-bench
fi

# Configure database connections using environment variables
if [ ! -z "$DB_HOST" ]; then
    bench set-mariadb-host $DB_HOST
    bench set-config -g db_host $DB_HOST
    bench set-config -g db_port ${DB_PORT:-3306}
fi

if [ ! -z "$REDIS_HOST" ]; then
    bench set-redis-cache-host redis://${REDIS_HOST}:${REDIS_PORT:-6379}
    bench set-redis-queue-host redis://${REDIS_HOST}:${REDIS_PORT:-6379}
    bench set-redis-socketio-host redis://${REDIS_HOST}:${REDIS_PORT:-6379}
fi

# Remove local redis and watch from Procfile for production
sed -i '/redis/d' ./Procfile
sed -i '/watch/d' ./Procfile

# Get LMS app if not exists
if [ ! -d "apps/lms" ]; then
    bench get-app lms https://github.com/frappe/lms
fi

# Create site if it doesn't exist
SITE_NAME=${SITE_NAME:-"lms.localhost"}
if [ ! -d "sites/${SITE_NAME}" ]; then
    bench new-site $SITE_NAME \
        --force \
        --mariadb-root-password ${DB_ROOT_PASSWORD} \
        --admin-password ${ADMIN_PASSWORD:-admin} \
        --no-mariadb-socket
    
    bench --site $SITE_NAME install-app lms
fi

# Set site as default
bench use $SITE_NAME

# Set production configurations
bench --site $SITE_NAME set-config developer_mode 0
bench --site $SITE_NAME clear-cache

# Migrate if needed
bench --site $SITE_NAME migrate

# Start the server
exec bench start
