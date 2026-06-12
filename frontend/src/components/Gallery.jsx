import React from 'react';

const Gallery = () => {
  const images = [
    {
      title: "Strength Area",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      size: "col-span-1 row-span-2"
    },
    {
      title: "Cardio Section",
      url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
      size: "col-span-1 row-span-1"
    },
    {
      title: "Group Training",
      url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop",
      size: "col-span-1 row-span-1"
    },
    {
      title: "Personal Training",
      url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop",
      size: "col-span-2 row-span-1"
    },
    {
      title: "Recovery Zone",
      url: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop",
      size: "col-span-1 row-span-1"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Our Space</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic">Elite Environment</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Train in a facility that inspires greatness. Our elite environment is designed for maximum results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`${img.size} relative group overflow-hidden rounded-3xl cursor-pointer shadow-2xl`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-8 left-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Facility</p>
                <h4 className="text-2xl font-black text-white">{img.title}</h4>
              </div>
              
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
