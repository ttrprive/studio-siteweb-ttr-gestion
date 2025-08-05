
import type { MetadataRoute } from 'next';

const URL = 'https://ttrgestion.site';
 
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
