
import React from 'react';
import { MOCK_CHART_DATA } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface AnalyticsProps {
  careerRole: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ careerRole }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4">
            <TrendingUp size={24} />
          </div>
          <p className="text-gray-500 text-sm">Industry Growth</p>
          <h4 className="text-2xl font-bold">+75% YoY</h4>
          <p className="text-xs text-green-600 font-medium">Projection for 2026</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
            <DollarSign size={24} />
          </div>
          <p className="text-gray-500 text-sm">Avg. Salary</p>
          <h4 className="text-2xl font-bold">$124,500</h4>
          <p className="text-xs text-indigo-600 font-medium">Global Entry Level Avg.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4">
            <Users size={24} />
          </div>
          <p className="text-gray-500 text-sm">Job Openings</p>
          <h4 className="text-2xl font-bold">1.2M</h4>
          <p className="text-xs text-orange-600 font-medium">Currently Hiring Globally</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Market Demand Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic text-center">AI-projected growth based on current industry trends for {careerRole}.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Salary Progression</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="salary" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic text-center">Historical and expected salary range for mid-level {careerRole} positions.</p>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-bold mb-4">Future Scope Analysis</h3>
          <p className="text-indigo-200 mb-6 leading-relaxed">
            The next decade belongs to digital-native careers. As companies integrate AI and cloud infrastructure, the demand for {careerRole} is expected to shift towards more hybrid responsibilities including ethical governance and cross-platform architecture.
          </p>
          <div className="flex space-x-4">
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <span className="block text-xl font-bold">Stable</span>
              <span className="text-xs text-indigo-300">Job Security</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <span className="block text-xl font-bold">High</span>
              <span className="text-xs text-indigo-300">Remote Work</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-20 -mt-20 blur-3xl opacity-30" />
      </div>
    </div>
  );
};

export default Analytics;
