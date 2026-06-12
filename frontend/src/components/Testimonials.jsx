import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      role: "Member since 2023",
      text: "The personalized workout plans changed everything for me. I've achieved more in 6 months here than 2 years elsewhere.",
      img: "https://i.pravatar.cc/150?u=alex"
    },
    {
      name: "Sarah Miller",
      role: "Athlete",
      text: "MK27 Gym's management system is so smooth. Tracking my progress and diet plans has never been easier.",
      img: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Mike Ross",
      role: "Bodybuilder",
      text: "Elite equipment and an even better community. The staff truly cares about your fitness journey and results.",
      img: "https://i.pravatar.cc/150?u=mike"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Testimonials</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white italic">MEMBER FEEDBACK</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700 relative group hover:border-primary/40 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute -top-6 -right-6 bg-primary/20 p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <img src={r.img} alt={r.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700" />
                <div>
                  <h4 className="text-xl font-bold text-white">{r.name}</h4>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed italic">
                "{r.text}"
              </p>
              
              <div className="mt-8 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Testimonials;
