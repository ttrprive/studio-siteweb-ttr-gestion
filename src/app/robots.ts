import type { MetadataRoute } from 'next';

// Note: Replace with your actual domain name
const URL = 'https://ttrgestion.app';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: `${URL}/sitemap.xml`,
  };
}