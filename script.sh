#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the frontend directory
FRONTEND_DIR="./frontend"

echo "Pulling changes from the frontend repository..."
git pull origin main # Replace 'main' with your branch name if different

# Navigate to the frontend directory
if [ -d "$FRONTEND_DIR" ]; then
  echo "Navigating to $FRONTEND_DIR directory..."
  cd "$FRONTEND_DIR"
else
  echo "Error: $FRONTEND_DIR directory not found!"
  exit 1
fi

echo "Installing dependencies..."
npm install

echo "Building the project..."
#BUILD_DIR=./mywebsit
nohup npm run dev &> /home/lokeshwagh200404/lokesh/react-dev.log &


echo "Frontend updated and built successfully!"
