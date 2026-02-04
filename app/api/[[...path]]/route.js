import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Validate Notion credentials
export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const path = params.path ? params.path.join('/') : '';

    // Validate endpoint
    if (path === 'validate') {
      return handleValidate(body);
    }

    // Database endpoint
    if (path === 'database') {
      return handleDatabase(body);
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle validation of Notion credentials
async function handleValidate(body) {
  const { notionApiKey, databaseId } = body;

  if (!notionApiKey || !databaseId) {
    return NextResponse.json(
      { error: 'Notion API Key and Database ID are required' },
      { status: 400 }
    );
  }

  try {
    // Initialize Notion client with provided credentials
    const notion = new Client({ auth: notionApiKey });

    // Normalize database ID - add dashes if not present
    let normalizedDbId = databaseId.replace(/-/g, ''); // Remove existing dashes
    
    // Add dashes in UUID format: 8-4-4-4-12
    if (normalizedDbId.length === 32) {
      normalizedDbId = [
        normalizedDbId.slice(0, 8),
        normalizedDbId.slice(8, 12),
        normalizedDbId.slice(12, 16),
        normalizedDbId.slice(16, 20),
        normalizedDbId.slice(20)
      ].join('-');
    }

    // Try to retrieve the database to validate credentials
    await notion.databases.retrieve({ database_id: normalizedDbId });

    return NextResponse.json({ success: true, message: 'Credentials validated successfully' });
  } catch (error) {
    console.error('Validation error:', error);
    
    let errorMessage = 'Invalid credentials or database not accessible';
    
    if (error.code === 'unauthorized') {
      errorMessage = 'Invalid Notion API Key';
    } else if (error.code === 'object_not_found') {
      errorMessage = 'Database not found. Make sure:\n1. The database ID is correct\n2. Your integration is connected to the database (click "..." → "Add connections" in Notion)';
    } else if (error.code === 'restricted_resource') {
      errorMessage = 'Database access restricted. Connect your integration to the database in Notion (click "..." → "Add connections")';
    } else if (error.code === 'invalid_request_url') {
      errorMessage = 'Invalid Database ID format. Please check and try again.';
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Handle database query
async function handleDatabase(body) {
  const { notionApiKey, databaseId } = body;

  if (!notionApiKey || !databaseId) {
    return NextResponse.json(
      { error: 'Notion API Key and Database ID are required' },
      { status: 400 }
    );
  }

  try {
    // Initialize Notion client
    const notion = new Client({ auth: notionApiKey });

    // Normalize database ID - add dashes if not present
    let normalizedDbId = databaseId.replace(/-/g, ''); // Remove existing dashes
    
    // Add dashes in UUID format: 8-4-4-4-12
    if (normalizedDbId.length === 32) {
      normalizedDbId = [
        normalizedDbId.slice(0, 8),
        normalizedDbId.slice(8, 12),
        normalizedDbId.slice(12, 16),
        normalizedDbId.slice(16, 20),
        normalizedDbId.slice(20)
      ].join('-');
    }

    // Get database info to retrieve data_source_id (Notion API v2025-09-03)
    const database = await notion.databases.retrieve({ database_id: normalizedDbId });
    const databaseTitle = database.title?.[0]?.plain_text || 'Notion Database';
    
    // Get the first data source ID from the data_sources array
    const dataSourceId = database.data_sources?.[0]?.id || normalizedDbId;

    // Query the database using dataSources API (Notion SDK v5.9.0+)
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100, // Limit to 100 entries for performance
    });

    return NextResponse.json({
      results: response.results,
      databaseTitle: databaseTitle,
      hasMore: response.has_more,
      nextCursor: response.next_cursor
    });
  } catch (error) {
    console.error('Database query error:', error);
    
    let errorMessage = 'Failed to query database';
    
    if (error.code === 'unauthorized') {
      errorMessage = 'Invalid Notion API Key';
    } else if (error.code === 'object_not_found') {
      errorMessage = 'Database not found';
    } else if (error.code === 'restricted_resource') {
      errorMessage = 'Database access restricted';
    } else if (error.code === 'invalid_request_url') {
      errorMessage = 'Invalid Database ID format';
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function GET(request) {
  return NextResponse.json({ message: 'Notion Database Grid API' });
}