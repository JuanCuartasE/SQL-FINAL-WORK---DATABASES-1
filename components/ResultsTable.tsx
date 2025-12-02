import React from 'react';

interface ResultsTableProps {
  columns: string[];
  values: any[][];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ columns, values }) => {
  return (
    <div className="w-full h-full overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-slate-800 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className="px-4 py-3 text-xs font-medium text-slate-300 uppercase tracking-wider border-b border-slate-700 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {values.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-800/50 transition-colors">
              {row.map((cell, cellIdx) => (
                <td 
                  key={cellIdx} 
                  className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap font-mono"
                >
                  {cell === null ? <span className="text-slate-600 italic">NULL</span> : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};