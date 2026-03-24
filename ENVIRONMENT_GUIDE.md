# Environment Configuration Guide

## Problem
The login was failing locally because the app was trying to connect to the production server (`http://64.225.122.101:8000`) instead of your local backend (`http://127.0.0.1:8000`).

## Solution
I've created an easy way to switch between local and production environments.

### Quick Commands

**For Local Development:**
```bash
npm run env:local
```
Then start your app:
```bash
npm run dev
```

**For Production:**
```bash
npm run env:prod
```

### Manual Switching
You can also edit the `.env.local` file directly:

**Local Development (.env.local):**
```env
# Local development API URL
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
# Production API URL (commented out)
# VITE_API_BASE_URL=http://64.225.122.101:8000/api/v1/
```

**Production (.env.local):**
```env
# Production API URL
VITE_API_BASE_URL=http://64.225.122.101:8000/api/v1/
# Local development (commented out)
# VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
```

### How It Works
- `.env.local` takes priority over `.env`
- The app reads `VITE_API_BASE_URL` from the environment
- The switch-env.js script updates `.env.local` with the correct URL

### Current Status
✅ **Fixed**: Your app is now configured for local development
📍 **API URL**: http://127.0.0.1:8000/api/v1/

### Important Notes
1. Make sure your local backend is running on `http://127.0.0.1:8000`
2. Restart your development server after switching environments
3. The changes only affect your local development environment

### Troubleshooting
If login still fails:
1. Verify your local backend is running: `http://127.0.0.1:8000/api/v1/`
2. Check browser console for network errors
3. Run `npm run env:local` to ensure you're using local config
