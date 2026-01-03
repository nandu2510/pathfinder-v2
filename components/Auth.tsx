
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, ArrowLeft, Mail, Lock, User } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (profile: UserProfile) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful auth
    const mockProfile: UserProfile = {
      name: name || 'Explorer',
      email: email || 'user@example.com',
      academicLevel: 'Undergraduate',
      interests: ['Coding', 'Design'],
      careerGoal: 'Frontend Developer',
      learningPace: 'Moderate',
      dailyAvailability: 4,
      onboarded: true,
      completedCourses: []
    };
    onAuthSuccess(mockProfile);
  };

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10">
          <button onClick={onBack} className="mb-8 text-slate-400 hover:text-slate-600 flex items-center space-x-2 transition-colors">
            <ArrowLeft size={18} />
            <span className="font-bold text-sm">Back</span>
          </button>

          <div className="flex items-center space-x-2 text-indigo-600 font-black text-3xl mb-10 tracking-tighter">
            <Sparkles fill="currentColor" size={32} />
            <span>Pathfinder</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {isLogin ? 'Welcome back!' : 'Join Pathfinder'}
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            {isLogin ? 'Sign in to continue your journey.' : 'Start mapping your career today.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" required placeholder="Full Name" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" required placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" required placeholder="Password" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
            
            <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
