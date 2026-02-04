# Files to Export - Quick Reference

## ✅ Essential Files (Must Copy)

### Core Application Files
```
/app/app/page.js                     ← Main form page
/app/app/layout.js                   ← Root layout
/app/app/globals.css                 ← Global styles
/app/app/embed/[id]/page.js          ← Image grid display
/app/app/api/[[...path]]/route.js    ← Backend API
```

### Configuration Files
```
/app/package.json                    ← Dependencies list
/app/next.config.js                  ← Next.js config
/app/tailwind.config.js              ← Tailwind config
/app/postcss.config.js               ← PostCSS config
/app/.env                            ← Environment variables (EDIT THIS!)
```

### Component Library (Copy entire folders)
```
/app/components/ui/                  ← All UI components (copy entire folder)
/app/lib/                            ← Utility functions (copy entire folder)
```

## 🎯 Files You'll Want to Edit

### 1. Branding & Text
**File:** `/app/app/page.js`
- **Line 29-33:** Title and description
- **Line 42:** Change icon/logo
- **Line 178-186:** Step-by-step instructions

### 2. Environment/Domain
**File:** `/app/.env`
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com  ← Change this to your deployed URL
```

### 3. Image Grid Styling  
**File:** `/app/app/embed/[id]/page.js`
- **Line 114:** Background color/gradient
- **Line 117:** Number of columns (currently 4)
- **Line 119:** Gap between images
- **Line 120:** Image border radius, shadows

### 4. Colors & Theme
**File:** `/app/app/globals.css`
- **Lines 3-30:** CSS color variables

### 5. API Security (Optional)
**File:** `/app/app/api/[[...path]]/route.js`
- **Line 7:** Add authentication/rate limiting
- **Lines 29-75:** Validation messages

## 🚫 Files You Can Ignore

These are auto-generated or not needed:
```
/app/node_modules/          ← Don't copy (run npm install instead)
/app/.next/                 ← Don't copy (auto-generated)
/app/package-lock.json      ← Don't copy (will regenerate)
/app/test_result.md         ← Don't copy (testing only)
/app/tests/                 ← Don't copy (testing only)
```

## 📋 Deployment Checklist

### Before Deploying:
- [ ] Copy all essential files
- [ ] Run `npm install` to install dependencies
- [ ] Edit `.env` file with your domain
- [ ] Customize branding in `page.js`
- [ ] Test locally: `npm run dev`
- [ ] Visit `http://localhost:3000` to verify it works

### For Production:
- [ ] Build: `npm run build`
- [ ] Test build: `npm start`
- [ ] Deploy to Vercel/your server
- [ ] Update `NEXT_PUBLIC_BASE_URL` in production `.env`
- [ ] Test the deployed version with your Notion database

## 🔐 Keeping It Private

### Option 1: Private GitHub Repo
1. Create a private repository on GitHub
2. Push your code there
3. Deploy from private repo to Vercel

### Option 2: Local Deployment Only
- Deploy to your own server
- Don't push to any public repository
- Use SSH keys for server access only

### Option 3: Obfuscate Critical Parts
After you're comfortable, you can:
- Rename variables to generic names
- Remove comments
- Minify the production build

## ⚠️ About Notion Embedding

**Important:** Notion DOES NOT allow embedding custom iframes for security reasons.

### Alternatives:
1. **Link Instead of Embed** - Share the link in Notion as a bookmark/link
2. **Notion API Integration** - Build a Notion integration that shows images natively
3. **Screenshot/Export** - Export images and upload directly to Notion
4. **Browser Extension** - Create a Chrome extension to view in Notion

### Notion Bookmark Method:
In Notion, instead of `/embed`, just paste your URL:
```
https://your-domain.com/embed/[encoded-credentials]
```
Notion will show it as a clickable link with preview.

## 🎨 Quick Customization Examples

### Change to 3 Columns
`/app/app/embed/[id]/page.js` line 117:
```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
```

### Add Watermark
`/app/app/embed/[id]/page.js` after line 121:
```javascript
<div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
  © Your Brand 2026
</div>
```

### Change Background to Solid Color
`/app/app/embed/[id]/page.js` line 114:
```javascript
<div className="min-h-screen bg-slate-900 p-4">  {/* Dark background */}
```

### Remove Hover Zoom Effect
`/app/app/embed/[id]/page.js` line 123:
```javascript
className="w-full h-full object-cover"  {/* Remove group-hover:scale-110 */}
```

## 💾 How to Export

### Method 1: Download from Emergent
If your code is on Emergent, download the `/app` folder entirely.

### Method 2: Create New Project
1. Create a new folder: `my-notion-embed/`
2. Copy all files from the checklist above
3. Open terminal in that folder
4. Run: `npm install`
5. Run: `npm run dev`
6. Open `http://localhost:3000`

### Method 3: Clone and Clean
```bash
# If you have git access
git clone your-emergent-repo
cd your-emergent-repo/app
npm install
npm run dev
```

## 🆘 Getting Help

### If something doesn't work:
1. Check you copied all files from "Essential Files" section
2. Run `npm install` to ensure dependencies are installed
3. Check `.env` file has correct values
4. Look at browser console (F12) for errors
5. Check terminal output for error messages

### Common Issues:
- **"Module not found"** → Run `npm install`
- **"Port 3000 in use"** → Use `npm run dev -- -p 3001`
- **"Cannot find component"** → Make sure `/components/ui/` folder is copied
- **"Environment variable undefined"** → Check `.env` file

---

**Note:** The app runs on localhost:3000 by default. After deployment, update the URL in `.env` file!
