
import React, { useState, useEffect } from 'react';
import { UserProfile, Task, CareerRole, DomainStats } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExploreDomains from './components/ExploreDomains';
import DomainDetail from './components/DomainDetail';
import CourseLibrary from './components/CourseLibrary';
import TimeManager from './components/TimeManager';
import Settings from './components/Settings';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Chatbot from './components/Chatbot';
import { DOMAIN_STATS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('landing');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<DomainStats | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pathfinder_profile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
      setIsLoggedIn(true);
      if (activeTab === 'landing' || activeTab === 'auth') {
        setActiveTab('dashboard');
      }
    }
  }, []);

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
    localStorage.setItem('pathfinder_profile', JSON.stringify(profile));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('pathfinder_profile');
    setUserProfile(null);
    setIsLoggedIn(false);
    setActiveTab('landing');
    setSelectedDomain(null);
  };

  const handleSelectDomain = (domain: DomainStats) => {
    setSelectedDomain(domain);
    setActiveTab('domain-detail');
  };

  // Content rendering based on state
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return userProfile ? <Dashboard userProfile={userProfile} tasks={tasks} setTasks={setTasks} /> : <Auth onAuthSuccess={handleLogin} onBack={() => setActiveTab('landing')} />;
      case 'explore':
        return <ExploreDomains onSelectDomain={handleSelectDomain} />;
      case 'domain-detail':
        return selectedDomain ? (
          <DomainDetail 
            domain={selectedDomain} 
            isLoggedIn={isLoggedIn}
            onEnroll={(courseId) => {
              if (isLoggedIn && userProfile) {
                const updated = {...userProfile, completedCourses: [...userProfile.completedCourses, courseId]};
                setUserProfile(updated);
                localStorage.setItem('pathfinder_profile', JSON.stringify(updated));
              } else {
                setActiveTab('auth');
              }
            }}
            onSetGoal={(role) => {
              if (isLoggedIn && userProfile) {
                const updated = {...userProfile, careerGoal: role};
                setUserProfile(updated);
                localStorage.setItem('pathfinder_profile', JSON.stringify(updated));
              } else {
                setActiveTab('auth');
              }
            }}
            onBack={() => setActiveTab('explore')}
          />
        ) : null;
      case 'courses':
        return (
          <CourseLibrary 
            userProfile={userProfile} 
            onEnroll={(id) => {
              if (userProfile) {
                const updated = {...userProfile, completedCourses: [...userProfile.completedCourses, id]};
                setUserProfile(updated);
                localStorage.setItem('pathfinder_profile', JSON.stringify(updated));
              } else {
                setActiveTab('auth');
              }
            }} 
          />
        );
      case 'schedule':
        return <TimeManager tasks={tasks} setTasks={setTasks} />;
      case 'settings':
        return userProfile ? <Settings profile={userProfile} setProfile={handleLogin} /> : <Auth onAuthSuccess={handleLogin} onBack={() => setActiveTab('landing')} />;
      default:
        return null;
    }
  };

  if (activeTab === 'landing') {
    return (
      <Landing 
        onStart={() => setActiveTab('explore')} 
        onLogin={() => setActiveTab('auth')} 
        isLoggedIn={isLoggedIn} 
      />
    );
  }

  if (activeTab === 'auth' && !isLoggedIn) {
    return <Auth onAuthSuccess={handleLogin} onBack={() => setActiveTab('landing')} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-[1400px] mx-auto p-4 md:p-10 pb-32">
          <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
                {activeTab === 'domain-detail' ? selectedDomain?.role : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
              </h1>
              <p className="text-[#64748B] font-medium mt-1">
                {isLoggedIn ? `Welcome back, ${userProfile?.name}` : 'Charting the course for the next generation of tech talent.'}
              </p>
            </div>
            {isLoggedIn && (
              <div className="flex items-center space-x-4 bg-white p-2 pr-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
                  {userProfile?.name[0]}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 leading-none">{userProfile?.name}</p>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1">{userProfile?.careerGoal}</p>
                </div>
              </div>
            )}
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </main>

      {isLoggedIn && userProfile && <Chatbot userProfile={userProfile} />}
    </div>
  );
};

export default App;
