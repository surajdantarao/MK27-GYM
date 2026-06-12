import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMembers, deleteMember } from '../services/memberService';
import toast from 'react-hot-toast';
import { Search, UserPlus, Eye, Edit, Trash2, Phone, Calendar, User } from 'lucide-react';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
        toast.success('Member deleted successfully');
        setMembers(members.filter(m => m._id !== id));
      } catch (error) {
        toast.error('Failed to delete member');
      }
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gym Members</h1>
          <p className="text-slate-400">Total: {members.length} members found</p>
        </div>
        <Link
          to="/members/add"
          className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add New Member</span>
        </Link>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-xl"
        />
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Phone</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Plan</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{member.phone}</td>
                    <td className="px-6 py-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {member.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        new Date(member.expiryDate) > new Date()
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {new Date(member.expiryDate) > new Date() ? 'Active' : 'Expired'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/members/${member._id}`}
                          className="p-2 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-white transition-all"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/members/edit/${member._id}`}
                          className="p-2 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-blue-400 transition-all"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-red-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersList;
