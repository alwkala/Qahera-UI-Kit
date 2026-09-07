'use client';

import React, { useRef, useEffect } from 'react';

export interface CanvasSparksProps {
  count?: number;
  variant?: 'default' | 'emerald';
  className?: string;
}

export function CanvasSparks({
  count = 35,
  variant = 'default',
  className = '',
}: CanvasSparksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const isEmerald = variant === 'emerald';

    class Spark {
      x = 0;
      y = 0;
      size = 1;
      speedY = 1;
      speedX = 0;
      opacity = 0.5;
      fadeSpeed = 0.003;

      constructor() {
        this.reset(true);
      }

      reset(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : height + 10;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.003 + 0.002;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = isEmerald 
          ? `rgba(23, 105, 81, ${this.opacity})` 
          : `rgba(212, 175, 55, ${this.opacity})`;
        c.shadowBlur = 8;
        c.shadowColor = isEmerald ? '#176951' : '#F2C94C';
        c.fill();
      }
    }

    const sparks: Spark[] = [];
    for (let i = 0; i < count; i++) {
      sparks.push(new Spark());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < sparks.length; i++) {
        sparks[i].update();
        sparks[i].draw(ctx);
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [count, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`qhr-canvas-sparks qhr-canvas-sparks--${variant} ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
