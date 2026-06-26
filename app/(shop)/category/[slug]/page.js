'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const catRes = await fetch(`/api/categories/${slug}`);
    const catData = await catRes.json();
    setCategory(catData.category);

    const params = new URLSearchParams({ category: slug, sort });
    if (size) params.set('size', size);
    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }, [slug, size, sort]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Page heading */}
      <div className="mb-4">
        <h1
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: '#8B0000', fontFamily: 'Georgia, serif', letterSpacing: '0.5px' }}
        >
          {category?.name || 'Products'}
        </h1>

        {/* Gold ornament divider */}
        <div className="flex items-center gap-2 mt-1.5 mb-1">
          <div style={{ height: '1px', width: '40px', background: '#C9A84C' }} />
          <span style={{ color: '#C9A84C', fontSize: '12px' }}>✦</span>
          <div style={{ height: '1px', width: '40px', background: '#C9A84C' }} />
        </div>

        {category?.description && (
          <p
            className="text-sm mt-1"
            style={{ color: '#a07070', fontFamily: 'sans-serif' }}
          >
            {category.description}
          </p>
        )}
      </div>

      {/* Filters */}
      <Filters
        sizes={category?.sizes}
        activeSize={size}
        onSizeChange={setSize}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse"
              style={{
                borderRadius: '12px',
                background: '#f5e8e8',
                border: '1.5px solid #e8d5d5',
              }}
            />
          ))}
        </div>

      /* Empty state */
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <span style={{ fontSize: '40px' }}>🛍️</span>
          <p
            className="mt-3 text-base font-medium"
            style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}
          >
            No products found in this category yet.
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: '#a07070', fontFamily: 'sans-serif' }}
          >
            Check back soon — new arrivals every week!
          </p>
        </div>

      /* Product grid */
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}