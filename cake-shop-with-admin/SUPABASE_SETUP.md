# 🗄️ Supabase Setup Guide

Complete guide to set up Supabase database for The Cake Craving website.

---

## ✨ Why Supabase?

With Supabase, your admin panel will:
- ✅ **Save changes instantly** to a database
- ✅ **No need to commit code** for content updates
- ✅ **Changes go live immediately**
- ✅ **Real-time updates** across all pages
- ✅ **FREE** - 500MB database, 50MB file storage, 2GB bandwidth/month
- ✅ **No credit card required** for free tier

---

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with:
   - GitHub (recommended)
   - Google
   - Email

---

### Step 2: Create a New Project

1. After logging in, click **"New Project"**
2. Fill in:
   - **Name**: `the-cake-craving` (or any name you like)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location (e.g., `ap-south-1` for India)
   - **Pricing Plan**: Select **FREE**
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

---

### Step 3: Run the Database Schema

1. In your Supabase project dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open the file: `supabase-schema.sql` from your project
4. **Copy all the SQL code** from that file
5. **Paste it** into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: **"Success. No rows returned"**

This creates:
- ✅ Products table (for all 4 categories)
- ✅ Testimonials table
- ✅ Site settings table
- ✅ All initial data (15 products, 4 testimonials)

---

### Step 4: Get Your API Keys

1. In Supabase dashboard, click **"Settings"** (gear icon, left sidebar)
2. Click **"API"** in the settings menu
3. You'll see:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long key)

**Keep this tab open** - you'll need these in the next step!

---

### Step 5: Configure Environment Variables

#### On Your Computer:

1. Open your project folder: `cake-shop-with-admin`
2. Create a file named **`.env.local`** (copy from `.env.local.example`)
3. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Replace:
   - `your-project-id.supabase.co` with your actual **Project URL**
   - `your_anon_key_here` with your actual **anon key**

5. Save the file

