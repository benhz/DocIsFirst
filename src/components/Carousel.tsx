import React, { useState } from 'react';

type CarouselProps = {
  images: string[];
  height?: number;
};

export default function Carousel({ images, height = 180 }: CarouselProps) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const current = images[index];

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      style={{
        position: 'relative',
        margin: '1rem 0 1.5rem',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--ifm-color-emphasis-200)',
      }}
    >
      <img
        src={current}
        alt={`banner-${index}`}
        style={{
          width: '100%',
          height,
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              borderRadius: '999px',
              border: 'none',
              padding: '0.25rem 0.55rem',
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              borderRadius: '999px',
              border: 'none',
              padding: '0.25rem 0.55rem',
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
            }}
          >
            ›
          </button>
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px',
            }}
          >
            {images.map((_, i) => (
              <span
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background:
                    i === index
                      ? 'var(--ifm-color-primary)'
                      : 'rgba(255,255,255,0.7)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
