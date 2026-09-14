import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { engineeringProjectsZh } from '../data/engineeringProjectsZh';
import { socialLinks } from '../data/socialLinks';

// 工程页的中文列表页：保留英文版"代码编辑器"的概念（变量名/花括号/引号本来就是
// 语言无关的代码语法，这点跟中文没有冲突），只把字符串内容和项目卡片翻成中文。
// 这个页面本身排版就比较克制（没有大写、超宽字距那些问题），所以直接复用同一套
// 深色终端视觉语言，不需要像首页那样整体重做。
// 卡片数据和点开后的详情页共用同一份 engineeringProjectsZh 数据源。

const codeHeader = {
  background: ['机械工程', '计算机科学', '电子工程', '通信工程'],
  skills: ['结构优化', '前端开发', '电路与 PCB 设计', 'CAE 仿真'],
  passion: '解决复杂的工程问题',
};

const projectsZh = engineeringProjectsZh;

const EngineeringZh = () => {
  const [activeQr, setActiveQr] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-engineering-bg text-engineering-text font-mono pt-24 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-12 border-b border-engineering-border pb-4">
          <div className="flex items-center text-engineering-muted text-sm">
            <Terminal size={16} className="mr-2" />
            <span>engineering@portfolio:~/projects</span>
          </div>
          <div className="hidden md:block text-xs text-engineering-muted opacity-50 tracking-widest">
            系统状态：稳定
          </div>
        </div>

        <header className="mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-engineering-header mb-4 tracking-tight">
              <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">Engineer</span> = <span className="text-engineering-accent">{'{'}</span>
            </h1>
            <div className="pl-8 md:pl-16 text-engineering-muted space-y-2 text-lg">
              <p>
                background: [
                {codeHeader.background.map((item, i) => (
                  <span key={item}>
                    <span className="text-[#a5d6ff]">'{item}'</span>
                    {i < codeHeader.background.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ],
              </p>
              <p>
                skills: [
                {codeHeader.skills.map((item, i) => (
                  <span key={item}>
                    <span className="text-[#a5d6ff]">'{item}'</span>
                    {i < codeHeader.skills.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ],
              </p>
              <p>passion: <span className="text-[#a5d6ff]">'{codeHeader.passion}'</span></p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-engineering-accent mt-4">{'}'}</h1>
          </motion.div>
        </header>

        <div className="grid gap-6">
          {projectsZh.map((project, index) => {
            return (
              <Link to={`/engineering/${project.id}`} key={project.id}>
                <motion.div
                  className="bg-engineering-card border border-engineering-border rounded-lg p-6 hover:border-engineering-hover transition-colors group relative overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded bg-engineering-item flex items-center justify-center text-engineering-accent group-hover:text-engineering-hover group-hover:scale-110 transition-all">
                        {project.icon}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-engineering-header">{project.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] border border-engineering-border text-engineering-muted">
                          {project.subtitle}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] border border-engineering-border text-engineering-muted">
                          {project.time}
                        </span>
                        <span className="ml-auto text-xs font-bold text-[#238636] flex items-center gap-1">
                          <Activity size={12} /> {project.status}
                        </span>
                      </div>

                      <p className="text-engineering-muted mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech?.map((t) => (
                          <span key={t} className="px-3 py-1 text-xs bg-engineering-item text-engineering-accent rounded-md font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <footer className="mt-20 w-full text-engineering-muted">
          <div className="w-full h-[1px] mb-12 bg-engineering-border" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left pb-4">
            <div className="text-sm font-medium">© 2026 王睿鹏。用心打造，充满好奇。</div>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <div key={social.name} className="relative flex flex-col items-center justify-center w-fit">
                  <a
                    href={social.link}
                    className="transition-colors flex items-center justify-center text-engineering-muted hover:text-engineering-hover"
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
                        className="absolute bottom-full mb-4 p-2 shadow-xl z-50 w-32 h-auto flex flex-col items-center bg-[#161b22] border border-[#30363d]"
                      >
                        <img src={social.qrCode} alt={`${social.name} QR Code`} className="w-full h-auto object-contain" />
                        <div className="absolute -bottom-2 w-4 h-4 rotate-45 left-1/2 -translate-x-1/2 bg-[#161b22] border-r border-b border-[#30363d]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EngineeringZh;
