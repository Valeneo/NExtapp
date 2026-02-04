# Notion Database Grid Embed - Usage Guide

## Quick Start Guide

### Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Give your integration a name (e.g., "My Website Grid")
4. Select the workspace that contains your database
5. Under "Capabilities", ensure **"Read content"** is checked
6. Click **"Submit"** to create the integration
7. Copy the **Internal Integration Token** (it starts with `secret_`)

### Step 2: Share Your Database with the Integration

1. Open the Notion database you want to embed
2. Click the **"..."** (three dots) menu in the top-right corner
3. Click **"Add connections"**
4. Find and select your integration from the list
5. Click **"Confirm"** to grant access

### Step 3: Get Your Database ID

Your database ID can be found in the database URL:

```
https://www.notion.so/workspace/DATABASE_ID?v=VIEW_ID
                              ^^^^^^^^^^^^^^^^
```

**Example:**
- URL: `https://www.notion.so/myworkspace/a1b2c3d4e5f6789012345678?v=xyz`
- Database ID: `a1b2c3d4e5f6789012345678`

**Tip:** Remove all dashes from the ID if present.

### Step 4: Generate Your Embed Code

1. Visit your Notion Database Grid Embed app
2. Paste your **Notion API Key** (secret token)
3. Paste your **Database ID**
4. Click **"Generate Embed Code"**
5. The app will validate your credentials

### Step 5: Use the Embed Code

Once generated, you'll receive two things:

#### 1. Embed URL
```
https://your-domain.com/embed/eyJub3Rpb25BcGlLZXkiOi...
```

This is a direct link to view your database grid.

#### 2. iframe Code
```html
<iframe 
  src="https://your-domain.com/embed/eyJub3Rpb25BcGlLZXkiOi..." 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

Copy and paste this code into your website's HTML.

## Customization Options

### Adjusting iframe Height

Change the `height` attribute to fit your needs:

```html
<iframe ... height="800"></iframe>  <!-- Taller -->
<iframe ... height="400"></iframe>  <!-- Shorter -->
```

### Responsive Sizing

For responsive width:

```html
<div style="width: 100%; max-width: 1200px; margin: 0 auto;">
  <iframe src="..." width="100%" height="600" frameborder="0"></iframe>
</div>
```

### Adding Borders and Styling

Wrap the iframe in a styled container:

```html
<div style="border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <iframe src="..." width="100%" height="600" frameborder="0"></iframe>
</div>
```

## Supported Notion Property Types

The grid automatically displays all Notion property types:

- ✅ **Title** - Main column text
- ✅ **Text** - Rich text content
- ✅ **Number** - Numeric values
- ✅ **Select** - Single selection (displayed as colored badge)
- ✅ **Multi-select** - Multiple selections (displayed as colored badges)
- ✅ **Date** - Formatted dates
- ✅ **Checkbox** - ✓ or ✗ symbols
- ✅ **URL** - Clickable links
- ✅ **Email** - Mailto links
- ✅ **Phone** - Phone numbers
- ✅ **Person** - User names
- ✅ **Files** - File count
- ✅ **Status** - Status badges

## Limitations

### Current Limitations

1. **Maximum Entries**: 100 database entries are displayed (for performance)
2. **Read-Only**: The embed is view-only (no editing)
3. **No Pagination**: First 100 entries only
4. **No Real-Time Updates**: Data is fetched when the embed loads
5. **No Filtering/Sorting**: Displays data as-is from Notion

### Notion API Rate Limits

Notion API has the following rate limits:
- **3 requests per second** per integration
- If you expect high traffic, consider implementing caching

## Troubleshooting

### "Invalid Notion API Key" Error

**Cause**: The API key is incorrect or expired.

**Solution**:
1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Verify your integration exists
3. Copy the token again
4. Make sure you copied the entire token (starts with `secret_`)

### "Database not found" Error

**Cause**: The integration doesn't have access to the database.

**Solution**:
1. Open your Notion database
2. Click "..." → "Add connections"
3. Select your integration
4. Regenerate the embed code

### "Database access restricted" Error

**Cause**: The integration lacks proper permissions.

**Solution**:
1. Check integration capabilities in Notion settings
2. Ensure "Read content" is enabled
3. Re-share the database with the integration

### Embed Not Displaying

**Cause**: Your website may be blocking iframes.

**Solution**:
1. Check browser console for errors
2. Ensure your website allows iframes
3. Try opening the embed URL directly in a browser

### Properties Not Showing Correctly

**Cause**: Some property types may need special handling.

**Solution**:
- The app handles all standard Notion property types
- If you see "Unsupported type", that property type may need custom rendering
- Contact support with details about the property type

## Security Best Practices

### Protecting Your API Key

1. **Never share your API key publicly**
2. **Don't commit it to version control**
3. **Regenerate if compromised**
4. **Use read-only permissions** when possible

### Access Control

1. Only share databases that should be public
2. Be aware that anyone with the embed link can view the database
3. For private data, use Notion's built-in sharing instead

### Regular Maintenance

1. Periodically review which databases are shared
2. Remove integration access from unused databases
3. Regenerate API keys if team members leave

## Advanced Usage

### Multiple Databases

You can generate separate embed codes for multiple databases:

1. Generate an embed for Database A
2. Generate another embed for Database B
3. Place both iframes on your website

### Custom Domain

If you're self-hosting:

1. Configure your domain to point to your server
2. Update `NEXT_PUBLIC_BASE_URL` in your `.env`
3. Regenerate embed codes with the new domain

### Styling Integration

Match the embed to your website theme by wrapping it:

```html
<div class="my-database-embed">
  <h2>Our Team Database</h2>
  <iframe src="..." width="100%" height="600" frameborder="0"></iframe>
</div>
```

## FAQ

### Q: Can I edit the database through the embed?
**A:** No, the embed is read-only for security. Users must edit in Notion.

### Q: How often does the embed update?
**A:** Data is fetched each time someone loads the embed page.

### Q: Can I customize the embed appearance?
**A:** The embed uses a clean, responsive design. For more customization, you'd need to modify the source code.

### Q: What happens if I delete my Notion database?
**A:** The embed will show an error message.

### Q: Can I use this for private databases?
**A:** Yes, but anyone with the embed URL can view the data. For truly private data, use Notion's built-in sharing.

### Q: Does this work with Notion AI?
**A:** The embed displays database properties. Notion AI-generated content in properties will be shown.

### Q: Can I password-protect the embed?
**A:** Not by default. You'd need to add authentication to your deployment.

## Support

For issues or questions:
1. Check this guide first
2. Review the README.md
3. Check Notion API documentation
4. Open an issue on the repository

## Additional Resources

- [Notion API Documentation](https://developers.notion.com/)
- [Notion Integration Guide](https://www.notion.so/help/create-integrations-with-the-notion-api)
- [Database Properties Reference](https://developers.notion.com/reference/property-object)
