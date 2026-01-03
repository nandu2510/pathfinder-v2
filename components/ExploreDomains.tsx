
import React from 'react';
import { DOMAIN_STATS } from '../constants';
import { ArrowRight, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import { DomainStats } from '../types';

interface ExploreDomainsProps {
  onSelectDomain: (domain: DomainStats) => void;
}

const ExploreDomains: React.FC<ExploreDomainsProps> = ({ onSelectDomain }) => {
  return (
    <div className="space-y-12">
      <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 mb-12">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Choose Your Domain</h2>
          <p className="text-indigo-100 text-lg leading-relaxed opacity-90">
            Select a specialized path to see market trends, salary data, and curated masterclasses tailored to that role.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {DOMAIN_STATS.map((domain) => (
          <button 
            key={domain.role}
            onClick={() => onSelectDomain(domain)}
            className="text-left bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
              <Briefcase size={80} />
            </div>

            <div className="flex justify-between items-start mb-8">
              <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                domain.trend === 'High' ? 'bg-rose-50 text-rose-600' : domain.trend === 'Rising' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {domain.trend} Demand
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{domain.difficulty}</span>
            </div>

            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-indigo-600 transition-colors">
              {domain.role}
            </h3>
            <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-2">
              {domain.description}
            </p>
            
            <div className="flex items-center space-x-8 mb-8">
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-slate-400 mb-1">
                  <DollarSign size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Avg Salary</span>
                </div>
                <span className="text-2xl font-black text-slate-900">{domain.avgSalary}</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-100" />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-slate-400 mb-1">
                  <TrendingUp size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Growth</span>
                </div>
                <span className="text-2xl font-black text-slate-900">+{domain.role.length * 4}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-indigo-600 font-black text-sm uppercase tracking-widest">
              <span>View Full Analytics</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreDomains;
