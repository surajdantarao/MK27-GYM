import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMemberById } from '../services/memberService';
import { getWorkoutPlan, getDietPlan } from '../services/planService';
import { getProgress } from '../services/progressService';
import { getNotifications, markAsRead } from '../services/notificationService';
import toast from 'react-hot-toast';
import { 
  User, Dumbbell, Utensils, TrendingUp, Bell, Calendar, 
  CreditCard, Clock, Activity, Target, Weight, Info 
} from 'lucide-react';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [member, setMember] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [progress, setProgress] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user && user.memberId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [m, w, d, p, n] = await Promise.all([
        getMemberById(user.memberId).catch(() => null),
        getWorkoutPlan(user.memberId).catch(() => ({ workoutDays: [] })),
        getDietPlan(user.memberId).catch(() => ({ meals: [] })),
        getProgress(user.memberId).catch(() => []),
        getNotifications(user.memberId).catch(() => [])
      ]);
      
      if (!m) {
        toast.error('Member profile not found');
        return;
      }

      setMember(m);
      setWorkoutPlan(w);
      setDietPlan(d);
      setProgress(p || []);
      setNotifications(n || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      toast.error('Error updating notification');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <Activity className="w-16 h-16 text-slate-700 mx-auto" />
        <h2 className="text-2xl font-black text-white uppercase italic">Dashboard <span className="text-primary">Unavailable</span></h2>
        <p className="text-slate-500 max-w-md">We couldn't link your account to a member profile. Please contact the gym administrator.</p>
      </div>
    );
  }

  const isExpired = member.expiryDate && new Date(member.expiryDate) < new Date();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'diet', label: 'Diet Plan', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'transform', label: 'Transformations', icon: Activity },
    { id: 'notifications', label: 'Alerts', icon: Bell, count: notifications.filter(n => !n.isRead).length }
  ];

  const handleAddTransformation = async (e) => {
    e.preventDefault();
    const photoUrl = e.target.photoUrl.value;
    const caption = e.target.caption.value;
    const isPublic = e.target.isPublic.checked;

    try {
      await logProgress({ 
        memberId: user.memberId, 
        photoUrl, 
        caption, 
        isPublic,
        weight: progress[0]?.weight, // Use last known weight
        bmi: progress[0]?.bmi
      });
      toast.success('Transformation photo uploaded!');
      fetchData();
      e.target.reset();
    } catch (error) {
      toast.error('Failed to upload transformation');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tight uppercase">Member <span className="text-primary">Dashboard</span></h1>
          <p className="text-slate-400 mt-1">Welcome back, {member?.name}! Let's reach your goals today.</p>
        </div>
        
        {isExpired && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-2xl flex items-center gap-4 animate-pulse">
            <Info className="text-red-500 w-6 h-6" />
            <div>
              <p className="text-red-500 font-bold uppercase text-xs tracking-widest">Membership Alert</p>
              <p className="text-white text-sm">Your membership has expired. Please renew to continue.</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab.id 
                ? 'border-primary text-primary bg-primary/5' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className="bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-500">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
              <div className="text-center">
                <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center text-primary font-black text-4xl mx-auto mb-4 border-4 border-primary/10 shadow-lg shadow-primary/20">
                  {member.name?.charAt(0) || '?'}
                </div>
                <h2 className="text-2xl font-black text-white uppercase">{member.name}</h2>
                <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">ID: {member._id?.slice(-6)}</p>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm font-bold uppercase">Status</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${!isExpired ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {!isExpired ? 'Active' : 'Expired'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm font-bold uppercase">Plan</span>
                  <span className="text-white font-bold">{member.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm font-bold uppercase">Joining Date</span>
                  <span className="text-white font-bold">{member.joiningDate ? new Date(member.joiningDate).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Email Address', value: user?.email || 'N/A', icon: Activity },
                { label: 'Phone Number', value: member.phone || 'N/A', icon: Clock },
                { label: 'Age & Gender', value: `${member.age || '?'} Yrs, ${member.gender || '?'}`, icon: User },
                { label: 'Expiry Date', value: member.expiryDate ? new Date(member.expiryDate).toLocaleDateString() : 'N/A', icon: Calendar, highlight: isExpired }
              ].map((item, i) => (
                <div key={i} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-primary/20 transition-all flex items-center gap-6 group">
                  <div className="bg-slate-900 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.label}</p>
                    <p className={`font-black text-lg ${item.highlight ? 'text-red-500' : 'text-white'}`}>{item.value}</p>
                  </div>
                </div>
              ))}
              
              <div className="md:col-span-2 bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 rounded-3xl border border-slate-700 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <CreditCard className="text-primary w-8 h-8" />
                  <h3 className="text-xl font-black text-white uppercase italic">Membership Value</h3>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Fees Paid</p>
                    <p className="text-4xl font-black text-white tracking-tighter">₹{member.fees?.toLocaleString() || 0}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Valid Until</p>
                    <p className="text-white font-bold">{member.expiryDate ? new Date(member.expiryDate).toDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8 flex items-center gap-3">
                <Dumbbell className="text-primary w-8 h-8" />
                <span>Weekly <span className="text-primary">Workout</span> Plan</span>
              </h3>

              {workoutPlan?.workoutDays?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workoutPlan.workoutDays.map((wd, i) => (
                    <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-700 hover:border-primary/30 transition-all group">
                      <h4 className="text-primary font-black text-xl mb-4 italic group-hover:translate-x-2 transition-transform">{wd.day}</h4>
                      <ul className="space-y-4">
                        {wd.exercises?.map((ex, j) => (
                          <li key={j} className="border-l-2 border-slate-800 pl-4 py-1">
                            <p className="text-white font-bold">{ex.name}</p>
                            <div className="flex gap-4 mt-1">
                              <span className="text-[10px] font-black text-slate-500 uppercase">{ex.sets} Sets</span>
                              <span className="text-[10px] font-black text-slate-500 uppercase">{ex.reps} Reps</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-900 rounded-3xl border border-dashed border-slate-700">
                  <Activity className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest">No workout plan assigned yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'diet' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
                  <Utensils className="text-primary w-8 h-8" />
                  <span>Personalized <span className="text-primary">Diet</span> Plan</span>
                </h3>
                {dietPlan?.totalCalories && (
                  <div className="text-right">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Target Daily</p>
                    <p className="text-2xl font-black text-primary italic">{dietPlan.totalCalories} kcal</p>
                  </div>
                )}
              </div>

              {dietPlan?.meals?.length > 0 ? (
                <div className="space-y-4">
                  {dietPlan.meals.map((meal, i) => (
                    <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-700 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-800/50 transition-colors">
                      <div className="w-full md:w-32 font-black text-primary italic uppercase text-lg">{meal.time}</div>
                      <div className="flex-1 text-slate-300 font-medium">{meal.foodItems}</div>
                      <div className="w-full md:w-32 text-right">
                        <span className="bg-slate-800 px-4 py-2 rounded-xl text-white font-black italic">{meal.calories} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-900 rounded-3xl border border-dashed border-slate-700">
                  <Utensils className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest">No diet plan assigned yet</p>
                </div>
              )}
            </div>

            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8 flex items-center gap-3">
                <Activity className="text-primary w-8 h-8" />
                <span>Dietary <span className="text-primary">Journal</span></span>
              </h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await createNotification({
                    memberId: user.memberId,
                    title: 'Diet Feedback from ' + member.name,
                    message: e.target.feedback.value
                  });
                  toast.success('Feedback sent to your trainer!');
                  e.target.reset();
                } catch (err) {
                  toast.error('Failed to send feedback');
                }
              }} className="space-y-4">
                <textarea 
                  name="feedback" required
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white resize-none h-32"
                  placeholder="Log your meals or send feedback to your trainer about this diet plan..."
                ></textarea>
                <button type="submit" className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-3 rounded-xl border border-slate-700 transition-all font-bold uppercase text-xs tracking-widest">
                  Log Entry / Send Feedback
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Current Weight', value: progress[0]?.weight ? `${progress[0].weight} kg` : 'N/A', icon: Weight, color: 'text-blue-500' },
                { label: 'Target Weight', value: progress[0]?.targetWeight ? `${progress[0].targetWeight} kg` : 'N/A', icon: Target, color: 'text-primary' },
                { label: 'Body Fat %', value: progress[0]?.bodyFat ? `${progress[0].bodyFat}%` : 'N/A', icon: Activity, color: 'text-yellow-500' },
                { label: 'BMI', value: progress[0]?.bmi || 'N/A', icon: TrendingUp, color: 'text-green-500' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
                  <div className={`${item.color} bg-slate-900/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-2xl font-black text-white italic">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">Weight Progress Chart</h3>
              {progress.length > 1 ? (
                <div className="h-64 flex items-end gap-2 px-4 border-l border-b border-slate-700 pb-2">
                  {progress.slice().reverse().map((p, i) => {
                    const maxWeight = Math.max(...progress.map(pr => pr.weight || 0), 1);
                    const height = ((p.weight || 0) / maxWeight) * 100;
                    return (
                      <div key={i} className="flex-1 bg-slate-900 rounded-t-lg relative group">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-primary/40 group-hover:bg-primary transition-all rounded-t-lg"
                          style={{ height: `${height}%` }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-10">
                            {p.weight} kg
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-900 rounded-3xl border border-dashed border-slate-700">
                  <p className="text-slate-500 font-bold uppercase tracking-widest">More logs needed for chart</p>
                </div>
              )}
            </div>

            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">Progress History</h3>
              {progress.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-700">
                        <th className="px-4 py-4">Date</th>
                        <th className="px-4 py-4">Weight</th>
                        <th className="px-4 py-4">Body Fat</th>
                        <th className="px-4 py-4">BMI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {progress.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                          <td className="px-4 py-4 text-white font-bold">{p.progressDate ? new Date(p.progressDate).toLocaleDateString() : 'N/A'}</td>
                          <td className="px-4 py-4 text-white">{p.weight} kg</td>
                          <td className="px-4 py-4 text-white">{p.bodyFat}%</td>
                          <td className="px-4 py-4 text-white">{p.bmi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-center py-10 font-bold uppercase tracking-widest">No progress logs found</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">Announcements & Alerts</h3>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((n, i) => (
                    <div 
                      key={i} 
                      onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                        n.isRead 
                          ? 'bg-slate-900/50 border-slate-700 opacity-60' 
                          : 'bg-slate-900 border-primary/30 shadow-lg shadow-primary/5'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-black text-lg ${n.isRead ? 'text-slate-400' : 'text-white'}`}>{n.title}</h4>
                        <span className="text-[10px] font-bold text-slate-500">{n.createdAt ? new Date(n.createdAt).toLocaleString() : 'N/A'}</span>
                      </div>
                      <p className="text-slate-400">{n.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-10 font-bold uppercase tracking-widest">No new notifications</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'transform' && (
          <div className="space-y-8">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-black text-white italic uppercase mb-8 flex items-center gap-3">
                <Activity className="text-primary w-8 h-8" />
                <span>Log Your Transformation</span>
              </h3>
              <form onSubmit={handleAddTransformation} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Transformation Photo URL</label>
                  <input 
                    name="photoUrl" required type="url"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Short Caption</label>
                  <input 
                    name="caption" required type="text"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white transition-all"
                    placeholder="e.g. 3 Months Progress - Lost 10kg!"
                  />
                </div>
                <div className="flex items-center gap-3 ml-1">
                  <input type="checkbox" name="isPublic" id="isPublic" className="w-5 h-5 accent-primary bg-slate-900 border-slate-700 rounded" />
                  <label htmlFor="isPublic" className="text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer">Display in gym main page (Success Stories)</label>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 uppercase tracking-widest">
                  Publish Transformation
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progress.filter(p => p.photoUrl).map((p, i) => (
                <div key={i} className="bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl group">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.photoUrl} alt="Transformation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <p className="text-white font-bold italic">"{p.caption}"</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[10px] font-black text-slate-500 uppercase">{new Date(p.progressDate).toLocaleDateString()}</span>
                      {p.isPublic && <span className="bg-primary/10 text-primary text-[8px] font-black uppercase px-2 py-1 rounded-full">Public</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
