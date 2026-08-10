import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const NotFound = () => (
  <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
    <Seo title="Page Not Found | Ruipeng" description="The requested page could not be found in Ruipeng Wang's portfolio." />
    <div className="max-w-3xl w-full">
      <p className="font-mono text-xs tracking-[0.35em] text-white/40 mb-8">ERROR / 404</p>
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">LOST<br />IN SPACE.</h1>
      <p className="text-white/50 max-w-lg mb-10">The page may have moved, or the address may be incorrect.</p>
      <Link to="/" className="inline-flex border border-white/30 px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
        Return home
      </Link>
    </div>
  </main>
);

export default NotFound;
