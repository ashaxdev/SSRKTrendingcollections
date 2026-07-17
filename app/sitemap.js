import { dbConnect } from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

// Re-generate the sitemap at most once per hour instead of on every request.
export const revalidate = 3600;

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ssrktrendingcollections.com';

  let products = [];
  let categories = [];

  try {
    await dbConnect();

    const [productDocs, categoryDocs] = await Promise.all([
      Product.find({ isActive: true }).select('slug updatedAt').lean(),
      Category.find({ isActive: true }).select('slug updatedAt').lean(),
    ]);

    products = productDocs;
    categories = categoryDocs;
  } catch (error) {
    // Don't let a DB hiccup take down the whole sitemap — fall back to static routes only.
    console.error('sitemap: failed to load products/categories', error);
  }

  const now = new Date();

  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/cart`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${siteUrl}/checkout`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${siteUrl}/orders`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${siteUrl}/wishlist`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
  ];

  const categoryRoutes = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${siteUrl}/category/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      changeFrequency: 'daily',
      priority: 0.8,
    }));

  const productRoutes = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/product/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'daily',
      priority: 0.7,
    }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}