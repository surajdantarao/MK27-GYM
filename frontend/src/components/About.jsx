import React from 'react';
import { Target, Eye, History, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop" 
              alt="About MK27 Gym" 
              className="rounded-[3rem] shadow-2xl relative z-10 border border-white/10 hover:scale-[1.02] transition-transform duration-500 grayscale hover:grayscale-0"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-[2rem] z-20 shadow-2xl hidden md:block border border-white/20">
              <p className="text-white font-black text-4xl leading-none">10+</p>
              <p className="text-white/80 font-bold uppercase text-[10px] tracking-[0.2em]">Years of Elite Performance</p>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Legacy of MK27</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-tight italic tracking-tighter uppercase">
                WHERE CHAMPIONS <br /> ARE <span className="text-primary">FORGED</span>
              </h3>
            </div>
            
            <p className="text-slate-400 text-lg leading-relaxed">
              Founded in 2016, MK27 Gym started as a private training studio and evolved into the region's 
              most prestigious fitness destination. We don't just provide equipment; we provide a philosophy 
              of relentless improvement and structural excellence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Olympic Standard Equipment",
                "Certified Master Trainers",
                "Advanced Bio-mechanics",
                "Luxury Recovery Lounges",
                "Scientific Nutrition Plans",
                "Elite Athlete Community"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="text-primary w-4 h-4 flex-shrink-0" />
                  </div>
                  <span className="text-slate-200 font-bold text-sm uppercase tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, Why Choose */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To empower high-performers with elite coaching and world-class facilities to achieve their ultimate physical potential."
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "To be the global benchmark for luxury fitness, where science meets sweat to create the next generation of athletes."
            },
            {
              icon: History,
              title: "Why MK27?",
              desc: "Because we believe fitness is a lifestyle of discipline. Our results-driven approach is backed by 10 years of success stories."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{item.title}</h4>
              <p className="text-slate-400 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
