import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import { PageWrapper } from './components/PageWrapper';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import Seo from './components/Seo';
import { LoadingProvider } from './context/LoadingProvider';
import { useLoading } from './context/useLoading';
import { LanguageProvider } from './context/LanguageProvider';
import { useLanguage } from './context/useLanguage';
import './index.css';

const Landing = lazy(() => import('./pages/Landing'));
const LandingZh = lazy(() => import('./pages/LandingZh'));
const Design = lazy(() => import('./pages/Design'));
const Engineering = lazy(() => import('./pages/Engineering'));
const EngineeringZh = lazy(() => import('./pages/EngineeringZh'));
const Humanities = lazy(() => import('./pages/Humanities'));
const HumanitiesZh = lazy(() => import('./pages/HumanitiesZh'));
const Contact = lazy(() => import('./pages/Contact'));
const ContactZh = lazy(() => import('./pages/ContactZh'));
const DesignProject = lazy(() => import('./pages/DesignProject'));
const EngineeringProject = lazy(() => import('./pages/EngineeringProject'));
const EngineeringProjectZh = lazy(() => import('./pages/EngineeringProjectZh'));
const NotFound = lazy(() => import('./pages/NotFound'));

const routeMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Ruipeng Wang | Designer & Creative Engineer',
    description: 'Portfolio of Ruipeng Wang, exploring industrial design, engineering, interaction, photography and human-centred problem solving.',
  },
  '/design': {
    title: 'Design Portfolio | Ruipeng Wang',
    description: 'Industrial, interaction and product design case studies by Ruipeng Wang.',
  },
  '/engineering': {
    title: 'Engineering Portfolio | Ruipeng Wang',
    description: 'Mechanical engineering, simulation, electronics, robotics and creative technology projects by Ruipeng Wang.',
  },
  '/humanities': {
    title: 'Humanities & Photography | Ruipeng Wang',
    description: 'Photography, music and visual observations from Ruipeng Wang.',
  },
  '/contact': {
    title: 'Contact | Ruipeng Wang',
    description: 'Contact Ruipeng Wang for design, engineering and creative technology opportunities.',
  },
};

const RouteMetadata = () => {
  const { pathname } = useLocation();
  const metadata = routeMetadata[pathname];
  return metadata ? <Seo {...metadata} /> : null;
};

// 英文版 Landing 组件保持不变；中文版是完全独立的组件，通过语言状态切换，互不影响。
// 切换语言时用一个淡入淡出包一层，避免两个版本硬切。
const LandingRoute = () => {
  const { language } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {language === 'zh' ? <LandingZh /> : <Landing />}
      </motion.div>
    </AnimatePresence>
  );
};

// 工程列表页同理：中文版是独立组件，英文版完全不变。
const EngineeringRoute = () => {
  const { language } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {language === 'zh' ? <EngineeringZh /> : <Engineering />}
      </motion.div>
    </AnimatePresence>
  );
};

// 工程项目详情页同理：中文版是独立组件，英文版完全不变。
const EngineeringProjectRoute = () => {
  const { language } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {language === 'zh' ? <EngineeringProjectZh /> : <EngineeringProject />}
      </motion.div>
    </AnimatePresence>
  );
};

// 人文页同理：中文版是独立组件，英文版完全不变。
const HumanitiesRoute = () => {
  const { language } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {language === 'zh' ? <HumanitiesZh /> : <Humanities />}
      </motion.div>
    </AnimatePresence>
  );
};

// 联系页同理：中文版是独立组件，英文版完全不变。
const ContactRoute = () => {
  const { language } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {language === 'zh' ? <ContactZh /> : <Contact />}
      </motion.div>
    </AnimatePresence>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoaded } = useLoading();
  const { language } = useLanguage();

  // 动态设置背景色以匹配当前页面，防止转场闪白
  const getBackgroundColor = (pathname: string) => {
    if (pathname.includes('/engineering')) return '#0d1117'; // engineering-bg
    if (pathname.includes('/humanities')) return '#FEFAE0'; // humanities-bg
    if (pathname === '/') return language === 'zh' ? '#faf9f6' : '#050505'; // 中文首页浅色，英文 Hero 深色
    return '#f9fafb'; // Default light for others
  };

  const backgroundColor = getBackgroundColor(location.pathname);

  useEffect(() => {
    // 同步设置 body 背景色，防止页面边缘漏出底色导致"划痕"问题
    document.body.style.backgroundColor = backgroundColor;

    // 模拟资源加载时间
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, [backgroundColor]); // Add backgroundColor dependency

  useEffect(() => {
    if (!isLoading) return;

    const lockedScrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, lockedScrollY);
    };
  }, [isLoading]);

  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      {/* 始终渲染 Routes，确保 LoadingScreen 拉开时内容已就绪 */}
      <AnimatePresence mode="wait">
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<div className="min-h-screen" aria-label="Loading page" />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><LandingRoute /></PageWrapper>} />
              <Route path="/design" element={<PageWrapper><Design /></PageWrapper>} />
              <Route path="/design/:id" element={<PageWrapper><DesignProject /></PageWrapper>} />
              <Route path="/engineering" element={<PageWrapper><EngineeringRoute /></PageWrapper>} />
              <Route path="/engineering/:id" element={<PageWrapper><EngineeringProjectRoute /></PageWrapper>} />
              <Route path="/humanities" element={<PageWrapper><HumanitiesRoute /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactRoute /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
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
    <LanguageProvider>
      <LoadingProvider>
        <MotionConfig reducedMotion="user">
          <Router>
            <GoogleAnalyticsTracker />
            <RouteMetadata />
            <Navbar />
            <AnimatedRoutes />
            <Analytics />
            <SpeedInsights />
          </Router>
        </MotionConfig>
      </LoadingProvider>
    </LanguageProvider>
  );
}

export default App;
