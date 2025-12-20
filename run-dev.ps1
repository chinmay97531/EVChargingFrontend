#!/usr/bin/env powershell
<#
.SYNOPSIS
    EV Parking Frontend - Quick Start Script for Windows PowerShell
    
.DESCRIPTION
    Sets up and runs the frontend development server with automatic configuration.
    
.EXAMPLE
    .\run-dev.ps1
    
    .\run-dev.ps1 -BackendUrl "http://localhost:3000/api/v1" -ModelUrl "http://localhost:5001"
#>

param(
    [string]$BackendUrl = "http://localhost:3000/api/v1",
    [string]$ModelUrl = "http://localhost:5001"
)

Write-Host "==================================================" -ForegroundColor Green
Write-Host "   EV Parking Frontend - Development Server" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
Write-Host "✓ npm $npmVersion" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Run this script from the EVChargingFrontend directory." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "  Backend URL: $BackendUrl"
Write-Host "  Model URL:   $ModelUrl"
Write-Host ""

# Set environment variables
$env:VITE_BACKEND_URL = $BackendUrl
$env:VITE_MODEL_URL = $ModelUrl

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies (this may take a minute)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start the dev server
npm run dev

