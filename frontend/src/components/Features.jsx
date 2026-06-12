import React from 'react';
import { Users, Shield, BarChart3, TrendingUp, Clock, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Member Management",
      desc: "Comprehensive tools to manage member profiles, attendance, and subscription lifecycles.",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Secure Auth",
      desc: "Enterprise-grade JWT authentication ensuring secure access for both admins and members.",
      icon: Shield,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Analytics Dashboard",
      desc: "Real-time insights into gym performance, member growth, and operational metrics.",
      icon: BarChart3,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Revenue Tracking",
      desc: "Detailed financial reports and automated fee tracking to maintain healthy cash flow.",
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Membership Expiry",
      desc: "Automatic tracking and alerts for membership renewals and expiring plans.",
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      title: "Member CRUD",
      desc: "Intuitive interface for creating, reading, updating, and managing all member data.",
      icon: Settings,
      color: "text-red-500",
      bg: "bg-red-500/10"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-800/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">System Features</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white italic">BUILT FOR PERFORMANCE</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Our platform provides all the necessary tools to run a world-class gym efficiently and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2 shadow-xl shadow-black/20"
            >
              <div className={`${f.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <f.icon className={`w-8 h-8 ${f.color}`} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">{f.title}</h4>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-0"></div>
    </section>
  );
};

export default Features;
