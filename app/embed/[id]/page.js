'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database } from 'lucide-react';

export default function EmbedPage({ params }) {
  const [data, setData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [databaseTitle, setDatabaseTitle] = useState('');
  const [embedId, setEmbedId] = useState(null);

  useEffect(() => {
    // Handle async params
    if (params && params.id) {
      setEmbedId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (!embedId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Decode the credentials from URL
        const decodedData = JSON.parse(atob(embedId));
        
        const response = await fetch('/api/database', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(decodedData)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch database');
        }

        setData(result.results || []);
        setDatabaseTitle(result.databaseTitle || 'Notion Database');
        
        // Extract property names from first result
        if (result.results && result.results.length > 0) {
          const props = Object.keys(result.results[0].properties);
          setProperties(props);
        }
      } catch (err) {
        setError(err.message || 'Failed to load database');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [embedId]);

  const renderPropertyValue = (property) => {
    if (!property) return 'N/A';

    try {
      // Title
      if (property.title && Array.isArray(property.title) && property.title.length > 0) {
        return property.title.map(t => t.plain_text).join('');
      }

      // Rich text
      if (property.rich_text && Array.isArray(property.rich_text) && property.rich_text.length > 0) {
        return property.rich_text.map(t => t.plain_text).join('');
      }

      // Select
      if (property.select && property.select.name) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {property.select.name}
          </span>
        );
      }

      // Multi-select
      if (property.multi_select && Array.isArray(property.multi_select)) {
        return (
          <div className="flex flex-wrap gap-1">
            {property.multi_select.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {item.name}
              </span>
            ))}
          </div>
        );
      }

      // Date
      if (property.date && property.date.start) {
        const date = new Date(property.date.start);
        return date.toLocaleDateString();
      }

      // Checkbox
      if (property.type === 'checkbox') {
        return property.checkbox ? '✓' : '✗';
      }

      // Number
      if (property.number !== null && property.number !== undefined) {
        return property.number;
      }

      // URL
      if (property.url) {
        return (
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Link
          </a>
        );
      }

      // Email
      if (property.email) {
        return (
          <a href={`mailto:${property.email}`} className="text-blue-600 hover:underline">
            {property.email}
          </a>
        );
      }

      // Phone
      if (property.phone_number) {
        return property.phone_number;
      }

      // People
      if (property.people && Array.isArray(property.people)) {
        return property.people.map(p => p.name).join(', ');
      }

      // Files
      if (property.files && Array.isArray(property.files)) {
        return `${property.files.length} file(s)`;
      }

      // Status
      if (property.status && property.status.name) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {property.status.name}
          </span>
        );
      }

      return '—';
    } catch (err) {
      return 'Error';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg text-slate-600">Loading database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertDescription className="text-base">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{databaseTitle}</h1>
            <p className="text-sm text-slate-500">{data.length} entries</p>
          </div>
        </div>

        {/* Data Grid */}
        {data.length > 0 ? (
          <Card className="shadow-xl overflow-hidden border-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    {properties.map((prop) => (
                      <TableHead key={prop} className="font-semibold text-slate-700">
                        {prop}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, idx) => (
                    <TableRow key={item.id || idx} className="hover:bg-slate-50">
                      {properties.map((prop) => (
                        <TableCell key={prop} className="py-4">
                          {renderPropertyValue(item.properties[prop])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <Database className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-lg text-slate-500">No entries found in this database</p>
          </Card>
        )}
      </div>
    </div>
  );
}