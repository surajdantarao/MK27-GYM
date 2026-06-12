import React from 'react';
import { Link } from 'react-router-dom';
import gymlogo from '../assets/gymlogo.jpg';
import { ArrowRight, Play, Award } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Elite Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-110 animate-pulse-slow"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-2/3 space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-white font-bold uppercase text-xs tracking-[0.3em]">The Elite Fitness Destination</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            REDEFINE <br />
            <span className="text-primary italic">YOUR LIMITS</span> <br />
            WITH MK27
          </h1>
          
          <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
            Experience the pinnacle of fitness at MK27 Gym. Elite coaching, 
            world-class facilities, and a community of high-performers.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              to="/login"
              className="bg-primary hover:bg-red-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 flex items-center gap-3 uppercase tracking-widest"
            >
              <span>Join the Elite</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            
            <button className="group flex items-center gap-4 text-white font-black uppercase tracking-widest hover:text-primary transition-colors">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-500">
                <Play className="w-6 h-6 fill-white group-hover:fill-primary" />
              </div>
              <span>Watch Story</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-md">
            {[
              { val: "2.5K+", label: "Athletes" },
              { val: "15+", label: "Trainers" },
              { val: "10+", label: "Years" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-black text-white">{stat.val}</p>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3 hidden lg:block relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl animate-pulse"></div>
          <img 
            src={gymlogo} 
            alt="MK27 Gym Logo" 
            className="w-full h-auto rounded-[4rem] border-8 border-white/5 relative z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" 
          />
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-0 right-0 p-12 hidden md:block">
        <p className="text-white/10 font-black text-[12vw] leading-none select-none italic">PERFORMANCE</p>
      </div>
    </div>
  );
};

export default Hero;
