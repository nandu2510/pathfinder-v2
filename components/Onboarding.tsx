
import React, { useState } from 'react';
import { UserProfile, CareerRole } from '../types';
import { CAREER_ROLES } from '../constants';
import { geminiService } from '../geminiService';
import { Loader2, Sparkles, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  onDiscovery: (results: any[]) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onDiscovery }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    academicLevel: 'Undergraduate',
    interests: [],
    careerGoal: 'Frontend Developer',
    learningPace: 'Moderate',
    dailyAvailability: 4
  });

  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  const handleDiscovery = async () => {
    if (!formData.interests?.length) return;
    setLoading(true);
    try {
      const results = await geminiService.discoverCareer(formData.interests || [], "I want a high impact career in tech");
      setAiSuggestions(results.roles || []);
      onDiscovery(results.roles || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Hello! Let's build your future.</h2>
            <p className="text-gray-500">First, tell us your name and academic level.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Level</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.academicLevel}
                  onChange={e => setFormData({...formData, academicLevel: e.target.value})}
                >
                  <option>High School</option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>Self-Taught</option>
                </select>
              </div>
            </div>
            <button 
              disabled={!formData.name}
              onClick={nextStep}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>Continue</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">What excites you?</h2>
            <p className="text-gray-500">Select interests to help AI suggest the best roles.</p>
            <div className="flex flex-wrap gap-2">
              {['Coding', 'Design', 'Data', 'Robotics', 'Web', 'Security', 'Cloud', 'Math'].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    const current = formData.interests || [];
                    setFormData({...formData, interests: current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag]});
                  }}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    formData.interests?.includes(tag) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pick a Career Goal</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.careerGoal}
                onChange={e => setFormData({...formData, careerGoal: e.target.value as CareerRole})}
              >
                {CAREER_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
            
            {formData.careerGoal === 'Not Sure' && (
              <button 
                onClick={handleDiscovery}
                disabled={loading}
                className="w-full py-3 rounded-xl border-2 border-dashed border-indigo-300 text-indigo-600 flex items-center justify-center space-x-2 hover:bg-indigo-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                <span>Ask AI Mentor to help me choose</span>
              </button>
            )}

            {aiSuggestions.length > 0 && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl space-y-2">
                <p className="font-semibold text-indigo-900">AI Recommendations:</p>
                {aiSuggestions.map(s => (
                  <button 
                    key={s.role}
                    onClick={() => setFormData({...formData, careerGoal: s.role})}
                    className="w-full text-left p-3 bg-white border border-indigo-100 rounded-lg text-sm hover:border-indigo-400"
                  >
                    <strong>{s.role}</strong> ({s.fitScore}%) - {s.reason}
                  </button>
                ))}
              </div>
            )}

            <div className="flex space-x-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-500 font-semibold">Back</button>
              <button onClick={nextStep} className="flex-2 bg-indigo-600 text-white py-4 px-12 rounded-xl font-bold hover:bg-indigo-700">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Finalizing settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Pace</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Slow', 'Moderate', 'Fast'].map(pace => (
                    <button
                      key={pace}
                      onClick={() => setFormData({...formData, learningPace: pace as any})}
                      className={`py-3 rounded-xl border ${formData.learningPace === pace ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
                    >
                      {pace}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Learning Availability (Hours)</label>
                <input 
                  type="range" min="1" max="12" step="1" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={formData.dailyAvailability}
                  onChange={e => setFormData({...formData, dailyAvailability: parseInt(e.target.value)})}
                />
                <div className="text-center mt-2 font-bold text-indigo-600">{formData.dailyAvailability} Hours / Day</div>
              </div>
            </div>
            <button 
              onClick={() => onComplete({...formData, onboarded: true} as UserProfile)}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200"
            >
              Get Started with My Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
