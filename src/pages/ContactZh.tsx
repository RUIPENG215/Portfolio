import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../data/socialLinks';
import type { SocialLink } from '../data/types';

// 联系页的中文版：保留英文版整套细线切格的网格布局和动效，只做两件事——
// 1) 把英文正文替换成中文；2) 把大标题原本的 uppercase + tracking-tighter
//    去掉（这两个对中文字形没有意义，反而会显得松散），改成克制的字距。
// STATUS/LOC/FORM_03 这类"系统读数"式的装饰文字保留英文，呼应终端美学。
const ContactZh = () => {
  const [activeQr, setActiveQr] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: (custom: number = 0) => ({
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: custom * 0.1
      },
    }),
  };

  const handleSocialClick = (e: React.MouseEvent, social: SocialLink) => {
    if (window.innerWidth >= 1024) {
      if (social.qrCode) {
        e.preventDefault();
        setActiveQr(activeQr === social.name ? null : social.name);
      }
      return;
    }

    if (social.name === '微信' || social.name === 'WeChat') {
      e.preventDefault();
      window.open('weixin://', '_self');

      const wechatId = 'WRPkkt';
      window.setTimeout(() => {
        void navigator.clipboard.writeText(wechatId).then(
          () => alert(`微信号已复制：${wechatId}，正在打开微信...`),
          () => alert(`微信号：${wechatId}`),
        );
      }, 500);
    } else if (social.qrCode) {
      e.preventDefault();
      setActiveQr(activeQr === social.name ? null : social.name);
    }
  };

  const handleSubmit = async () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      alert('请填写所有字段。');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('请输入正确的邮箱地址。');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        'service_s3sb8va',
        'template_0twz1xd',
        {
          from_name: name,
          from_email: email,
          message,
          to_name: 'Wang Ruipeng',
        },
        'YKgoX8p2niWODT4q4'
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "邮箱",
      value: "wangruipeng@u.nus.edu",
      link: "mailto:wangruipeng@u.nus.edu"
    },
    {
      icon: <Phone size={20} />,
      label: "电话",
      value: "+65 8544 5807",
      link: "tel:+6585445807"
    },
    {
      icon: <MapPin size={20} />,
      label: "地址",
      value: "新加坡国立大学 设计与工程学院",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-10 relative overflow-hidden font-sans">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="clean-outline-dark-zh">
            <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1"/>
            <feComposite in="expanded" in2="SourceAlpha" operator="out" result="outline"/>
            <feFlood floodColor="rgba(0,0,0,0.3)" result="color"/>
            <feComposite in="color" in2="outline" operator="in"/>
          </filter>
        </defs>
      </svg>

      <motion.div
        className="w-full relative"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute top-0 left-0 w-full border-t border-black/20 origin-left z-20"
          variants={lineVariants}
          custom={0}
        />

        <div className="w-full">

          {/* Mobile Layout */}
          <motion.div
            variants={containerVariants}
            className="lg:hidden flex flex-col"
          >
            <motion.div
              variants={itemVariants}
              className="group p-6 md:p-8 border-b border-black/20 min-h-[280px] flex flex-col justify-end hover:bg-black/[0.02] transition-all"
            >
              <div className="inline-block mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-800 group-hover:text-black group-hover:translate-x-1 transition-all block">
                  Contact / 联系方式
                </span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black text-black leading-[1.1] transition-all duration-500 group-hover:translate-x-1">
                <span className="group-hover:text-blue-600 transition-colors duration-500">谈</span> <br />
                <span className="group-hover:text-blue-600 transition-colors duration-500" style={{ filter: 'url(#clean-outline-dark-zh)' }}>谈</span>
              </h1>
            </motion.div>

            <div className="flex flex-col border-b border-black/20">
              <motion.a
                href={contactInfo[0].link}
                variants={itemVariants}
                className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6"
              >
                <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">{contactInfo[0].icon}</div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[0].label}</div>
                  <div className="text-lg md:text-xl font-bold text-black">{contactInfo[0].value}</div>
                </div>
              </motion.a>
              <motion.a
                href={contactInfo[1].link}
                variants={itemVariants}
                className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6"
              >
                <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">{contactInfo[1].icon}</div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[1].label}</div>
                  <div className="text-lg md:text-xl font-bold text-black">{contactInfo[1].value}</div>
                </div>
              </motion.a>
              <motion.div variants={itemVariants} className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6">
                <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">{contactInfo[2].icon}</div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[2].label}</div>
                  <div className="text-lg md:text-xl font-bold text-black mb-4">{contactInfo[2].value}</div>
                  <div className="flex flex-col gap-1 text-[10px] font-mono text-gray-800">
                    <div className="flex items-center border-b border-black/[0.1] pb-1">
                      <span className="w-8 opacity-70 font-bold text-[9px]">LAT</span>
                      <div className="flex font-bold ml-2">
                        <span className="w-7 text-right">1</span>
                        <span>.3003857</span>
                        <span className="ml-1 opacity-50">N</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 opacity-70 font-bold text-[9px]">LNG</span>
                      <div className="flex font-bold ml-2">
                        <span className="w-7 text-right">103</span>
                        <span>.7712593</span>
                        <span className="ml-1 opacity-50">E</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="group p-6 md:p-8 hover:bg-black/[0.02] transition-all">
                <div className="text-[10px] font-mono text-gray-800 uppercase tracking-widest mb-6 group-hover:text-black group-hover:translate-x-1 transition-all">社交主页</div>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.link}
                      className="w-10 h-10 border border-black/20 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all bg-white"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => handleSocialClick(e, social)}
                    >
                      <div className="scale-110">{social.icon}</div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col">
              <motion.div
                variants={itemVariants}
                className="p-6 md:p-8 border-b border-black/20 min-h-[240px] flex flex-col justify-end relative overflow-hidden group hover:bg-black/[0.02] transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.1] font-mono text-[40px] leading-none select-none pointer-events-none">
                  FORM_03
                </div>
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 group-hover:bg-black group-hover:text-white transition-colors">STATUS: READY</span>
                  </div>
                  <h3 className="text-2xl font-black text-black tracking-tight flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                    <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all"></span>
                    发送消息
                  </h3>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="border-b border-black/20">
                <div className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                  <label htmlFor="mobile-contact-name-zh" className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-hover:translate-x-1 transition-all">01. 姓名</label>
                  <input id="mobile-contact-name-zh" name="name" value={formData.name} onChange={(event) => setFormData(current => ({ ...current, name: event.target.value }))} autoComplete="name" required type="text" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="王睿鹏" />
                </div>
                <div className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                  <label htmlFor="mobile-contact-email-zh" className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-hover:translate-x-1 transition-all">02. 邮箱</label>
                  <input id="mobile-contact-email-zh" name="email" value={formData.email} onChange={(event) => setFormData(current => ({ ...current, email: event.target.value }))} autoComplete="email" required type="email" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="hello@domain.com" />
                </div>
                <div className="group p-6 md:p-8 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                  <label htmlFor="mobile-contact-message-zh" className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-hover:translate-x-1 transition-all">03. 留言</label>
                  <textarea id="mobile-contact-message-zh" name="message" value={formData.message} onChange={(event) => setFormData(current => ({ ...current, message: event.target.value }))} required rows={6} className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all resize-none group-hover:translate-x-1" placeholder="想和我聊些什么？" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="p-6 md:p-8 flex justify-center items-center hover:bg-black/[0.02] transition-all">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status !== 'idle'}
                  className="group relative w-full px-10 py-5 overflow-hidden border border-black transition-all flex items-center justify-center gap-4 bg-white disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
                  <span className="relative z-10 font-black tracking-[0.2em] text-xs group-hover:text-white transition-colors">
                    {status === 'sending' ? '发送中...' : status === 'success' ? '发送成功' : status === 'error' ? '发送失败' : '发送'}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop Layout */}
          <motion.div
            variants={containerVariants}
            className="hidden lg:block w-full"
          >
            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={1}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>

              <motion.div
                variants={itemVariants}
                className="group p-6 md:p-8 border-r border-black/20 min-h-[320px] flex flex-col justify-end hover:bg-black/[0.02] transition-all"
              >
                <div className="inline-block mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-800 group-hover:text-black group-hover:translate-x-1 transition-all block">
                    Contact / 联系方式
                  </span>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[1.1] transition-all duration-500 group-hover:translate-x-1">
                  <span className="group-hover:text-blue-600 transition-colors duration-500">谈</span> <br />
                  <span className="group-hover:text-blue-600 transition-colors duration-500" style={{ filter: 'url(#clean-outline-dark-zh)' }}>谈</span>
                </h1>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-6 md:p-8 border-r border-black/20 min-h-[320px] flex flex-col justify-end pb-12 relative overflow-hidden group hover:bg-black/[0.02] transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.15] font-mono text-[60px] leading-none select-none pointer-events-none group-hover:opacity-[0.25] transition-all">
                  FORM_03
                </div>
                <div className="absolute top-12 left-8 flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-1 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                    <span className="text-[9px] font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 group-hover:bg-black group-hover:text-white transition-colors">STATUS: READY</span>
                    <span className="text-[9px] font-mono text-gray-700">LOC: 1.3004°N 103.7713°E</span>
                  </div>
                  <h3 className="text-2xl font-black text-black tracking-tight flex items-center gap-4 group-hover:translate-x-2 transition-transform">
                    <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all"></span>
                    发送消息
                  </h3>
                </div>
              </motion.div>

              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>

            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={2}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>

              <motion.a
                href={contactInfo[0].link}
                variants={itemVariants}
                className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6"
              >
                <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">{contactInfo[0].icon}</div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[0].label}</div>
                  <div className="text-lg md:text-xl font-bold text-black">{contactInfo[0].value}</div>
                </div>
              </motion.a>

              <motion.div variants={itemVariants} className="border-r border-black/20">
                <div className="grid grid-cols-2 h-full">
                  <div className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                    <label htmlFor="desktop-contact-name-zh" className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:translate-x-1 transition-all">01. 姓名</label>
                    <input id="desktop-contact-name-zh" name="name" value={formData.name} onChange={(event) => setFormData(current => ({ ...current, name: event.target.value }))} autoComplete="name" required type="text" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="王睿鹏" />
                  </div>
                  <div className="group p-6 md:p-8 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                    <label htmlFor="desktop-contact-email-zh" className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:translate-x-1 transition-all">02. 邮箱</label>
                    <input id="desktop-contact-email-zh" name="email" value={formData.email} onChange={(event) => setFormData(current => ({ ...current, email: event.target.value }))} autoComplete="email" required type="email" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="hello@domain.com" />
                  </div>
                </div>
              </motion.div>

              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>

            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={3}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>

              <motion.div variants={itemVariants} className="flex flex-col border-r border-black/20">
                <a href={contactInfo[1].link} className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6">
                  <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">{contactInfo[1].icon}</div>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[1].label}</div>
                    <div className="text-lg md:text-xl font-bold text-black">{contactInfo[1].value}</div>
                  </div>
                </a>
                <div className="group p-6 md:p-8 hover:bg-black/[0.02] transition-colors duration-300 flex flex-col justify-center gap-4 flex-grow relative backface-hidden will-change-transform transform-gpu">
                  <div className="flex items-center gap-6">
                    <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-[transform,color] duration-300 backface-hidden transform-gpu">{contactInfo[2].icon}</div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300 backface-hidden transform-gpu">
                      <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[2].label}</div>
                      <div className="text-lg md:text-xl font-bold text-black mb-4">{contactInfo[2].value}</div>
                      <div className="flex flex-col gap-1 text-[10px] font-mono text-gray-800 group-hover:text-black transition-colors">
                        <div className="flex items-center border-b border-black/[0.1] pb-1 group-hover:border-black/30 transition-colors duration-300 transform-gpu backface-hidden">
                          <span className="w-8 opacity-70 font-bold text-[9px]">LAT</span>
                          <div className="flex font-bold ml-2">
                            <span className="w-7 text-right">1</span>
                            <span>.3003857</span>
                            <span className="ml-1 opacity-50">N</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="w-8 opacity-70 font-bold text-[9px]">LNG</span>
                          <div className="flex font-bold ml-2">
                            <span className="w-7 text-right">103</span>
                            <span>.7712593</span>
                            <span className="ml-1 opacity-50">E</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                <label htmlFor="desktop-contact-message-zh" className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:translate-x-1 transition-all">03. 留言</label>
                <textarea id="desktop-contact-message-zh" name="message" value={formData.message} onChange={(event) => setFormData(current => ({ ...current, message: event.target.value }))} required rows={6} className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all resize-none group-hover:translate-x-1" placeholder="想和我聊些什么？" />
              </motion.div>

              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>

            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={4}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>

              <motion.div variants={itemVariants} className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] transition-all">
                <div className="text-[10px] font-mono text-gray-800 uppercase tracking-widest mb-6 group-hover:text-black group-hover:translate-x-1 transition-all">社交主页</div>
                <div className="flex gap-4 md:gap-6">
                  {socialLinks.map((social, idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <motion.a
                        href={social.link}
                        className="w-10 h-10 border border-black/20 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all bg-white"
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => social.qrCode && setActiveQr(social.name)}
                        onMouseLeave={() => setActiveQr(null)}
                        onClick={(e) => handleSocialClick(e, social)}
                      >
                        <div className="scale-110">{social.icon}</div>
                      </motion.a>
                      <AnimatePresence>
                        {activeQr === social.name && social.qrCode && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-full mb-4 p-2 bg-white border border-black/10 shadow-xl z-50 w-32 h-auto flex flex-col items-center"
                          >
                            <img src={social.qrCode} alt={social.name} className="w-full h-auto" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-black/10 rotate-45"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="p-6 md:p-8 border-r border-black/20 flex justify-end items-center hover:bg-black/[0.02] transition-all">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status !== 'idle'}
                  className="group relative w-full md:w-auto px-10 py-5 overflow-hidden border border-black transition-all flex items-center justify-center gap-4 bg-white disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
                  <span className="relative z-10 font-black tracking-[0.2em] text-xs group-hover:text-white transition-colors flex items-center gap-2">
                    {status === 'sending' ? '发送中...' : status === 'success' ? '发送成功' : status === 'error' ? '发送失败' : '发送'}
                  </span>
                  {status === 'idle' && (
                    <svg className="relative z-10 w-4 h-4 group-hover:text-white transition-colors group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </motion.div>

              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 中文页脚：保留和英文版一样的细线切格页脚形式，落款改为中文 */}
      <footer className="w-full text-gray-900 mt-0">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,1280px)_1fr] w-full border-b border-black/20">
          <div className="border-r border-black/20 hidden lg:block bg-gray-50/5"></div>

          <div className="p-6 md:p-8 lg:border-r border-black/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-gray-800">
                © 2026 王睿鹏
              </div>
              <div className="text-[10px] font-mono text-gray-700 tracking-[0.1em]">
                用心打造，充满好奇
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <div className="hidden sm:flex gap-4 items-center">
                <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                <span className="text-[10px] font-mono text-gray-700 tracking-widest">全球连接</span>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <div key={i} className="relative flex flex-col items-center justify-center w-fit">
                    <a
                      href={social.link}
                      className="w-8 h-8 border border-black/10 flex items-center justify-center text-gray-700 hover:text-black hover:border-black transition-all bg-white"
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
                      <div className="scale-75">
                        {social.icon}
                      </div>
                    </a>

                    <AnimatePresence>
                      {social.qrCode && activeQr === social.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-full mb-4 p-2 bg-white border border-black/10 shadow-xl z-50 w-32 h-auto flex flex-col items-center"
                        >
                          <img src={social.qrCode} alt={`${social.name} QR Code`} className="w-full h-auto object-contain" />
                          <div
                            className="absolute -bottom-2 w-4 h-4 bg-white border-r border-b border-black/10 rotate-45 left-1/2 -translate-x-1/2"
                          ></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-gray-50/5"></div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,1280px)_1fr] w-full lg:h-8 bg-black/5">
          <div className="border-r border-black/10 hidden lg:block"></div>
          <div className="lg:border-r border-black/10 flex items-center p-4 lg:py-0 lg:px-8 justify-between">
            <div className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.5em]">System_End_Line</div>
            <div className="flex gap-4">
              <div className="w-2 h-2 border border-black/20 rotate-45"></div>
              <div className="w-2 h-2 border border-black/20 rotate-45"></div>
            </div>
          </div>
          <div className="hidden lg:block"></div>
        </div>
      </footer>
    </div>
  );
};

export default ContactZh;
