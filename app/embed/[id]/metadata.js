import { headers } from 'next/headers';

export async function generateMetadata({ params }) {
  // Get the full URL
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullUrl = `${protocol}://${host}/embed/${params.id}`;

  return {
    title: 'Notion Image Gallery',
    description: 'Beautiful image gallery from Notion database',
    openGraph: {
      title: 'Notion Image Gallery',
      description: 'View your Notion database images in a beautiful grid',
      url: fullUrl,
      siteName: 'Notion Image Grid',
      images: [
        {
          url: `${protocol}://${host}/og-image.png`, // We'll create a default image
          width: 1200,
          height: 630,
          alt: 'Notion Image Gallery',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Notion Image Gallery',
      description: 'View your Notion database images in a beautiful grid',
      images: [`${protocol}://${host}/og-image.png`],
    },
  };
}
