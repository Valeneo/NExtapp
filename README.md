# Notion Database Grid Embed

A beautiful Next.js application that transforms Notion databases into embeddable, read-only grid visualizations for your website.

## Features

✨ **Easy Integration** - Simply enter your Notion API credentials to get started  
🔒 **Secure** - Credentials are validated before generating embed codes  
📊 **Beautiful Grid Display** - Clean, responsive table layout with proper formatting  
🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components  
🔗 **Instant Embed Codes** - Generate iframe codes that can be embedded anywhere  
📱 **Responsive** - Works perfectly on all device sizes  

## How It Works

1. **Create a Notion Integration**
   - Go to https://www.notion.so/my-integrations
   - Create a new integration and copy the API key (starts with `secret_`)

2. **Connect to Your Database**
   - Open your Notion database
   - Click the "..." menu → "Add connections" → Select your integration
   - Copy the database ID from the URL

3. **Generate Embed Code**
   - Enter your API key and database ID in the app
   - Click "Generate Embed Code"
   - Copy the iframe code and paste it into your website

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **API**: Notion SDK (@notionhq/client)
- **Icons**: Lucide React

## API Endpoints

### POST /api/validate
Validates Notion API credentials and database access.

**Request:**
```json
{
  "notionApiKey": "secret_xxxxx",
  "databaseId": "xxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Credentials validated successfully"
}
```

### POST /api/database
Queries a Notion database and returns formatted results.

**Request:**
```json
{
  "notionApiKey": "secret_xxxxx",
  "databaseId": "xxxxx"
}
```

**Response:**
```json
{
  "results": [...],
  "databaseTitle": "My Database",
  "hasMore": false,
  "nextCursor": null
}
```

## Embed URL Format

The embed URLs are generated with base64-encoded credentials:
```
https://your-domain.com/embed/{base64EncodedCredentials}
```

## Supported Notion Property Types

The grid viewer supports all major Notion property types:

- ✅ Title
- ✅ Rich Text
- ✅ Number
- ✅ Select (styled with badges)
- ✅ Multi-select (styled with badges)
- ✅ Date
- ✅ Checkbox
- ✅ URL (clickable links)
- ✅ Email (mailto links)
- ✅ Phone Number
- ✅ People
- ✅ Files
- ✅ Status

## Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
/app
├── app/
│   ├── page.js                    # Main landing page with form
│   ├── embed/[id]/page.js         # Embed viewer page
│   ├── api/[[...path]]/route.js   # API routes for Notion integration
│   └── layout.js                  # Root layout
├── components/ui/                 # shadcn/ui components
└── lib/                           # Utility functions
```

## Security Considerations

- Credentials are validated before generating embed links
- API keys are never exposed in client-side code
- All Notion API calls are made server-side
- Error messages don't leak sensitive information

## Limitations

- Maximum 100 database entries per embed (for performance)
- Read-only access (no editing capabilities)
- Requires valid Notion integration with database access

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
