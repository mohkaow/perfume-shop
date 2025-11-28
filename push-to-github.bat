@echo off
REM ========================================
REM Push to GitHub - Perfume Shop
REM ========================================
REM Script to commit and push changes to GitHub

setlocal enabledelayedexpansion

echo.
echo ========================================
echo  Git Push to GitHub - Perfume Shop
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo Error: Git is not installed or not in PATH
    pause
    exit /b 1
)

REM Show current branch
echo Current branch:
git branch --show-current
echo.

REM Show status
echo Changes to commit:
git status -s
echo.

REM Ask for commit message
set /p commitMsg="Enter commit message (or press Enter for default): "
if "!commitMsg!"=="" (
    set commitMsg=Update: Minor improvements and bug fixes
)

echo.
echo Committing with message: "!commitMsg!"
echo.

REM Stage all changes
git add -A

REM Commit
git commit -m "!commitMsg!"

if errorlevel 1 (
    echo.
    echo Error: Commit failed. Please check your changes.
    pause
    exit /b 1
)

REM Show commits
echo.
echo Recent commits:
git log --oneline -3
echo.

REM Ask for confirmation before push
echo About to push to origin/main
echo.
set /p confirm="Continue? (y/n): "
if /i "!confirm!"=="n" (
    echo Cancelled.
    pause
    exit /b 0
)

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo Error: Push failed. Check your connection and permissions.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ Successfully pushed to GitHub!
echo ========================================
echo.
pause
