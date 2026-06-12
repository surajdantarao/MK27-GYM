import React from 'react';
import { Dumbbell, Heart, Zap, Coffee, Shield } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      title: "Strength Training",
      desc: "Premium hammer strength equipment and free weights for ultimate performance.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Cardio Area",
      desc: "Advanced treadmills and cycles with integrated entertainment and tracking.",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Personal Training",
      desc: "Dedicated zones for one-on-one sessions with elite fitness coaches.",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop"
    },
    {
      title: "Nutrition Support",
      desc: "On-site nutritionist and healthy cafe to fuel your transformation journey.",
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Luxury Amenities",
      desc: "Premium locker rooms, sauna, and recovery areas for your comfort.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop"
    }
  ];

  return (
    <section id="facilities" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Our Facilities</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
              ELITE <span className="text-primary">EQUIPMENT</span> & SPACE
            </h3>
          </div>
          <p className="text-slate-400 max-w-md text-lg">
            Experience world-class training in an environment designed for champions. 
            Every detail is crafted for your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f, i) => (
            <div 
              key={i} 
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-700 shadow-2xl"
            >
              <img 
                src={f.image} 
                alt={f.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/40 group-hover:rotate-[360deg] transition-transform duration-700">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">{f.title}</h4>
                <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {f.desc}
                </p>
              </div>

              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
