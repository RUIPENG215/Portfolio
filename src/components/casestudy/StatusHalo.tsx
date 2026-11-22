import { useEffect, useRef } from 'react';

/**
 * The takeover-status halo on MTA-CoDrive's wheel screen, drawn like Wisp's LightRing:
 * a ring of soft additive glow points around a quiet core. Safe is a calm mint band that
 * slowly turns, medium a blue ring that breathes, danger an amber ring that pulses fast.
 * Colour and motion ease from one state to the next.
 */
export type HaloState = 'safe' | 'medium' | 'danger';

const N = 48;
const TARGET: Record<HaloState, { h: number; s: number; rate: number; depth: number; band: number; core: number }> = {
  safe:   { h: 160, s: 0.62, rate: 0,    depth: 0,    band: 0.55, core: 0.55 },
  medium: { h: 214, s: 0.72, rate: 0.55, depth: 0.55, band: 0.25, core: 0.7 },
  danger: { h: 38,  s: 0.92, rate: 1.4,  depth: 0.75, band: 0,    core: 1 },
};

const rgb = (h: number, s: number, v: number) => {
  const c = v * s, hh = (((h % 360) + 360) % 360) / 60, x = c * (1 - Math.abs((hh % 2) - 1)), m = v - c;
  const [r, g, b] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

const StatusHalo = ({ state, className }: { state: HaloState; className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const drawRef = useRef<(() => void) | null>(null);
  useEffect(() => { stateRef.current = state; drawRef.current?.(); }, [state]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cur = { ...TARGET[stateRef.current] };
    let raf = 0, visible = false, size = 0, phase = 0, last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (!size) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const tg = TARGET[stateRef.current];
      const k = reduce ? 1 : 1 - Math.exp(-dt * 4);           // ease towards the new state
      let dh = tg.h - cur.h; if (dh > 180) dh -= 360; if (dh < -180) dh += 360;
      cur.h += dh * k;
      (['s', 'rate', 'depth', 'band', 'core'] as const).forEach(p => { cur[p] += (tg[p] - cur[p]) * k; });
      phase += dt * cur.rate;
      const t = now / 1000;
      const pulse = 1 - cur.depth * (0.5 - 0.5 * Math.cos(2 * Math.PI * phase));

      const cx = size / 2, cy = size / 2, R = size * 0.3;
      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'lighter';
      const glow = (x: number, y: number, r: number, c: number[], a: number) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`);
        g.addColorStop(0.45, `rgba(${c[0]},${c[1]},${c[2]},${a * 0.35})`);
        g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };
      for (let pass = 0; pass < 2; pass++) {
        const radius = pass ? size * 0.07 : size * 0.19;
        const alpha = pass ? 0.2 : 0.1;
        for (let i = 0; i < N; i++) {
          const a = (i / N) * Math.PI * 2 - Math.PI / 2;
          const band = 0.5 + 0.5 * Math.cos(2 * Math.PI * (i / N - t * 0.06));
          const v = Math.max(0.08, (1 - cur.band + cur.band * band * band) * pulse);
          glow(cx + Math.cos(a) * R, cy + Math.sin(a) * R, radius, rgb(cur.h, cur.s, v), alpha);
        }
      }
      // the quiet core
      const cv = rgb(cur.h, cur.s * 0.8, 1);
      glow(cx, cy, size * (0.12 + 0.06 * cur.core) * (0.85 + 0.15 * pulse), cv, 0.55 * pulse);
      glow(cx, cy, size * 0.035, [255, 255, 255], 0.5 * pulse);
      ctx.globalCompositeOperation = 'source-over';
    };

    drawRef.current = () => draw(performance.now());
    const loop = (now: number) => { draw(now); if (visible && !reduce) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    resize();
    io.observe(canvas); ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); drawRef.current = null; };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
};

export default StatusHalo;
