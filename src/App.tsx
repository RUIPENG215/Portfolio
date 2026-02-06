import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import Design from './pages/Design';
import Engineering from './pages/Engineering';
import Humanities from './pages/Humanities';
import Contact from './pages/Contact';
import DesignProject from './pages/DesignProject';
import EngineeringProject from './pages/EngineeringProject';
import { PageWrapper } from './components/PageWrapper';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoaded } = useLoading();
  
  // 动态设置背景色以匹配当前页面，防止转场闪白
  const getBackgroundColor = (pathname: string) => {
    if (pathname.includes('/engineering')) return '#0d1117'; // engineering-bg
    if (pathname.includes('/humanities')) return '#FEFAE0'; // humanities-bg
    if (pathname === '/') return '#050505'; // Dark for Landing/Hero
    return '#f9fafb'; // Default light for others
  };

  const backgroundColor = getBackgroundColor(location.pathname);

  useEffect(() => {
    // 同步设置 body 背景色，防止页面边缘漏出底色导致"划痕"问题
    document.body.style.backgroundColor = backgroundColor;

    // 模拟资源加载时间
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [backgroundColor]); // Add backgroundColor dependency

  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      {/* 始终渲染 Routes，确保 LoadingScreen 拉开时内容已就绪 */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
          <Route path="/design" element={<PageWrapper><Design /></PageWrapper>} />
          <Route path="/design/:id" element={<PageWrapper><DesignProject /></PageWrapper>} />
          <Route path="/engineering" element={<PageWrapper><Engineering /></PageWrapper>} />
          <Route path="/engineering/:id" element={<PageWrapper><EngineeringProject /></PageWrapper>} />
          <Route path="/humanities" element={<PageWrapper><Humanities /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      {/* LoadingScreen 覆盖在 Routes 之上 */}
      <AnimatePresence onExitComplete={() => setIsLoaded(true)}>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
    </div>
  );
}

function App() {
  // Disable browser's default scroll restoration to avoid conflicts
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <LoadingProvider>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </LoadingProvider>
  );
}

export default App;
