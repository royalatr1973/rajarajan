# The Cake Craving - Website with CMS

A modern, professional cake business website with an easy-to-use Content Management System (CMS) powered by Sanity.

## ✨ Features

### For Customers:
- 🍰 Beautiful cake showcase
- 📱 Mobile-responsive design
- 🎨 Professional brown & gold theme
- 🔍 Filter cakes by type
- 💬 Customer testimonials
- 📞 Easy contact form
- 🎂 Custom cake gallery

### For Admin:
- 🎛️ Easy-to-use admin panel (no coding needed!)
- ✏️ Edit all text and images
- 📸 Upload product photos with drag & drop
- ⭐ Manage customer reviews
- 🔄 Changes go live instantly
- 📱 Access from any device

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Sanity account (free at https://www.sanity.io)

### Step 1: Install Dependencies
```bash
cd cake-craving-modern
npm install
```

### Step 2: Create Sanity Project

1. Go to https://www.sanity.io/manage
2. Click "Create project"
3. Name it: **The Cake Craving**
4. Choose dataset: **production**
5. Copy your Project ID

### Step 3: Configure Environment Variables

Create a file named `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id_here` with your actual Sanity Project ID.

### Step 4: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### Step 5: Access Admin Panel

Visit: http://localhost:3000/admin

Log in with Google or GitHub, then start adding your content!

---

## 📦 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Sanity CMS"
git push origin your-branch-name
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Import your repository
3. Set Root Directory: `cake-craving-modern`
4. Add Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Click "Deploy"

### Step 3: Access Your Live Admin Panel

After deployment, visit: `https://your-domain.vercel.app/admin`

---

## 📚 Documentation

- **For Admin Users**: See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
- **For Developers**: See [SANITY_SETUP.md](./SANITY_SETUP.md)

---

## 🗂️ Project Structure

```
cake-craving-modern/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel (/admin)
│   ├── products/          # Products page
│   ├── contact/           # Contact page
│   └── ...
├── components/            # React components
│   ├── home/             # Homepage sections
│   ├── products/         # Product components
│   └── layout/           # Layout components
├── sanity/               # Sanity CMS configuration
│   └── schemas/          # Content schemas
├── lib/                  # Utility functions
│   ├── sanity.ts        # Sanity client
│   └── data/            # Fallback data
├── ADMIN_GUIDE.md        # Guide for non-technical users
├── SANITY_SETUP.md       # Sanity setup instructions
└── README_CMS.md         # This file
```

---

## 🎨 Content Types in CMS

### Products
- Product name, description
- Image upload
- Cake type (Chocolate, Classic, Theme, Fruit)
- Best seller flag
- Display order

### Testimonials
- Customer name
- Review text
- Star rating (1-5)
- Display order

### Hero Section
- Main title
- Subtitle
- Call-to-action button text
- Background image

### Site Settings
- Business name
- Contact information (phone, email, address)
- Social media links
- Operating details

---

## 🔧 Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Language**: TypeScript

---

## 📝 Key Features

1. **Server Components**: Fast, SEO-friendly pages
2. **Static Generation**: Pre-rendered pages for speed
3. **Fallback Data**: Works even before CMS is configured
4. **Type Safety**: Full TypeScript support
5. **Image Optimization**: Next.js Image component
6. **Mobile First**: Responsive design

---

## 🆘 Troubleshooting

### Build fails with Sanity error
- Make sure `.env.local` has valid Sanity credentials
- The app will use fallback data if Sanity isn't configured

### Images not loading
- Check `next.config.ts` has correct image domains
- For Sanity images, make sure the project ID is correct

### Admin panel not accessible
- Visit `/admin` route
- Make sure you're logged in with the same account used to create the Sanity project

---

## 📞 Support

- **Sanity Documentation**: https://www.sanity.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Admin User Guide**: [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

---

## 📜 License

Private project for The Cake Craving business.

---

**Built with ❤️ for The Cake Craving**
