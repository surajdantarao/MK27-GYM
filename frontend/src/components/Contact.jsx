import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Contact Us</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">GET IN TOUCH</h3>
              <p className="text-slate-400 text-lg">
                Have questions about our memberships or facilities? 
                Our team is here to help you start your journey.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Address", val: "123 Fitness Ave, Mumbai, MH 400001" },
                { icon: Phone, title: "Phone", val: "+91 98765 43210" },
                { icon: Mail, title: "Email", val: "info@mk27gym.com" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-slate-800 rounded-3xl border border-slate-700 hover:border-primary/30 transition-all group">
                  <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary transition-colors duration-500">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.title}</p>
                    <p className="text-white font-bold text-lg">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mt-16 -mr-16"></div>
              
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="How can we help?" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-primary hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
