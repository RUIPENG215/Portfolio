import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../data/socialLinks';
import Footer from '../components/Footer';

const Contact = () => {
  const [activeQr, setActiveQr] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Animation variants
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

  const handleSocialClick = (e: React.MouseEvent, social: any) => {
    // Desktop: Default behavior (hover for QR, click for link)
    if (window.innerWidth >= 1024) {
      if (social.qrCode) {
        e.preventDefault();
        setActiveQr(activeQr === social.name ? null : social.name);
      }
      return;
    }

    // Mobile: Special handling for WeChat
    if (social.name === '微信' || social.name === 'WeChat') {
      e.preventDefault();
      // Try to open WeChat app
      window.location.href = 'weixin://';
      
      // Fallback: Copy ID to clipboard and show toast/alert
      setTimeout(() => {
        navigator.clipboard.writeText('w751686929'); // Replace with actual WeChat ID
        alert('WeChat ID copied: WRPkkt. Opening WeChat...');
      }, 500);
    } else if (social.qrCode) {
      // For other QR code items on mobile, toggle the QR display
      e.preventDefault();
      setActiveQr(activeQr === social.name ? null : social.name);
    }
  };

  const handleSubmit = async () => {
    if (!nameRef.current?.value || !emailRef.current?.value || !messageRef.current?.value) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        'service_s3sb8va',
        'template_0twz1xd',
        {
          from_name: nameRef.current.value,
          from_email: emailRef.current.value,
          message: messageRef.current.value,
          to_name: 'Wang Ruipeng',
        },
        'YKgoX8p2niWODT4q4'
      );

      setStatus('success');
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
      
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
      label: "Email",
      value: "wangruipeng_uk@163.com",
      link: "mailto:wangruipeng_uk@163.com"
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+86 18991292857",
      link: "tel:+8618991292857"
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Xi'an, China",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-10 relative overflow-hidden font-sans">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="clean-outline-dark">
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
        {/* Animated Top Line Overlay */}
        <motion.div 
          className="absolute top-0 left-0 w-full border-t border-black/20 origin-left z-20"
          variants={lineVariants}
          custom={0}
        />
        
        {/* Layout Container */}
        <div className="w-full">
          
          {/* Mobile Layout (Order: Info -> Form) */}
          <motion.div 
            variants={containerVariants}
            className="lg:hidden flex flex-col"
          >
            {/* 1. Title */}
            <motion.div 
              variants={itemVariants}
              className="group p-6 md:p-8 border-b border-black/20 min-h-[280px] flex flex-col justify-end hover:bg-black/[0.02] transition-all"
            >
              <div className="inline-block mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-800 group-hover:text-black group-hover:translate-x-1 transition-all block">
                  Contact / Connection
                </span>
              </div>
              <h1 className="text-8xl md:text-9xl font-black text-black leading-[0.8] uppercase transition-all duration-500 group-hover:translate-x-1">
                <span className="tracking-tighter group-hover:text-blue-600 transition-colors duration-500">Let's</span> <br />
                <span className="tracking-tighter group-hover:text-blue-600 transition-colors duration-500" style={{ filter: 'url(#clean-outline-dark)' }}>Talk</span>
              </h1>
            </motion.div>

            {/* 2. Contact Info Group */}
            <div className="flex flex-col border-b border-black/20">
              {/* Email */}
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
              {/* Phone */}
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
              {/* Location */}
              <motion.div variants={itemVariants} className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6">
                <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">{contactInfo[2].icon}</div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <div className="text-[9px] font-mono text-gray-800 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[2].label}</div>
                  <div className="text-lg md:text-xl font-bold text-black mb-4">{contactInfo[2].value}</div>
                  <div className="flex flex-col gap-1 text-[10px] font-mono text-gray-800">
                    <div className="flex items-center border-b border-black/[0.1] pb-1">
                      <span className="w-8 opacity-70 font-bold text-[9px]">LAT</span>
                      <div className="flex font-bold ml-2">
                        <span className="w-7 text-right">34</span>
                        <span>.2568264</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 opacity-70 font-bold text-[9px]">LNG</span>
                      <div className="flex font-bold ml-2">
                        <span className="w-7 text-right">108</span>
                        <span>.6515306</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Socials */}
              <motion.div variants={itemVariants} className="group p-6 md:p-8 hover:bg-black/[0.02] transition-all">
                <div className="text-[10px] font-mono text-gray-800 uppercase tracking-widest mb-6 group-hover:text-black group-hover:translate-x-1 transition-all">Social_Index</div>
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

            {/* 3. Form Group */}
            <div className="flex flex-col">
              {/* Form Status */}
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
                  <h3 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                    <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all"></span>
                    Send Message
                  </h3>
                </div>
              </motion.div>
              {/* Inputs */}
              <motion.div variants={itemVariants} className="border-b border-black/20">
                <div className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                  <label className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-hover:translate-x-1 transition-all">01. Name</label>
                  <input ref={nameRef} type="text" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="Wang Ruipeng" />
                </div>
                <div className="group p-6 md:p-8 border-b border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                  <label className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-hover:translate-x-1 transition-all">02. Email</label>
                  <input ref={emailRef} type="email" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="hello@domain.com" />
                </div>
                <div className="group p-6 md:p-8 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                  <label className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-hover:translate-x-1 transition-all">03. Message</label>
                  <textarea ref={messageRef} rows={6} className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all resize-none group-hover:translate-x-1" placeholder="What's on your mind?" />
                </div>
              </motion.div>
              {/* Submit */}
              <motion.div variants={itemVariants} className="p-6 md:p-8 flex justify-center items-center hover:bg-black/[0.02] transition-all">
                <button 
                  onClick={handleSubmit}
                  disabled={status !== 'idle'}
                  className="group relative w-full px-10 py-5 overflow-hidden border border-black transition-all flex items-center justify-center gap-4 bg-white disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
                  <span className="relative z-10 font-black uppercase tracking-[0.3em] text-xs group-hover:text-white transition-colors">
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent_Success' : status === 'error' ? 'Send_Error' : 'Execute_Send'}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop Layout (Hidden on mobile) */}
          <motion.div 
            variants={containerVariants}
            className="hidden lg:block w-full"
          >
            {/* Row 1: Let's Talk & Form Status */}
            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div 
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={1}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>
              
              {/* Title Cell */}
              <motion.div 
                variants={itemVariants}
                className="group p-6 md:p-8 border-r border-black/20 min-h-[320px] flex flex-col justify-end hover:bg-black/[0.02] transition-all"
              >
                <div className="inline-block mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-800 group-hover:text-black group-hover:translate-x-1 transition-all block">
                    Contact / Connection
                  </span>
                </div>
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-black leading-[0.8] uppercase transition-all duration-500 group-hover:translate-x-1">
                  <span className="tracking-tighter group-hover:text-blue-600 transition-colors duration-500">Let's</span> <br />
                  <span className="tracking-tighter group-hover:text-blue-600 transition-colors duration-500" style={{ filter: 'url(#clean-outline-dark)' }}>Talk</span>
                </h1>
              </motion.div>

              {/* Status Cell */}
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
                    <span className="text-[9px] font-mono text-gray-700">LOC: 34.2568°N 108.6515°E</span>
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-4 group-hover:translate-x-2 transition-transform">
                    <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all"></span>
                    Send Message
                  </h3>
                </div>
              </motion.div>
              
              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>

            {/* Row 2: Email & Inputs */}
            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div 
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={2}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>
              
              {/* Email Cell */}
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

              {/* Inputs Cell */}
              <motion.div variants={itemVariants} className="border-r border-black/20">
                <div className="grid grid-cols-2 h-full">
                  <div className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                    <label className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:translate-x-1 transition-all">01. Name</label>
                    <input ref={nameRef} type="text" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="Wang Ruipeng" />
                  </div>
                  <div className="group p-6 md:p-8 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                    <label className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:translate-x-1 transition-all">02. Email</label>
                    <input ref={emailRef} type="email" className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all group-hover:translate-x-1" placeholder="hello@domain.com" />
                  </div>
                </div>
              </motion.div>
              
              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>

            {/* Row 3: Phone/Address & Message */}
            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div 
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={3}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>
              
              {/* Phone/Address Cell */}
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
                            <span className="w-7 text-right">34</span>
                            <span>.2568264</span>
                            <span className="ml-1 opacity-50">N</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="w-8 opacity-70 font-bold text-[9px]">LNG</span>
                          <div className="flex font-bold ml-2">
                            <span className="w-7 text-right">108</span>
                            <span>.6515306</span>
                            <span className="ml-1 opacity-50">E</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Message Cell */}
              <motion.div variants={itemVariants} className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                <label className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:translate-x-1 transition-all">03. Message</label>
                <textarea ref={messageRef} rows={6} className="w-full bg-transparent outline-none font-bold text-xl text-gray-900 placeholder:opacity-25 group-hover:placeholder:opacity-50 placeholder:text-gray-500 transition-all resize-none group-hover:translate-x-1" placeholder="What's on your mind?" />
              </motion.div>
              
              <div className="hover:bg-black/[0.02] transition-all"></div>
            </div>

            {/* Row 4: Socials & Submit */}
            <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full relative">
              <motion.div 
                className="absolute bottom-0 left-0 w-full border-b border-black/20 origin-left z-20"
                variants={lineVariants}
                custom={4}
              />
              <div className="border-r border-black/20 hover:bg-black/[0.02] transition-all"></div>
              
              {/* Social Cell */}
              <motion.div variants={itemVariants} className="group p-6 md:p-8 border-r border-black/20 hover:bg-black/[0.02] transition-all">
                <div className="text-[10px] font-mono text-gray-800 uppercase tracking-widest mb-6 group-hover:text-black group-hover:translate-x-1 transition-all">Social_Index</div>
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

              {/* Submit Cell */}
              <motion.div variants={itemVariants} className="p-6 md:p-8 border-r border-black/20 flex justify-end items-center hover:bg-black/[0.02] transition-all">
                <button 
                  onClick={handleSubmit}
                  disabled={status !== 'idle'}
                  className="group relative w-full md:w-auto px-10 py-5 overflow-hidden border border-black transition-all flex items-center justify-center gap-4 bg-white disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
                  <span className="relative z-10 font-black uppercase tracking-[0.3em] text-xs group-hover:text-white transition-colors flex items-center gap-2">
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent_Success' : status === 'error' ? 'Send_Error' : 'Execute_Send'}
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

      <Footer lineArt />
    </div>
  );
};

export default Contact;