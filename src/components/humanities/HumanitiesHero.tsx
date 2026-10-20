import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import SplitText from '../motion/SplitText';
import { useFinePointer } from '../../hooks/useFinePointer';
import { aspectOf, EASE, pad, thumbOf } from './photoUtils';
import type { HumanitiesLabels, OpenPhoto } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

interface Cell {
  photo: HumanitiesPhotoData;
  /** 照片中心在"墙"坐标系里的位置 */
  cx: number;
  cy: number;
  w: number;
  h: number;
  rot: number;
  depth: number;
  delay: number;
}

const hash = (id: number, k: number) => {
  const x = Math.sin(id * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const useViewport = () => {
  const read = () => ({
    w: typeof window === 'undefined' ? 1280 : window.innerWidth,
    h: typeof window === 'undefined' ? 800 : window.innerHeight,
  });
  const [size, setSize] = useState(read);
  useEffect(() => {
    const onResize = () => setSize(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
};

/** 把所有照片排进一面比视口略大的"墙"：错行、带抖动，照片再多墙会自动变大。 */
const buildWall = (photos: HumanitiesPhotoData[], vw: number, vh: number, mobile: boolean) => {
  const n = photos.length;
  let cw: number;
  let ch: number;
  let cols: number;
  let rows: number;
  if (mobile) {
    cw = Math.max(120, vw / 2.5);
    ch = cw * 1.3;
    cols = Math.max(5, Math.ceil(Math.sqrt(n * 1.7)));
    rows = Math.max(1, Math.ceil(n / cols));
    const grow = Math.min(1.35, Math.max(1, (vw * 1.12) / (cols * cw + cw / 2), (vh * 1.12) / (rows * ch)));
    cw *= grow;
    ch *= grow;
  } else {
    // 桌面：把所有照片一次放进窗口，取能放下的最大单元，四周留一圈余量给悬停放大
    const aw = vw * 0.94;
    const ah = vh * 0.94;
    cw = 0;
    ch = 0;
    cols = 1;
    rows = n;
    // 多留约三成空位，再按到中心的椭圆距离挑出最近的 n 个，整体就聚成一团椭圆而不是方块
    const need = Math.ceil(n * 1.3);
    for (let c = 2; c <= Math.max(2, n); c += 1) {
      const r = Math.ceil(need / c);
      const size = Math.min(aw / (c + 0.5), ah / (r * 1.25));
      if (size > cw) {
        cw = size;
        ch = size * 1.25;
        cols = c;
        rows = r;
      }
    }
  }

  const wallW = cols * cw + cw / 2;
  const wallH = rows * ch;
  const cx0 = wallW / 2;
  const cy0 = wallH / 2;
  const maxDist = Math.hypot(cx0, cy0);

  let slots: { row: number; col: number }[];
  if (mobile) {
    slots = photos.map((_, index) => ({ row: Math.floor(index / cols), col: index % cols }));
  } else {
    const all: { row: number; col: number; d: number }[] = [];
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const nx = (c + 0.5 + (r % 2 ? 0.5 : 0) - (cols + 0.5) / 2) / ((cols + 0.5) / 2);
        const ny = (r + 0.5 - rows / 2) / (rows / 2);
        all.push({ row: r, col: c, d: nx * nx + ny * ny });
      }
    }
    slots = all
      .sort((a, b) => a.d - b.d)
      .slice(0, n)
      .sort((a, b) => a.row - b.row || a.col - b.col);
  }

  const cells: Cell[] = photos.map((photo, index) => {
    const { row, col } = slots[index];
    const aspect = aspectOf(photo);
    let w = cw * (0.74 + 0.2 * hash(photo.id, 3));
    let h = w / aspect;
    if (h > ch * 0.95) {
      h = ch * 0.95;
      w = h * aspect;
    }
    const cx = (col + 0.5 + (row % 2 ? 0.5 : 0)) * cw + (hash(photo.id, 1) - 0.5) * cw * 0.22;
    const cy = (row + 0.5) * ch + (hash(photo.id, 2) - 0.5) * ch * 0.18;
    return {
      photo,
      cx,
      cy,
      w,
      h,
      rot: (hash(photo.id, 4) - 0.5) * 8,
      depth: 0.5 + hash(photo.id, 5) * 0.9,
      delay: 0.25 + (Math.hypot(cx - cx0, cy - cy0) / maxDist) * 1.1 + hash(photo.id, 6) * 0.25,
    };
  });

  return { cells, wallW, wallH };
};

const SIGMA = 170;

const WallPhoto = ({
  cell,
  wallX,
  wallY,
  mx,
  my,
  px,
  py,
  active,
  interactive,
  onOpen,
}: {
  cell: Cell;
  wallX: MotionValue<number>;
  wallY: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  active: MotionValue<number>;
  interactive: boolean;
  onOpen: () => void;
}) => {
  // 鼠标在这张照片附近时：放大，并被轻轻推开；同时按景深做一点随鼠标的视差
  const influence = () => {
    if (!interactive) return { f: 0, dx: 0, dy: 0 };
    const dx = cell.cx + wallX.get() - mx.get();
    const dy = cell.cy + wallY.get() - my.get();
    const d = Math.hypot(dx, dy) || 0.0001;
    const f = Math.exp(-(d * d) / (2 * SIGMA * SIGMA)) * active.get();
    return { f, dx: dx / d, dy: dy / d };
  };
  const scale = useTransform(() => 1 + 0.4 * influence().f);
  const x = useTransform(() => {
    const { f, dx } = influence();
    return dx * 26 * f + (interactive ? px.get() * cell.depth * 18 : 0);
  });
  const y = useTransform(() => {
    const { f, dy } = influence();
    return dy * 26 * f + (interactive ? py.get() * cell.depth * 14 : 0);
  });
  const zIndex = useTransform(() => (influence().f > 0.3 ? 20 : 1));

  return (
    <motion.div
      className="absolute"
      style={{
        left: cell.cx - cell.w / 2,
        top: cell.cy - cell.h / 2,
        width: cell.w,
        height: cell.h,
        x,
        y,
        scale,
        zIndex,
      }}
    >
      <motion.button
        type="button"
        data-cursor
        aria-label={cell.photo.title}
        onClick={onOpen}
        className="group relative block h-full w-full overflow-hidden rounded-sm bg-[#1a1a1a] shadow-[0_18px_40px_-22px_rgba(70,50,32,0.55)]"
        initial={{ opacity: 0, scale: 0.55, y: 60, rotate: cell.rot + (hash(cell.photo.id, 7) - 0.5) * 36 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: cell.rot }}
        transition={{ duration: 1.1, ease: EASE, delay: cell.delay }}
        whileHover={{ rotate: 0, transition: { duration: 0.35, ease: EASE } }}
      >
        <img
          src={thumbOf(cell.photo)}
          alt={cell.photo.title}
          loading="eager"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-5 text-left text-[9px] uppercase tracking-[0.22em] text-white transition-transform duration-500 group-hover:translate-y-0">
          {cell.photo.title}
        </span>
      </motion.button>
    </motion.div>
  );
};

/**
 * 人文页首屏：所有照片铺成一面"照片墙"。
 * - 电脑：移动鼠标，整面墙平移；鼠标附近的照片放大并把周围推开
 * - 手机：直接拖动照片墙
 * 照片数量增加时，墙会自动变大，不需要改任何代码。
 */
const HumanitiesHero = ({
  photos,
  labels,
  onOpen,
}: {
  photos: HumanitiesPhotoData[];
  labels: HumanitiesLabels;
  onOpen: OpenPhoto;
}) => {
  const reduceMotion = useReducedMotion() ?? false;
  const fine = useFinePointer();
  const interactive = fine && !reduceMotion;
  const { w: vw, h: vh } = useViewport();
  const mobile = vw < 768;
  const heroHeight = mobile ? Math.max(720, vh) : Math.max(640, vh);
  // 照片墙放进右侧一个深色圆角"窗口"（手机上在下半部分）：边缘干净利落，不做渐变
  const PANEL_TOP_DESKTOP = 96;
  const panelLeft = mobile ? 12 : Math.round(vw * 0.46);
  const panelTop = mobile ? Math.round(heroHeight * 0.47) : PANEL_TOP_DESKTOP;
  const wvw = vw - panelLeft - (mobile ? 12 : 0);
  const wvh = heroHeight - panelTop - (mobile ? 48 : 24);
  const { scrollY } = useScroll();
  const { cells, wallW, wallH } = useMemo(() => buildWall(photos, wvw, wvh, mobile), [photos, wvw, wvh, mobile]);

  const baseX = (wvw - wallW) / 2;
  const baseY = (wvh - wallH) / 2;
  const panX = Math.max(0, (wallW - wvw) / 2);
  const panY = Math.max(0, (wallH - wvh) / 2);

  // 布局数值放进 motion value，供逐帧计算读取
  const baseXv = useMotionValue(baseX);
  const baseYv = useMotionValue(baseY);
  const panXv = useMotionValue(panX);
  const panYv = useMotionValue(panY);
  useEffect(() => {
    baseXv.set(baseX);
    baseYv.set(baseY);
    panXv.set(panX);
    panYv.set(panY);
  }, [baseX, baseY, panX, panY, baseXv, baseYv, panXv, panYv]);

  // 鼠标 → 墙的平移目标（-1..1）
  const rawPx = useMotionValue(0);
  const rawPy = useMotionValue(0);
  const px = useSpring(rawPx, { stiffness: 60, damping: 20, mass: 0.8 });
  const py = useSpring(rawPy, { stiffness: 60, damping: 20, mass: 0.8 });
  const targetX = useTransform(() => baseXv.get() - px.get() * panXv.get());
  const targetY = useTransform(() => baseYv.get() - py.get() * panYv.get());
  const springX = useSpring(targetX, { stiffness: 90, damping: 24, mass: 0.7 });
  const springY = useSpring(targetY, { stiffness: 90, damping: 24, mass: 0.7 });

  // 触屏：拖动
  const dragX = useMotionValue(baseX);
  const dragY = useMotionValue(baseY);
  useEffect(() => {
    dragX.set(baseX);
    dragY.set(baseY);
  }, [baseX, baseY, dragX, dragY]);
  const dragged = useRef(false);

  const wallX = interactive ? springX : dragX;
  const driftY = useTransform(() => (interactive ? springY.get() : dragY.get()) - scrollY.get() * 0.12);

  // 指针在 Hero 内的位置（用于"鼠标附近放大"）
  const rawMx = useMotionValue(-9999);
  const rawMy = useMotionValue(-9999);
  const mx = useSpring(rawMx, { stiffness: 260, damping: 30, mass: 0.5 });
  const my = useSpring(rawMy, { stiffness: 260, damping: 30, mass: 0.5 });
  const rawActive = useMotionValue(0);
  const active = useSpring(rawActive, { stiffness: 120, damping: 20 });

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!interactive || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawMx.set(event.clientX - rect.left);
    rawMy.set(event.clientY - rect.top);
    rawPx.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    rawPy.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    rawActive.set(1);
  };
  const handleLeave = () => {
    rawActive.set(0);
    rawPx.set(0);
    rawPy.set(0);
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ height: heroHeight }}>
      {/* 照片墙：深色圆角窗口。照片文件自带的 #131313 边框和窗口同色，所以照片像是悬浮在窗口里 */}
      <div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="absolute overflow-hidden"
        style={{ left: panelLeft, top: panelTop, width: wvw, height: wvh }}
      >
        <motion.div
          className="absolute left-0 top-0"
          style={{
            width: wallW,
            height: wallH,
            x: wallX,
            y: driftY,
            touchAction: interactive ? undefined : 'pan-y',
          }}
          drag={!interactive && !reduceMotion ? 'x' : false}
          dragConstraints={{ left: Math.min(0, wvw - wallW), right: 0 }}
          dragElastic={0.08}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDragEnd={() => {
            window.setTimeout(() => {
              dragged.current = false;
            }, 60);
          }}
        >
          {cells.map((cell) => (
            <WallPhoto
              key={cell.photo.id}
              cell={cell}
              wallX={wallX}
              wallY={driftY}
              mx={mx}
              my={my}
              px={px}
              py={py}
              active={active}
              interactive={interactive}
              onOpen={() => {
                if (!dragged.current) onOpen(cell.photo, photos);
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* 文字区：独立在左侧（手机上在上半部分），不与照片重叠 */}
      <div
        className={`pointer-events-none absolute left-0 z-10 flex flex-col px-4 md:px-8 ${
          mobile ? 'inset-x-0 top-0 justify-end pb-6 pt-24' : 'inset-y-0 w-[46%] justify-center pt-16'
        }`}
        style={mobile ? { height: panelTop } : undefined}
      >
        <div className="w-full" style={{ paddingLeft: mobile ? 0 : Math.max(0, (vw - 1280) / 2) }}>
          <motion.span
            className="mb-4 block text-xl italic text-humanities-primary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            {labels.eyebrow}
          </motion.span>
          <h1 className="text-[3.75rem] leading-[0.92] tracking-tight text-gray-900 md:text-[clamp(2.75rem,5.4vw,7rem)]">
            <SplitText lines={[labels.title]} lineClassName="whitespace-nowrap" stagger={0.05} duration={1.1} delay={0.15} />
          </h1>
          <motion.p
            className="mt-6 max-w-md text-base font-light leading-relaxed text-gray-600 md:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            {labels.quoteLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-wrap md:bottom-6 items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.35em] text-gray-500 md:left-8">
        <span className="tabular-nums text-gray-900">{pad(photos.length)}</span>
        <span>{labels.frames}</span>
        <span className="mx-1 h-px w-8 bg-gray-400/60" />
        <span>{interactive ? labels.hint : labels.hintTouch}</span>
      </div>
    </section>
  );
};

export default HumanitiesHero;
