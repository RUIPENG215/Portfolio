import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HumanitiesView from '../components/humanities/HumanitiesView';
import type { HumanitiesLabels } from '../components/humanities/photoUtils';
import { photography, musicTracks } from '../data/humanitiesData';
import { socialLinks } from '../data/socialLinks';
import type { HumanitiesPhotoData } from '../data/types';

// 人文页中文版：版式、动效和英文版完全一致（共用 components/humanities 里的组件），只换界面文字。
// 照片标题/描述在数据里本来就是中文，这里只翻译分类、地点和日期。

const categoryZh: Record<string, string> = {
  Urban: '都市',
  Architecture: '建筑',
  Humanity: '人文',
  Landscape: '风光',
  Documentary: '纪实',
};

const locationZh: Record<string, string> = {
  'Jinan, China': '中国 · 济南',
  'Qingdao Zhanqiao, China': '中国 · 青岛栈桥',
  'Qingdao Music Square, China': '中国 · 青岛音乐广场',
  'Qingdao Coast, China': '中国 · 青岛海岸',
  "Xi'an, China": '中国 · 西安',
  'Fufeng, Shaanxi, China': '中国 · 陕西扶风',
  'Xianyang, Shaanxi, China': '中国 · 陕西咸阳',
  'Hancheng, Shaanxi, China': '中国 · 陕西韩城',
  'Dangjia Village, Hancheng, China': '中国 · 韩城党家村',
  'West Lake, Hangzhou, China': '中国 · 杭州西湖',
  'Wuzhen, Zhejiang, China': '中国 · 浙江乌镇',
};

const dateZh: Record<string, string> = {
  'Jan 2026': '2026年1月',
  'Feb 2026': '2026年2月',
  'Mar 2026': '2026年3月',
  'Apr 2026': '2026年4月',
  'Dec 2023': '2023年12月',
  'Dec 2024': '2024年12月',
};


const musicBioZh =
  '我痴迷于音乐辽阔的疆域——交响乐的宏大，爵士乐的流动，从当代流行到古典的深处，皆心向往之。作为单簧管演奏者，木管乐器独有的音色总能带给我最纯粹的愉悦；而声乐与乐理的学习，也让我对旋律与结构有了更深的理解。随着 AI 技术打开音乐创作的新边界，我也期待用智能工具，探索更自由、更贴近内心的音乐表达。';

const musicTags = [
  { label: '交响乐', icon: '01' },
  { label: '爵士', icon: '02' },
  { label: '单簧管', icon: '03' },
  { label: 'AI 合成', icon: '04' },
];

const labels: HumanitiesLabels = {
  eyebrow: '造物之心',
  title: '人文',
  quoteLines: ['「艺术，是删去一切多余。」', '用镜头丈量世界，用音符记录心境。'],
  frames: '帧',
  scroll: '向下',
  hint: '移动鼠标，探索照片墙',
  hintTouch: '拖动探索照片墙',
  photography: '摄影',
  all: '全部',
  modes: { grid: '网格', film: '胶片', index: '索引' },
  filmHint: '向下滚动，沿胶片前行',
  lightbox: { close: '关闭', prev: '上一张', next: '下一张', info: '显示/隐藏信息', zoom: '放大' },
};

const localizedPhotos: HumanitiesPhotoData[] = photography.map((photo) => ({
  ...photo,
  category: categoryZh[photo.category] ?? photo.category,
  location: photo.location ? (locationZh[photo.location] ?? photo.location) : photo.location,
  date: photo.date ? (dateZh[photo.date] ?? photo.date) : photo.date,
}));

const HumanitiesZh = () => {
  const [activeQr, setActiveQr] = useState<string | null>(null);

  const footer = (
          <footer className="w-full mt-20 text-gray-700">
            <div className="w-full h-[1px] mb-12 bg-gray-200" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left pb-4">
              <div className="text-sm font-medium">© 2026 王睿鹏。用心打造，充满好奇。</div>
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <div key={social.name} className="relative flex flex-col items-center justify-center w-fit">
                    <a
                      href={social.link}
                      className="transition-colors flex items-center justify-center text-gray-600 hover:text-gray-900"
                      aria-label={social.name}
                      onMouseEnter={() => social.qrCode && setActiveQr(social.name)}
                      onMouseLeave={() => setActiveQr(null)}
                      onClick={(e) => {
                        if (social.qrCode) {
                          e.preventDefault();
                          setActiveQr(activeQr === social.name ? null : social.name);
                        }
                      }}
                    >
                      {social.icon}
                    </a>
                    <AnimatePresence>
                      {social.qrCode && activeQr === social.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-full mb-4 p-2 shadow-xl z-50 w-32 h-auto flex flex-col items-center bg-white border border-gray-200"
                        >
                          <img src={social.qrCode} alt={`${social.name} QR Code`} className="w-full h-auto object-contain" />
                          <div className="absolute -bottom-2 w-4 h-4 rotate-45 left-1/2 -translate-x-1/2 bg-white border-r border-b border-gray-200" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </footer>
  );

  return (
    <HumanitiesView
      photos={localizedPhotos}
      labels={labels}
      music={{ title: '音乐', philosophy: '音乐哲思', bio: musicBioZh, tags: musicTags, tracks: musicTracks }}
      footer={footer}
    />
  );
};

export default HumanitiesZh;
