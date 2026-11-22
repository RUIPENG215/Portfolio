import EngineeringIndex from '../components/engineering/EngineeringIndex';

// 中英文共用同一个图纸目录组件，文案在 data/engineeringSheets.ts 里按语言取。
const EngineeringZh = () => <EngineeringIndex lang="zh" />;

export default EngineeringZh;
