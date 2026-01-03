
import React, { useState } from 'react';
import { ALL_COURSES } from '../constants';
import { UserProfile } from '../types';
import { Search, BookOpen, Clock, PlayCircle, CheckCircle, Star, Users } from 'lucide-react';

interface CourseLibraryProps {
  userProfile: UserProfile | null;
  onEnroll: (id: string) => void;
}

const CourseLibrary: React.FC<CourseLibraryProps> = ({ userProfile, onEnroll }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || course.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', ...new Set(ALL_COURSES.map(c => c.category))];

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search our 50+ masterclass catalog..." 
            className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-50 font-black text-sm tracking-tight transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide lg:pb-0">
          <select 
            className="px-8 py-5 bg-indigo-600 text-white border-none rounded-[2rem] font-black text-sm outline-none cursor-pointer shadow-xl shadow-indigo-100 transition-transform active:scale-95"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat} className="text-slate-900 bg-white">{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredCourses.map((course) => {
          const isEnrolled = userProfile?.completedCourses.includes(course.id);
          return (
            <div key={course.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-[16/10] bg-[#0F172A] flex items-center justify-center relative group-hover:bg-indigo-900 transition-colors">
                <PlayCircle className="text-white opacity-20 group-hover:opacity-100 transition-all group-hover:scale-110" size={60} />
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{course.provider}</span>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center space-x-1 bg-amber-400 px-3 py-1 rounded-xl shadow-lg">
                  <Star size={12} className="fill-current text-white" />
                  <span className="text-xs font-black text-white">{course.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">{course.category}</p>
                <h4 className="text-xl font-black text-slate-900 mb-6 leading-tight flex-1">{course.title}</h4>
                
                <div className="mt-auto space-y-6">
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-6">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-slate-300" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={14} className="text-slate-300" />
                      <span>{course.enrolledCount} Students</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onEnroll(course.id)}
                    disabled={isEnrolled}
                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                      isEnrolled 
                        ? 'bg-emerald-50 text-emerald-600 flex items-center justify-center space-x-2 cursor-default' 
                        : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-100 active:scale-95'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Completed Masterclass</span>
                      </>
                    ) : (
                      course.isFree ? 'Enroll Free' : 'Access Premium'
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-40 bg-white rounded-[3rem] border border-slate-100 border-dashed">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-200" />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-widest">No matching masterclasses found</p>
          <button onClick={() => setFilter('All')} className="mt-4 text-indigo-600 font-black text-sm uppercase underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};

export default CourseLibrary;
