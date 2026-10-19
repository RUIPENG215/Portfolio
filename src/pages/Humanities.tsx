import HumanitiesView from '../components/humanities/HumanitiesView';
import type { HumanitiesLabels } from '../components/humanities/photoUtils';
import Footer from '../components/Footer';
import { photography, musicTracks, musicBio } from '../data/humanitiesData';

const labels: HumanitiesLabels = {
  eyebrow: 'The Soul of the Maker',
  title: 'Humanities',
  quoteLines: ['"Art is the elimination of the unnecessary."', 'Exploring the world through the lens of a camera and the notes of a melody.'],
  frames: 'frames',
  scroll: 'Scroll',
  hint: 'Move your mouse to explore the wall',
  hintTouch: 'Drag to explore the wall',
  photography: 'Photography',
  all: 'All',
  modes: { grid: 'Grid', film: 'Film', index: 'Index' },
  filmHint: 'Keep scrolling to move along the roll',
  lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', info: 'Toggle details', zoom: 'Zoom' },
};

const musicTags = [
  { label: 'Symphony', icon: '01' },
  { label: 'Jazz', icon: '02' },
  { label: 'Clarinet', icon: '03' },
  { label: 'AI Synthesis', icon: '04' },
];

const Humanities = () => (
  <HumanitiesView
    photos={photography}
    labels={labels}
    music={{ title: 'Music', philosophy: 'Musical Philosophy', bio: musicBio, tags: musicTags, tracks: musicTracks }}
    footer={<Footer />}
  />
);

export default Humanities;
