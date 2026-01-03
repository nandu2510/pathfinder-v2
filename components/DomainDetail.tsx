
import React from 'react';
import { DomainStats, RecommendedCourse } from '../types';
import { ALL_COURSES } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, Target, PlayCircle, Star, Users, Clock, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';

interface DomainDetailProps {
  domain: DomainStats;
  isLoggedIn: boolean;
  onEnroll: (id: string) => void;
  onSetGoal: (role: any) => void;
  onBack: () => void;
}

const DomainDetail: React.FC<DomainDetailProps> = ({ domain, isLoggedIn, onEnroll, onSetGoal, onBack }) => {
  const domainCourses = ALL_COURSES.filter(c => c.category === domain.role);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-black text-xs uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to domains</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter flex items-center gap-3">
              <TrendingUp className="text-indigo-600" />
              Market Demand & Growth
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={domain.marketStats}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    labelStyle={{fontWeight: 900, marginBottom: '4px'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#4f46e5" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorDemand)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-8 text-slate-400 text-sm font-medium italic text-center">
              Historical industry demand for {domain.role} roles based on global recruitment data.
            </p>
          </section>

          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter flex items-center gap-3">
              <DollarSign className="text-emerald-500" />
              Salary Benchmarks
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domain.marketStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    labelStyle={{fontWeight: 900}}
                  />
                  <Bar dataKey="salary" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-10 p-6 bg-slate-50 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Median</p>
                <p className="text-3xl font-black text-slate-900">{domain.avgSalary}</p>
              </div>
              <button 
                onClick={() => onSetGoal(domain.role)}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Target size={18} />
                Set Career Goal
              </button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <section className="bg-[#0F172A] p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200">
            <h2 className="text-3xl font-black mb-8 tracking-tighter">Domain Curriculum</h2>
            <div className="space-y-6">
              {domainCourses.map((course) => (
                <div key={course.id} className="group bg-white/5 hover:bg-white/10 p-6 rounded-[2rem] border border-white/5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                        <PlayCircle size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{course.provider}</p>
                        <h4 className="font-bold text-lg leading-tight group-hover:text-indigo-300 transition-colors">{course.title}</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6 text-xs text-slate-400 font-bold">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-amber-400 fill-current" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{course.enrolledCount}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onEnroll(course.id)}
                    className="w-full bg-white text-[#0F172A] py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all"
                  >
                    Enroll Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-4">
              {['System Architecture', 'Modern Stack', 'Performance', 'User Experience', 'Collaboration', 'Testing'].map(skill => (
                <div key={skill} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl">
                  <CheckCircle size={18} className="text-indigo-600 flex-shrink-0" />
                  <span className="text-sm font-bold text-slate-700">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DomainDetail;
