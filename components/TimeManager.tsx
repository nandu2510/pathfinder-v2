
import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, Trash2, Calendar as CalIcon, Filter, BrainCircuit } from 'lucide-react';

interface TimeManagerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TimeManager: React.FC<TimeManagerProps> = ({ tasks, setTasks }) => {
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    type: 'learning',
    priority: 'medium',
    startTime: '09:00',
    endTime: '10:00'
  });

  const addTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title!,
      type: newTask.type as any,
      priority: newTask.priority as any,
      startTime: newTask.startTime!,
      endTime: newTask.endTime!,
      completed: false
    };
    setTasks([...tasks, task]);
    setShowAdd(false);
    setNewTask({ title: '', type: 'learning', priority: 'medium', startTime: '09:00', endTime: '10:00' });
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const generateAITimetable = () => {
    // Simulated AI schedule generation
    const aiTasks: Task[] = [
      { id: 'ai-1', title: 'Daily Review & Planning', type: 'personal', priority: 'medium', startTime: '08:00', endTime: '08:30', completed: false },
      { id: 'ai-2', title: 'Deep Work: Roadmap Module 1', type: 'learning', priority: 'high', startTime: '09:00', endTime: '11:00', completed: false },
      { id: 'ai-3', title: 'Academic Revision', type: 'academic', priority: 'medium', startTime: '14:00', endTime: '15:30', completed: false },
      { id: 'ai-4', title: 'Hackathon Ideation', type: 'hackathon', priority: 'low', startTime: '19:00', endTime: '20:00', completed: false },
    ];
    setTasks(prev => [...prev.filter(t => !t.id.startsWith('ai-')), ...aiTasks]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setView('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'daily' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setView('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'weekly' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            Weekly
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={generateAITimetable}
            className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-bold hover:bg-indigo-100 transition-colors"
          >
            <BrainCircuit size={18} />
            <span>Generate AI Schedule</span>
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-bold mb-4">Create New Schedule Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input 
              className="px-4 py-2 border rounded-xl" placeholder="Task title..."
              value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
            />
            <select 
              className="px-4 py-2 border rounded-xl"
              value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value as any})}
            >
              <option value="academic">Academic</option>
              <option value="learning">Learning</option>
              <option value="personal">Personal</option>
              <option value="hackathon">Hackathon</option>
            </select>
            <div className="flex space-x-2">
              <input type="time" className="flex-1 px-4 py-2 border rounded-xl" value={newTask.startTime} onChange={e => setNewTask({...newTask, startTime: e.target.value})} />
              <input type="time" className="flex-1 px-4 py-2 border rounded-xl" value={newTask.endTime} onChange={e => setNewTask({...newTask, endTime: e.target.value})} />
            </div>
            <div className="flex space-x-2">
              <button onClick={addTask} className="flex-1 bg-indigo-600 text-white rounded-xl font-bold">Add</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 bg-gray-100 text-gray-500 rounded-xl font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {view === 'daily' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y">
          {tasks.length > 0 ? tasks.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(task => (
            <div key={task.id} className="p-5 flex items-center justify-between group hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-6">
                <div className="text-sm font-bold text-gray-400 w-24">
                  {task.startTime}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{task.title}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{task.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  task.priority === 'high' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                }`}>
                  {task.priority}
                </span>
                <button 
                  onClick={() => removeTask(task.id)}
                  className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-gray-400">
              <CalIcon className="mx-auto mb-4 opacity-20" size={48} />
              <p>Your schedule is empty. Start adding tasks or use AI to plan your day!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="bg-white p-4 rounded-xl border border-gray-100 h-64 shadow-sm">
              <p className="font-bold text-center text-gray-500 mb-4">{day}</p>
              {day === 'Mon' && tasks.slice(0, 2).map(t => (
                <div key={t.id} className="text-[10px] bg-indigo-50 p-2 rounded mb-2 border-l-2 border-indigo-500 truncate">
                  {t.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeManager;
