@echo off
REM ========================================
REM Start Development Server
REM ========================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo  🚀 Starting Perfume Shop Dev Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo.
    call npm install
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo Starting development server on http://localhost:5174
echo.
echo Press Ctrl+C to stop the server
echo.

REM Kill any existing node processes on port 5174
for /f "tokens=5" %%a in ('netstat -aon ^| find "5174"') do taskkill /pid %%a /f 2>nul

REM Start the dev server
npm run dev

pause
