'use client';

export default function ColorSizeSelector({ variants, activeVariant, onColorChange, activeSize, onSizeChange }) {
  const sizeStock = (size) => activeVariant?.sizes?.find((s) => s.size === size)?.stock ?? 0;

  return (
    <div className="space-y-5 p-4 rounded-xl" style={{ background: '#FAF7F2', border: '1px solid #EDE0C4' }}>

      {/* Color selector */}
      <div>
        <p className="text-sm font-bold mb-2.5 flex items-center gap-1.5" style={{ color: '#3a1a1a' }}>
          <span className="inline-block w-0.5 h-3.5 rounded-sm" style={{ background: '#C9A84C' }} />
          Color:{' '}
          <span style={{ color: '#8B1A1A' }}>{activeVariant?.color}</span>
        </p>

        <div className="flex gap-2 flex-wrap">
          {variants.map((v) => (
            <button
              key={v._id}
              onClick={() => onColorChange(v)}
              title={v.color}
              className="relative w-9 h-9 rounded-full transition-transform"
              style={{
                backgroundColor: v.colorHex || '#ccc',
                border: activeVariant?._id === v._id
                  ? '2px solid #C9A84C'
                  : '2px solid transparent',
                boxShadow: activeVariant?._id === v._id
                  ? '0 0 0 2px #8B1A1A'
                  : 'none',
                transform: activeVariant?._id === v._id ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {activeVariant?._id === v._id && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-black"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '0.5px', background: '#EDE0C4' }} />

      {/* Size selector */}
      <div>
        <p className="text-sm font-bold mb-2.5 flex items-center gap-1.5" style={{ color: '#3a1a1a' }}>
          <span className="inline-block w-0.5 h-3.5 rounded-sm" style={{ background: '#C9A84C' }} />
          Size:
        </p>

        <div className="flex gap-2 flex-wrap">
          {activeVariant?.sizes?.map((s) => {
            const outOfStock = s.stock <= 0;
            const active = activeSize === s.size;
            return (
              <button
                key={s.size}
                disabled={outOfStock}
                onClick={() => onSizeChange(s.size)}
                className="min-w-[42px] h-[38px] px-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  border: outOfStock
                    ? '1.5px solid #EEE'
                    : active
                    ? '1.5px solid #8B1A1A'
                    : '1.5px solid #DDD0B8',
                  background: active ? '#8B1A1A' : outOfStock ? '#FAFAFA' : '#fff',
                  color: active ? '#fff' : outOfStock ? '#CCC' : '#5a3a2a',
                  textDecoration: outOfStock ? 'line-through' : 'none',
                  cursor: outOfStock ? 'not-allowed' : 'pointer',
                }}
              >
                {s.size}
              </button>
            );
          })}
        </div>

        {activeSize && sizeStock(activeSize) <= 5 && sizeStock(activeSize) > 0 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold rounded-r-md py-1.5 px-2.5"
            style={{
              color: '#8B1A1A',
              background: '#FDF0F0',
              borderLeft: '3px solid #8B1A1A',
            }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Only {sizeStock(activeSize)} left in stock!
          </div>
        )}
      </div>
    </div>
  );
}