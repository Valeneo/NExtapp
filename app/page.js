'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Check, Eye, Database } from 'lucide-react';

export default function Home() {
  const [notionApiKey, setNotionApiKey] = useState('');
  const [databaseId, setDatabaseId] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateEmbedUrl = async () => {
    if (!notionApiKey || !databaseId) {
      setError('Please provide both Notion API Key and Database ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Validate credentials first
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notionApiKey, databaseId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate credentials');
      }

      // Encode credentials for URL (use Buffer in browser)
      const encodedData = typeof window !== 'undefined' 
        ? window.btoa(JSON.stringify({ notionApiKey, databaseId }))
        : Buffer.from(JSON.stringify({ notionApiKey, databaseId })).toString('base64');
      
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const embedLink = `${baseUrl}/embed/${encodedData}`;
      
      setEmbedUrl(embedLink);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iframeCode = embedUrl ? `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Database className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Notion Database Grid Embed
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Transform your Notion databases into beautiful, embeddable grids for your website
            </p>
          </div>

          {/* Main Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Generate Your Embed Code</CardTitle>
              <CardDescription className="text-base">
                Enter your Notion credentials to create a shareable embed link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Key Input */}
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-base font-semibold">
                  Notion API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="secret_xxxxxxxxxxxxx"
                  value={notionApiKey}
                  onChange={(e) => setNotionApiKey(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-sm text-slate-500">
                  Get your integration token from{' '}
                  <a
                    href="https://www.notion.so/my-integrations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    notion.so/my-integrations
                  </a>
                </p>
              </div>

              {/* Database ID Input */}
              <div className="space-y-2">
                <Label htmlFor="databaseId" className="text-base font-semibold">
                  Database ID
                </Label>
                <Input
                  id="databaseId"
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={databaseId}
                  onChange={(e) => setDatabaseId(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-sm text-slate-500">
                  Find this in your Notion database URL after the workspace name
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Generate Button */}
              <Button
                onClick={generateEmbedUrl}
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
              >
                {loading ? 'Validating...' : 'Generate Embed Code'}
              </Button>

              {/* Results */}
              {embedUrl && (
                <div className="space-y-4 pt-4 border-t">
                  {/* Preview Button */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(embedUrl, '_blank')}
                      className="flex-1 h-11"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Embed
                    </Button>
                  </div>

                  {/* Embed URL */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Embed URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={embedUrl}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(embedUrl)}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* iframe Code */}
                  <div className="space-y-2">
                    <Label className="font-semibold">iframe Embed Code</Label>
                    <div className="flex gap-2">
                      <Input
                        value={iframeCode}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(iframeCode)}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-sm text-slate-700">
                      Copy the iframe code and paste it into your website's HTML to embed your Notion database grid.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
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
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Step 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Connect your integration to your database and copy the database ID
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Step 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Generate your embed code and add it to your website
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}