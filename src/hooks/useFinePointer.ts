import { useSyncExternalStore } from 'react';

// 只有"能悬停 + 精确指针"的设备（鼠标、触控板）才启用指针类动效；
// 手机和平板上这些效果既没意义又费电。
const QUERY = '(hover: hover) and (pointer: fine)';

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export const useFinePointer = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
