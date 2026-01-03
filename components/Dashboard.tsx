
import React from 'react';
import { UserProfile, Task } from '../types';
import { BarChart3, TrendingUp, Trophy, CheckCircle2, Clock, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

interface DashboardProps {
  userProfile: UserProfile;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, tasks }) => {
  const completedCourses = userProfile.completedCourses.length;
  const progressPercent = Math.min(100, (completedCourses / 5) * 100); // 5 courses = first goal

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Hero Progress */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
          <div className="relative z-10">
            <h2 className="text-4xl font-black tracking-tighter mb-4">You're making great progress!</h2>
            <p className="text-indigo-100 font-medium max-w-md leading-relaxed opacity-90">
              You've completed {completedCourses} courses this month. You're in the top 10% of {userProfile.careerGoal} learners.
            </p>
            
            <div className="mt-12">
              <div className="flex justify-between items-end mb-4">
                <span className="text-5xl font-black">{progressPercent}%</span>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Current Milestone Progress</span>
              </div>
              <div className="w-full bg-indigo-500/30 h-4 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-1000" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Learning Velocity</h3>
              <TrendingUp size={18} className="text-indigo-600" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { day: 'Mon', val: 10 },
                  { day: 'Tue', val: 25 },
                  { day: 'Wed', val: 15 },
                  { day: 'Thu', val: 40 },
                  { day: 'Fri', val: 35 },
                  { day: 'Sat', val: 50 },
                  { day: 'Sun', val: 45 },
                ]}>
                  <XAxis dataKey="day" hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="val" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6">Today's Schedule</h3>
            <div className="space-y-4">
              {tasks.length > 0 ? tasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`} />
                    <span className="text-sm font-bold text-slate-800">{task.title}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.startTime}</span>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-300">
                  <Clock size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest">No tasks yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Column */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Skill Inventory</h3>
          <div className="space-y-6">
            {[
              { label: 'Problem Solving', val: 85, color: 'bg-indigo-600' },
              { label: 'Technical Writing', val: 60, color: 'bg-sky-500' },
              { label: 'Collaboration', val: 45, color: 'bg-emerald-500' },
            ].map(skill => (
              <div key={skill.label}>
                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
                  <span className="text-slate-500">{skill.label}</span>
                  <span className="text-slate-900">{skill.val}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color}`} style={{ width: `${skill.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F172A] p-8 rounded-[2rem] text-white shadow-2xl shadow-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="text-amber-400" />
            <h3 className="font-black uppercase tracking-widest text-xs">Achievement Unlocked</h3>
          </div>
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
              <Zap className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">Rapid Learner</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3 Days Streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
