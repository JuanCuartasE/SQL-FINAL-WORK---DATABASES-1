import React, { useState } from 'react';
import { Question } from '../lib/questions';
import { FileText, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  questions: Question[];
  activeId: string;
  onSelect: (q: Question) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ questions, activeId, onSelect }) => {
  // Group by category
  const categories = Array.from(new Set(questions.map(q => q.category)));
  
  // State to track expanded categories. Default to all open or first one open?
  // Let's default to the first one open or all open. The prompt requested accordion.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // Open the category of the active question by default
    const activeQ = questions.find(q => q.id === activeId);
    if (activeQ) return { [activeQ.category]: true };
    return { [categories[0]]: true };
  });

  const toggleCategory = (cat: string) => {
    setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full hidden md:flex shrink-0">
      <div className="p-4 border-b border-slate-800">
        <h2 className="font-bold text-slate-200">Ejercicios SQL</h2>
        <p className="text-xs text-slate-500 mt-1">1.4 Jardinería</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {categories.map((cat) => {
          const catQuestions = questions.filter(q => q.category === cat);
          const isOpen = expanded[cat];
          
          return (
            <div key={cat} className="mb-2 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800/50">
              <button 
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-3 py-2 text-left bg-slate-800/50 hover:bg-slate-800 transition-colors"
              >
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {cat}
                </h3>
                {isOpen ? <ChevronDown className="w-3 h-3 text-slate-500" /> : <ChevronRight className="w-3 h-3 text-slate-500" />}
              </button>
              
              {isOpen && (
                <div className="space-y-0.5 p-2 bg-slate-950/30">
                  {catQuestions.map(q => (
                    <button
                      key={q.id}
                      onClick={() => onSelect(q)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-start gap-2 transition-all ${
                        activeId === q.id 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <FileText className="w-3 h-3 mt-0.5 shrink-0 opacity-70" />
                      <span className="line-clamp-2">{q.question}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};