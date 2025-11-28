@echo off
REM ========================================
REM Build for Production
REM ========================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo  📦 Building Perfume Shop for Production
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

echo Building project...
echo.

REM Build
npm run build

if errorlevel 1 (
    echo.
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ Build completed successfully!
echo ========================================
echo.
echo Output directory: dist/
echo.
pause
