# Detect OS to determine package manager
OS := $(shell uname)
PKG_MANAGER := $(shell if [ "$(OS)" = "Darwin" ]; then echo "brew"; else echo "apt"; fi)

# Check if Go is installed
GO := $(shell command -v go 2>/dev/null)
# Check if Node.js is installed
NODE := $(shell command -v node 2>/dev/null)
# Check if NPM is installed
NPM := $(shell command -v npm 2>/dev/null)

# Define paths
GATEWAY_DIR := ./gateway
WEB_DIR := ./web
GATEWAY_ENV := $(GATEWAY_DIR)/.env
WEB_ENV := $(WEB_DIR)/.env

# Define commands
install-go:
ifeq ($(GO),)
	@echo "Go is not installed. Installing..."
	@if [ "$(PKG_MANAGER)" = "brew" ]; then brew install go; else sudo apt update && sudo apt install -y golang; fi
else
	@echo "Go is already installed."
endif

install-node:
ifeq ($(NODE),)
	@echo "Node.js is not installed. Installing..."
	@if [ "$(PKG_MANAGER)" = "brew" ]; then brew install node; else sudo apt update && sudo apt install -y nodejs npm; fi
else
	@echo "Node.js is already installed."
endif

check-env-gateway:
	@if [ ! -f "$(GATEWAY_ENV)" ]; then \
		echo "Creating .env file in $(GATEWAY_DIR)..."; \
		echo 'SECRET="somerandomsecret12345"' > $(GATEWAY_ENV); \
		echo 'REDIS_ADDR="redishost:6379"' >> $(GATEWAY_ENV); \
		echo 'REDIS_PASSWORD="redispassword"' >> $(GATEWAY_ENV); \
		echo 'PGCONNECTIONSTRING="postgresql://postgres:passwordforyourdb@yourhost:5432/databasename"' >> $(GATEWAY_ENV); \
	fi
	@echo "env exists in ./gateway"

check-env-web:
	@if [ ! -f "$(WEB_ENV)" ]; then \
		echo "Creating .env file in $(WEB_DIR)..."; \
		echo 'SECRET="somerandomsecret12345"' > $(WEB_ENV); \
		echo 'RESEND_API_SECRET="resendapisecretkeyhere"' >> $(WEB_ENV); \
		echo 'connectionstring="postgresql://postgres:passwordforyourdb@yourhost:5432/databasename"' >> $(WEB_ENV); \
		echo 'CAPTCHA_SECRET="somesecretkey"' >> $(WEB_ENV); \
		echo 'redisconnectionstring="redis://redisusername:thepassword@yourredishost:50952"' >> $(WEB_ENV); \
	fi
	@echo "env exists in ./web"

gateway: install-go check-env-gateway
	@echo "Running gateway service..."
	cd $(GATEWAY_DIR) && go run main.go

web: install-node check-env-web
	@echo "Installing dependencies for web..."
	cd $(WEB_DIR) && npm install --legacy-peer-deps
	@echo "Starting web application..."
	cd $(WEB_DIR) && npm run dev
	@echo "Opening web app in browser..."
	xdg-open http://localhost:5173/login || open http://localhost:5173/login || start http://localhost:5173/login

all: gateway web

.PHONY: install-go install-node check-env-gateway check-env-web gateway web
