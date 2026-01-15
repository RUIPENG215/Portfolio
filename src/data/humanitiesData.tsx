import type { ReactNode } from 'react';
import { Music as MusicIcon } from 'lucide-react';

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
    id: 1, 
    title: "钟楼", 
    category: "Architecture",
    image: "/Humanity/IMG_2.webp",
    ratio: 'horizontal',
    description: "西安钟楼的暮色。在 Xiaomi 14 Ultra 的徕卡画框下，古建筑的厚重感与现代摄影的精致感完美融合。夕阳余晖洒在琉璃瓦上，泛起一层淡淡的金光。",
    location: "Xi'an, China",
    date: "Dec 2024"
  },
  { 
    id: 2, 
    title: "隅", 
    category: "Urban",
    image: "/Humanity/IMG_1.webp",
    ratio: 'vertical',
    description: "在斑驳的栏杆一角，这朵细小的干花像个沉默的旅人，独自定格了时间。身后是流动的、色彩模糊的人间烟火，它却以静止的姿态，守住了属于自己的方寸天地。喧嚣与寂静在此刻共存，不必真的拥有花期，也能在宏大的背景里，拥有独一无二的重量。",
    location: "Shinjuku, Tokyo",
    date: "Dec 2023"
  },
  { 
    id: 3, 
    title: "Quiet Morning", 
    category: "Portrait",
    image: "/Humanity/IMG_4.webp",
    ratio: 'vertical',
    description: "A candid moment of reflection during a quiet morning in the studio. Focusing on the interplay of natural light and shadow on the subject's expression.",
    location: "Local Studio",
    date: "Aug 2023"
  },
  { 
    id: 4, 
    title: "Geometric Lines", 
    category: "Architecture",
    image: "https://placehold.co/1200x800/e2e8f0/64748b?text=Architecture+1",
    ratio: 'horizontal',
    description: "The sharp, clean lines of modern architecture. This shot explores how minimalism can create complex visual rhythms through repetition and perspective.",
    location: "Hong Kong Cultural Centre",
    date: "Nov 2023"
  },
  { 
    id: 5, 
    title: "Mist over Lake", 
    category: "Nature",
    image: "/Humanity/IMG_3.webp",
    ratio: 'square',
    description: "余初入庠序，以三株仙掌置案头。塑料薄盆相叠，色已泛黄，针芒初展如新绿星芒。彼时书卷初启，墨香未盈室，唯此三物与余共守寒窗。每值夜读，台灯斜照，其影投于壁，若三友默立，虽无言而意自相通。\n\n四载倏忽，案头积尘渐厚。余或埋首典籍，或奔走课业，竟忘浇灌之事。偶见其色渐萎，犹自宽慰：“仙掌耐旱，何须多顾？”及至乙巳季冬，忽见一株倾颓，土干如焦石，根须蜷缩，针刺尽脱，恍若老者垂首。余抚其塑料薄盆，指间轻叩，声沉而闷，方知生死之隔，不过数月之疏。\n\n今将离庠，收拾行囊，见余二株犹存者：一者针刺半秃，色如败褐，干瘪之态难掩；一者歪斜倚壁，新叶仅存数片，苟延残喘之状可悯。忆昔同沐晨光，共听夜雨，而今一死二衰，竟与余同度毕业之期。余取瓷勺，以残茶沃之，水渗土中，无声无息，似知其不可复生，唯余心下恻然。\n\n鸿德楼后，有梧桐数株。余初至时皆为细枝，今已叶茂覆天也。",
    location: "Lake District, UK",
    date: "Sept 2023"
  },
  { 
    id: 6, 
    title: "Urban Motion", 
    category: "Urban",
    image: "https://placehold.co/1200x800/e2e8f0/64748b?text=Urban+2",
    ratio: 'horizontal',
    description: "Using a slow shutter speed to capture the kinetic energy of the city's transport network. Light trails represent the pulse of urban life.",
    location: "Central, Hong Kong",
    date: "Jan 2024"
  },
];

export const musicTracks: HumanitiesMusicData[] = [
  { 
    id: 1, 
    title: "Original Composition 1", 
    type: "Piano & Strings", 
    duration: "3:45",
    icon: <MusicIcon size={20} />
  },
  { 
    id: 2, 
    title: "Original Composition 2", 
    type: "Electronic Ambient", 
    duration: "4:20",
    icon: <MusicIcon size={20} />
  },
  { 
    id: 3, 
    title: "Original Composition 3", 
    type: "Classical Guitar", 
    duration: "2:55",
    icon: <MusicIcon size={20} />
  },
];
