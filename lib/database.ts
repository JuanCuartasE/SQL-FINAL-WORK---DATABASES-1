// This file handles the In-Browser SQLite instance simulation
// It maps the requested MySQL schema to SQLite and provides seed data.

let dbInstance: any = null;

export const initDatabase = async () => {
  if (dbInstance) return dbInstance;

  // Load the WASM library
  const SQL = await (window as any).initSqlJs({
    locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
  });

  const db = new SQL.Database();

  // --- COMPATIBILITY LAYER ---
  // SQLite doesn't have YEAR(), DATEDIFF(), etc. We polyfill them here.
  
  // YEAR(date_string)
  db.create_function("YEAR", (dateStr: string) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d.getFullYear();
  });

  // MONTH(date_string)
  db.create_function("MONTH", (dateStr: string) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d.getMonth() + 1;
  });

  // DATE_FORMAT(date, format) - Simplified mapping
  // We only support basic years for the exercises provided (%Y)
  db.create_function("DATE_FORMAT", (dateStr: string, format: string) => {
     if (!dateStr) return null;
     const d = new Date(dateStr);
     if (isNaN(d.getTime())) return null;
     
     if (format.includes('%Y')) return d.getFullYear().toString();
     if (format.includes('%m')) return (d.getMonth() + 1).toString().padStart(2, '0');
     if (format.includes('%d')) return d.getDate().toString().padStart(2, '0');
     
     return d.toLocaleDateString(); 
  });

  // ADDDATE(date, days)
  db.create_function("ADDDATE", (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  });

  // DATEDIFF(d1, d2) -> Returns difference in days (MySQL: expr1 - expr2)
  // Note: MySQL DATEDIFF(expr1, expr2) returns expr1 - expr2.
  db.create_function("DATEDIFF", (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return null;
    
    // Difference in milliseconds
    const diffTime = date1.getTime() - date2.getTime(); 
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  });


  // --- SCHEMA CREATION ---
  
  db.run(`
    CREATE TABLE oficina (
      codigo_oficina TEXT PRIMARY KEY,
      ciudad TEXT NOT NULL,
      pais TEXT NOT NULL,
      region TEXT,
      codigo_postal TEXT NOT NULL,
      telefono TEXT NOT NULL,
      linea_direccion1 TEXT NOT NULL,
      linea_direccion2 TEXT
    );

    CREATE TABLE gama_producto (
      gama TEXT PRIMARY KEY,
      descripcion_texto TEXT,
      descripcion_html TEXT,
      imagen TEXT
    );

    CREATE TABLE empleado (
      codigo_empleado INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      apellido1 TEXT NOT NULL,
      apellido2 TEXT,
      extension TEXT NOT NULL,
      email TEXT NOT NULL,
      codigo_oficina TEXT NOT NULL,
      codigo_jefe INTEGER,
      puesto TEXT,
      FOREIGN KEY (codigo_oficina) REFERENCES oficina (codigo_oficina),
      FOREIGN KEY (codigo_jefe) REFERENCES empleado (codigo_empleado)
    );

    CREATE TABLE cliente (
      codigo_cliente INTEGER PRIMARY KEY,
      nombre_cliente TEXT NOT NULL,
      nombre_contacto TEXT,
      apellido_contacto TEXT,
      telefono TEXT NOT NULL,
      fax TEXT NOT NULL,
      linea_direccion1 TEXT NOT NULL,
      linea_direccion2 TEXT,
      ciudad TEXT NOT NULL,
      region TEXT,
      pais TEXT,
      codigo_postal TEXT,
      codigo_empleado_rep_ventas INTEGER,
      limite_credito NUMERIC,
      FOREIGN KEY (codigo_empleado_rep_ventas) REFERENCES empleado (codigo_empleado)
    );

    CREATE TABLE pedido (
      codigo_pedido INTEGER PRIMARY KEY,
      fecha_pedido TEXT NOT NULL,
      fecha_esperada TEXT NOT NULL,
      fecha_entrega TEXT,
      estado TEXT NOT NULL,
      comentarios TEXT,
      codigo_cliente INTEGER NOT NULL,
      FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo_cliente)
    );

    CREATE TABLE producto (
      codigo_producto TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      gama TEXT NOT NULL,
      dimensiones TEXT,
      proveedor TEXT,
      descripcion TEXT,
      cantidad_en_stock INTEGER NOT NULL,
      precio_venta NUMERIC NOT NULL,
      precio_proveedor NUMERIC,
      FOREIGN KEY (gama) REFERENCES gama_producto (gama)
    );

    CREATE TABLE detalle_pedido (
      codigo_pedido INTEGER NOT NULL,
      codigo_producto TEXT NOT NULL,
      cantidad INTEGER NOT NULL,
      precio_unidad NUMERIC NOT NULL,
      numero_linea INTEGER NOT NULL,
      PRIMARY KEY (codigo_pedido, codigo_producto),
      FOREIGN KEY (codigo_pedido) REFERENCES pedido (codigo_pedido),
      FOREIGN KEY (codigo_producto) REFERENCES producto (codigo_producto)
    );

    CREATE TABLE pago (
      codigo_cliente INTEGER NOT NULL,
      forma_pago TEXT NOT NULL,
      id_transaccion TEXT NOT NULL,
      fecha_pago TEXT NOT NULL,
      total NUMERIC NOT NULL,
      PRIMARY KEY (codigo_cliente, id_transaccion),
      FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo_cliente)
    );
  `);

  // --- SEED DATA ---
  
  // Oficinas
  db.run(`
    INSERT INTO oficina VALUES 
    ('M-01', 'Madrid', 'España', 'Madrid', '28001', '+34 91 555 55 55', 'Avda. Castellana', NULL),
    ('B-01', 'Barcelona', 'España', 'Cataluña', '08001', '+34 93 444 44 44', 'La Rambla', NULL),
    ('L-01', 'Londres', 'Inglaterra', 'London', 'EC1', '+44 20 1234 5678', 'Baker Street', NULL),
    ('T-01', 'Tokyo', 'Japón', 'Kanto', '100-0001', '+81 3 1234 5678', 'Chiyoda', NULL);
  `);

  // Gama Producto
  db.run(`
    INSERT INTO gama_producto VALUES 
    ('Ornamentales', 'Plantas para decorar', NULL, NULL),
    ('Frutales', 'Arboles de fruta', NULL, NULL),
    ('Herramientas', 'Herramientas de jardín', NULL, NULL);
  `);

  // Empleados
  db.run(`
    INSERT INTO empleado VALUES 
    (1, 'Marcos', 'Magaña', 'Perez', '1234', 'marcos@jardineria.es', 'M-01', NULL, 'Director General'),
    (7, 'Carlos', 'Soria', 'Jimenez', '2222', 'carlos@jardineria.es', 'M-01', 1, 'Director Oficina'),
    (11, 'Alberto', 'Soria', 'Carrasco', '3333', 'alberto@jardineria.es', 'M-01', 7, 'Representante Ventas'),
    (30, 'Felipe', 'Rosas', 'Marquez', '4444', 'felipe@jardineria.es', 'B-01', 7, 'Representante Ventas'),
    (5, 'Juan', 'Sin', 'Jefe', '5555', 'juan@jardineria.es', 'L-01', 7, 'Secretario'),
    (6, 'Luis', 'Lopez', 'Moreno', '6666', 'luis@jardineria.es', 'L-01', 7, 'Representante Ventas');
  `);

  // Clientes
  db.run(`
    INSERT INTO cliente (codigo_cliente, nombre_cliente, nombre_contacto, telefono, fax, linea_direccion1, ciudad, pais, codigo_empleado_rep_ventas, limite_credito) VALUES 
    (101, 'Viveros S.L.', 'Ana', '600111222', '900111222', 'Calle Falsa 123', 'Fuenlabrada', 'España', 11, 50000.00),
    (102, 'Jardines y Más', 'Pedro', '600333444', '900333444', 'Calle Real 4', 'Madrid', 'España', 11, 20000.00),
    (103, 'Gardens UK', 'John', '555-1234', '555-5678', 'High St', 'London', 'Inglaterra', 30, 10000.00),
    (104, 'Cliente Sin Pago', 'Luis', '666777888', '999888777', 'Calle Pez', 'Sevilla', 'España', 30, 5000.00),
    (105, 'Cliente Sin Pedido', 'Maria', '111222333', '444555666', 'Calle Sol', 'Valencia', 'España', NULL, 15000.00),
    (106, 'Cliente de Madrid', 'Carlos', '222333444', '555666777', 'Gran Via', 'Madrid', 'España', 11, 3000.00),
    (107, 'Cliente M', 'Marta', '999888777', '111222333', 'Calle M', 'Mostoles', 'España', 30, 7000.00);
  `);

  // Productos
  db.run(`
    INSERT INTO producto VALUES
    ('OR-101', 'Rosa Roja', 'Ornamentales', '10x10', 'Viveros Sur', 'Rosa clásica', 150, 5.00, 2.50),
    ('OR-102', 'Orquidea', 'Ornamentales', '5x5', 'Viveros Norte', 'Orquidea blanca', 50, 15.00, 8.00),
    ('FR-001', 'Manzano', 'Frutales', '100x20', 'Frutas SA', 'Manzano Golden', 20, 25.00, 12.00),
    ('HE-001', 'Pala', 'Herramientas', NULL, 'Tools Inc', 'Pala acero', 200, 10.00, 4.00),
    ('OR-200', 'Clavel', 'Ornamentales', '5x5', 'Viveros Sur', 'Clavel Rojo', 120, 2.00, 0.50);
  `);

  // Pedidos
  db.run(`
    INSERT INTO pedido VALUES
    (1, '2008-01-15', '2008-01-20', '2008-01-19', 'Entregado', NULL, 101),
    (2, '2009-03-10', '2009-03-15', NULL, 'Rechazado', 'Problema de credito', 101),
    (3, '2009-01-05', '2009-01-10', '2009-01-07', 'Entregado', NULL, 103),
    (4, '2023-05-01', '2023-05-05', NULL, 'Pendiente', NULL, 102),
    (5, '2009-01-15', '2009-01-20', '2009-01-18', 'Entregado', 'Todo ok', 101),
    (6, '2008-11-15', '2008-11-20', '2008-11-25', 'Entregado', 'Tarde', 101);
  `);

  // Detalles
  db.run(`
    INSERT INTO detalle_pedido VALUES
    (1, 'OR-101', 10, 5.00, 1),
    (1, 'FR-001', 2, 25.00, 2),
    (2, 'HE-001', 5, 10.00, 1),
    (3, 'OR-200', 50, 2.00, 1),
    (5, 'OR-101', 5, 5.00, 1),
    (6, 'OR-101', 1, 5.00, 1);
  `);

  // Pagos
  db.run(`
    INSERT INTO pago VALUES
    (101, 'PayPal', 'TXN-12345', '2008-01-16', 200.00),
    (101, 'Transferencia', 'TXN-67890', '2009-03-11', 50.00),
    (103, 'Cheque', 'CHQ-999', '2009-01-06', 100.00),
    (101, 'PayPal', 'TXN-00001', '2008-05-20', 150.00);
  `);

  dbInstance = db;
  return dbInstance;
};

export const runQuery = (db: any, sql: string) => {
  return db.exec(sql);
};