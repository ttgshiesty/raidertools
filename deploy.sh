#!/bin/bash
# SHiESTY RAiDERS deployment selector
#
# Usage:
#   ./deploy.sh frontend  Build and deploy only the Vite frontend to EC2
#   ./deploy.sh infra     Deploy only AWS CDK infrastructure (Lambda + API Gateway)
#   ./deploy.sh both      Deploy infra first, then frontend

set -Eeuo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

SERVER_HOST="ubuntu@3.146.169.248"
REMOTE_PATH="/home/ubuntu/shiesty-raiders"
REMOTE_DIST="$REMOTE_PATH/dist"
SSH_KEY="${DEPLOY_SSH_KEY:-shiesty.pem}"

APP_REGION="${APP_REGION:-us-east-2}"
GLOBAL_REGION="${GLOBAL_REGION:-us-east-1}"

MAIN_DOMAIN="${MAIN_DOMAIN:-shiesty.me}"
API_DOMAIN="${API_DOMAIN:-api.shiesty.me}"
AUTH_DOMAIN="${AUTH_DOMAIN:-auth.shiesty.me}"

CURRENT_STEP="Startup"

error_handler() {
  echo -e "\n${RED}✘ DEPLOY FAILED at step: $CURRENT_STEP${NC}"
  exit 1
}

trap error_handler ERR

usage() {
  echo "Usage: ./deploy.sh [frontend|infra|both]"
  echo ""
  echo "  frontend  Build Vite and sync dist/ to EC2"
  echo "  infra     Deploy AWS CDK infrastructure (Lambda + API Gateway)"
  echo "  both      Deploy infra first, then frontend"
  echo ""
  echo "Current:"
  echo "  SERVER_HOST=$SERVER_HOST"
  echo "  REMOTE_PATH=$REMOTE_PATH"
  echo "  REMOTE_DIST=$REMOTE_DIST"
  echo "  SSH_KEY=$SSH_KEY"
  echo "  APP_REGION=$APP_REGION"
  echo "  GLOBAL_REGION=$GLOBAL_REGION"
  echo "  MAIN_DOMAIN=$MAIN_DOMAIN"
  echo "  API_DOMAIN=$API_DOMAIN"
  echo "  AUTH_DOMAIN=$AUTH_DOMAIN"
}

choose_target() {
  echo -e "${YELLOW}Choose exactly what to deploy:${NC}"
  echo "  1) FRONTEND only (Vite build + sync to EC2)"
  echo "  2) INFRA only (CDK: Lambda + API Gateway)"
  echo "  3) BOTH infra + frontend"
  echo "  4) Cancel"
  echo ""
  read -r -p "Selection [1-4]: " selection

  case "$selection" in
    1) TARGET="frontend" ;;
    2) TARGET="infra" ;;
    3) TARGET="both" ;;
    4) exit 0 ;;
    *)
      echo -e "${RED}Invalid selection.${NC}"
      exit 1
      ;;
  esac
}

confirm_target() {
  echo ""
  case "$TARGET" in
    frontend)
      echo -e "${CYAN}TARGET: FRONTEND ONLY${NC}"
      echo "Builds Vite and syncs dist/ to EC2"
      echo "Main: $MAIN_DOMAIN"
      ;;
    infra)
      echo -e "${CYAN}TARGET: INFRA ONLY${NC}"
      echo "Deploys CDK stacks (Lambda + API Gateway)"
      echo "App region: $APP_REGION"
      echo "Global region: $GLOBAL_REGION"
      echo "API: $API_DOMAIN"
      echo "Auth: $AUTH_DOMAIN"
      ;;
    both)
      echo -e "${CYAN}TARGET: INFRA + FRONTEND${NC}"
      echo "Deploys CDK stacks first, then frontend"
      echo "Main: $MAIN_DOMAIN"
      echo "API: $API_DOMAIN"
      echo "Auth: $AUTH_DOMAIN"
      ;;
  esac
  echo ""
  read -r -p "Continue with this target? [y/N]: " confirmation

  case "$confirmation" in
    y|Y|yes|YES) ;;
    *)
      echo "Deployment cancelled."
      exit 0
      ;;
  esac
}

