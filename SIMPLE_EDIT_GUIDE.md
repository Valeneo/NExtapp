# 📝 Simple Edit Instructions - Non-Technical Guide

## 🎯 What You'll Change

You'll edit **3 files** to customize:
1. Your domain name (www.valeneo.space)
2. Page title and branding
3. Colors (optional)

---

## 📁 File 1: Change Your Domain URL

**File:** `/app/.env`

**What to edit:**
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**Change to:**
```
NEXT_PUBLIC_BASE_URL=https://www.valeneo.space
```

**That's it!** This tells the app to use your domain when generating embed links.

---

## 📁 File 2: Change Page Title & Text

**File:** `/app/app/page.js`

### Change 1: Main Title (Line 47-49)
**Find this (around line 47):**
```javascript
<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
  Notion Database Grid Embed
</h1>
```

**Change to:**
```javascript
<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
  Your Custom Title Here
</h1>
```

### Change 2: Description (Line 50-52)
**Find this (around line 50):**
```javascript
<p className="text-xl text-slate-600 max-w-2xl mx-auto">
  Transform your Notion databases into beautiful, embeddable grids for your website
</p>
```

**Change to:**
```javascript
<p className="text-xl text-slate-600 max-w-2xl mx-auto">
  Your custom description here
</p>
```

### Change 3: Form Title (Line 59)
**Find this (around line 59):**
```javascript
<CardTitle className="text-2xl">Generate Your Embed Code</CardTitle>
```

**Change to:**
```javascript
<CardTitle className="text-2xl">Your Custom Form Title</CardTitle>
```

### Change 4: Step Instructions (Lines 190-226)
**Find this section (around line 190):**
```javascript
<Card className="border-2">
  <CardHeader>
    <CardTitle className="text-lg">Step 1</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-slate-600">
      Create a Notion integration and get your API key
    </p>
  </CardContent>
</Card>
```

**Change the text inside `<p>` tags to your own instructions.**

---

## 📁 File 3: Change Colors (Optional)

**File:** `/app/app/globals.css`

### Change Main Colors (Lines 8-23)

**Find this (around line 8):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}
```

**To change the main color (currently blue):**
Replace the `--primary` line with one of these:

**Purple:**
```css
--primary: 262 83% 58%;
```

**Green:**
```css
--primary: 142 76% 36%;
```

**Red:**
```css
--primary: 0 84% 60%;
```

**Orange:**
```css
--primary: 25 95% 53%;
```

**Pink:**
```css
--primary: 330 81% 60%;
```

---

## 🎨 Quick Visual Changes (Optional)

### Change Number of Image Columns

**File:** `/app/app/embed/[id]/page.js`

**Find this (around line 117):**
```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

**Change `lg:grid-cols-4` to:**
- `lg:grid-cols-3` = 3 columns
- `lg:grid-cols-5` = 5 columns
- `lg:grid-cols-6` = 6 columns

### Change Image Spacing

**Same line (117):**
```javascript
gap-4
```

**Change to:**
- `gap-2` = Less space
- `gap-6` = More space
- `gap-8` = Even more space

---

## 🔒 Optional: Add Password Protection

**File:** `/app/app/embed/[id]/page.js`

**Add after line 7 (after the imports):**
```javascript
// Password protection
const GALLERY_PASSWORD = 'your-secret-password';

export default function EmbedPage({ params }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  
  // Rest of your code...
```

**Then add before line 107 (before the loading return):**
```javascript
  // Check password first
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Access Required</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button
            onClick={() => {
              if (password === GALLERY_PASSWORD) {
                setAuthenticated(true);
              } else {
                alert('Incorrect password');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Access Gallery
          </button>
        </div>
      </div>
    );
  }
```

---

## 📋 Quick Reference Cheat Sheet

| What to Change | File | Approximate Line | What to Edit |
|----------------|------|------------------|--------------|
| Domain URL | `.env` | Line 1 | `NEXT_PUBLIC_BASE_URL=` |
| Main title | `app/page.js` | Line 47-49 | Text inside `<h1>` |
| Description | `app/page.js` | Line 50-52 | Text inside `<p>` |
| Form title | `app/page.js` | Line 59 | Text inside `<CardTitle>` |
| Main color | `globals.css` | Line 11 | `--primary:` value |
| Grid columns | `embed/[id]/page.js` | Line 117 | `lg:grid-cols-4` number |
| Image spacing | `embed/[id]/page.js` | Line 117 | `gap-4` number |

---

## 🚀 After Making Changes

### Step 1: Save All Files
Press `Ctrl + S` (Windows) or `Cmd + S` (Mac) after editing each file.

### Step 2: Restart the Server (if testing locally)
```bash
# Stop the server: Press Ctrl + C

# Start again:
npm run dev
```

### Step 3: Deploy to Production
If you're using Vercel:
1. Push changes to GitHub
2. Vercel automatically deploys
3. Your changes appear at www.valeneo.space

---

## 🎨 Example Complete Customization

Here's what someone named "Valeneo" might change:

### File 1: `.env`
```
NEXT_PUBLIC_BASE_URL=https://www.valeneo.space
```

### File 2: `app/page.js`
**Line 47-49:**
```javascript
<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
  Valeneo Gallery
</h1>
```

**Line 50-52:**
```javascript
<p className="text-xl text-slate-600 max-w-2xl mx-auto">
  Create beautiful image galleries from your Notion databases
</p>
```

### File 3: `globals.css`
**Line 11 (change to purple):**
```css
--primary: 262 83% 58%;
```

---

## ❓ Need Help Finding Line Numbers?

### Method 1: Use Find (Ctrl+F / Cmd+F)
1. Open the file
2. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)
3. Search for the exact text (e.g., "Notion Database Grid Embed")
4. It will jump to that line
5. Edit the text

### Method 2: Look at Line Numbers
Most code editors show line numbers on the left side. Just scroll to the line number mentioned.

---

## ⚠️ Important Tips

1. **Don't delete symbols:** Keep all `<`, `>`, `{`, `}`, `;` exactly as they are
2. **Only change text between quotes:** `"Change this text"` or `'Change this text'`
3. **Keep the structure:** Don't remove any lines, just change the text
4. **Save after each change:** `Ctrl+S` or `Cmd+S`
5. **Test locally first:** Run `npm run dev` to test before deploying

---

## 🎯 Most Important Changes (Minimum)

If you only want to make essential changes:

1. **Domain (MUST DO):**
   - File: `.env`
   - Change: `NEXT_PUBLIC_BASE_URL=https://www.valeneo.space`

2. **Title (Optional but Recommended):**
   - File: `app/page.js`
   - Line 47-49
   - Change: Your app name

That's it! The app will work with just these changes.

---

## 📞 Common Questions

**Q: What if I break something?**
A: Just undo your changes (Ctrl+Z) or re-download the original file.

**Q: Do I need to edit anything else?**
A: No! These are the only files you need to touch for basic customization.

**Q: What about the embed link format (www.valeneo.space/abcdefhg)?**
A: That's generated automatically. Just change the domain in `.env` and the app handles the rest.

**Q: Can I hide the main form page?**
A: Yes! You can password-protect it or only share the embed links directly.

---

## ✅ You're Done!

After editing these files:
1. Your domain will be www.valeneo.space
2. Embed links will be: www.valeneo.space/embed/abcdefhg
3. Your branding will appear everywhere
4. Colors match your style

**No coding knowledge needed - just find and replace text!** 🎉
