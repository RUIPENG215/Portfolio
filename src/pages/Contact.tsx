import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';
import Footer from '../components/Footer';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="text-design-primary" />,
      label: "Email",
      value: "w15975369@163.com",
      link: "mailto:w15975369@163.com"
    },
    {
      icon: <Phone className="text-design-primary" />,
      label: "Phone",
      value: "+86 19921943135",
      link: "tel:+8619921943135"
    },
    {
      icon: <MapPin className="text-design-primary" />,
      label: "Location",
      value: "Xi'an, China",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left Side: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">
              Get in <br />
              <span className="text-design-primary">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-md font-light leading-relaxed">
              I'm always open to new opportunities, collaborations, or just a friendly chat about design and technology.
            </p>

            <div className="space-y-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="flex items-center gap-6 group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{info.label}</div>
                    <div className="text-lg font-medium text-gray-900 group-hover:text-design-primary transition-colors">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Social Networks</div>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-design-primary transition-colors shadow-lg"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="scale-125">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Simple Contact Form or Decoration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Send a Message</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-tight">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-design-primary/20 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-tight">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-design-primary/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-tight">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-design-primary/20 transition-all resize-none"
                    placeholder="Tell me about your project"
                  />
                </div>
                <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Decoration dots */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-design-primary/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-0" />
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
