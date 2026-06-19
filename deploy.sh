#!/bin/bash
# Raider Tools — Deploy Script
# Builds locally and deploys static files to remote server

set -e

# Colors for better feedback
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

function error_handler() {
  echo -e "\n${RED}✘ DEPLOY FAILED at step: $1${NC}"
  exit 1
}

echo -e "${YELLOW}=== Raider Tools Deploy Script ===${NC}"
echo ""
trap 'error_handler "Configuration/Connection"' ERR

# ===== CONFIGURE THESE =====
SERVER_HOST="ubuntu@3.146.169.248"
REMOTE_PATH="~/shiesty-raiders"
# ============================

# Use DEPLOY_SSH_KEY env var, or fall back to shiesty.pem
SSH_KEY="${DEPLOY_SSH_KEY:-shiesty.pem}"

echo -e "${YELLOW}1. Building project locally...${NC}"
trap 'error_handler "Local Build"' ERR
npm run build

if [ ! -f dist/index.html ]; then
  echo -e "${RED}✘ Build failed - dist/index.html not found${NC}"
  exit 1
fi

echo -e "${GREEN}✔ Build complete${NC}"
echo ""

echo -e "${YELLOW}2. Syncing dist/ to $SERVER_HOST:$REMOTE_PATH...${NC}"
trap 'error_handler "Remote Sync"' ERR
ssh -i "$SSH_KEY" $SERVER_HOST "mkdir -p $REMOTE_PATH"

rsync -avz --delete -e "ssh -i $SSH_KEY" \
  dist/ \
  $SERVER_HOST:$REMOTE_PATH/

echo -e "${GREEN}✔ Files synced${NC}"
echo ""

echo -e "${YELLOW}3. Setting permissions on remote server...${NC}"
trap 'error_handler "Permissions"' ERR
ssh -i "$SSH_KEY" $SERVER_HOST "chmod -R 755 $REMOTE_PATH"

echo -e "${GREEN}✔ Permissions set${NC}"
echo ""

echo -e "${GREEN}=== DEPLOY COMPLETE ===${NC}"
echo "Files deployed to: $SERVER_HOST:$REMOTE_PATH"
echo "Make sure nginx is configured to serve from: $REMOTE_PATH"
