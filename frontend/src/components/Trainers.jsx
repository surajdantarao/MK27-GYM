import React from 'react';
import { Globe, Share2, MessageCircle, Award } from 'lucide-react';

const Trainers = () => {
  const trainers = [
    {
      name: "Marcus Kane",
      role: "Head Coach & Founder",
      specialty: "Bodybuilding & Strength",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop",
      exp: "15+ Years"
    },
    {
      name: "Sarah Miller",
      role: "Elite Trainer",
      specialty: "HIIT & Transformation",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
      exp: "8+ Years"
    },
    {
      name: "David Chen",
      role: "Pro Athlete Coach",
      specialty: "Performance & Nutrition",
      image: "https://images.unsplash.com/photo-1491756589698-6573768b4827?q=80&w=1935&auto=format&fit=crop",
      exp: "10+ Years"
    },
    {
      name: "Elena Rodriguez",
      role: "Yoga & Recovery Expert",
      specialty: "Flexibility & Wellness",
      image: "https://images.unsplash.com/photo-1552196564-972b46b52e47?q=80&w=1974&auto=format&fit=crop",
      exp: "12+ Years"
    }
  ];

  return (
    <section id="trainers" className="py-24 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">Expert Coaches</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-6">
            MEET YOUR <span className="text-primary">MENTORS</span>
          </h3>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((t, i) => (
            <div key={i} className="group">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[Globe, Share2, MessageCircle].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-white font-bold text-xs uppercase tracking-widest">{t.exp} EXP</span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{t.name}</h4>
                <p className="text-primary font-bold text-sm uppercase tracking-[0.2em]">{t.role}</p>
                <p className="text-slate-500 text-sm italic">{t.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
