# Cloudflare Pages Deployment Guide

## Quick Deploy (Recommended for MVP)

### Option 1: Deploy via Cloudflare Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare Pages deployment"
   git push
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Select "Workers & Pages" from the left sidebar
   - Click "Create application" → "Pages" → "Connect to Git"
   - Select your GitHub repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Click "Save and Deploy"

3. **Your site will be live in a few minutes!**
   - Cloudflare will give you a URL like `https://storage-optimizer.pages.dev`
   - Every push to your main branch will automatically redeploy

### Option 2: Deploy via Wrangler CLI

1. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **Deploy**
   ```bash
   npm run pages:deploy
   ```

3. **Follow the prompts** to create your Pages project

## Local Testing

Before deploying, test the build locally:

```bash
npm run build
npx wrangler pages dev dist
```

Then visit `http://localhost:8788` to test your site.

## Environment Variables

If you need to add environment variables (API keys, etc.):
- Go to your Pages project in Cloudflare Dashboard
- Navigate to "Settings" → "Environment variables"
- Add your variables there

## Custom Domain

To use a custom domain:
1. Go to your Pages project
2. Click "Custom domains"
3. Follow the instructions to add your domain

## Troubleshooting

- **Build fails:** Check the build logs in Cloudflare Dashboard
- **Routes not working:** Ensure `_routes.json` exists in your dist folder
- **Missing data files:** The build script automatically copies data, config, and i18n folders

## Continuous Deployment

Once connected to GitHub:
- Every commit to `main` → automatic production deployment
- Pull requests → automatic preview deployments with unique URLs
