import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { QueryEditor } from './components/QueryEditor';
import { ResultsTable } from './components/ResultsTable';
import { initDatabase, runQuery } from './lib/database';
import { Question, questions } from './lib/questions';
import { 
  Database, 
  Terminal, 
  Play, 
  Loader2,
  AlertTriangle 
} from 'lucide-react';

// Define types for global SQL.js
declare global {
  interface Window {
    initSqlJs: any;
  }
}

export default function App() {
  const [db, setDb] = useState<any>(null);
  const [isDbReady, setIsDbReady] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question>(questions[0]);
  const [sqlCode, setSqlCode] = useState<string>(questions[0].sql);
  const [queryResult, setQueryResult] = useState<{ columns: string[], values: any[][] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize DB on mount
  useEffect(() => {
    const loadDb = async () => {
      try {
        const database = await initDatabase();
        setDb(database);
        setIsDbReady(true);
      } catch (e) {
        console.error("Failed to load database", e);
        setError("Error cargando el motor de base de datos. Por favor recarga la página.");
      }
    };
    loadDb();
  }, []);

  // Update editor when question changes
  useEffect(() => {
    setSqlCode(activeQuestion.sql);
    setQueryResult(null);
    setError(null);
  }, [activeQuestion]);

  const handleRunQuery = () => {
    if (!db) return;
    try {
      const res = runQuery(db, sqlCode);
      if (res && res.length > 0) {
        setQueryResult({
          columns: res[0].columns,
          values: res[0].values
        });
        setError(null);
      } else {
        // Query ran but returned no rows
        setQueryResult({ columns: ["Resultado"], values: [["Consulta ejecutada con éxito. 0 filas devueltas."]] });
        setError(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error de sintaxis SQL");
      setQueryResult(null);
    }
  };

  if (!isDbReady) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
        <h2 className="text-xl font-semibold">Inicializando Motor SQL Virtual...</h2>
        <p className="text-slate-500 mt-2">Cargando esquema 'Jardinería' y datos de prueba.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <Sidebar 
        questions={questions} 
        activeId={activeQuestion.id} 
        onSelect={setActiveQuestion} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              Trabajo Final: Juan Manuel Cuartas Escobar
            </h1>
            <p className="text-xs text-slate-500">Base de Datos: Jardinería (Virtualizada en Navegador)</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Sistema Online
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Editor Column */}
          <div className="flex-1 flex flex-col border-r border-slate-800 p-4 min-w-[50%]">
            <div className="mb-4">
              <div className="text-xs font-mono text-emerald-500 mb-1">{activeQuestion.category}</div>
              <h2 className="text-xl font-medium text-white mb-2">{activeQuestion.question}</h2>
              <p className="text-slate-400 text-sm">
                Edita la consulta SQL a continuación y presiona ejecutar.
              </p>
            </div>

            <div className="flex-1 flex flex-col relative min-h-[300px]">
              <QueryEditor code={sqlCode} onChange={setSqlCode} />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleRunQuery}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-lg shadow-emerald-900/20"
              >
                <Play className="w-4 h-4 fill-current" />
                Ejecutar SQL
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="flex-1 flex flex-col bg-slate-900/30 p-4 overflow-hidden">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Terminal className="w-4 h-4" /> Resultados
            </h3>
            
            <div className="flex-1 overflow-auto bg-slate-950 border border-slate-800 rounded-lg shadow-inner">
              {error ? (
                <div className="p-8 flex flex-col items-center justify-center text-red-400 h-full">
                  <AlertTriangle className="w-10 h-10 mb-4 opacity-50" />
                  <p className="font-mono text-center">{error}</p>
                </div>
              ) : queryResult ? (
                <ResultsTable columns={queryResult.columns} values={queryResult.values} />
              ) : (
                <div className="p-8 flex flex-col items-center justify-center text-slate-600 h-full">
                  <Play className="w-10 h-10 mb-4 opacity-20" />
                  <p>Ejecuta una consulta para ver los resultados aquí.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
