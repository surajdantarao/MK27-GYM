import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getMemberById, deleteMember, updateMember } from '../services/memberService';
import { createMemberAccount, getMemberAccount, resetMemberPassword, toggleUserStatus } from '../services/authService';
import { getWorkoutPlan, getDietPlan, updateWorkoutPlan, updateDietPlan } from '../services/planService';
import { logProgress, getProgress } from '../services/progressService';
import { createNotification } from '../services/notificationService';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, Edit, Trash2, Calendar, Phone, Hash, User, CreditCard, Clock,
  Key, Dumbbell, Utensils, TrendingUp, Bell, Plus, Save, X, Shield, ShieldOff, RefreshCcw
} from 'lucide-react';

const Send = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const MemberDetails = () => {
  const [member, setMember] = useState(null);
  const [memberAccount, setMemberAccount] = useState(null);
  const [progressLogs, setProgressLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();
  const { id } = useParams();

  // Management States
  const [accountData, setAccountData] = useState({ email: '', password: '' });
  const [workoutData, setWorkoutData] = useState({ workoutDays: [] });
  const [dietData, setDietData] = useState({ meals: [], totalCalories: '' });
  const [progressData, setProgressData] = useState({ weight: '', targetWeight: '', bodyFat: '', bmi: '' });
  const [notifData, setNotifData] = useState({ title: '', message: '' });

  useEffect(() => {
    fetchMemberData();
  }, [id]);

  const fetchMemberData = async () => {
    try {
      const data = await getMemberById(id);
      setMember(data);
      
      try {
        const account = await getMemberAccount(id);
        setMemberAccount(account);
      } catch (err) {
        setMemberAccount(null);
        setAccountData({ email: data?.email || '', password: '' });
      }
      
      const [w, d, p] = await Promise.all([
        getWorkoutPlan(id),
        getDietPlan(id),
        getProgress(id)
      ]);
      setWorkoutData(w || { workoutDays: [] });
      setDietData(d || { meals: [], totalCalories: '' });
      setProgressLogs(p || []);
    } catch (error) {
      toast.error('Failed to load member data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!member) return;
    try {
      const data = await createMemberAccount({ ...accountData, name: member.name, memberId: member._id });
      setMemberAccount(data.user);
      toast.success('Member account created!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    }
  };

  const handleResetPassword = async () => {
    if (!memberAccount) return;
    const newPass = prompt('Enter new password:');
    if (!newPass) return;
    try {
      await resetMemberPassword(memberAccount._id, newPass);
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  const handleToggleAccountStatus = async () => {
    if (!memberAccount) return;
    try {
      const data = await toggleUserStatus(memberAccount._id);
      setMemberAccount({ ...memberAccount, status: data.status });
      toast.success(`Account ${data.status === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update account status');
    }
  };

  const toggleStatus = async () => {
    if (!member) return;
    const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateMember(id, { status: newStatus });
      setMember({ ...member, status: newStatus });
      toast.success(`Member set to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleUpdateWorkout = async () => {
    try {
      await updateWorkoutPlan({ memberId: id, workoutDays: workoutData.workoutDays });
      toast.success('Workout plan updated!');
    } catch (error) {
      toast.error('Failed to update plan');
    }
  };

  const handleUpdateDiet = async () => {
    try {
      await updateDietPlan({ memberId: id, ...dietData });
      toast.success('Diet plan updated!');
    } catch (error) {
      toast.error('Failed to update diet');
    }
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    try {
      await logProgress({ memberId: id, ...progressData });
      toast.success('Progress logged!');
      setProgressData({ weight: '', targetWeight: '', bodyFat: '', bmi: '' });
    } catch (error) {
      toast.error('Failed to log progress');
    }
  };

  const handleSendNotif = async (e) => {
    e.preventDefault();
    try {
      await createNotification({ memberId: id, ...notifData });
      toast.success('Notification sent!');
      setNotifData({ title: '', message: '' });
    } catch (error) {
      toast.error('Failed to send notification');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
        toast.success('Member deleted successfully');
        navigate('/members');
      } catch (error) {
        toast.error('Failed to delete member');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-20 bg-slate-800 rounded-3xl border border-dashed border-slate-700 max-w-2xl mx-auto mt-10">
        <User className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-white uppercase italic">Member <span className="text-primary">Not Found</span></h2>
        <p className="text-slate-500 mt-2">The member record you are looking for does not exist or has been deleted.</p>
        <button onClick={() => navigate('/members')} className="mt-6 text-primary font-bold uppercase tracking-widest hover:underline flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> Back to Members
        </button>
      </div>
    );
  }

  const isExpired = member.expiryDate && new Date(member.expiryDate) < new Date();

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in zoom-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white italic uppercase">{member.name}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Admin Management Portal</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to={`/members/edit/${member._id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all font-bold uppercase text-xs tracking-widest">
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all font-bold uppercase text-xs tracking-widest">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800">
        {[
          { id: 'info', label: 'Overview', icon: User },
          { id: 'account', label: 'Login Account', icon: Key },
          { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
          { id: 'diet', label: 'Diet Plan', icon: Utensils },
          { id: 'progress', label: 'Progress log', icon: TrendingUp },
          { id: 'notif', label: 'Notify', icon: Bell }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-bold text-xs uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-500">
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center shadow-xl">
              <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center text-primary font-black text-4xl mx-auto mb-4 border-4 border-primary/10 shadow-lg shadow-primary/20">
                {member.name?.charAt(0) || '?'}
              </div>
              <h2 className="text-2xl font-black text-white uppercase">{member.name}</h2>
              <p className="text-slate-400 mt-1 uppercase tracking-widest text-[10px] font-bold italic">{member.plan} Plan</p>
              <div className={`mt-6 inline-block px-4 py-2 rounded-full text-[10px] font-black uppercase ${!isExpired ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {!isExpired ? 'Membership Active' : 'Membership Expired'}
              </div>
            </div>
            <div className="lg:col-span-2 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl space-y-6">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tight flex items-center gap-2">
                <CreditCard className="text-primary w-6 h-6" />
                <span>Quick Stats</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Phone, label: 'Contact', val: member.phone || 'N/A' },
                  { icon: Hash, label: 'Age & Gender', val: `${member.age || '?'} Yrs, ${member.gender || '?'}` },
                  { icon: Calendar, label: 'Joining Date', val: member.joiningDate ? new Date(member.joiningDate).toLocaleDateString() : 'N/A' },
                  { icon: Clock, label: 'Expiry Date', val: member.expiryDate ? new Date(member.expiryDate).toLocaleDateString() : 'N/A' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                      <p className="text-white font-bold">{stat.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 max-w-2xl mx-auto shadow-2xl">
            {memberAccount ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-white italic uppercase flex items-center gap-3">
                    <Shield className="text-primary w-8 h-8" />
                    <span>Member <span className="text-primary">Portal</span> Account</span>
                  </h3>
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${memberAccount.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    Account {memberAccount.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Username/Email</p>
                    <p className="text-white font-bold">{memberAccount.email}</p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">User Role</p>
                    <p className="text-primary font-black uppercase italic">{memberAccount.role}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <button 
                    onClick={handleResetPassword}
                    className="w-full bg-slate-900 hover:bg-slate-700 text-white font-black py-4 rounded-2xl transition-all border border-slate-700 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Reset Portal Password
                  </button>
                  <button 
                    onClick={handleToggleAccountStatus}
                    className={`w-full font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs ${
                      memberAccount.status === 'active' 
                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' 
                        : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                    }`}
                  >
                    {memberAccount.status === 'active' ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    {memberAccount.status === 'active' ? 'Deactivate Access' : 'Activate Access'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-white italic uppercase mb-6 flex items-center gap-3">
                  <Key className="text-primary w-8 h-8" />
                  <span>Generate Member Account</span>
                </h3>
                <form onSubmit={handleCreateAccount} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Member Email</label>
                    <input 
                      type="email" required value={accountData.email} onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Generate Password</label>
                    <input 
                      type="text" required value={accountData.password} onChange={(e) => setAccountData({...accountData, password: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white transition-all"
                      placeholder="e.g. member123"
                    />
                  </div>
                  <button className="w-full bg-primary hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 uppercase tracking-widest">
                    Create Member Portal Access
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
                <Dumbbell className="text-primary w-8 h-8" />
                <span>Manage Workout Schedule</span>
              </h3>
              <button 
                onClick={() => setWorkoutData({ ...workoutData, workoutDays: [...workoutData.workoutDays, { day: 'Monday', exercises: [] }] })}
                className="bg-slate-900 hover:bg-slate-700 text-white p-3 rounded-xl border border-slate-700 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workoutData.workoutDays.map((wd, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-700 space-y-4">
                  <div className="flex justify-between items-center">
                    <input 
                      value={wd.day} onChange={(e) => {
                        const newDays = [...workoutData.workoutDays];
                        newDays[i].day = e.target.value;
                        setWorkoutData({ ...workoutData, workoutDays: newDays });
                      }}
                      className="bg-transparent text-primary font-black italic text-lg uppercase outline-none w-1/2"
                    />
                    <button onClick={() => {
                      const newDays = workoutData.workoutDays.filter((_, idx) => idx !== i);
                      setWorkoutData({ ...workoutData, workoutDays: newDays });
                    }} className="text-red-500 hover:scale-110 transition-transform">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {wd.exercises?.map((ex, j) => (
                    <div key={j} className="flex gap-2 items-center">
                      <input 
                        placeholder="Exercise" value={ex.name} onChange={(e) => {
                          const newDays = [...workoutData.workoutDays];
                          newDays[i].exercises[j].name = e.target.value;
                          setWorkoutData({ ...workoutData, workoutDays: newDays });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs flex-1 text-white"
                      />
                      <input 
                        placeholder="S" value={ex.sets} onChange={(e) => {
                          const newDays = [...workoutData.workoutDays];
                          newDays[i].exercises[j].sets = e.target.value;
                          setWorkoutData({ ...workoutData, workoutDays: newDays });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs w-10 text-white text-center"
                      />
                      <input 
                        placeholder="R" value={ex.reps} onChange={(e) => {
                          const newDays = [...workoutData.workoutDays];
                          newDays[i].exercises[j].reps = e.target.value;
                          setWorkoutData({ ...workoutData, workoutDays: newDays });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs w-10 text-white text-center"
                      />
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newDays = [...workoutData.workoutDays];
                      if (!newDays[i].exercises) newDays[i].exercises = [];
                      newDays[i].exercises.push({ name: '', sets: '', reps: '' });
                      setWorkoutData({ ...workoutData, workoutDays: newDays });
                    }}
                    className="text-[10px] font-black text-slate-500 uppercase hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Exercise
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleUpdateWorkout} className="bg-primary hover:bg-red-700 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center gap-3 uppercase tracking-widest">
              <Save className="w-5 h-5" /> Save Workout Plan
            </button>
          </div>
        )}

        {activeTab === 'diet' && (
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-8">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
              <Utensils className="text-primary w-8 h-8" />
              <span>Nutrition Management</span>
            </h3>
            <div className="space-y-4">
              <div className="max-w-xs mb-8">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Daily Calorie Target</label>
                <input 
                  type="number" value={dietData.totalCalories} onChange={(e) => setDietData({...dietData, totalCalories: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary outline-none text-white font-black italic text-lg"
                />
              </div>
              
              <div className="space-y-4">
                {dietData.meals?.map((meal, i) => (
                  <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-700 flex gap-4 items-center">
                    <input 
                      placeholder="Meal Time" value={meal.time} onChange={(e) => {
                        const newMeals = [...dietData.meals];
                        newMeals[i].time = e.target.value;
                        setDietData({ ...dietData, meals: newMeals });
                      }}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm w-32 font-bold text-primary italic"
                    />
                    <input 
                      placeholder="Food Items" value={meal.foodItems} onChange={(e) => {
                        const newMeals = [...dietData.meals];
                        newMeals[i].foodItems = e.target.value;
                        setDietData({ ...dietData, meals: newMeals });
                      }}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm flex-1 text-white"
                    />
                    <input 
                      placeholder="kcal" value={meal.calories} onChange={(e) => {
                        const newMeals = [...dietData.meals];
                        newMeals[i].calories = e.target.value;
                        setDietData({ ...dietData, meals: newMeals });
                      }}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm w-24 text-white text-center font-bold"
                    />
                    <button onClick={() => {
                      const newMeals = dietData.meals.filter((_, idx) => idx !== i);
                      setDietData({ ...dietData, meals: newMeals });
                    }} className="text-red-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setDietData({ ...dietData, meals: [...(dietData.meals || []), { time: '', foodItems: '', calories: '' }] })}
                  className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-xl border border-slate-700 transition-all font-bold uppercase text-xs tracking-widest flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Meal Slot
                </button>
                <button onClick={handleUpdateDiet} className="bg-primary hover:bg-red-700 text-white px-10 py-3 rounded-xl transition-all shadow-xl shadow-primary/20 font-black uppercase tracking-widest flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Nutrition Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-white italic uppercase mb-8 flex items-center gap-3">
              <TrendingUp className="text-primary w-8 h-8" />
              <span>Log Member Progress</span>
            </h3>
            <form onSubmit={handleAddProgress} className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Weight (kg)</label>
                <input 
                  type="number" step="0.1" value={progressData.weight} onChange={(e) => setProgressData({...progressData, weight: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Weight (kg)</label>
                <input 
                  type="number" step="0.1" value={progressData.targetWeight} onChange={(e) => setProgressData({...progressData, targetWeight: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Body Fat %</label>
                <input 
                  type="number" step="0.1" value={progressData.bodyFat} onChange={(e) => setProgressData({...progressData, bodyFat: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Calculated BMI</label>
                <input 
                  type="number" step="0.1" value={progressData.bmi} onChange={(e) => setProgressData({...progressData, bmi: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-black"
                />
              </div>
              <button className="col-span-2 bg-primary hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 uppercase tracking-widest flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" /> Log Metrics
              </button>
            </form>

            <div className="mt-12 space-y-6">
              <h4 className="text-xl font-black text-white italic uppercase flex items-center gap-2">
                <Activity className="text-primary w-6 h-6" />
                <span>Transformation Gallery</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {progressLogs.filter(p => p.photoUrl).map((p, i) => (
                  <div key={i} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 group relative">
                    <img src={p.photoUrl} alt="Transformation" className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-center text-center">
                      <p className="text-white text-xs font-bold italic">"{p.caption}"</p>
                      <p className="text-[8px] font-black text-slate-500 uppercase mt-2">{new Date(p.progressDate).toLocaleDateString()}</p>
                      {p.isPublic && <span className="text-primary text-[8px] font-black uppercase mt-1">Publicly Displayed</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notif' && (
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-white italic uppercase mb-8 flex items-center gap-3">
              <Bell className="text-primary w-8 h-8" />
              <span>Send Private Notification</span>
            </h3>
            <form onSubmit={handleSendNotif} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Alert Title</label>
                <input 
                  type="text" value={notifData.title} onChange={(e) => setNotifData({...notifData, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white font-bold"
                  placeholder="e.g. New Workout Assigned"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Alert Message</label>
                <textarea 
                  rows="4" value={notifData.message} onChange={(e) => setNotifData({...notifData, message: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none text-white resize-none"
                  placeholder="Describe the update for the member..."
                ></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 uppercase tracking-widest flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Send Alert
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
