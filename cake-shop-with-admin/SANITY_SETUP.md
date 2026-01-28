# Sanity CMS Setup Guide

## Step 1: Create a Sanity Account

1. Go to https://www.sanity.io/
2. Click "Get started for free"
3. Sign up with Google or GitHub (recommended)

## Step 2: Create a New Sanity Project

1. Go to https://www.sanity.io/manage
2. Click "Create project"
3. Name it: **The Cake Craving**
4. Choose: **Production** dataset
5. Copy your **Project ID** (it looks like: abc12def)

## Step 3: Configure Environment Variables

1. Create a file named `.env.local` in the cake-craving-modern folder
2. Add these lines (replace with your actual Project ID):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12def
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 4: Deploy Sanity Studio

Run this command in the terminal:

```bash
cd cake-craving-modern
npm run dev
```

Then visit: http://localhost:3000/admin

## Step 5: Login to Admin Panel

1. Visit http://localhost:3000/admin
2. Click "Continue with Google" or "Continue with GitHub"
3. Authorize access

## Step 6: Add Your First Content

### Add Business Information:
1. Click "Site Settings" in the left sidebar
2. Fill in all your business details
3. Click "Publish"

### Add Products:
1. Click "Products" in the left sidebar
2. Click "Create" button
3. Fill in product name, description, upload image
4. Set the display order (1, 2, 3...)
5. Click "Publish"

### Add Testimonials:
1. Click "Testimonials" in the left sidebar
2. Click "Create"
3. Add customer name, review text, rating
4. Click "Publish"

## That's It!

Your website will automatically show the content from the admin panel.

**Admin URL (production):** https://your-domain.vercel.app/admin

**Need help?** Contact support or check Sanity docs: https://www.sanity.io/docs
