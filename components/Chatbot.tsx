
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { geminiService } from '../geminiService';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface ChatbotProps {
  userProfile: UserProfile;
}

const Chatbot: React.FC<ChatbotProps> = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: `Hi ${userProfile.name}! I'm your EduPath Mentor. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.chatWithMentor(userMsg, userProfile, messages);
      setMessages(prev => [...prev, { role: 'bot', text: response || "I'm sorry, I couldn't process that. Can you try again?" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble connecting to my brain right now. Please check back in a second!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
        >
          <div className="relative">
            <MessageSquare size={28} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-indigo-600 rounded-full animate-pulse" />
          </div>
          <div className="absolute right-20 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with AI Mentor
          </div>
        </button>
      ) : (
        <div className="bg-white w-[380px] h-[550px] rounded-3xl shadow-2xl border border-indigo-50 flex flex-col overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-12 duration-300">
          <header className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h4 className="font-bold leading-none">EduPath Mentor</h4>
                <p className="text-xs text-indigo-200 mt-1">Always here for you</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex space-x-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-gray-100 text-gray-500' : 'bg-indigo-50 text-indigo-600'}`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none flex space-x-2 border border-gray-100">
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about roadmaps, courses..." 
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center space-x-1 opacity-50">
              <Sparkles size={10} className="text-indigo-600" />
              <span className="text-[10px] font-medium text-gray-500">AI Powered Personal Mentor</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
