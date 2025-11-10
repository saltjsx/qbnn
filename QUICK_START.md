# QBNN Quick Start Guide 🚀

## 1️⃣ Set Up Sanity (5 minutes)

### Create Sanity Project
1. Go to https://www.sanity.io/manage
2. Click "Create new project"
3. Name it "QBNN News"
4. Dataset: "production"
5. **Copy your Project ID**

### Add Project ID to Your Site
Create a `.env` file in the `qbnn` folder:
```
VITE_SANITY_PROJECT_ID=paste_your_project_id_here
VITE_SANITY_DATASET=production
```

Also update `sanity.config.ts` line 10:
```typescript
projectId: 'paste_your_project_id_here',
```

## 2️⃣ Configure CORS

1. Go to https://www.sanity.io/manage
2. Select your project → API → CORS Origins
3. Add these origins:
   - `http://localhost:5173` ✓ Allow credentials
   - Your Vercel URL when you deploy ✓ Allow credentials
4. Save

## 3️⃣ Deploy to Vercel

### Via GitHub (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Add environment variables:
   - `VITE_SANITY_PROJECT_ID` = your project ID
   - `VITE_SANITY_DATASET` = production
6. Click "Deploy"

### Your URLs
- **Main Site**: `https://your-project.vercel.app/`
- **Content Studio**: `https://your-project.vercel.app/sanity.html`
- **Alternative Studio URL**: `https://your-project.vercel.app/studio`

## 4️⃣ Create Your First Article

1. Go to your Sanity Studio (at `/sanity.html` or `/studio`)
2. Click "Article" → "Create new"
3. Fill in:
   - Title: "Breaking: QBNN Launches New Platform"
   - Slug: Click "Generate"
   - Category: "Updates"
   - Excerpt: "We're excited to announce the launch of our new news platform."
   - Main Image: Upload an image
   - Body: Write your article
   - Featured Article: ✓ Check this box
   - Published at: Now
4. Click "Publish"
5. Check your main site - it should appear!

## Categories Explained

- **Investing**: Markets, stocks, financial news
- **Guides**: How-to articles, tutorials
- **Opinion**: Commentary, analysis, op-eds
- **Updates**: Breaking news, announcements

## Local Development

```bash
npm run dev
```

- Main site: http://localhost:5173/
- Sanity Studio: http://localhost:5173/sanity.html

## Troubleshooting

**No articles showing?**
- Check you published (not just saved) the article
- Verify Project ID in `.env` matches Sanity
- Check CORS settings in Sanity

**Can't access Studio?**
- Make sure CORS is configured
- Try `/sanity.html` and `/studio` URLs
- Clear browser cache

**Images not loading?**
- Verify images are uploaded in Sanity
- Check browser console for errors

## That's It! 🎉

You now have a fully functional news website with a headless CMS. Create more articles in Sanity Studio and they'll automatically appear on your site.

For detailed instructions, see `SANITY_SETUP.md`.