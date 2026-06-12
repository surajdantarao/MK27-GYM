import React, { useState, useEffect } from 'react';
import { getPublicTransformations } from '../services/transformationService';
import { Activity, Quote, Users } from 'lucide-react';

const SuccessStories = () => {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const data = await getPublicTransformations();
        setTransformations(data);
      } catch (error) {
        console.error('Error fetching transformations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransformations();
  }, []);

  if (loading || transformations.length === 0) return null;

  return (
    <section className="py-24 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Real Results</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">SUCCESS <span className="text-primary">STORIES</span></h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Witness the incredible transformations of our dedicated members. 
            Join the community and be our next success story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((item, i) => (
            <div key={i} className="bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-700 hover:border-primary/40 transition-all duration-500 group shadow-2xl relative">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={item.photoUrl} 
                  alt="Transformation" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-white font-black uppercase text-xs tracking-widest">{item.memberId?.name || 'MK27 Athlete'}</span>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/10" />
                  <p className="text-slate-300 font-bold italic relative z-10">
                    "{item.caption}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Verified Transformation</span>
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <Activity className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
