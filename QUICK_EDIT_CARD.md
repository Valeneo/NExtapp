# 🎯 QUICK EDIT CARD - Copy & Paste This!

## ✏️ 3 FILES TO EDIT (That's All!)

---

## 📄 FILE 1: Change Domain
**Location:** `/app/.env`
**Line:** 1

**Find this:**
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**Replace with:**
```
NEXT_PUBLIC_BASE_URL=https://www.valeneo.space
```

✅ **Done! Your links will now be: www.valeneo.space/embed/xxxxx**

---

## 📄 FILE 2: Change Title
**Location:** `/app/app/page.js`

### Edit #1 - Main Heading (Line ~47)
**Find:**
```javascript
Notion Database Grid Embed
```
**Replace with:**
```javascript
Your App Name
```

### Edit #2 - Description (Line ~51)
**Find:**
```javascript
Transform your Notion databases into beautiful, embeddable grids for your website
```
**Replace with:**
```javascript
Your description here
```

✅ **Done! Your branding is updated**

---

## 📄 FILE 3: Change Color (Optional)
**Location:** `/app/app/globals.css`
**Line:** ~11

**Find:**
```css
--primary: 221.2 83.2% 53.3%;
```

**Replace with ONE of these:**

🟣 **Purple:**
```css
--primary: 262 83% 58%;
```

🟢 **Green:**
```css
--primary: 142 76% 36%;
```

🔴 **Red:**
```css
--primary: 0 84% 60%;
```

🟠 **Orange:**
```css
--primary: 25 95% 53%;
```

🩷 **Pink:**
```css
--primary: 330 81% 60%;
```

✅ **Done! Your app uses your color**

---

## 🎨 BONUS: Change Grid Layout (Optional)
**Location:** `/app/app/embed/[id]/page.js`
**Line:** ~117

**Find:**
```javascript
lg:grid-cols-4
```

**Replace with:**
- `lg:grid-cols-2` = 2 columns (bigger images)
- `lg:grid-cols-3` = 3 columns
- `lg:grid-cols-5` = 5 columns (more images)
- `lg:grid-cols-6` = 6 columns (smaller images)

✅ **Done! Your grid shows X columns**

---

## 🔐 BONUS: Add Password (Optional)
**Location:** `/app/app/embed/[id]/page.js`

**Add this after line 6:**
```javascript
const GALLERY_PASSWORD = 'mypassword123';

export default function EmbedPage({ params }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
```

**Then add this after line 13:**
```javascript
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button
            onClick={() => {
              if (password === GALLERY_PASSWORD) {
                setAuthenticated(true);
              } else {
                alert('Wrong password!');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
```

✅ **Done! Your gallery needs password to view**

---

## 🚀 HOW TO FIND THE RIGHT LINE

### Method: Use Search (Easiest!)
1. Open file in any text editor
2. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)
3. Type the exact text you're looking for
4. It jumps to that line
5. Replace the text
6. Save (`Ctrl+S` or `Cmd+S`)

**Example:**
- Search for: `Notion Database Grid Embed`
- Found it? Replace with your text
- Save file
- Done!

---

## ⚠️ GOLDEN RULES

1. **Only change TEXT between quotes**
   - ✅ Change: `"Your text here"`
   - ❌ Don't change: `className=` or `{` or `}` or `;`

2. **Don't delete any lines**
   - Just replace text

3. **Keep all symbols**
   - Keep: `<` `>` `{` `}` `;` `"` `'`

4. **Save after each edit**
   - Press `Ctrl+S` or `Cmd+S`

---

## ✅ CHECKLIST

- [ ] Changed domain in `.env`
- [ ] Changed title in `page.js`
- [ ] Changed description in `page.js`
- [ ] (Optional) Changed color in `globals.css`
- [ ] (Optional) Changed grid columns
- [ ] (Optional) Added password
- [ ] Saved all files
- [ ] Tested locally: `npm run dev`
- [ ] Deployed to www.valeneo.space

---

## 🎯 MINIMUM CHANGES (If You're in a Rush)

**Just edit 1 file:**

**File:** `/app/.env`
```
NEXT_PUBLIC_BASE_URL=https://www.valeneo.space
```

**That's literally it!** Your app will work with just this change.

Everything else is optional customization.

---

## 📞 HELP

**Can't find a line?**
- Use Ctrl+F / Cmd+F to search for the exact text

**Made a mistake?**
- Press Ctrl+Z / Cmd+Z to undo

**Still stuck?**
- Check SIMPLE_EDIT_GUIDE.md for detailed instructions
- Or just re-download the original file

---

## 🎉 YOU'RE DONE!

Your embed links will look like:
```
www.valeneo.space/embed/abc123def456
```

Paste this into Notion → Beautiful image grid! 🖼️
