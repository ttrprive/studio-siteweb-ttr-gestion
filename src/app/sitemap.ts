import { MetadataRoute } from 'next';

// Note: Replace with your actual domain name
const URL = 'https://ttrgestion.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${URL}/details`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${URL}/support`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${URL}/manual`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
        url: `${URL}/sectors`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    },
    {
      url: `${URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
        url: `${URL}/register`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    {
        url: `${URL}/testimonials`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
    },
    {
        url: `${URL}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
    },
    {
        url: `${URL}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
    },
    {
        url: `${URL}/shareholder`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.2,
    },
  ];
}
