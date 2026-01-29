import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../data/socialLinks';
import Footer from '../components/Footer';

const Contact = () => {
  const [activeQr, setActiveQr] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!nameRef.current?.value || !emailRef.current?.value || !messageRef.current?.value) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus('sending');

    try {
      // Replace these with your actual EmailJS Service ID, Template ID, and Public Key
      // You can get them from https://dashboard.emailjs.com/
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
      // Reset form
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
      value: "w15975369@163.com",
      link: "mailto:w15975369@163.com"
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
      {/* SVG Filter for clean outline - Dark version for light background */}
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
      {/* 
        Full Bleed Grid Logic:
        We use a 4-column layout: [Left Bleed | Left Content (5/12) | Right Content (7/12) | Right Bleed]
        This ensures lines hit the screen edges while content stays centered.
      */}
      <div className="w-full border-t border-black/20">
        
        {/* Row 1: Talk Header & Form Header */}
        <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full border-b border-black/20">
          <div className="border-r border-black/20 hidden lg:block hover:bg-black/[0.02] transition-all"></div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="group p-8 border-r border-black/20 min-h-[320px] flex flex-col justify-end hover:bg-black/[0.02] transition-all"
          >
            <div className="inline-block mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600 group-hover:text-black transition-colors">
                Contact / Connection
              </span>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-gray-800 leading-[0.8] uppercase group-hover:text-black transition-colors">
                <span className="tracking-tighter">Let's</span> <br />
                <span className="tracking-tighter" style={{ filter: 'url(#clean-outline-dark)' }}>Talk</span>
              </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="p-8 border-r border-black/20 flex flex-col justify-end lg:pb-12 relative overflow-hidden group hover:bg-black/[0.02] transition-all"
          >
            {/* Decorative Background Elements for Form Header */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.15] font-mono text-[60px] leading-none select-none pointer-events-none group-hover:opacity-[0.25] transition-opacity">
              FORM_03
            </div>
            <div className="absolute top-12 left-8 flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1 h-1 bg-black/20"></div>
              ))}
            </div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 group-hover:text-black group-hover:bg-white transition-colors">STATUS: READY</span>
                <span className="text-[9px] font-mono text-gray-500 group-hover:text-black transition-colors">LOC: 34.2568°N 108.6515°E</span>
              </div>
              <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-4 group-hover:text-black transition-colors">
                <span className="w-8 h-[1px] bg-black"></span>
                Send Message
              </h3>
            </div>
          </motion.div>
          <div className="hidden lg:block hover:bg-black/[0.02] transition-all"></div>
        </div>

        {/* Row 2: Contact Info 1 & Name/Email Inputs */}
        <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full border-b border-black/20">
          <div className="border-r border-black/20 hidden lg:block hover:bg-black/[0.02] transition-all"></div>
          
          {/* Email Cell */}
          <motion.a
            href={contactInfo[0].link}
            className="group p-8 border-r border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          >
            <div className="text-gray-500 group-hover:text-design-primary transition-colors">{contactInfo[0].icon}</div>
            <div>
              <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[0].label}</div>
              <div className="text-xl font-bold text-gray-800 group-hover:text-black transition-colors">{contactInfo[0].value}</div>
            </div>
          </motion.a>

          {/* Form Name & Email Row */}
          <div className="border-r border-black/20">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="group p-8 border-b md:border-b-0 md:border-r border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                <label className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:text-black transition-colors">01. Name</label>
                <input ref={nameRef} type="text" className="w-full bg-transparent outline-none font-bold text-xl text-gray-700 group-hover:text-black placeholder:opacity-25 group-hover:placeholder:opacity-60 focus:placeholder:opacity-100 placeholder:text-gray-500 transition-all duration-300" placeholder="Wang Ruipeng" />
              </div>
              <div className="group p-8 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
                <label className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:text-black transition-colors">02. Email</label>
                <input ref={emailRef} type="email" className="w-full bg-transparent outline-none font-bold text-xl text-gray-700 group-hover:text-black placeholder:opacity-25 group-hover:placeholder:opacity-60 focus:placeholder:opacity-100 placeholder:text-gray-500 transition-all duration-300" placeholder="hello@domain.com" />
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block hover:bg-black/[0.02] transition-all"></div>
        </div>

        {/* Row 3: Contact Info 2 & Message Input */}
        <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full border-b border-black/20">
          <div className="border-r border-black/20 hidden lg:block hover:bg-black/[0.02] transition-all"></div>
          
          {/* Phone Cell */}
          <div className="flex flex-col border-r border-black/20">
            <motion.a
              href={contactInfo[1].link}
              className="group p-8 border-b border-black/20 hover:bg-black/[0.02] transition-all flex items-center gap-6"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            >
              <div className="text-gray-500 group-hover:text-design-primary transition-colors">{contactInfo[1].icon}</div>
              <div>
                <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[1].label}</div>
                <div className="text-xl font-bold text-gray-800 group-hover:text-black transition-colors">{contactInfo[1].value}</div>
              </div>
            </motion.a>
            <motion.a
              href={contactInfo[2].link}
              className="group p-8 hover:bg-black/[0.02] transition-all flex flex-col justify-center gap-6 flex-grow relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-6 z-10">
                <div className="text-gray-500 group-hover:text-design-primary transition-colors">{contactInfo[2].icon}</div>
                <div>
                  <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{contactInfo[2].label}</div>
                  <div className="text-xl font-bold text-gray-800 mb-4 group-hover:text-black transition-colors">{contactInfo[2].value}</div>
                  
                  {/* Detailed Coordinates - Perfect Alignment */}
                  <div className="flex flex-col gap-1.5 text-[10px] font-mono text-gray-700 opacity-[0.6] group-hover:opacity-100 transition-opacity w-fit group-hover:text-black">
                    <div className="flex items-center border-b border-black/[0.1] pb-1">
                      <span className="w-8 opacity-70 font-bold text-[9px]">LAT</span>
                      <div className="flex font-bold ml-2">
                        <span className="w-[28px] text-right">34</span>
                        <span>.2568264077</span>
                        <span className="w-4 text-center ml-1 opacity-50 font-black">N</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 opacity-70 font-bold text-[9px]">LNG</span>
                      <div className="flex font-bold ml-2">
                        <span className="w-[28px] text-right">108</span>
                        <span>.6515306454</span>
                        <span className="w-4 text-center ml-1 opacity-50 font-black">E</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Message Input Cell */}
          <div className="group p-8 border-r border-black/20 hover:bg-black/[0.02] focus-within:bg-black/[0.01] transition-colors">
            <label className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest block mb-4 group-focus-within:text-black group-hover:text-black transition-colors">03. Message</label>
            <textarea ref={messageRef} rows={6} className="w-full bg-transparent outline-none font-bold text-xl text-gray-700 group-hover:text-black placeholder:opacity-25 group-hover:placeholder:opacity-60 focus:placeholder:opacity-100 placeholder:text-gray-500 transition-all duration-300 resize-none" placeholder="What's on your mind?" />
          </div>
          
          <div className="hidden lg:block hover:bg-black/[0.02] transition-all"></div>
        </div>

        {/* Row 4: Social Index & Submit Button - NOW PERFECTLY ALIGNED */}
        <div className="grid grid-cols-[1fr_minmax(0,533px)_minmax(0,747px)_1fr] w-full border-b border-black/20">
          <div className="border-r border-black/20 hidden lg:block hover:bg-black/[0.02] transition-all"></div>
          
          {/* Social Cell */}
          <div className="group p-8 border-r border-black/20 hover:bg-black/[0.02] transition-all">
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-6 group-hover:text-black transition-colors">Social_Index</div>
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <div key={index} className="relative flex items-center justify-center w-fit">
                  <motion.a
                    href={social.link}
                    className="w-10 h-10 border border-black/20 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-all bg-white"
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => social.qrCode && setActiveQr(social.name)}
                    onMouseLeave={() => setActiveQr(null)}
                    onClick={(e) => {
                      if (social.qrCode) {
                        e.preventDefault();
                        setActiveQr(activeQr === social.name ? null : social.name);
                      }
                    }}
                  >
                    <div className="scale-110">{social.icon}</div>
                  </motion.a>

                  <AnimatePresence>
                    {social.qrCode && activeQr === social.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full mb-4 p-2 bg-white border border-black/10 shadow-xl z-50 w-32 h-auto flex flex-col items-center"
                        style={{ left: '50%', x: '-50%' }}
                      >
                        <img src={social.qrCode} alt={`${social.name} QR Code`} className="w-full h-auto object-contain" />
                        <div 
                          className="absolute -bottom-2 w-4 h-4 bg-white border-r border-b border-black/10 rotate-45"
                          style={{ left: '50%', x: '-50%' }}
                        ></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Cell */}
          <div className="p-8 border-r border-black/20 flex justify-end items-center hover:bg-black/[0.02] transition-all">
            <button 
              onClick={handleSubmit}
              disabled={status !== 'idle'}
              className="group relative px-10 py-5 overflow-hidden border border-black transition-all flex items-center gap-4 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
              <span className="relative z-10 font-black uppercase tracking-[0.3em] text-xs group-hover:text-white transition-colors flex items-center gap-2">
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Sent_Success
                  </>
                ) : status === 'error' ? (
                  <>
                    <XCircle className="w-3 h-3 text-red-500" />
                    Send_Error
                  </>
                ) : (
                  'Execute_Send'
                )}
              </span>
              {status === 'idle' && (
                <svg className="relative z-10 w-4 h-4 group-hover:text-white transition-colors group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="hidden lg:block hover:bg-black/[0.02] transition-all"></div>
        </div>

      </div>

      <Footer lineArt />
    </div>
  );
};

export default Contact;
