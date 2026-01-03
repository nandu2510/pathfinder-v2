
import React from 'react';
import { Compass, BookOpen, LayoutDashboard, Calendar, Settings as SettingsIcon, LogOut, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Domains', icon: Compass },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col hidden lg:flex">
      <div className="p-8">
        <div className="flex items-center space-x-3 text-indigo-600 font-black text-2xl tracking-tighter">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-100">
            <Sparkles className="text-white" size={24} fill="currentColor" />
          </div>
          <span>Pathfinder</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <div className="mb-4">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Navigation</p>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-slate-50 rounded-2xl p-5 mb-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-800 mb-2">Need guidance?</p>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-wider hover:underline">Chat with Mentor</button>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-5 py-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
