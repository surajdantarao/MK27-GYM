import React, { useState } from 'react';
import { 
  Settings, Save, Shield, Bell, DollarSign, Globe, 
  Database, RefreshCcw, Lock, HardDrive 
} from 'lucide-react';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    gymName: 'MK27 GYM',
    currency: 'INR',
    taxRate: '18',
    memberPortal: true,
    notifExpiry: true,
    autoBackup: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System settings updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
          <Settings className="text-primary w-10 h-10" />
          <span>System <span className="text-primary">Configuration</span></span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">Global platform settings and administrative controls.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-slate-800 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-700 bg-slate-900/50 flex items-center gap-3">
            <Globe className="text-primary w-6 h-6" />
            <h3 className="text-xl font-black text-white italic uppercase">General Branding</h3>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Gym Name</label>
              <input 
                type="text" value={settings.gymName} onChange={(e) => setSettings({...settings, gymName: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Local Currency</label>
              <select 
                value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-bold"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-700 bg-slate-900/50 flex items-center gap-3">
            <Shield className="text-primary w-6 h-6" />
            <h3 className="text-xl font-black text-white italic uppercase">Portal & Security</h3>
          </div>
          <div className="p-10 space-y-6">
            <div className="flex items-center justify-between p-6 bg-slate-900 rounded-3xl border border-slate-700">
              <div className="flex items-center gap-4">
                <Lock className="text-slate-500 w-6 h-6" />
                <div>
                  <p className="text-white font-bold">Enable Member Portal</p>
                  <p className="text-slate-500 text-xs">Allow members to log in and view their plans.</p>
                </div>
              </div>
              <input 
                type="checkbox" checked={settings.memberPortal} onChange={(e) => setSettings({...settings, memberPortal: e.target.checked})}
                className="w-6 h-6 accent-primary"
              />
            </div>

            <div className="flex items-center justify-between p-6 bg-slate-900 rounded-3xl border border-slate-700">
              <div className="flex items-center gap-4">
                <Bell className="text-slate-500 w-6 h-6" />
                <div>
                  <p className="text-white font-bold">Auto-notify Expiry</p>
                  <p className="text-slate-500 text-xs">Send alerts when membership is about to expire.</p>
                </div>
              </div>
              <input 
                type="checkbox" checked={settings.notifExpiry} onChange={(e) => setSettings({...settings, notifExpiry: e.target.checked})}
                className="w-6 h-6 accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-700 bg-slate-900/50 flex items-center gap-3">
            <Database className="text-primary w-6 h-6" />
            <h3 className="text-xl font-black text-white italic uppercase">Data & Maintenance</h3>
          </div>
          <div className="p-10 flex flex-wrap gap-4">
            <button type="button" className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-black py-5 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
              <RefreshCcw className="w-5 h-5 text-primary" />
              Sync Database
            </button>
            <button type="button" className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-black py-5 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
              <HardDrive className="w-5 h-5 text-primary" />
              Export All Data
            </button>
          </div>
        </div>

        <button className="w-full bg-primary hover:bg-red-700 text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 text-xl uppercase tracking-widest">
          <Save className="w-6 h-6" />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SystemSettings;
