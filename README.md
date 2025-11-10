# QBNN - Quicbuck News Network

A professional news website built with React, Vite, and Sanity CMS.

## 🚀 What You Need to Do

### Step 1: Create a Sanity Account & Project (5 minutes)

1. Visit **https://www.sanity.io/manage**
2. Sign up (it's free)
3. Click **"Create new project"**
4. Name: `QBNN News`
5. Dataset: `production`
6. **Copy your Project ID** (you'll need this!)

### Step 2: Configure Your Project

Create a `.env` file in this folder with:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

Also update `sanity.config.ts` on line 10:
```typescript
projectId: 'your_project_id_here',  // Replace with your actual ID
```

### Step 3: Enable CORS in Sanity

1. Go to **https://www.sanity.io/manage**
2. Select your project
3. Go to **API → CORS Origins**
4. Add:
   - `http://localhost:5173` ✓ Allow credentials
   - Your Vercel domain (after deployment) ✓ Allow credentials

### Step 4: Deploy to Vercel

1. Push this code to GitHub
2. Go to **https://vercel.com**
3. Click **"New Project"** → Import your GitHub repo
4. Add environment variables:
   - `VITE_SANITY_PROJECT_ID` = your project ID
   - `VITE_SANITY_DATASET` = `production`
5. Click **"Deploy"**

**Your live URLs:**
- Main Site: `https://your-project.vercel.app/`
- Content Studio: `https://your-project.vercel.app/sanity.html`

### Step 5: Create Content

1. Visit your Sanity Studio at `/sanity.html`
2. Click **"Article"** → **"Create new"**
3. Fill in all fields (title, category, excerpt, image, etc.)
4. Check **"Featured Article"** for your main story
5. Click **"Publish"**
6. Visit your main site - your article appears!

## 📝 Categories

- **Investing** - Markets, stocks, financial news
- **Guides** - How-to articles, tutorials
- **Opinion** - Commentary, analysis
- **Updates** - Breaking news, announcements

## 💻 Local Development

```bash
npm install
npm run dev
```

- Main site: http://localhost:5173/
- Sanity Studio: http://localhost:5173/sanity.html

## 📚 Documentation

- **QUICK_START.md** - Fast setup reference
- **SANITY_SETUP.md** - Detailed instructions

## 🎨 Brand Colors

- Primary: `#51BBFE`
- Text: `#333333`
- Background: `#F5F5F5`

## ✅ Deployment Checklist

- [ ] Created Sanity project and copied Project ID
- [ ] Added `.env` file with Project ID
- [ ] Updated `sanity.config.ts` with Project ID
- [ ] Configured CORS in Sanity dashboard
- [ ] Pushed code to GitHub
- [ ] Deployed to Vercel with environment variables
- [ ] Created first article in Sanity Studio
- [ ] Verified article shows on live site

## 🆘 Troubleshooting

**No articles showing?**
- Verify you published (not just saved) articles
- Check Project ID in `.env` matches Sanity
- Confirm CORS is configured

**Can't access Studio?**
- Check CORS settings in Sanity
- Try both `/sanity.html` and `/studio` URLs

**Images not loading?**
- Ensure images are uploaded in Sanity Studio
- Check browser console for errors

## 🔗 Important Links

- Sanity Dashboard: https://www.sanity.io/manage
- Vercel Dashboard: https://vercel.com/dashboard
- Sanity Docs: https://www.sanity.io/docs

---

Built with ❤️ for QBNN