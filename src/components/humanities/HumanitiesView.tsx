import { useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import HumanitiesHero from './HumanitiesHero';
import PhotoExhibition from './PhotoExhibition';
import PhotoLightbox from './PhotoLightbox';
import HumanitiesMusic from './HumanitiesMusic';
import type { MusicContent } from './HumanitiesMusic';
import type { HumanitiesLabels } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

interface ViewerState {
  list: HumanitiesPhotoData[];
  index: number;
}

/** 人文页（中英文共用）：首屏拼贴 → 深色展厅 → 音乐 → 页脚，以及全局的大图查看器。 */
const HumanitiesView = ({
  photos,
  labels,
  music,
  footer,
}: {
  photos: HumanitiesPhotoData[];
  labels: HumanitiesLabels;
  music: MusicContent;
  footer: ReactNode;
}) => {
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  const open = (photo: HumanitiesPhotoData, list: HumanitiesPhotoData[]) => {
    const index = Math.max(0, list.findIndex((item) => item.id === photo.id));
    setViewer({ list, index });
  };

  return (
    <div className="w-full overflow-x-clip bg-humanities-bg font-serif text-gray-800">
      <HumanitiesHero photos={photos} labels={labels} onOpen={open} />
      <PhotoExhibition photos={photos} labels={labels} onOpen={open} />
      <HumanitiesMusic content={music} footer={footer} />

      {/* 渲染到 body 上，保证盖过导航栏，不受页面容器层叠上下文影响 */}
      {createPortal(
      <AnimatePresence>
          {viewer && (
            <PhotoLightbox
              key="lightbox"
              photos={viewer.list}
              index={viewer.index}
              labels={labels.lightbox}
              onIndex={(next) => setViewer((state) => (state ? { ...state, index: next } : state))}
              onClose={() => setViewer(null)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default HumanitiesView;
