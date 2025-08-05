
import { MetadataRoute } from 'next';

const URL = 'https://ttrgestion.site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/about',
    '/details',
    '/ia',
    '/login',
    '/manual',
    '/news',
    '/privacy',
    '/register',
    '/sectors',
    '/services',
    '/shareholder',
    '/support',
    '/terms',
    '/testimonials',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
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
    changeFrequency: 'weekly',
    priority: 0.9,
  }));
  
  return [...staticRoutes, ...serviceRoutes];
}
