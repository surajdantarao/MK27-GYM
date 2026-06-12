import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/dashboardService';
import toast from 'react-hot-toast';
import { 
  Users, UserCheck, UserX, DollarSign, TrendingUp, 
  Activity, BarChart3, Calendar, ArrowUpRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'bg-blue-600',
      trend: '+12%',
      desc: 'Active growth'
    },
    {
      title: 'Active Members',
      value: stats?.activeMembers || 0,
      icon: UserCheck,
      color: 'bg-green-600',
      trend: '84%',
      desc: 'Retention rate'
    },
    {
      title: 'Expired Members',
      value: stats?.expiredMembers || 0,
      icon: UserX,
      color: 'bg-red-600',
      trend: '-2%',
      desc: 'Churn rate'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'bg-primary',
      trend: '+18%',
      desc: 'Monthly target'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tight uppercase flex items-center gap-3">
            <Activity className="text-primary w-10 h-10" />
            <span>Admin <span className="text-primary">Console</span></span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time gym performance and member analytics.</p>
        </div>
        
        <div className="flex gap-4">
          <Link to="/members/add" className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
            <span>New Enrollment</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 shadow-2xl relative group overflow-hidden hover:border-primary/40 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`${card.color} p-4 rounded-2xl shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-500`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-500 font-black text-xs bg-green-500/10 px-2 py-1 rounded-lg italic">{card.trend}</span>
            </div>
            
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{card.title}</p>
            <p className="text-3xl font-black text-white tracking-tighter italic">{card.value}</p>
            <p className="text-slate-600 text-[10px] mt-2 font-bold uppercase">{card.desc}</p>
            
            {/* Decorative BG element */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${card.color} opacity-[0.03] rounded-full group-hover:opacity-[0.08] transition-opacity`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
              <BarChart3 className="text-primary w-8 h-8" />
              <span>Revenue <span className="text-primary">Growth</span></span>
            </h3>
            <select className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs font-bold text-slate-400 outline-none">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end gap-4">
            {[40, 60, 45, 70, 85, 65, 90, 75, 55, 80, 95, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-900 rounded-t-xl relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-red-400 rounded-t-xl transition-all duration-1000 ease-out group-hover:from-blue-500 group-hover:to-blue-400"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </div>
        
        <div className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">Next <span className="text-primary">Batch</span></h3>
            <div className="space-y-6">
              {[
                { time: '06:00 AM', name: 'Power Yoga', members: 12 },
                { time: '08:30 AM', name: 'CrossFit Elite', members: 8 },
                { time: '11:00 AM', name: 'Strength Training', members: 15 },
                { time: '05:30 PM', name: 'Zumba Cardio', members: 20 }
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="bg-slate-800 px-3 py-1 rounded-lg text-primary font-black text-[10px] italic">{b.time}</div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{b.name}</p>
                    <p className="text-slate-600 text-[10px] uppercase font-black">{b.members} Members</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-8 border border-dashed border-slate-600 hover:border-primary text-slate-500 hover:text-primary py-4 rounded-2xl transition-all text-xs font-black uppercase tracking-widest">
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
