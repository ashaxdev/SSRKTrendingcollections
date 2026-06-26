'use client';

const FALLBACK_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'];

export default function Filters({ sizes, activeSize, onSizeChange, sort, onSortChange }) {
  const sizeOptions = sizes?.length ? sizes : FALLBACK_SIZES;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-3 px-4"
      style={{ background: '#FAF7F2', borderBottom: '1.5px solid #EDE0C4' }}
    >
      {/* Size filters */}
      {sizeOptions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
          <span
            className="text-[11px] font-bold tracking-wide uppercase shrink-0"
            style={{ color: '#9A7A5A' }}
          >
            Size
          </span>

          {/* All button */}
          <button
            onClick={() => onSizeChange('')}
            className="px-3 py-1 rounded-full text-[11.5px] font-semibold border-[1.5px] shrink-0 transition-all"
            style={{
              background: !activeSize ? '#8B1A1A' : '#fff',
              color: !activeSize ? '#fff' : '#5a3a2a',
              borderColor: !activeSize ? '#8B1A1A' : '#DDD0B8',
            }}
          >
            All
          </button>

          {sizeOptions.map((s) => (
            <button
              key={s}
              onClick={() => onSizeChange(s)}
              className="px-3 py-1 rounded-full text-[11.5px] font-semibold border-[1.5px] shrink-0 transition-all"
              style={{
                background: activeSize === s ? '#8B1A1A' : '#fff',
                color: activeSize === s ? '#fff' : '#5a3a2a',
                borderColor: activeSize === s ? '#8B1A1A' : '#DDD0B8',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="hidden sm:block shrink-0 w-px h-5" style={{ background: '#EDE0C4' }} />

      {/* Sort */}
      <div className="flex items-center gap-2 sm:ml-auto shrink-0">
        <span
          className="text-[11px] font-bold tracking-wide uppercase"
          style={{ color: '#9A7A5A' }}
        >
          Sort
        </span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-[11.5px] font-semibold rounded-full px-3 py-1 outline-none border-[1.5px] transition-colors"
          style={{
            background: '#fff',
            borderColor: '#DDD0B8',
            color: '#5a3a2a',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%238B1A1A' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            paddingRight: '28px',
            appearance: 'none',
          }}
        >
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}