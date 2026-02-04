# Deployment & Customization Guide

## 🚀 Deploying Independently (Outside Emergent)

### Required Files to Copy

```
Your Project/
├── app/
│   ├── page.js                    # Main form page
│   ├── embed/[id]/page.js         # Image grid viewer
│   ├── api/[[...path]]/route.js   # Backend API
│   ├── layout.js                  # Root layout
│   ├── globals.css                # Global styles
│   └── favicon.ico                # Icon (optional)
├── components/
│   └── ui/                        # All shadcn components (copy entire folder)
├── lib/
│   └── utils.js                   # Utility functions
├── .env                           # Environment variables
├── package.json                   # Dependencies
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
└── jsconfig.json                  # JavaScript config (optional)
```

## 🔧 Files to Edit for Customization

### 1. **Environment Variables** (`.env`)
```env
# Change this to your deployed URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Optional: Add custom configs
```

### 2. **Main Form Page** (`app/page.js`)

**Lines to edit for branding:**
- Line 29-33: Change the title and description
- Line 42-46: Modify the icon/logo
- Line 178-186: Edit step instructions

**To hide/customize the form:**
```javascript
// Line 29: Change title
<h1>Your Custom Title</h1>

// Line 32: Change description  
<p>Your custom description</p>

// To add password protection, add before line 21:
const [password, setPassword] = useState('');
if (password !== 'your-secret-password') {
  return <div>Enter Password: <input onChange={(e) => setPassword(e.target.value)} /></div>
}
```

### 3. **Image Grid** (`app/embed/[id]/page.js`)

**Customize appearance:**
- Line 114: Change background gradient
- Line 117: Modify grid columns (currently `lg:grid-cols-4`)
- Line 119: Change gap between images (currently `gap-4`)
- Line 120: Modify image styling (rounded corners, shadows)

**Example customizations:**
```javascript
// Line 117: Change to 3 columns
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

// Line 120: Change image style
<div className="rounded-xl shadow-2xl hover:shadow-3xl">

// To remove background gradient (line 114):
<div className="min-h-screen bg-white p-4">
```

### 4. **API Routes** (`app/api/[[...path]]/route.js`)

**Security & Customization:**
- Line 1-2: Add rate limiting if needed
- Line 29-75: Validation logic (customize error messages)
- Line 77-130: Database query logic

**To add API key protection:**
```javascript
// Add at line 7:
export async function POST(request, { params }) {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of code
}
```

### 5. **Styling** (`app/globals.css`)

**Customize colors:**
- Line 3-30: CSS variables for colors
- Change `--primary`, `--secondary`, `--background` values

**Example:**
```css
:root {
  --background: 0 0% 100%;        /* White background */
  --foreground: 222.2 84% 4.9%;   /* Dark text */
  --primary: 262 83% 58%;         /* Purple primary color */
}
```

## 🔒 Masking/Hiding the Code

### Option 1: Environment Variables (Recommended)
Store sensitive data in `.env` file (never commit this):

```env
NOTION_ENDPOINT=https://api.notion.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
ADMIN_PASSWORD=your-secret-password
```

### Option 2: Obfuscation
After building for production:

```bash
# Build the project
npm run build

# The build output in .next/ will be minified and harder to read
```

### Option 3: Server-Only Logic
Keep sensitive logic in API routes (backend) - never in client components.

**API routes** (`app/api/`) run on server = code not visible to users  
**Page components** (`app/page.js`) run on client = code visible in browser

## 🌐 Deployment Options

### Option A: Vercel (Easiest)
1. Push code to GitHub (private repo)
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# One command deployment
vercel
```

### Option B: Your Own Server
1. Build the production bundle:
```bash
npm run build
npm run start
```

2. Use PM2 to keep it running:
```bash
pm2 start npm --name "notion-embed" -- start
```

### Option C: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use environment variables** for all secrets
3. **Validate all inputs** on the backend
4. **Rate limit API endpoints** to prevent abuse
5. **Use HTTPS** in production (Vercel does this automatically)

## 🎨 Quick Customizations

### Change Color Scheme
Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Change Grid Layout
Edit `app/embed/[id]/page.js` line 117:
```javascript
// 2 columns max
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// 5 columns max  
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
```

### Remove Loading Animation
Edit `app/embed/[id]/page.js` lines 107-113 - replace with simple text

### Add Watermark
Edit `app/embed/[id]/page.js` line 120 - add inside the image div:
```javascript
<div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
  © Your Brand
</div>
```

## 🐛 Troubleshooting

### Issue: Notion doesn't allow embed
**Solution:** Deploy and share as a link instead, or create a Notion-friendly alternative

### Issue: Images not loading
**Check:**
- Notion API key is valid
- Integration is connected to the database
- Database has file/media properties with images

### Issue: CORS errors
**Solution:** Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

## 📝 Keeping Your Code Private

### 1. Private GitHub Repository
```bash
# Create a private repo on GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/private-repo.git
git push -u origin main
```

### 2. Obfuscate Variable Names
Before deploying, you can rename variables to make code less readable:
- Change descriptive names to generic ones
- Remove comments
- Minify manually

### 3. Use Environment Variables
Move ALL sensitive data to `.env`:
```env
API_ENDPOINT=https://...
SECRET_KEY=...
NOTION_BASE=...
```

## 🔄 Updating After Deployment

To update the code on your server:
```bash
git pull origin main
npm install
npm run build
pm2 restart notion-embed
```

Or on Vercel: Just push to GitHub, it auto-deploys!

---

## Quick Start Checklist

- [ ] Copy all required files
- [ ] Update `.env` with your domain
- [ ] Customize branding in `app/page.js`
- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel/your server
- [ ] Test the deployed version
- [ ] Share the link (not iframe) if embedding doesn't work

**Need help?** Check the main README.md for additional documentation.
