
import React from 'react';
import { Compass, Sparkles, ArrowRight, Star } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onLogin }) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50 rounded-full -mr-96 -mt-96 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-50 rounded-full -ml-48 -mb-48 blur-3xl opacity-50" />

      <nav className="container mx-auto px-8 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3 text-indigo-600 font-black text-3xl tracking-tighter">
          <Sparkles className="fill-current" size={32} />
          <span>Pathfinder</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={onLogin} className="text-sm font-bold text-slate-600 hover:text-indigo-600">Login</button>
          <button onClick={onLogin} className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:scale-105 transition-transform">Get Started</button>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-20 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full mb-8">
          <Star size={16} className="text-indigo-600 fill-current" />
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">New: AI-Powered Career Analysis</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-tight max-w-5xl mb-8">
          Map your future in <span className="text-indigo-600">technology.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-12">
          Explore 15+ tech domains, access 50+ masterclasses, and build a structured path to your dream role with intelligent AI mentorship.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStart}
            className="flex items-center justify-center space-x-3 bg-indigo-600 text-white px-10 py-6 rounded-3xl font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:translate-y-[-2px] transition-all"
          >
            <Compass size={24} />
            <span>Explore Domains</span>
            <ArrowRight size={24} />
          </button>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-100 pt-12 w-full max-w-4xl">
          {[
            { label: 'Domains', val: '15+' },
            { label: 'Courses', val: '50+' },
            { label: 'Success Rate', val: '94%' },
            { label: 'Global Mentors', val: 'AI' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-slate-900">{stat.val}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
