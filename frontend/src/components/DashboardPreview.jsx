import React from 'react';
import { Users, UserCheck, UserX, DollarSign } from 'lucide-react';

const DashboardPreview = () => {
  const cards = [
    { title: 'Total Members', value: '1,284', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Members', value: '1,120', icon: UserCheck, color: 'bg-green-500' },
    { title: 'Expired Members', value: '164', icon: UserX, color: 'bg-red-500' },
    { title: 'Total Revenue', value: '₹4,52,000', icon: DollarSign, color: 'bg-red-500' }
  ];

  return (
    <section className="py-24 bg-slate-800/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Dashboard Overview</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white italic leading-tight">
              INSIGHTS THAT <br />
              <span className="text-primary">DRIVE GROWTH</span>
            </h3>
            <p className="text-slate-400 text-lg">
              Our advanced dashboard provides a bird's-eye view of your gym's health. 
              Track memberships, revenue, and active participants with beautiful, 
              intuitive visualizations designed for modern gym management.
            </p>
            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-white font-black text-3xl">98%</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">Retention Rate</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-white font-black text-3xl">+24%</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">Monthly Growth</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            {cards.map((card, i) => (
              <div 
                key={i} 
                className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl hover:border-primary/30 transition-all duration-500 group overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`${card.color} p-4 rounded-2xl shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-500`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{card.title}</p>
                <p className="text-3xl font-black text-white tracking-tighter">{card.value}</p>
                
                {/* Decorative lines */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mb-12 -mr-12 group-hover:bg-primary/10 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
