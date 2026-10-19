import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const interactionDesignProjectIds = new Set(['5', '6', '7', '8']);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const isMobileMenuOpen = mobileMenuPath === location.pathname;

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        const threshold = location.pathname === '/' ? window.innerHeight - 72 : 20;
        setIsScrolled(window.scrollY > threshold);
        // 人文页中段的深色展厅（带 data-nav-dark）经过导航栏时，导航栏换成浅色文字
        const darkZone = document.querySelector('[data-nav-dark]');
        if (darkZone) {
          const rect = darkZone.getBoundingClientRect();
          setOverDark(rect.top <= 48 && rect.bottom >= 48);
        } else {
          setOverDark(false);
        }
        frameId = null;
      });
    };
    handleScroll();
    // 页面切换后新页面稍晚才挂载，补查一次
    const recheck = window.setTimeout(handleScroll, 900);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.clearTimeout(recheck);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', zhName: '首页', path: '/' },
    { name: 'Design', zhName: '设计', path: '/design' },
    { name: 'Engineering', zhName: '工程', path: '/engineering' },
    { name: 'Humanities', zhName: '人文', path: '/humanities' },
    { name: 'Contact', zhName: '联系', path: '/contact' },
  ];

  const isPageDark = location.pathname.startsWith('/engineering');
  const isDesignProject = location.pathname.startsWith('/design/');
  const currentProjectId = isDesignProject ? location.pathname.split('/').pop() : null;
  const isInteractionProject = currentProjectId ? interactionDesignProjectIds.has(currentProjectId) : false;
  const isHumanities = location.pathname === '/humanities';

  // 中文首页现在是浅色 Hero，所以主页的"深色导航条"只在英文语境下成立。
  const isHomeDark = location.pathname === '/' && language === 'en';
  const isNavbarDark = isPageDark ||
                       ((isHomeDark || isInteractionProject) && !isScrolled) ||
                       (isHumanities && overDark);
  // 语言切换是全局状态，但目前只有首页（LandingZh）真正有中文版式；
  // /design、/engineering、/humanities、/contact 这些子页面还是英文内容，
  // 背景色也是各自英文页面自己的（深色终端风、奶油色人文风等）。
  // 所以导航栏的"细线切格"皮肤只在"中文 + 首页"同时成立时才启用，
  // 切换语言时导航文字仍然翻译，但样式跟着当前页面本身走，不会跟页面背景色打架。
  const isZh = language === 'zh';
  const isZhHome = isZh && location.pathname === '/';
  const RULE = '#d9d4c8';

  const navLinksBlock = (
    <div className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path ||
                        (item.path !== '/' && location.pathname.startsWith(item.path));

        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative px-4 py-1.5 text-sm font-medium"
          >
            <span className={`relative z-10 ${isZhHome ? 'font-serif tracking-[0.04em]' : ''} ${isZh ? 'transition-colors duration-300' : ''} ${
              isActive
                ? (isNavbarDark ? 'text-white' : (isZhHome ? 'text-[#171310]' : (isHumanities ? 'text-[#463220]' : 'text-black')))
                : (isNavbarDark ? 'text-gray-400' : (isZhHome ? 'text-[#a39c8f]' : (isHumanities ? 'text-[#8b7355]' : 'text-gray-500')))
            } hover:text-current`}>
              {isZh ? item.zhName : item.name}
            </span>
            {isActive && (isZhHome && !isNavbarDark ? (
              <motion.div
                layoutId="nav-active-zh"
                className="absolute inset-x-4 bottom-0.5 z-0 h-px"
                style={{ background: '#171310' }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : (
              <motion.div
                layoutId="nav-active"
                className={`absolute inset-0 rounded-lg z-0 ${isZh ? 'transition-colors duration-300' : ''} ${
                  isNavbarDark ? 'bg-white/10' : (isHumanities ? 'bg-[#463220]/5' : 'bg-black/5')
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ))}
          </Link>
        );
      })}
    </div>
  );

  const utilityBlock = (
    <div className="flex items-center gap-1 shrink-0">
      {/* Language Toggle */}
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide ${isZh ? 'transition-all duration-300 ease-out' : 'transition-colors'} ${
          isZhHome && !isNavbarDark ? '' : 'border rounded-full'
        } ${
          isNavbarDark
            ? 'border-white/15 text-gray-300 hover:text-white hover:border-white/30'
            : (isZhHome
              ? 'text-[#8a8378] hover:text-[#171310]'
              : (isHumanities
                ? 'border-[#463220]/15 text-[#8b7355] hover:text-[#463220] hover:border-[#463220]/30'
                : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30'))
        }`}
      >
        <Languages size={13} />
        {language === 'zh' ? 'EN' : '中'}
      </button>

      {/* Mobile Menu Toggle */}
      <button
        type="button"
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        className={`md:hidden p-2 ${isZh ? 'transition-all duration-300 ease-out' : ''} ${isZhHome && !isNavbarDark ? '' : 'rounded-xl'} ${
          isNavbarDark
            ? 'hover:bg-white/5 text-white'
            : (isZhHome ? 'hover:bg-black/5 text-[#171310]' : (isHumanities ? 'hover:bg-black/5 text-[#463220]' : 'hover:bg-black/5 text-black'))
        }`}
        onClick={() => setMobileMenuPath(isMobileMenuOpen ? null : location.pathname)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none ${isZh ? 'transition-[padding] duration-300 ease-out' : ''} ${isZhHome ? '' : 'pt-4 md:pt-6'}`}
    >
      <div
        className={`
        w-full border-y border-x-transparent pointer-events-auto
        ${isZh ? 'transition-all duration-300 ease-out' : ''}
        ${isZhHome && !isNavbarDark ? '' : 'backdrop-blur-sm'}
        ${isZhHome ? 'px-6 md:px-16' : ''}
        ${isNavbarDark
          ? `bg-transparent border-b border-white/10 text-[#e6edf3]`
          : (isZhHome
            ? `bg-[#faf9f6] text-[#171310]`
            : (isHumanities
              ? `bg-transparent border-black/5 text-[#463220]`
              : `bg-transparent border-black/5 text-gray-900`))}
      `}
        style={isZhHome && !isNavbarDark ? { borderBottomColor: RULE, borderBottomWidth: 1 } : undefined}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between py-3 ${isZh ? 'transition-[padding] duration-300 ease-out' : ''} ${isZhHome ? '' : 'px-4 md:px-8'}`}>
          {/* Logo */}
          <Link to="/" onClick={() => setMobileMenuPath(null)} className="text-lg md:text-xl font-black tracking-tighter uppercase shrink-0">
            RUIPENG
          </Link>

          {/* 中文页面（不限首页）导航链接和右侧功能区始终并成一组、贴右对齐——
              这样在中文页面之间跳转时，这一块的 DOM 结构保持不变，配合上面的
              transition，颜色/内边距变化才能真正丝滑过渡，而不是结构互换导致的硬切。
              英文页面完全不受影响，继续用原来的三段式布局。 */}
          {isZh ? (
            <div className="flex items-center gap-6 md:gap-10">
              {navLinksBlock}
              {utilityBlock}
            </div>
          ) : (
            <>
              {navLinksBlock}
              {utilityBlock}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl pointer-events-auto md:hidden ${
              isNavbarDark
                ? 'bg-black/80 border-white/10 text-white'
                : (isHumanities
                  ? 'bg-[#f4f1ea]/90 border-[#463220]/10 text-[#463220]'
                  : 'bg-white/90 border-black/5 text-black')
            }`}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path ||
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuPath(null)}
                    className={`
                      px-4 py-3 rounded-xl text-lg font-bold transition-all
                      ${isZhHome ? 'font-serif tracking-[0.04em]' : ''}
                      ${isActive
                        ? (isNavbarDark ? 'bg-white/10 text-white' : (isHumanities ? 'bg-[#463220]/5 text-[#463220]' : 'bg-black/5 text-black'))
                        : (isNavbarDark ? 'text-gray-400 hover:text-white' : (isHumanities ? 'text-[#8b7355] hover:text-[#463220]' : 'text-gray-500 hover:text-black'))}
                    `}
                  >
                    {isZh ? item.zhName : item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
