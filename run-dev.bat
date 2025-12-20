@echo off
REM =============================================================
REM EV Parking Frontend - Quick Start Script for Windows CMD
REM =============================================================

setlocal enabledelayedexpansion

set "BACKEND_URL=http://localhost:3000/api/v1"
set "MODEL_URL=http://localhost:5001"

echo.
echo ==================================================
echo    EV Parking Frontend - Development Server
echo ==================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VER=%%i

echo OK Node.js !NODE_VER!
echo OK npm !NPM_VER!

REM Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Run this script from the EVChargingFrontend directory.
    pause
    exit /b 1
)

echo.
echo Configuration:
echo   Backend URL: %BACKEND_URL%
echo   Model URL:   %MODEL_URL%
echo.

REM Set environment variables
set "VITE_BACKEND_URL=%BACKEND_URL%"
set "VITE_MODEL_URL=%MODEL_URL%"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies (this may take a minute)...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo OK Dependencies installed
) else (
    echo OK Dependencies already installed
)

echo.
echo Starting development server...
echo Press Ctrl+C to stop
echo.

REM Start the dev server
call npm run dev

endlocal

