import React from 'react';
import { Check, Crown, Star, ShieldCheck } from 'lucide-react';

const MembershipPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "1,999",
      duration: "Monthly",
      icon: Star,
      features: [
        "Gym Floor Access",
        "Locker Facilities",
        "Mobile App Access",
        "1 Free Assessment"
      ],
      popular: false
    },
    {
      name: "Pro Athlete",
      price: "4,999",
      duration: "Quarterly",
      icon: Crown,
      features: [
        "All Starter Features",
        "Personalized Workout Plan",
        "Monthly Nutrition Consult",
        "Group Training Sessions",
        "Guest Passes (2/mo)"
      ],
      popular: true
    },
    {
      name: "Elite Performance",
      price: "14,999",
      duration: "Yearly",
      icon: ShieldCheck,
      features: [
        "All Pro Features",
        "Unlimited Personal Training",
        "Premium Recovery Zone",
        "VIP Locker & Laundry",
        "Supplements Discount (20%)",
        "Priority Booking"
      ],
      popular: false
    }
  ];

  return (
    <section id="plans" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Pricing Plans</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
            CHOOSE YOUR <span className="text-primary">LEVEL</span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Invest in yourself with our flexible membership options. 
            No hidden fees, just pure performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <div 
              key={i} 
              className={`relative bg-slate-900/50 p-10 rounded-[3rem] border transition-all duration-500 hover:-translate-y-4 shadow-2xl overflow-hidden group ${
                p.popular ? 'border-primary' : 'border-white/10'
              }`}
            >
              {p.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-2 rotate-45 translate-x-10 translate-y-4">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  p.popular ? 'bg-primary shadow-xl shadow-primary/30' : 'bg-white/5'
                }`}>
                  <p.icon className={`w-8 h-8 ${p.popular ? 'text-white' : 'text-primary'}`} />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{p.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-500 text-lg font-bold">₹</span>
                  <span className="text-5xl font-black text-white tracking-tighter">{p.price}</span>
                  <span className="text-slate-500 font-bold uppercase text-xs tracking-widest ml-2">/ {p.duration}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
                p.popular 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-red-700' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                Select Plan
              </button>

              {/* Background Glow */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] -z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-40 ${
                p.popular ? 'bg-primary' : 'bg-blue-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
