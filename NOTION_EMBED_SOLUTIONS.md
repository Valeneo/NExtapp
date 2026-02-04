# Can You Embed Into Notion? - Complete Answer

## ❌ Short Answer: No Direct Embedding

Notion **blocks all custom iframe embeds** for security. Only these whitelisted services work:
- YouTube, Vimeo, Loom (videos)
- Figma, Framer (design)
- Google Maps, Drive, Sheets
- CodePen, GitHub Gist (code)
- Twitter, Instagram (social)

Your custom domain **will NOT work** with Notion's `/embed` command.

---

## ✅ What DOES Work in Notion

### 1. **Bookmark/Link Preview** (Built-in)
Paste your URL directly in Notion:

```
https://your-domain.com/embed/[credentials]
```

**Result:** Notion creates a **bookmark card** with preview image
- ✅ Easy - just paste the URL
- ✅ Clickable - opens your grid in new tab
- ❌ Not embedded - doesn't show inline

---

### 2. **Synced Block with Images** (Recommended!)
Add images directly into Notion as native image blocks:

**How it works:**
1. User generates embed link in your app
2. Clicks "Copy to Notion" button
3. Your app fetches images from database
4. Copies images as Notion blocks
5. User pastes into their Notion page

**Pros:**
- ✅ Images appear **natively** in Notion
- ✅ No external embedding needed
- ✅ Works on mobile and desktop
- ✅ Syncs with Notion's database

**Implementation:** See code below ⬇️

---

### 3. **Notion Gallery Database View**
Instead of external embedding, use Notion's native gallery:

**Setup:**
1. Your database already has images
2. In Notion, switch to **Gallery View**
3. Customize card preview
4. Adjust column width

**Pros:**
- ✅ Fully native Notion experience
- ✅ No external dependencies
- ✅ Can filter, sort, search

**Cons:**
- ❌ Less customizable than your grid
- ❌ Notion's styling only

---

### 4. **Public Page with Button**
Create a Notion page with your embed link:

```
📸 Image Gallery
━━━━━━━━━━━━━━━━

[Bookmark Preview Card]
👆 Click to view full gallery

Or copy this link:
https://your-domain.com/embed/xxx
```

**Pros:**
- ✅ Easy to share
- ✅ Professional presentation
- ✅ Works for everyone

---

## 🔥 Best Solution: "Sync to Notion" Feature

Add a button that copies images **directly into Notion**:

### Step 1: Add Sync Button to Your App

Add to `/app/app/page.js` after the generate button:

```javascript
const syncToNotion = async (targetPageId) => {
  const response = await fetch('/api/sync-to-notion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      notionApiKey,
      databaseId,
      targetPageId
    })
  });
  
  const result = await response.json();
  if (result.success) {
    alert(`✅ Added ${result.message} to your Notion page!`);
  } else {
    alert('Error: ' + result.error);
  }
};

// Add this button in your UI:
<Button onClick={() => {
  const pageId = prompt('Enter your Notion page ID:');
  if (pageId) syncToNotion(pageId);
}}>
  📋 Copy Images to Notion
</Button>
```

### Step 2: Add API Endpoint

Add to `/app/app/api/[[...path]]/route.js`:

