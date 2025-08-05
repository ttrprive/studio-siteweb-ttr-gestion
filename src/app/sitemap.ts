
import { MetadataRoute } from 'next';

const URL = 'https://ttrgestion.site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Add all static pages here
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

  const routes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
  
  // You can add dynamic pages here later, for example:
  // const news = await getNews();
  // const newsRoutes = news.map(item => ({...}));
  
  return routes;
}
