import type { ReactNode } from 'react';

export interface HumanitiesPhotoData {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location?: string;
  date?: string;
  ratio?: 'horizontal' | 'vertical' | 'square';
}

export interface HumanitiesMusicData {
  id: number;
  title: string;
  type: string;
  duration: string;
  icon?: ReactNode;
  description?: string;
}

export const photography: HumanitiesPhotoData[] = [
  {
    "id": 1,
    "title": "残雪印",
    "category": "Urban",
    "image": "/Humanity/IMG_01.webp",
    "ratio": "vertical",
    "description": "冬的余温藏在砖缝，光的诗行写在路面。一城清寂，都沉淀在黑白的褶皱里。",
    "location": "Jinan, China",
    "date": "Jan 2026"
  },
  {
    "id": 2,
    "title": "构律",
    "category": "Architecture",
    "image": "/Humanity/IMG_02.webp",
    "ratio": "vertical",
    "description": "钢骨为笔，光影为墨，写就城市的无声诗章。俯仰之间，皆是天地之序。",
    "location": "Jinan, China",
    "date": "Jan 2026"
  },
  {
    "id": 3,
    "title": "潮生赋",
    "category": "Humanity",
    "image": "/Humanity/IMG_03.webp",
    "ratio": "horizontal",
    "description": "飞鸟是海的信笺，人影是岸的标点。潮声里，万籁俱寂，唯余一念。",
    "location": "Qingdao Zhanqiao, China",
    "date": "Jan 2026"
  },
  {
    "id": 4,
    "title": "飞羽盟",
    "category": "Humanity",
    "image": "/Humanity/IMG_04.webp",
    "ratio": "horizontal",
    "description": "岁暮有信，白羽如期。一握之间，人与禽鸟，共守冬春之约。",
    "location": "Qingdao Zhanqiao, China",
    "date": "Jan 2026"
  },
  {
    "id": 5,
    "title": "松间月",
    "category": "Humanity",
    "image": "/Humanity/IMG_05.webp",
    "ratio": "horizontal",
    "description": "松枝如墨，在暮色里勾出天然画框。晚风穿过松针，灯火便轻轻摇晃。",
    "location": "Qingdao Music Square, China",
    "date": "Jan 2026"
  },
  {
    "id": 6,
    "title": "栈亭望潮",
    "category": "Humanity",
    "image": "/Humanity/IMG_06.webp",
    "ratio": "vertical",
    "description": "薄雾晕开了远处的亭影，岸边的人裹紧大衣，把心事都交付给起伏的潮声。",
    "location": "Qingdao Zhanqiao, China",
    "date": "Jan 2026"
  },
  {
    "id": 7,
    "title": "潮声里的人潮",
    "category": "Humanity",
    "image": "/Humanity/IMG_07.webp",
    "ratio": "horizontal",
    "description": "黑白世界里，人潮如织。唯有浪涛声，在脚下永不停歇。",
    "location": "Qingdao Zhanqiao, China",
    "date": "Jan 2026"
  },
  {
    "id": 8,
    "title": "鸥鹭忘机",
    "category": "Humanity",
    "image": "/Humanity/IMG_08.webp",
    "ratio": "vertical",
    "description": "古亭飞檐下，群鸥掠过水面。时间慢了下来，只剩下风声、浪声与翅膀扑棱的轻响。",
    "location": "Qingdao Zhanqiao, China",
    "date": "Jan 2026"
  },
  {
    "id": 9,
    "title": "听潮",
    "category": "Humanity",
    "image": "/Humanity/IMG_09.webp",
    "ratio": "vertical",
    "description": "浪花碎在脚下，像一片流动的雪。远处的飞鸟，正与这片辽阔对峙。",
    "location": "Qingdao Coast, China",
    "date": "Jan 2026"
  },
  {
    "id": 10,
    "title": "向海",
    "category": "Humanity",
    "image": "/Humanity/IMG_10.webp",
    "ratio": "horizontal",
    "description": "他把喧嚣抛在身后，海风穿过衣领，带来远方的讯息。灰蒙的海平面上，藏着所有关于远方的想象。",
    "location": "Qingdao Coast, China",
    "date": "Jan 2026"
  },
  {
    "id": 11,
    "title": "鸥渡",
    "category": "Landscape",
    "image": "/Humanity/IMG_11.webp",
    "ratio": "vertical",
    "description": "成千上万的翅膀搅动着金色浪花，这片海，在黄昏时分成了最盛大的舞台。",
    "location": "Qingdao Coast, China",
    "date": "Jan 2026"
  },
  {
    "id": 12,
    "title": "潮间记",
    "category": "Humanity",
    "image": "/Humanity/IMG_12.webp",
    "ratio": "vertical",
    "description": "暮色漫上来时，礁石便成了人间的岸。他们俯身捡拾着浪涛的馈赠，远处山影如黛，几盏灯火在暗夜里明灭。",
    "location": "Qingdao Coast, China",
    "date": "Jan 2026"
  },
  { 
    id: 13, 
    title: "隅", 
    category: "Urban",
    image: "/Humanity/IMG_13.webp",
    ratio: 'vertical',
    description: "在斑驳的栏杆一角，这朵细小的干花像个沉默的旅人，独自定格了时间。身后是流动的、色彩模糊的人间烟火，它却以静止的姿态，守住了属于自己的方寸天地。喧嚣与寂静在此刻共存，不必真的拥有花期，也能在宏大的背景里，拥有独一无二的重量。",
    location: "Shinjuku, Tokyo",
    date: "Dec 2023"
  },{ 
    id: 14, 
    title: "松雪藏钟", 
    category: "Architecture",
    image: "/Humanity/IMG_14.webp",
    ratio: 'horizontal',
    description: "松枝承雪，古楼隐于烟岚。雪落的声音里，藏着四载晨昏，与一城温柔。",
    location: "Xi'an, China",
    date: "Dec 2024"
  },
  { 
    id: 15, 
    title: "仙掌志", 
    category: "Documentary",
    image: "/Humanity/IMG_15.webp",
    ratio: 'square',
    description: "余初入庠序，以三株仙掌置案头。塑料薄盆相叠，色已泛黄，针芒初展如新绿星芒。彼时书卷初启，墨香未盈室，唯此三物与余共守寒窗。每值夜读，台灯斜照，其影投于壁，若三友默立，虽无言而意自相通。\n\n四载倏忽，案头积尘渐厚。余或埋首典籍，或奔走课业，竟忘浇灌之事。偶见其色渐萎，犹自宽慰：“仙掌耐旱，何须多顾？”及至乙巳季冬，忽见一株倾颓，土干如焦石，根须蜷缩，针刺尽脱，恍若老者垂首。余抚其塑料薄盆，指间轻叩，声沉而闷，方知生死之隔，不过数月之疏。\n\n今将离庠，收拾行囊，见余二株犹存者：一者针刺半秃，色如败褐，干瘪之态难掩；一者歪斜倚壁，新叶仅存数片，苟延残喘之状可悯。忆昔同沐晨光，共听夜雨，而今一死二衰，竟与余同度毕业之期。余取瓷勺，以残茶沃之，水渗土中，无声无息，似知其不可复生，唯余心下恻然。\n\n鸿德楼后，有梧桐数株。余初至时皆为细枝，今已叶茂覆天也。",
    location: "Lake District, UK",
    date: "Jan 2026"
  },
  { 
    id: 16, 
    title: "雪落兴庆", 
    category: "Landscape",
    image: "/Humanity/IMG_16.webp",
    ratio: 'vertical',
    description: "朱门覆雪，檐角垂霜。雪片吻过金匾时，便懂了这城的旧梦与新章。此冬一别，长安是故园。",
    location: "Xi'an, China",
    date: "Jan 2026"
  },
];

export const musicBio = "I am passionate about exploring the boundless frontiers of music—from the grandeur of symphonies to the fluid rhythms of jazz, and from contemporary pop to classical depths. As a clarinetist, I find profound joy in the unique timber of woodwinds, while my studies in vocal performance and music theory have deepened my understanding of melody and structure. With the rapid evolution of AI opening new creative horizons, I look forward to utilizing intelligent tools to forge a more liberated and deeply personal musical expression in the future.";

export const musicTracks: HumanitiesMusicData[] = [];
