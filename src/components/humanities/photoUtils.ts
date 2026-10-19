import type { HumanitiesPhotoData } from '../../data/types';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** 宽/高。和原页面使用同一套比例，避免图片加载前后布局跳动。 */
export const aspectOf = (photo: HumanitiesPhotoData): number => {
  if (photo.ratio === 'horizontal') return 567 / 520;
  if (photo.ratio === 'vertical') return 441 / 646;
  return 1;
};

export const pad = (value: number) => String(value).padStart(2, '0');

export type OpenPhoto = (photo: HumanitiesPhotoData, list: HumanitiesPhotoData[]) => void;

export interface HumanitiesLabels {
  eyebrow: string;
  title: string;
  quoteLines: string[];
  frames: string;
  scroll: string;
  hint: string;
  hintTouch: string;
  photography: string;
  all: string;
  modes: { grid: string; film: string; index: string };
  filmHint: string;
  lightbox: { close: string; prev: string; next: string; info: string; zoom: string };
}
