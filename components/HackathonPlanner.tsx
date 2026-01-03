
import React, { useState } from 'react';
import { HackathonPhase } from '../types';
import { Clock, CheckCircle, Play, AlertCircle } from 'lucide-react';

const HackathonPlanner: React.FC = () => {
  const [phases, setPhases] = useState<HackathonPhase[]>([
    { id: '1', name: 'Ideation', duration: '4h', progress: 100 },
    { id: '2', name: 'Development', duration: '24h', progress: 45 },
    { id: '3', name: 'Testing', duration: '8h', progress: 0 },
    { id: '4', name: 'Presentation', duration: '4h', progress: 0 },
  ]);

  const updateProgress = (id: string, val: number) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, progress: Math.min(100, Math.max(0, val)) } : p));
  };

  return (
    <div className="space-y-8">
      <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-xl shadow-indigo-200">
        <div>
          <h2 className="text-3xl font-bold mb-2">Hackathon: AI for Good</h2>
          <p className="text-indigo-100 flex items-center gap-2">
            <Clock size={18} />
            Ends in: 18h 32m
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-indigo-200 font-bold">Total Progress</p>
            <p className="text-4xl font-black">42%</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Play size={24} className="fill-current" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map((phase) => (
          <div key={phase.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Phase</span>
                {phase.progress === 100 && <CheckCircle size={16} className="text-green-500" />}
              </div>
              <h4 className="text-xl font-bold">{phase.name}</h4>
              <p className="text-sm text-gray-500">Duration: {phase.duration}</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${phase.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700">{phase.progress}% Done</span>
                <div className="flex gap-1">
                  <button onClick={() => updateProgress(phase.id, phase.progress - 10)} className="w-6 h-6 rounded bg-gray-50 text-gray-400 hover:bg-gray-100">-</button>
                  <button onClick={() => updateProgress(phase.id, phase.progress + 10)} className="w-6 h-6 rounded bg-gray-50 text-gray-400 hover:bg-gray-100">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <AlertCircle className="text-orange-500" />
          Critical Milestones
        </h3>
        <div className="space-y-4">
          {[
            { title: 'MVP Demo Ready', time: '12h Left', status: 'In Progress' },
            { title: 'Database Schema Design', time: 'Completed', status: 'Done' },
            { title: 'API Integration', time: '14h Left', status: 'Todo' },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${m.status === 'Done' ? 'bg-green-500' : m.status === 'In Progress' ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="font-bold text-gray-700">{m.title}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-indigo-600">{m.time}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{m.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonPlanner;
