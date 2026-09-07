'use client';

import React, { useState } from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: React.ReactNode[];
  autoPlay?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  className = '',
  ...props
}) => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className={`qhr-carousel ${className}`} {...props}>
      <div
        className="qhr-carousel-track"
        style={{ transform: `translateX(${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="qhr-carousel-slide">
            {slide}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="qhr-carousel-control qhr-carousel-control--prev"
        onClick={prev}
        aria-label="السابق"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <button
        type="button"
        className="qhr-carousel-control qhr-carousel-control--next"
        onClick={next}
        aria-label="التالي"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      <div className="qhr-carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`qhr-carousel-dot ${i === current ? 'is-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`الشريحة ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
