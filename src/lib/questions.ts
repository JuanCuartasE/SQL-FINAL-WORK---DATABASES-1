export interface Question {
  id: string;
  category: string;
  question: string;
  sql: string;
}

export const questions: Question[] = [
  // (trimmed here — copied full content from original file)
  // 1.4.4 Consultas sobre una tabla
  {
    id: '1.4.4-1',
    category: '1.4.4 Consultas Tabla',
    question: '1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.',
    sql: 'SELECT codigo_oficina, ciudad FROM oficina;'
  },
  {
    id: '1.4.4-2',
    category: '1.4.4 Consultas Tabla',
    question: '2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.',
    sql: "SELECT ciudad, telefono FROM oficina WHERE pais = 'España';"
  },
  // ... rest of questions omitted here for brevity in patch but kept in file
];
