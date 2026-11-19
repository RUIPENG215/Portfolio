import { useEffect, useRef } from 'react';

/**
 * A canvas sketch of Wisp's 32-LED ring. Each state is a small function of
 * (LED index, time) → hue / saturation / value, in the spirit of the firmware's
 * look frames (hue, flow, breath, sparkle). It is an illustration, not the firmware.
 */
export type RingState = 'present' | 'voice' | 'clap' | 'away' | 'return' | 'music' | 'think';

const N = 32;
type HSV = [number, number, number];

const frac = (x: number) => x - Math.floor(x);
const hash = (a: number, b: number) => frac(Math.sin(a * 127.1 + b * 311.7) * 43758.5453);
const mix = (a: HSV, b: HSV, k: number): HSV => {
  let dh = b[0] - a[0];
  if (dh > 180) dh -= 360; if (dh < -180) dh += 360;
  return [a[0] + dh * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
};

const present = (i: number, t: number): HSV => {
  const band = 0.5 + 0.5 * Math.cos(2 * Math.PI * (i / N - t * 0.07));
  return [31, 0.82, 0.22 + 0.78 * band * band];
};
const away = (i: number, t: number): HSV => {
  const breath = 0.5 - 0.5 * Math.cos((2 * Math.PI * t) / 6);
  const band = 0.5 + 0.5 * Math.cos(2 * Math.PI * (i / N - t * 0.02));
  return [222, 0.72, (0.07 + 0.36 * breath) * (0.75 + 0.25 * band)];
};

const shade: Record<RingState, (i: number, t: number) => HSV> = {
  present,
  voice: (i, t) => {
    const base = present(i, t);
    const slot = Math.floor(t * 13);
    const level = 0.55 + 0.45 * Math.sin(t * 1.3);           // the room gets louder and quieter
    if (hash(i, slot) < 0.05 + 0.16 * level) {
      const k = 1 - frac(t * 13);
      return mix([base[0], base[1], base[2] * 0.7], [40, 0, 1], k);
    }
    return [base[0], base[1], base[2] * 0.7];
  },
  clap: (i, t) => {
    const u = t % 4;
    const base = present(i, t);
    if (u < 0.14) return mix(base, [40, 0, 1], 1 - u / 0.14);
    if (u < 1.74) {
      const head = (u - 0.14) / 1.6;
      const d = frac(head - i / N);
      return mix([base[0], base[1], base[2] * 0.35], [38, 0.25, 1], Math.exp(-d * 11));
    }
    return base;
  },
  away,
  return: (i, t) => {
    const u = t % 5.5;
    if (u < 1.6) return away(i, t);
    if (u < 1.85) return [40, 0, 1 - (u - 1.6) * 2];
    if (u < 3.6) {
      const k = (u - 1.85) / 1.75;
      const e = 1 - (1 - k) * (1 - k);
      const p = present(i, t);
      return [p[0] - 6 * (1 - e), p[1], Math.min(1, p[2] * e + 0.55 * Math.sin(Math.PI * k))];
    }
    return present(i, t);
  },
  music: (i, t) => {
    const beat = 60 / 116;
    const k = Math.floor(t / beat);
    const f = frac(t / beat);
    const strong = k % 4 === 0;
    const env = Math.exp(-f * (strong ? 5 : 8)) * (strong ? 1 : 0.78);
    const hue = (k * 26 + (i / N) * 220) % 360;
    const white = k % 8 === 0 && f < 0.22;
    return [hue, white ? 0.05 : 0.9, 0.03 + 0.97 * env];
  },
  think: (i, t) => {
    const d = frac(t / 1.15 - i / N);
    return [36, 0.5, 0.1 + 0.9 * Math.exp(-d * 8)];
  },
};

const toRgb = ([h, s, v]: HSV) => {
  const c = v * s, hh = ((h % 360) + 360) % 360 / 60, x = c * (1 - Math.abs((hh % 2) - 1)), m = v - c;
  const [r, g, b] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

const LightRing = ({ state, className }: { state: RingState; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const startRef = useRef(0);
  const drawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    stateRef.current = state;
    startRef.current = performance.now();
    drawRef.current?.();
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, visible = false, size = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!size) return;
      const t = reduce ? 0.9 : (performance.now() - startRef.current) / 1000;
      const fn = shade[stateRef.current];
      const cx = size / 2, cy = size / 2, R = size * 0.3;
      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'lighter';
      const colours: number[][] = [];
      for (let i = 0; i < N; i++) {
        const [h, s, v] = fn(i, t);
        colours.push(toRgb([h, s, Math.max(0, Math.min(1, v))]));
      }
      // The paper shade blurs the 32 LEDs into one continuous band, so the ring is drawn from
      // colours interpolated between neighbouring LEDs rather than from 32 separate points.
      const S = 4;                     // samples per LED
      const M = N * S;
      const sample = (j: number) => {
        const k = Math.floor(j / S), f = (j % S) / S;
        const c0 = colours[k], c1 = colours[(k + 1) % N];
        return [c0[0] + (c1[0] - c0[0]) * f, c0[1] + (c1[1] - c0[1]) * f, c0[2] + (c1[2] - c0[2]) * f].map(Math.round);
      };
      const pass = (radius: number, alpha: number, step: number) => {
        for (let j = 0; j < M; j += step) {
          const a = (j / M) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
          const [r, g, b] = sample(j);
          const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
          grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
          grd.addColorStop(0.45, `rgba(${r},${g},${b},${alpha * 0.35})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grd;
          ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        }
      };
      pass(size * 0.2, 0.11, 2);       // wide halo, light spilling through the paper
      pass(size * 0.075, 0.2, 1);      // the bright band itself
      ctx.globalCompositeOperation = 'source-over';
    };
    drawRef.current = draw;

    const loop = () => { draw(); if (visible && !reduce) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) loop();
    });
    const ro = new ResizeObserver(() => { resize(); draw(); });
    resize();
    startRef.current = performance.now();
    io.observe(canvas);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); drawRef.current = null; };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default LightRing;
