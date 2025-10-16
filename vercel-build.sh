#!/bin/bash

# Vercel build script
# This ensures the file list is generated before building

echo "🔧 Generating file list..."
npm run generate-file-list

echo "🏗️ Building Next.js application..."
npm run build
