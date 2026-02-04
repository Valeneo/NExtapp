// Add this to /app/app/api/[[...path]]/route.js

// New endpoint: Sync images to Notion page
if (path === 'sync-to-notion') {
  return handleSyncToNotion(body);
}

async function handleSyncToNotion(body) {
  const { notionApiKey, databaseId, targetPageId } = body;
  
  try {
    const notion = new Client({ auth: notionApiKey });
    
    // Get images from database
    const database = await notion.databases.retrieve({ 
      database_id: normalizeDbId(databaseId) 
    });
    const dataSourceId = database.data_sources?.[0]?.id;
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
    
    // Create gallery blocks in target Notion page
    const blocks = imageUrls.map(url => ({
      object: 'block',
      type: 'image',
      image: {
        type: 'external',
        external: { url }
      }
    }));
    
    // Append blocks to target page
    await notion.blocks.children.append({
      block_id: targetPageId,
      children: blocks
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `Added ${imageUrls.length} images to Notion page` 
    });
    
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 400 });
  }
}
