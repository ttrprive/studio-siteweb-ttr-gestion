
import { MetadataRoute } from 'next';

const URL = 'https://ttrgestion.site';
const APP_URL = 'https://app.ttrgestion.site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/details', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/sectors', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/news', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/ia', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/testimonials', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/manual', priority: 0.7, changeFrequency: 'yearly' },
    { url: '/support', priority: 0.6, changeFrequency: 'yearly' },
    { url: '/about', priority: 0.5, changeFrequency: 'yearly' },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/shareholder', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: page.priority,
  }));
  
  const serviceSlugs = [
    "creation-site-web",
    "publicite-ciblee",
    "developpement-application",
    "seo"
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: 0.85,
  }));

  const appRoutes = [
    {
      url: `${APP_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
    {
      url: `${APP_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];
  
  return [...staticRoutes, ...serviceRoutes, ...appRoutes];
}
