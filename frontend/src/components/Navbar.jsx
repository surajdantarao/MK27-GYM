import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gymlogo from '../assets/gymlogo.jpg';
import { 
  Dumbbell, LogOut, LayoutDashboard, Users, UserPlus, 
  Menu, X, Bell, User as UserIcon, Activity, Settings
} from 'lucide-react';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  const navLinks = isAdmin ? [
    { path: '/dashboard', label: 'Console', icon: LayoutDashboard },
    { path: '/members', label: 'Members', icon: Users },
    { path: '/members/add', label: 'Enroll', icon: UserPlus },
    { path: '/settings', label: 'Settings', icon: Settings }
  ] : isMember ? [
    { path: '/member-dashboard', label: 'My Portal', icon: Activity }
  ] : [];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img src={gymlogo} alt="MK27 Logo" className="w-10 h-10 rounded-full border-2 border-primary group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-xl font-black text-white italic tracking-tighter uppercase group-hover:text-primary transition-colors">
            MK27 <span className="text-primary group-hover:text-white transition-colors">GYM</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-slate-400'
              }`}
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-6 ml-4 pl-8 border-l border-slate-800">
              <button className="relative text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-white font-black text-xs uppercase italic leading-none">{user.name}</p>
                  <p className="text-[8px] font-black text-primary uppercase tracking-widest mt-1">{user.role}</p>
                </div>
                <button 
                  onClick={logoutUser}
                  className="bg-slate-800 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/member/login"
              className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20"
            >
              Access Portal
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-black z-40 transition-transform duration-500 pt-24 px-6 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 text-2xl font-black text-white italic uppercase tracking-tight"
            >
              <link.icon className="w-6 h-6 text-primary" />
              <span>{link.label}</span>
            </Link>
          ))}
          
          {user ? (
            <button
              onClick={() => {
                logoutUser();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-4 text-2xl font-black text-red-500 italic uppercase tracking-tight pt-6 border-t border-white/5 w-full text-left"
            >
              <LogOut className="w-6 h-6" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-primary text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest"
            >
              Access Portal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