deploy_frontend() {
  echo ""
  echo -e "${YELLOW}=== FRONTEND DEPLOYMENT ===${NC}"

  if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}✘ SSH key not found: $SSH_KEY${NC}"
    exit 1
  fi

  CURRENT_STEP="Frontend build"
  echo -e "${YELLOW}1. Building the Vite frontend...${NC}"
  npm run build

  if [ ! -f dist/index.html ]; then
    echo -e "${RED}✘ Frontend build failed: dist/index.html was not created${NC}"
    exit 1
  fi
  echo -e "${GREEN}✔ Frontend build complete${NC}"

  CURRENT_STEP="Create remote dist directory"
  echo -e "${YELLOW}2. Preparing $REMOTE_DIST...${NC}"
  ssh -i "$SSH_KEY" "$SERVER_HOST" "mkdir -p '$REMOTE_DIST'"

  CURRENT_STEP="Frontend dist sync"
  echo -e "${YELLOW}3. Syncing only dist/ to EC2...${NC}"
  rsync -avz --delete -e "ssh -i $SSH_KEY" \
    dist/ \
    "$SERVER_HOST:$REMOTE_DIST/"

  CURRENT_STEP="Frontend permissions"
  echo -e "${YELLOW}4. Setting frontend file permissions...${NC}"
  ssh -i "$SSH_KEY" "$SERVER_HOST" "chmod -R u=rwX,go=rX '$REMOTE_DIST'"

  CURRENT_STEP="Reload nginx"
  echo -e "${YELLOW}5. Reloading nginx...${NC}"
  ssh -i "$SSH_KEY" "$SERVER_HOST" "sudo systemctl reload nginx"

  echo -e "${GREEN}✔ FRONTEND DEPLOY COMPLETE${NC}"
  echo "Live URL: https://$MAIN_DOMAIN"
  echo "Remote directory: $REMOTE_DIST"
}

deploy_infra() {
  echo ""
  echo -e "${YELLOW}=== INFRA DEPLOYMENT ===${NC}"
  echo "Stacks: RaiderToolsAuthCertStack, RaiderToolsStack"
  echo "App region: $APP_REGION"
  echo "Global region: $GLOBAL_REGION"
  echo "Frontend build: skipped"
  echo "EC2 sync: skipped"

  if [ ! -d infra ]; then
    echo -e "${RED}✘ infra/ directory not found. Run this from the project root.${NC}"
    exit 1
  fi

  CURRENT_STEP="RaiderToolsAuthCertStack CDK deployment"
  echo -e "${YELLOW}1. Deploying RaiderToolsAuthCertStack (us-east-1)...${NC}"
  (
    cd infra
    AWS_REGION="$GLOBAL_REGION" \
    AWS_DEFAULT_REGION="$GLOBAL_REGION" \
    CDK_DEFAULT_REGION="$GLOBAL_REGION" \
    SHIESTY_APP_REGION="$APP_REGION" \
    SHIESTY_GLOBAL_REGION="$GLOBAL_REGION" \
    SHIESTY_MAIN_DOMAIN="$MAIN_DOMAIN" \
    SHIESTY_API_DOMAIN="$API_DOMAIN" \
    SHIESTY_AUTH_DOMAIN="$AUTH_DOMAIN" \
    npx cdk deploy RaiderToolsAuthCertStack --require-approval never
  )

  CURRENT_STEP="RaiderToolsStack CDK deployment"
  echo -e "${YELLOW}2. Deploying RaiderToolsStack (us-east-2)...${NC}"
  (
    cd infra
    AWS_REGION="$APP_REGION" \
    AWS_DEFAULT_REGION="$APP_REGION" \
    CDK_DEFAULT_REGION="$APP_REGION" \
    SHIESTY_APP_REGION="$APP_REGION" \
    SHIESTY_GLOBAL_REGION="$GLOBAL_REGION" \
    SHIESTY_MAIN_DOMAIN="$MAIN_DOMAIN" \
    SHIESTY_API_DOMAIN="$API_DOMAIN" \
    SHIESTY_AUTH_DOMAIN="$AUTH_DOMAIN" \
    npx cdk deploy RaiderToolsStack --require-approval never \
      -c appRegion="$APP_REGION" \
      -c globalRegion="$GLOBAL_REGION" \
      -c mainDomain="$MAIN_DOMAIN" \
      -c apiDomain="$API_DOMAIN" \
      -c authDomain="$AUTH_DOMAIN"
  )

  echo -e "${GREEN}✔ INFRA DEPLOY COMPLETE${NC}"
  echo "API: https://$API_DOMAIN"
  echo "Auth: https://$AUTH_DOMAIN"
  echo "Main: https://$MAIN_DOMAIN"
}

echo -e "${YELLOW}=== SHiESTY RAiDERS Deployment Selector ===${NC}"

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
  choose_target
fi

case "$TARGET" in
  frontend|front)
    TARGET="frontend"
    ;;
  infra|cdk|backend|back)
    TARGET="infra"
    ;;
  both|all)
    TARGET="both"
    ;;
  -h|--help|help)
    usage
    exit 0
    ;;
  *)
    echo -e "${RED}Unknown deployment target: $TARGET${NC}"
    usage
    exit 1
    ;;
esac

confirm_target

case "$TARGET" in
  frontend)
    deploy_frontend
    ;;
  infra)
    deploy_infra
    ;;
  both)
    deploy_infra
    deploy_frontend
    ;;
esac

echo ""
echo -e "${GREEN}=== SELECTED DEPLOYMENT FINISHED ===${NC}"
