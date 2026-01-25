# 📝 How to Edit Your Website (Without CMS)

This guide shows you how to update images, text, and content by editing files directly.

---

## 📸 1. How to Change Product Images

### Method A: Upload Your Own Images

**Step 1:** Create images folder (if not exists)
```bash
cd cake-craving-modern
mkdir -p public/images
```

**Step 2:** Copy your cake photos to `public/images/`
```
public/images/butterscotch.jpg
public/images/chocolate-truffle.jpg
public/images/red-velvet.jpg
... etc
```

**Step 3:** Edit `lib/data/products.ts`

Open the file and change the image path:

```typescript
{
  id: '4',
  name: 'Butterscotch Cake',
  description: 'Classic butterscotch flavor with crunchy caramel bits',
  price: 0,
  type: 'Classic',
  image: '/images/butterscotch.jpg',  // ← Change this!
  isBestSeller: true,
},
```

### Method B: Use Image URLs from Instagram/Google Drive

**Step 1:** Upload your image to:
- Instagram (right-click on image → "Copy image address")
- Google Drive (share publicly → get link)
- Imgur.com (free image hosting)

**Step 2:** Edit `lib/data/products.ts` and paste the URL:

```typescript
image: 'https://your-image-url-here.jpg',
```

---

## ✏️ 2. How to Edit Product Names & Descriptions

**File:** `lib/data/products.ts`

Just change the text:

```typescript
{
  id: '1',
  name: 'Chocolate Truffle Cake',        // ← Edit this
  description: 'Rich chocolate layers',   // ← Edit this
  price: 0,
  type: 'Chocolate',                      // ← Options: Chocolate, Classic, Theme, Fruit
  image: '/images/chocolate.jpg',
  isBestSeller: true,                     // ← true = shows in Best Sellers
},
```

### To Add a New Product:

Add this at the end before `];`:

```typescript
{
  id: '9',
  name: 'Mango Delight Cake',
  description: 'Fresh mango puree with vanilla sponge',
  price: 0,
  type: 'Fruit',
  image: '/images/mango.jpg',
  isBestSeller: false,
},
```

### To Remove a Product:

Delete the entire product block (from `{` to `},`)

---

## 💬 3. How to Edit Testimonials

**File:** `lib/sanity.ts` (line 32-37)

Find the `fallbackTestimonials` section:

```typescript
const fallbackTestimonials = [
  {
    _id: '1',
    name: 'Divya Krishnan',     // ← Customer name
    text: 'Ordered a custom birthday cake...',  // ← Review text
    rating: 5,                  // ← 1 to 5 stars
    order: 1
  },
  // Add more here
];
```

**To add a new testimonial:**

```typescript
{
  _id: '5',
  name: 'Ramesh Kumar',
  text: 'Best cake I ever tasted! Amazing quality.',
  rating: 5,
  order: 5
},
```

---

## 🎨 4. How to Edit Homepage Banner (Hero Section)

**File:** `components/home/Hero.tsx`

Find these lines and edit:

```typescript
const title = hero?.title || 'Home made, customized cakes for every celebration';
const subtitle = hero?.subtitle || 'Cake is the secret ingredient...';
const ctaText = hero?.ctaText || 'Order Now';
```

Change to:

```typescript
const title = hero?.title || 'Your New Title Here';
const subtitle = hero?.subtitle || 'Your new subtitle text here';
const ctaText = hero?.ctaText || 'Contact Us';
```

**To change the background image:**

Find this line:

```typescript
: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80';
```

Replace with your image:

```typescript
: '/images/hero-background.jpg';
```

---

## 📞 5. How to Update Contact Information

**File:** `app/contact/page.tsx`

Open the file and find the contact section. You'll see:

```typescript
Phone: +91 88384 24741
Email: cake.cravings22@gmail.com
Address: 14, Alagrisamy Street, Avadi, Chennai
```

Just edit these directly in the file.

---

## 🏠 6. How to Edit "About Us" Page

**File:** `app/about/page.tsx`

Open and edit the text directly:

```typescript
<h1>About The Cake Craving</h1>
<p>Your story here...</p>
```

---

## 🎂 7. How to Edit Custom Cakes Page

**File:** `app/custom-cakes/page.tsx`

Edit text and add your custom cake images to the `customCakes` array.

---

## 📝 Quick Reference: Important Files

| What to Edit | File Location |
|-------------|--------------|
| **Products** | `lib/data/products.ts` |
| **Testimonials** | `lib/sanity.ts` (line 32) |
| **Hero Banner** | `components/home/Hero.tsx` |
| **Contact Info** | `app/contact/page.tsx` |
| **About Us** | `app/about/page.tsx` |
| **Custom Cakes** | `app/custom-cakes/page.tsx` |
| **Footer** | `components/layout/Footer.tsx` |
| **Business Name** | `components/layout/Navbar.tsx` |

---

## 🚀 After Making Changes

### Step 1: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your changes.

### Step 2: Build to Check for Errors

```bash
npm run build
```

If it builds successfully, you're good!

### Step 3: Commit and Push

```bash
git add .
git commit -m "Update products and images"
git push
```

### Step 4: Deploy

Your changes will automatically deploy on Vercel (if connected).

---

## 💡 Tips

### Image Best Practices:
- **Size**: 800x800 pixels minimum
- **Format**: JPG or PNG
- **Quality**: High resolution, well-lit photos
- **File size**: Keep under 2MB each

### Photo Options:
1. **Your own photos** → `public/images/`
2. **Instagram photos** → Right-click → Copy image address
3. **Free stock photos** → Unsplash.com, Pexels.com

### Editing Text:
- Keep product descriptions short (1-2 sentences)
- Use descriptive, appetizing words
- Check spelling before publishing

---

## 🆘 Common Issues

**Q: My image isn't showing**
- Check the path: `/images/filename.jpg`
- Make sure image is in `public/images/` folder
- Try refreshing the page (Ctrl+F5)

**Q: Website looks broken after editing**
- Run `npm run build` to check for errors
- Make sure you didn't delete any commas or brackets
- Check the terminal for error messages

**Q: How do I undo changes?**
```bash
git status  # See what changed
git restore filename.ts  # Undo changes to that file
```

---

## 📁 Folder Structure

```
cake-craving-modern/
├── public/
│   └── images/           ← Put your images here
├── lib/
│   └── data/
│       └── products.ts   ← Edit products here
├── components/
│   ├── home/
│   │   └── Hero.tsx      ← Edit homepage banner
│   └── layout/
│       ├── Navbar.tsx    ← Edit navigation
│       └── Footer.tsx    ← Edit footer
└── app/
    ├── contact/
    │   └── page.tsx      ← Edit contact page
    ├── about/
    │   └── page.tsx      ← Edit about page
    └── custom-cakes/
        └── page.tsx      ← Edit custom cakes
```

---

**🎉 You're all set! No CMS needed - just edit files and deploy!**

Need help? Run `npm run dev` to test locally first.