```javascript
// After line 15, add:
if (path === 'sync-to-notion') {
  return handleSyncToNotion(body);
}

// Add this function at the end:
async function handleSyncToNotion(body) {
  const { notionApiKey, databaseId, targetPageId } = body;
  
  try {
    const notion = new Client({ auth: notionApiKey });
    
    // Normalize IDs
    let normalizedDbId = databaseId.replace(/-/g, '');
    if (databaseId.includes('notion.so')) {
      const match = databaseId.match(/([a-f0-9]{32})/i);
      if (match) normalizedDbId = match[0];
    }
    if (normalizedDbId.length === 32) {
      normalizedDbId = [
        normalizedDbId.slice(0, 8),
        normalizedDbId.slice(8, 12),
        normalizedDbId.slice(12, 16),
        normalizedDbId.slice(16, 20),
        normalizedDbId.slice(20)
      ].join('-');
    }
    
    // Get database
    const database = await notion.databases.retrieve({ 
      database_id: normalizedDbId 
    });
    const dataSourceId = database.data_sources?.[0]?.id || normalizedDbId;
    
    // Query images
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100
    });
    
    // Extract image URLs
    const imageUrls = [];
    response.results.forEach(item => {
      Object.values(item.properties).forEach(prop => {
        if (prop.files && Array.isArray(prop.files)) {
          prop.files.forEach(file => {
            const url = file.file?.url || file.external?.url;
            if (url) imageUrls.push(url);
          });
        }
      });
    });
    
    // Normalize target page ID
    let normalizedPageId = targetPageId.replace(/-/g, '');
    if (targetPageId.includes('notion.so')) {
      const match = targetPageId.match(/([a-f0-9]{32})/i);
      if (match) normalizedPageId = match[0];
    }
    if (normalizedPageId.length === 32) {
      normalizedPageId = [
        normalizedPageId.slice(0, 8),
        normalizedPageId.slice(8, 12),
        normalizedPageId.slice(12, 16),
        normalizedPageId.slice(16, 20),
        normalizedPageId.slice(20)
      ].join('-');
    }
    
    // Create image blocks
    const blocks = imageUrls.map(url => ({
      object: 'block',
      type: 'image',
      image: {
        type: 'external',
        external: { url }
      }
    }));
    
    // Append to page
    await notion.blocks.children.append({
      block_id: normalizedPageId,
      children: blocks
    });
    
    return NextResponse.json({ 
      success: true, 
      count: imageUrls.length,
      message: `${imageUrls.length} images` 
    });
    
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to sync'
    }, { status: 400 });
  }
}
```

### How Users Use It:

1. **Generate embed** in your app
2. Click **"Copy Images to Notion"** button
3. Enter their Notion page URL or ID
4. Images appear **instantly** in their Notion page!

**Result:** Images are now **native Notion blocks** - fully embedded!

---

## 🎨 Alternative: Gallery View Embed

Use Notion's built-in database gallery view:

### Option A: Linked Database
1. Create a **linked database** in target Notion page
2. Point it to your source database
3. Switch to **Gallery View**
4. Customize card size and properties

**Notion syntax:**
```
Type: /linked database
Select: Your image database
View: Gallery
```

### Option B: Notion API Gallery
Create a custom Notion block that displays as gallery:

```javascript
// Create a gallery database block
const galleryBlock = {
  object: 'block',
  type: 'child_database',
  child_database: {
    title: 'Image Gallery'
  }
};

await notion.blocks.children.append({
  block_id: pageId,
  children: [galleryBlock]
});
```

---

## 📊 Comparison Table

| Solution | Embedded? | Native? | Interactive? | Setup |
|----------|-----------|---------|--------------|-------|
| Bookmark Link | ❌ | ❌ | ✅ Click to open | Easy |
| Sync to Notion | ✅ | ✅ | ❌ Static | Medium |
| Gallery View | ✅ | ✅ | ✅ Full Notion | Easy |
| Screenshot | ✅ | ❌ | ❌ Static | Easy |
| Browser Extension | ✅ | ❌ | ✅ Interactive | Hard |

---

## 🎯 My Recommendation

For your use case (private, in Notion), use **Solution #2: Sync to Notion**

**Why:**
- ✅ Images appear **inline** in Notion pages
- ✅ No iframe restrictions
- ✅ Native Notion blocks
- ✅ Works on mobile
- ✅ Easy for users
- ✅ Can update/refresh anytime

**User Flow:**
```
1. User opens your app
2. Enters Notion credentials
3. Clicks "Copy to Notion"
4. Enters target page URL
5. Images instantly appear in their Notion page
```

---

## 🔧 Quick Implementation

Want me to add the "Sync to Notion" feature to your app? It will:

1. Add a new button to the main page
2. Create the API endpoint
3. Allow users to copy images directly into Notion pages
4. Work as native Notion image blocks

This is the **best workaround** for Notion's embed limitations!

Would you like me to implement this? It's about 50 lines of code.
