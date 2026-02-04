# 🚀 START HERE - Your Notion Image Grid App

## 📋 What You Built

A Next.js app that transforms Notion databases into beautiful, embeddable image grids!

**What it does:**
- Users enter their Notion credentials
- App generates a unique embed link
- Link shows images from their Notion database in a clean grid
- Works as Notion bookmark (click to view)

**Your embed links will look like:**
```
www.valeneo.space/embed/abc123def456
```

---

## 🎯 Quick Start - What to Edit

You only need to edit **3 files** to customize everything:

### 1️⃣ Change Your Domain
**File:** `/app/.env`
**Line:** 1

**Change this:**
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**To this:**
```
NEXT_PUBLIC_BASE_URL=https://www.valeneo.space
```

✅ **That's it!** Your links will now be: `www.valeneo.space/embed/xxxxx`

---

### 2️⃣ Change App Title & Branding
**File:** `/app/app/page.js`

**How to find:** Press `Ctrl+F` (or `Cmd+F` on Mac) and search for the text

**Edit #1 - Main Title (around line 47):**
```javascript
// Find this:
Notion Database Grid Embed

// Replace with:
Your Custom App Name
```

**Edit #2 - Description (around line 51):**
```javascript
// Find this:
Transform your Notion databases into beautiful, embeddable grids for your website

// Replace with:
Your custom description here
```

✅ **Done!** Your branding is updated

---

### 3️⃣ Change Colors (Optional)
**File:** `/app/app/globals.css`
**Around line:** 11

**Find this:**
```css
--primary: 221.2 83.2% 53.3%;
```

**Replace with one of these colors:**

🟣 **Purple:** `--primary: 262 83% 58%;`  
🟢 **Green:** `--primary: 142 76% 36%;`  
🔴 **Red:** `--primary: 0 84% 60%;`  
🟠 **Orange:** `--primary: 25 95% 53%;`  
🩷 **Pink:** `--primary: 330 81% 60%;`

✅ **Done!** Your app uses your brand colors

---

## 🎨 Optional Customizations

### Change Grid Columns
**File:** `/app/app/embed/[id]/page.js`
**Around line:** 117

**Find:** `lg:grid-cols-4`

**Change to:**
- `lg:grid-cols-2` = 2 columns (bigger images)
- `lg:grid-cols-3` = 3 columns
- `lg:grid-cols-5` = 5 columns
- `lg:grid-cols-6` = 6 columns (smaller images)

### Add Password Protection
See **QUICK_EDIT_CARD.md** for complete code to copy-paste

---

## 📚 Your Complete Documentation

All guides are in `/app/` folder:

### For Quick Edits:
1. **QUICK_EDIT_CARD.md** ⭐ **START HERE**
   - 5-minute guide
   - Find & replace instructions
   - No coding knowledge needed

2. **SIMPLE_EDIT_GUIDE.md**
   - Detailed step-by-step
   - Line numbers included
   - Complete examples

### For Deployment & Export:
3. **EXPORT_GUIDE.md**
   - Which files to copy
   - What each file does
   - Quick reference checklist

4. **DEPLOYMENT_GUIDE.md**
   - Deploy to Vercel/own server
   - Security best practices
   - Environment setup

### For Using in Notion:
5. **NOTION_LINK_EMBED_GUIDE.md**
   - How to paste links in Notion
   - Best practices
   - Layout examples

6. **NOTION_EMBED_SOLUTIONS.md**
   - Alternative embedding methods
   - Workarounds if needed

---

## 💡 How to Edit Files (No Coding Needed!)

**Step 1:** Open any text editor (Notepad, VS Code, TextEdit, etc.)

**Step 2:** Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)

**Step 3:** Type the EXACT text you want to find
- Example: "Notion Database Grid Embed"

**Step 4:** When it finds it, replace with your text

**Step 5:** Save the file (`Ctrl+S` or `Cmd+S`)

**Step 6:** Done!

### Golden Rules:
- ✅ Only change TEXT between quotes: `"change this"`
- ❌ Don't change symbols: `<` `>` `{` `}` `;`
- ❌ Don't delete lines, just replace text
- ✅ Always save after editing

---

## 🚀 After Editing - Next Steps

### Testing Locally:
```bash
npm run dev
# Opens at http://localhost:3000
```

### Deploy to Production:
1. Push to GitHub (private repository)
2. Connect to Vercel (free)
3. Vercel auto-deploys
4. Your app is live at www.valeneo.space

---

## ✅ How to Use in Notion

**Step 1:** Visit your deployed app (www.valeneo.space)

**Step 2:** Enter Notion API key and database ID

**Step 3:** Click "Generate Embed Code"

**Step 4:** Copy the **Embed URL**

**Step 5:** Paste in Notion page

**Result:** Notion creates a bookmark card  
**User clicks** → Beautiful image grid opens!

---

## 📊 Your App Structure

```
/app/
├── app/
│   ├── page.js              ← Main form (edit title here)
│   ├── embed/[id]/page.js   ← Image grid (edit layout here)
│   ├── api/[[...path]]/route.js  ← Backend API
│   ├── layout.js            ← Root layout
│   └── globals.css          ← Colors (edit colors here)
├── .env                     ← Domain URL (edit domain here)
├── package.json             ← Dependencies
└── README.md                ← This file!
```

---

## 🔒 Security Notes

**Your embed links contain encoded credentials:**
- Links look like: `www.valeneo.space/embed/abc123`
- The `abc123` part contains the Notion API key (encoded)
- Only share links with trusted people
- Links work until you revoke the Notion integration

**Optional: Add password protection**
- See QUICK_EDIT_CARD.md for code
- Protects gallery with password
- Extra security layer

---

## 🆘 Quick Troubleshooting

**Problem:** Can't find the text to edit
**Solution:** Use Ctrl+F to search for exact text

**Problem:** Changed something and broke it
**Solution:** Press Ctrl+Z to undo, or re-download the file

**Problem:** Server won't start
**Solution:** Run `npm install` then `npm run dev`

**Problem:** Domain not updating
**Solution:** Make sure you edited `.env` file and restarted server

---

## 📞 Need More Help?

Check these files in order:

1. **QUICK_EDIT_CARD.md** - Fast answers
2. **SIMPLE_EDIT_GUIDE.md** - Detailed help
3. **DEPLOYMENT_GUIDE.md** - Deployment issues

All files are in the `/app/` folder!

---

## 🎉 You're Ready!

**Minimum edits (5 minutes):**
1. Change domain in `.env`
2. Change title in `page.js`
3. Deploy!

**That's literally all you need!**

Everything else is optional customization.

---

## 📝 Quick Checklist

- [ ] Edited domain in `.env`
- [ ] Changed title in `page.js` (optional)
- [ ] Changed colors in `globals.css` (optional)
- [ ] Tested locally with `npm run dev`
- [ ] Deployed to www.valeneo.space
- [ ] Generated test embed link
- [ ] Pasted link in Notion
- [ ] Confirmed it works!

---

## 🌟 Your App is Ready!

Your embed links: `www.valeneo.space/embed/xxxxx`  
Paste in Notion → Beautiful image galleries! 🖼️

**No coding knowledge required - just find & replace text!**

Enjoy your new Notion Image Grid app! 🎉