**Important:**
- ❗ Never commit `.env.local` to GitHub (it's in `.gitignore`)
- ✅ The `.env.local.example` file is safe to commit (no real keys)

---

### Step 6: Test the Connection

```bash
cd cake-shop-with-admin
npm install
npm run dev
```

Visit: **http://localhost:3000/products/cakes**

You should see all the cake products loaded from Supabase!

---

### Step 7: Deploy to Vercel

#### On Vercel:

1. Go to your project on **https://vercel.com**
2. Click **"Settings"** → **"Environment Variables"**
3. Add two variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `your_anon_key_here`

4. Click **"Save"**
5. **Redeploy** your project

---

## 🎛️ Admin Panel with Supabase

### What Changes:

**Before (without Supabase):**
```
Edit product → Download JSON → Replace file → Commit → Push → Deploy
```

**After (with Supabase):**
```
Edit product → Click Save → LIVE INSTANTLY! ✨
```

### How It Works:

1. Open: `https://your-site.vercel.app/admin-panel`
2. Add/Edit/Delete products
3. Click "Save"
4. **Changes are LIVE immediately** - no deploy needed!

---

## 📊 Verify Your Data

### Check Products in Supabase:

1. Go to Supabase Dashboard
2. Click **"Table Editor"** (left sidebar)
3. Select **"products"** table
4. You should see 15 rows:
   - 6 cakes
   - 3 biscuits
   - 3 chocolates
   - 3 brownies

### Check Testimonials:

1. Select **"testimonials"** table
2. You should see 4 testimonials

### Check Site Settings:

1. Select **"site_settings"** table
2. You should see 1 row with all business information

---

## 🔐 Security (Important!)

### Row Level Security (RLS):

The schema enables RLS with these policies:
- ✅ **Public can READ** all data (for website visitors)
- ❌ **Public CANNOT WRITE** (only through API routes)

### Admin Access:

Currently, the admin panel is **open** (no password).

**To secure it:**
1. Add authentication (Supabase Auth)
2. Or add a simple password check
3. Or restrict by IP address

---

## 🛠️ Managing Data

### Option 1: Through Admin Panel (Recommended)
- Best for non-technical users
- Visual interface
- Easy to use

### Option 2: Through Supabase Dashboard
- Go to Table Editor
- Click on any table
- Add/Edit/Delete rows directly
- Good for bulk operations

### Option 3: Through SQL Editor
- For advanced users
- Write custom queries
- Bulk imports/exports

---

## 📈 Database Structure

### Products Table:
```
id              TEXT (Primary Key)
name            TEXT
description     TEXT
category        TEXT (cakes|biscuits|chocolates|brownies)
type            TEXT
image           TEXT
is_featured     BOOLEAN
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Testimonials Table:
```
id              TEXT (Primary Key)
name            TEXT
text            TEXT
rating          INTEGER (1-5)
display_order   INTEGER
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Site Settings Table:
```
id                   TEXT (Primary Key, always 'main')
business_name        TEXT
tagline              TEXT
phone1               TEXT
phone2               TEXT
email                TEXT
address              TEXT
instagram            TEXT
instagram_url        TEXT
order_lead_time      TEXT
delivery_options     TEXT
hero_title           TEXT
hero_subtitle        TEXT
hero_button_text     TEXT
updated_at           TIMESTAMP
```

---

## 🧪 Testing

### Test Queries:

```sql
-- Get all cakes
SELECT * FROM products WHERE category = 'cakes';

-- Get featured products
SELECT * FROM products WHERE is_featured = true;

-- Get all testimonials
SELECT * FROM testimonials ORDER BY display_order;

-- Get site settings
SELECT * FROM site_settings WHERE id = 'main';
```

---

## 💰 Supabase Free Tier Limits

**Your website fits well within free limits:**

| Resource | Free Limit | Your Usage | Status |
|----------|------------|------------|--------|
| Database | 500 MB | ~1 MB | ✅ 0.2% |
| Storage | 1 GB | ~200 MB (images) | ✅ 20% |
| Bandwidth | 5 GB/month | ~500 MB/month | ✅ 10% |
| API Requests | Unlimited | Unlimited | ✅ |

**You're safe for years!** 🎉

---

## 🆘 Troubleshooting

### Error: "Invalid API key"
- Check your `.env.local` file
- Make sure keys are correct (no extra spaces)
- Restart dev server: `npm run dev`

### Error: "Failed to fetch"
- Check Supabase project is active
- Verify Project URL is correct
- Check internet connection

### Products not showing?
- Go to Supabase Dashboard → Table Editor
- Check if products table has data
- If empty, run the SQL schema again

### Changes not saving?
- Check browser console for errors
- Verify Supabase keys are correct
- Check Row Level Security policies

---

## 🔄 Migration from JSON to Supabase

**Already have products in JSON files?**

The schema includes all your current products. After setup:
1. ✅ All existing products are in database
2. ✅ Admin panel works with database
3. ✅ Website loads from database
4. ✅ Old JSON files can be deleted (optional)

---

## 📞 Support

### Supabase Documentation:
- **Getting Started**: https://supabase.com/docs
- **API Reference**: https://supabase.com/docs/reference/javascript
- **Community**: https://github.com/supabase/supabase/discussions

### Common Questions:

**Q: Is Supabase always free?**
A: Yes, the free tier is permanent. You only pay if you exceed limits.

**Q: Do I need a credit card?**
A: No, not for the free tier.

**Q: Can I export my data?**
A: Yes, anytime! Go to SQL Editor and export as CSV.

**Q: What if I exceed free limits?**
A: Upgrade to Pro ($25/month) or optimize your usage. But unlikely for this site!

---

## ✅ Checklist

Before going live, make sure:

- [ ] Supabase project created
- [ ] SQL schema run successfully
- [ ] Products table has 15 rows
- [ ] Testimonials table has 4 rows
- [ ] `.env.local` configured locally
- [ ] Website loads products from database
- [ ] Admin panel can add/edit/delete
- [ ] Environment variables added to Vercel
- [ ] Production site loads correctly

---

**🎉 Your database is ready! Changes will now save instantly to Supabase!**

No more committing JSON files - just edit and go live! 🚀
