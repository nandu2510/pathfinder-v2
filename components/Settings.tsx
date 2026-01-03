
import React, { useState } from 'react';
import { UserProfile, CareerRole } from '../types';
import { User, Bell, Shield, Palette, Save } from 'lucide-react';
import { DOMAIN_STATS } from '../constants';

// Replaced missing CAREER_ROLES with DOMAIN_STATS import for role mapping

interface SettingsProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState(profile);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 bg-slate-50 p-8 border-r border-slate-100 space-y-1">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white shadow-sm font-bold text-sm text-indigo-600 flex items-center space-x-3">
              <User size={18} />
              <span>Profile Information</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white transition-all font-bold text-sm text-slate-500 flex items-center space-x-3">
              <Bell size={18} />
              <span>Notifications</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white transition-all font-bold text-sm text-slate-500 flex items-center space-x-3">
              <Shield size={18} />
              <span>Privacy & Security</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white transition-all font-bold text-sm text-slate-500 flex items-center space-x-3">
              <Palette size={18} />
              <span>Theme Preferences</span>
            </button>
          </div>

          <div className="flex-1 p-10 space-y-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">General Account Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-sm"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Career Goal</label>
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-sm"
                    value={formData.careerGoal}
                    onChange={e => setFormData({...formData, careerGoal: e.target.value as CareerRole})}
                  >
                    {DOMAIN_STATS.map(d => <option key={d.role} value={d.role}>{d.role}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              {success && <span className="text-emerald-500 font-bold text-sm animate-bounce">Changes saved!</span>}
              <button 
                onClick={handleSave}
                className="ml-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center space-x-2 shadow-xl shadow-indigo-100 hover:scale-105 transition-transform"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
