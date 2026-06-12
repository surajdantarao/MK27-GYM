import React from 'react';
import { Link } from 'react-router-dom';
import gymlogo from '../assets/gymlogo.jpg';
import { Dumbbell, ArrowUp, Globe, Link2, Share2, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = [Globe, Link2, Share2, MessageCircle];

  return (
    <footer className="bg-slate-950 pt-24 pb-12 relative border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={gymlogo} alt="MK27 Gym Logo" className="w-12 h-12 rounded-full border-2 border-primary" />
              <span className="text-2xl font-black text-white italic tracking-tighter">MK27 GYM</span>
            </Link>
            <p className="text-slate-500 leading-relaxed">
              Leading the fitness revolution with elite management and premium facilities. 
              Join the MK27 community and redefine your limits.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Quick Links</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Our Space</a></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Member Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Support</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Console</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Our Location</h4>
            <p className="text-slate-500">
              123 Fitness Ave, Mumbai, MH 400001
            </p>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <p className="text-primary font-bold text-lg mb-1 italic">Now Open</p>
              <p className="text-slate-500 text-sm">Mon - Sun: 5:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} MK27 GYM. All rights reserved. Designed for Excellence.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
