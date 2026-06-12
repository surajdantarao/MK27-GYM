import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (data.user.role !== 'admin') {
        toast.error('Unauthorized. This portal is for Administrators only.');
        return;
      }
      loginUser(data.user, data.token);
      toast.success('Admin Session Started.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549476464-37392f717551?q=80&w=1887&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"></div>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Site</span>
        </Link>

        <div className="w-full max-w-lg bg-slate-900/80 p-10 md:p-16 rounded-[3rem] border border-red-500/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden animate-in zoom-in duration-700">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-red-600 to-red-600"></div>
          
          <div className="text-center mb-12">
            <div className="bg-red-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group hover:rotate-0 transition-transform duration-500 border border-red-500/30">
              <ShieldCheck className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Admin <span className="text-red-500">Portal</span></h2>
            <p className="text-slate-500 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">Restricted Management Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Admin Identity</label>
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white font-medium"
                  placeholder="admin@mk27gym.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-red-900/40 flex items-center justify-center gap-3 text-lg uppercase tracking-widest group"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Initialize Console</span>
                  <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              SECURE ADMIN UPLINK v4.0.1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
