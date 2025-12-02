import React from 'react';

interface QueryEditorProps {
  code: string;
  onChange: (val: string) => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ code, onChange }) => {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full bg-slate-950 text-slate-200 font-mono text-sm p-4 rounded-md border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none leading-relaxed"
      spellCheck={false}
      placeholder="Escribe tu consulta SQL aquí..."
    />
  );
};