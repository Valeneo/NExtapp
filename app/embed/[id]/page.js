'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, Image as ImageIcon } from 'lucide-react';
import Head from 'next/head';

export default function EmbedPage({ params }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [databaseTitle, setDatabaseTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Get the ID from params - params is an object with id property
        let embedId = params?.id || params;
        
        if (!embedId || typeof embedId !== 'string') {
          throw new Error('No valid embed ID provided');
        }

        // URL decode the ID first (Next.js URL encodes the path params)
        embedId = decodeURIComponent(embedId);

        // Decode the credentials from URL using browser API
        let decodedData;
        try {
          const decoded = window.atob(embedId);
          decodedData = JSON.parse(decoded);
        } catch (decodeError) {
          console.error('Decode error:', decodeError);
          throw new Error('Invalid embed link. Please generate a new one.');
        }
        
        const response = await fetch('/api/database', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(decodedData)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch database');
        }

        setDatabaseTitle(result.databaseTitle || 'Notion Database');
        
        // Extract images from the database results
        const extractedImages = [];
        
        if (result.results && result.results.length > 0) {
          result.results.forEach((item, index) => {
            const properties = item.properties;
            
            // Try to find image URLs in various properties
            Object.entries(properties).forEach(([key, prop]) => {
              // Files property
              if (prop.files && Array.isArray(prop.files) && prop.files.length > 0) {
                prop.files.forEach(file => {
                  if (file.type === 'file' && file.file?.url) {
                    extractedImages.push({
                      id: `${item.id}-${key}-file`,
                      url: file.file.url,
                      name: file.name || `Image ${extractedImages.length + 1}`,
                      caption: file.caption?.[0]?.plain_text || '',
                      source: key
                    });
                  } else if (file.type === 'external' && file.external?.url) {
                    extractedImages.push({
                      id: `${item.id}-${key}-external`,
                      url: file.external.url,
                      name: file.name || `Image ${extractedImages.length + 1}`,
                      caption: file.caption?.[0]?.plain_text || '',
                      source: key
                    });
                  }
                });
              }
              
              // URL property (might contain image URLs)
              if (prop.url && (prop.url.includes('.jpg') || prop.url.includes('.png') || prop.url.includes('.jpeg') || prop.url.includes('.gif') || prop.url.includes('.webp'))) {
                extractedImages.push({
                  id: `${item.id}-${key}-url`,
                  url: prop.url,
                  name: `Image from ${key}`,
                  caption: '',
                  source: key
                });
              }
            });
          });
        }
        
        setImages(extractedImages);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load database');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg text-slate-600">Loading images...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="container mx-auto">
        {/* Image Grid - Clean, no text */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-slate-100">
                        <svg class="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <ImageIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <p className="text-lg text-slate-500">No images found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}