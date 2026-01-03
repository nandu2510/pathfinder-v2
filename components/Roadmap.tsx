
import React, { useState } from 'react';
import { RoadmapNode, RecommendedCourse } from '../types';
import { CheckCircle, Lock, BookOpen, ExternalLink, PlayCircle } from 'lucide-react';

interface RoadmapProps {
  roadmap: RoadmapNode[];
  onNodeComplete: (id: string) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ roadmap, onNodeComplete }) => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-12 py-8 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 roadmap-line -translate-x-1/2 -z-10 opacity-30 hidden md:block" />
        
        {roadmap.map((node, index) => (
          <div 
            key={node.id} 
            className={`flex items-center w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:space-x-12`}
          >
            <div className="flex-1 hidden md:block" />
            
            <button 
              onClick={() => node.status !== 'locked' && setSelectedNode(node)}
              className={`z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all transform hover:scale-110 ${
                node.status === 'completed' 
                  ? 'bg-green-500 border-green-200 text-white' 
                  : node.status === 'available' 
                    ? 'bg-indigo-600 border-indigo-200 text-white shadow-xl' 
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {node.status === 'completed' ? <CheckCircle size={32} /> : node.status === 'locked' ? <Lock size={24} /> : <PlayCircle size={32} />}
            </button>

            <div className={`flex-1 ${index % 2 === 0 ? 'text-left pl-6 md:pl-0' : 'text-left md:text-right pr-6 md:pr-0'}`}>
              <div className={`p-6 bg-white rounded-2xl shadow-sm border ${node.status === 'locked' ? 'opacity-50 grayscale' : 'border-gray-100 hover:border-indigo-300'} transition-all cursor-pointer`}
                   onClick={() => node.status !== 'locked' && setSelectedNode(node)}>
                <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                  node.level === 'Beginner' ? 'text-green-600' : node.level === 'Intermediate' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {node.level}
                </span>
                <h4 className="text-xl font-bold mb-3">{node.title}</h4>
                <div className="flex flex-wrap gap-2 mb-4 justify-start md:justify-start lg:justify-start">
                  {node.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md">{skill}</span>
                  ))}
                </div>
                {node.status === 'available' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNodeComplete(node.id); }}
                    className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Overlay / Panel */}
      {selectedNode && (
        <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{selectedNode.title}</h2>
              <p className="text-gray-500 text-sm">Recommended Path</p>
            </div>
            <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <div className="space-y-6">
            <section>
              <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-600" />
                Curated Courses
              </h5>
              <div className="space-y-3">
                {selectedNode.courses.map((course, i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 group">
                    <div className="flex justify-between items-start">
                      <h6 className="font-bold text-sm group-hover:text-indigo-600 transition-colors">{course.title}</h6>
                      <ExternalLink size={14} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{course.provider} • {course.duration}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{course.difficulty}</span>
                      <span className={`text-[10px] font-bold ${course.isFree ? 'text-green-600' : 'text-blue-600'}`}>
                        {course.isFree ? 'FREE' : 'PAID'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h5 className="font-bold text-sm mb-3 flex items-center gap-2 text-indigo-600">
                <CheckCircle size={16} />
                Practice Milestones
              </h5>
              <ul className="space-y-2">
                <li className="text-xs flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                  Build a portfolio project using these skills
                </li>
                <li className="text-xs flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                  Pass the {selectedNode.level} skill assessment
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
