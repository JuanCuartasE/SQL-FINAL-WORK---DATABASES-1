export interface Question {
  id: string;
  category: string;
  question: string;
  sql: string;
}

export const questions: Question[] = [
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
  {
    id: '1.4.4-3',
    category: '1.4.4 Consultas Tabla',
    question: '3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.',
    sql: 'SELECT nombre, apellido1, apellido2, email FROM empleado WHERE codigo_jefe = 7;'
  },
  {
    id: '1.4.4-4',
    category: '1.4.4 Consultas Tabla',
    question: '4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.',
    sql: 'SELECT puesto, nombre, apellido1, apellido2, email FROM empleado WHERE codigo_jefe IS NULL;'
  },
  {
    id: '1.4.4-5',
    category: '1.4.4 Consultas Tabla',
    question: '5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.',
    sql: "SELECT nombre, apellido1, apellido2, puesto FROM empleado WHERE puesto != 'Representante Ventas';"
  },
  {
    id: '1.4.4-6',
    category: '1.4.4 Consultas Tabla',
    question: '6. Devuelve un listado con el nombre de los todos los clientes españoles.',
    sql: "SELECT nombre_cliente FROM cliente WHERE pais = 'España';"
  },
  {
    id: '1.4.4-7',
    category: '1.4.4 Consultas Tabla',
    question: '7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.',
    sql: 'SELECT DISTINCT estado FROM pedido;'
  },
  {
    id: '1.4.4-8-1',
    category: '1.4.4 Consultas Tabla',
    question: '8.1. Clientes que pagaron en 2008 (usando YEAR).',
    sql: 'SELECT DISTINCT codigo_cliente FROM pago WHERE YEAR(fecha_pago) = 2008;'
  },
  {
    id: '1.4.4-8-2',
    category: '1.4.4 Consultas Tabla',
    question: '8.2. Clientes que pagaron en 2008 (usando DATE_FORMAT).',
    sql: "SELECT DISTINCT codigo_cliente FROM pago WHERE DATE_FORMAT(fecha_pago, '%Y') = '2008';"
  },
  {
    id: '1.4.4-8-3',
    category: '1.4.4 Consultas Tabla',
    question: '8.3. Clientes que pagaron en 2008 (sin funciones).',
    sql: "SELECT DISTINCT codigo_cliente FROM pago WHERE fecha_pago >= '2008-01-01' AND fecha_pago <= '2008-12-31';"
  },
  {
    id: '1.4.4-9',
    category: '1.4.4 Consultas Tabla',
    question: '9. Pedidos no entregados a tiempo.',
    sql: 'SELECT codigo_pedido, codigo_cliente, fecha_esperada, fecha_entrega FROM pedido WHERE fecha_entrega > fecha_esperada;'
  },
  {
    id: '1.4.4-10-1',
    category: '1.4.4 Consultas Tabla',
    question: '10.1. Entrega 2 días antes (ADDDATE).',
    sql: 'SELECT codigo_pedido, codigo_cliente, fecha_esperada, fecha_entrega FROM pedido WHERE ADDDATE(fecha_entrega, 2) <= fecha_esperada;'
  },
  {
    id: '1.4.4-10-2',
    category: '1.4.4 Consultas Tabla',
    question: '10.2. Entrega 2 días antes (DATEDIFF).',
    sql: 'SELECT codigo_pedido, codigo_cliente, fecha_esperada, fecha_entrega FROM pedido WHERE DATEDIFF(fecha_esperada, fecha_entrega) >= 2;'
  },
  {
    id: '1.4.4-11',
    category: '1.4.4 Consultas Tabla',
    question: '11. Pedidos rechazados en 2009.',
    sql: "SELECT * FROM pedido WHERE estado = 'Rechazado' AND YEAR(fecha_pedido) = 2009;"
  },
  {
    id: '1.4.4-12',
    category: '1.4.4 Consultas Tabla',
    question: '12. Pedidos entregados en enero de cualquier año.',
    sql: "SELECT * FROM pedido WHERE MONTH(fecha_entrega) = 1;"
  },
  {
    id: '1.4.4-13',
    category: '1.4.4 Consultas Tabla',
    question: '13. Pagos en 2008 mediante Paypal (Ordenado).',
    sql: "SELECT * FROM pago WHERE YEAR(fecha_pago) = 2008 AND forma_pago = 'PayPal' ORDER BY total DESC;"
  },
  {
    id: '1.4.4-14',
    category: '1.4.4 Consultas Tabla',
    question: '14. Formas de pago únicas.',
    sql: "SELECT DISTINCT forma_pago FROM pago;"
  },
  {
    id: '1.4.4-15',
    category: '1.4.4 Consultas Tabla',
    question: '15. Ornamentales > 100 stock, por precio.',
    sql: "SELECT * FROM producto WHERE gama = 'Ornamentales' AND cantidad_en_stock > 100 ORDER BY precio_venta DESC;"
  },
  {
    id: '1.4.4-16',
    category: '1.4.4 Consultas Tabla',
    question: '16. Clientes Madrid con Rep 11 o 30.',
    sql: "SELECT * FROM cliente WHERE ciudad = 'Madrid' AND (codigo_empleado_rep_ventas = 11 OR codigo_empleado_rep_ventas = 30);"
  },

  // 1.4.5 Consultas multitabla (Composición interna)
  {
    id: '1.4.5-1',
    category: '1.4.5 Multitabla (Interna)',
    question: '1. Nombre cliente y su representante.',
    sql: `SELECT c.nombre_cliente, e.nombre, e.apellido1
FROM cliente c
INNER JOIN empleado e ON c.codigo_empleado_rep_ventas = e.codigo_empleado;`
  },
  {
    id: '1.4.5-2',
    category: '1.4.5 Multitabla (Interna)',
    question: '2. Clientes sin pagos y su representante (Inner Join Logic - Note: Usually requires Outer Join/Subquery to find missing records, here showing reps for existing clients).',
    sql: `SELECT c.nombre_cliente, e.nombre
FROM cliente c
INNER JOIN empleado e ON c.codigo_empleado_rep_ventas = e.codigo_empleado
WHERE c.codigo_cliente NOT IN (SELECT codigo_cliente FROM pago);`
  },
  {
    id: '1.4.5-3',
    category: '1.4.5 Multitabla (Interna)',
    question: '3. Clientes sin pagos, representante y oficina.',
    sql: `SELECT c.nombre_cliente, e.nombre AS representante, o.ciudad AS ciudad_oficina
FROM cliente c
INNER JOIN empleado e ON c.codigo_empleado_rep_ventas = e.codigo_empleado
INNER JOIN oficina o ON e.codigo_oficina = o.codigo_oficina
WHERE c.codigo_cliente NOT IN (SELECT codigo_cliente FROM pago);`
  },
  {
    id: '1.4.5-4',
    category: '1.4.5 Multitabla (Interna)',
    question: '4. Oficinas con clientes en Fuenlabrada.',
    sql: `SELECT DISTINCT o.linea_direccion1, o.ciudad
FROM oficina o
INNER JOIN empleado e ON o.codigo_oficina = e.codigo_oficina
INNER JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
WHERE c.ciudad = 'Fuenlabrada';`
  },
  {
    id: '1.4.5-5',
    category: '1.4.5 Multitabla (Interna)',
    question: '5. Clientes, representantes y ciudad oficina.',
    sql: `SELECT c.nombre_cliente, e.nombre AS representante, o.ciudad
FROM cliente c
INNER JOIN empleado e ON c.codigo_empleado_rep_ventas = e.codigo_empleado
INNER JOIN oficina o ON e.codigo_oficina = o.codigo_oficina;`
  },
  {
    id: '1.4.5-6',
    category: '1.4.5 Multitabla (Interna)',
    question: '6. Empleados y sus jefes.',
    sql: `SELECT e.nombre AS empleado, j.nombre AS jefe
FROM empleado e
INNER JOIN empleado j ON e.codigo_jefe = j.codigo_empleado;`
  },
  {
    id: '1.4.5-7',
    category: '1.4.5 Multitabla (Interna)',
    question: '7. Empleados, jefes y jefes de jefes.',
    sql: `SELECT e.nombre AS empleado, j.nombre AS jefe, k.nombre AS jefe_del_jefe
FROM empleado e
INNER JOIN empleado j ON e.codigo_jefe = j.codigo_empleado
INNER JOIN empleado k ON j.codigo_jefe = k.codigo_empleado;`
  },
  {
    id: '1.4.5-8',
    category: '1.4.5 Multitabla (Interna)',
    question: '8. Clientes con pedidos atrasados.',
    sql: `SELECT DISTINCT c.nombre_cliente
FROM cliente c
INNER JOIN pedido p ON c.codigo_cliente = p.codigo_cliente
WHERE p.fecha_entrega > p.fecha_esperada;`
  },
  {
    id: '1.4.5-9',
    category: '1.4.5 Multitabla (Interna)',
    question: '9. Gamas de producto compradas por cliente.',
    sql: `SELECT DISTINCT c.nombre_cliente, pr.gama
FROM cliente c
INNER JOIN pedido p ON c.codigo_cliente = p.codigo_cliente
INNER JOIN detalle_pedido dp ON p.codigo_pedido = dp.codigo_pedido
INNER JOIN producto pr ON dp.codigo_producto = pr.codigo_producto;`
  },

  // 1.4.6 Consultas multitabla (Composición externa)
  {
    id: '1.4.6-1',
    category: '1.4.6 Multitabla (Externa)',
    question: '1. Clientes que no han realizado pagos.',
    sql: `SELECT c.nombre_cliente
FROM cliente c
LEFT JOIN pago p ON c.codigo_cliente = p.codigo_cliente
WHERE p.codigo_cliente IS NULL;`
  },
  {
    id: '1.4.6-2',
    category: '1.4.6 Multitabla (Externa)',
    question: '2. Clientes sin pagos y sin pedidos.',
    sql: `SELECT c.nombre_cliente
FROM cliente c
LEFT JOIN pago p ON c.codigo_cliente = p.codigo_cliente
LEFT JOIN pedido pe ON c.codigo_cliente = pe.codigo_cliente
WHERE p.codigo_cliente IS NULL AND pe.codigo_cliente IS NULL;`
  },
  {
    id: '1.4.6-3',
    category: '1.4.6 Multitabla (Externa)',
    question: '3. Empleados sin oficina asociada.',
    sql: `SELECT e.nombre
FROM empleado e
LEFT JOIN oficina o ON e.codigo_oficina = o.codigo_oficina
WHERE o.codigo_oficina IS NULL;`
  },
  {
    id: '1.4.6-4',
    category: '1.4.6 Multitabla (Externa)',
    question: '4. Empleados sin cliente asociado.',
    sql: `SELECT e.nombre, e.apellido1
FROM empleado e
LEFT JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
WHERE c.codigo_cliente IS NULL;`
  },
  {
    id: '1.4.6-5',
    category: '1.4.6 Multitabla (Externa)',
    question: '5. Empleados sin cliente y datos de su oficina.',
    sql: `SELECT e.nombre, e.apellido1, o.ciudad, o.linea_direccion1
FROM empleado e
LEFT JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
INNER JOIN oficina o ON e.codigo_oficina = o.codigo_oficina
WHERE c.codigo_cliente IS NULL;`
  },
  {
    id: '1.4.6-6',
    category: '1.4.6 Multitabla (Externa)',
    question: '6. Empleados sin oficina o sin cliente.',
    sql: `SELECT e.nombre, e.apellido1
FROM empleado e
LEFT JOIN oficina o ON e.codigo_oficina = o.codigo_oficina
LEFT JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
WHERE o.codigo_oficina IS NULL OR c.codigo_cliente IS NULL;`
  },
  {
    id: '1.4.6-7',
    category: '1.4.6 Multitabla (Externa)',
    question: '7. Productos nunca pedidos.',
    sql: `SELECT p.nombre
FROM producto p
LEFT JOIN detalle_pedido dp ON p.codigo_producto = dp.codigo_producto
WHERE dp.codigo_producto IS NULL;`
  },
  {
    id: '1.4.6-8',
    category: '1.4.6 Multitabla (Externa)',
    question: '8. Productos nunca pedidos (detalle).',
    sql: `SELECT p.nombre, p.descripcion, p.gama
FROM producto p
LEFT JOIN detalle_pedido dp ON p.codigo_producto = dp.codigo_producto
WHERE dp.codigo_producto IS NULL;`
  },
  {
    id: '1.4.6-9',
    category: '1.4.6 Multitabla (Externa)',
    question: '9. Oficinas sin empleados que vendieran Frutales.',
    sql: `SELECT DISTINCT o.codigo_oficina, o.ciudad
FROM oficina o
WHERE o.codigo_oficina NOT IN (
    SELECT DISTINCT e.codigo_oficina
    FROM empleado e
    JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
    JOIN pedido p ON c.codigo_cliente = p.codigo_cliente
    JOIN detalle_pedido dp ON p.codigo_pedido = dp.codigo_pedido
    JOIN producto pr ON dp.codigo_producto = pr.codigo_producto
    WHERE pr.gama = 'Frutales'
);`
  },
  {
    id: '1.4.6-10',
    category: '1.4.6 Multitabla (Externa)',
    question: '10. Clientes con pedidos pero sin pagos.',
    sql: `SELECT DISTINCT c.nombre_cliente
FROM cliente c
INNER JOIN pedido p ON c.codigo_cliente = p.codigo_cliente
LEFT JOIN pago pa ON c.codigo_cliente = pa.codigo_cliente
WHERE pa.codigo_cliente IS NULL;`
  },
  {
    id: '1.4.6-11',
    category: '1.4.6 Multitabla (Externa)',
    question: '11. Empleados sin clientes y nombre de su jefe.',
    sql: `SELECT e.nombre AS empleado, j.nombre AS jefe
FROM empleado e
LEFT JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
LEFT JOIN empleado j ON e.codigo_jefe = j.codigo_empleado
WHERE c.codigo_cliente IS NULL;`
  },

  // 1.4.7 Consultas resumen
  {
    id: '1.4.7-1',
    category: '1.4.7 Consultas Resumen',
    question: '1. ¿Cuántos empleados hay en la compañía?',
    sql: 'SELECT COUNT(*) as total_empleados FROM empleado;'
  },
  {
    id: '1.4.7-2',
    category: '1.4.7 Consultas Resumen',
    question: '2. ¿Cuántos clientes tiene cada país?',
    sql: 'SELECT pais, COUNT(*) as total FROM cliente GROUP BY pais;'
  },
  {
    id: '1.4.7-3',
    category: '1.4.7 Consultas Resumen',
    question: '3. Pago medio en 2009.',
    sql: 'SELECT AVG(total) as pago_medio FROM pago WHERE YEAR(fecha_pago) = 2009;'
  },
  {
    id: '1.4.7-4',
    category: '1.4.7 Consultas Resumen',
    question: '4. Pedidos por estado (descendente).',
    sql: 'SELECT estado, COUNT(*) as num_pedidos FROM pedido GROUP BY estado ORDER BY num_pedidos DESC;'
  },
  {
    id: '1.4.7-5',
    category: '1.4.7 Consultas Resumen',
    question: '5. Precio producto más caro y más barato.',
    sql: 'SELECT MAX(precio_venta) as max_precio, MIN(precio_venta) as min_precio FROM producto;'
  },
  {
    id: '1.4.7-6',
    category: '1.4.7 Consultas Resumen',
    question: '6. Clientes en Madrid.',
    sql: "SELECT COUNT(*) FROM cliente WHERE ciudad = 'Madrid';"
  },
  {
    id: '1.4.7-7',
    category: '1.4.7 Consultas Resumen',
    question: '7. Clientes en ciudades que empiezan por M.',
    sql: "SELECT ciudad, COUNT(*) FROM cliente WHERE ciudad LIKE 'M%' GROUP BY ciudad;"
  },
  {
    id: '1.4.7-8',
    category: '1.4.7 Consultas Resumen',
    question: '8. Representantes y número de clientes.',
    sql: `SELECT e.nombre, COUNT(c.codigo_cliente) as num_clientes
FROM empleado e
LEFT JOIN cliente c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
GROUP BY e.codigo_empleado, e.nombre;`
  },
  {
    id: '1.4.7-9',
    category: '1.4.7 Consultas Resumen',
    question: '9. Clientes sin representante asignado.',
    sql: 'SELECT COUNT(*) FROM cliente WHERE codigo_empleado_rep_ventas IS NULL;'
  },
  {
    id: '1.4.7-10',
    category: '1.4.7 Consultas Resumen',
    question: '10. Primer y último pago por cliente.',
    sql: `SELECT c.nombre_cliente, MIN(p.fecha_pago) as primer_pago, MAX(p.fecha_pago) as ultimo_pago
FROM cliente c
INNER JOIN pago p ON c.codigo_cliente = p.codigo_cliente
GROUP BY c.codigo_cliente, c.nombre_cliente;`
  },
  {
    id: '1.4.7-11',
    category: '1.4.7 Consultas Resumen',
    question: '11. Cantidad total de productos por pedido.',
    sql: 'SELECT codigo_pedido, SUM(cantidad) as total_productos FROM detalle_pedido GROUP BY codigo_pedido;'
  },
  {
    id: '1.4.7-12',
    category: '1.4.7 Consultas Resumen',
    question: '12. Top 20 productos más vendidos.',
    sql: `SELECT p.nombre, SUM(dp.cantidad) as total_vendido
FROM producto p
INNER JOIN detalle_pedido dp ON p.codigo_producto = dp.codigo_producto
GROUP BY p.codigo_producto, p.nombre
ORDER BY total_vendido DESC
LIMIT 20;`
  },
  {
    id: '1.4.7-13',
    category: '1.4.7 Consultas Resumen',
    question: '13. Facturación histórica (Base, IVA, Total).',
    sql: `SELECT 
  SUM(cantidad * precio_unidad) as base_imponible,
  SUM(cantidad * precio_unidad) * 0.21 as iva,
  SUM(cantidad * precio_unidad) * 1.21 as total_facturado
FROM detalle_pedido;`
  },
  {
    id: '1.4.7-14',
    category: '1.4.7 Consultas Resumen',
    question: '14. Ventas > 3000 con impuestos.',
    sql: `SELECT 
  p.nombre, 
  SUM(dp.cantidad) as unidades, 
  SUM(dp.cantidad * dp.precio_unidad) as total, 
  SUM(dp.cantidad * dp.precio_unidad) * 1.21 as total_con_impuestos
FROM producto p
INNER JOIN detalle_pedido dp ON p.codigo_producto = dp.codigo_producto
GROUP BY p.codigo_producto, p.nombre
HAVING total > 3000;`
  },
  {
    id: '1.4.7-15',
    category: '1.4.7 Consultas Resumen',
    question: '15. Suma total de pagos por año.',
    sql: 'SELECT YEAR(fecha_pago) as año, SUM(total) as total_pagos FROM pago GROUP BY YEAR(fecha_pago);'
  },

  // 1.4.8 Subconsultas
  {
    id: '1.4.8-1',
    category: '1.4.8 Subconsultas (Básicas)',
    question: '1. Cliente con mayor límite de crédito.',
    sql: 'SELECT nombre_cliente FROM cliente WHERE limite_credito = (SELECT MAX(limite_credito) FROM cliente);'
  },
  {
    id: '1.4.8-2',
    category: '1.4.8 Subconsultas (Básicas)',
    question: '2. Producto con precio más caro.',
    sql: 'SELECT nombre FROM producto WHERE precio_venta = (SELECT MAX(precio_venta) FROM producto);'
  },
  {
    id: '1.4.8-3',
    category: '1.4.8 Subconsultas (Básicas)',
    question: '3. Producto más vendido (unidades).',
    sql: `SELECT nombre FROM producto WHERE codigo_producto = (
  SELECT codigo_producto FROM detalle_pedido GROUP BY codigo_producto ORDER BY SUM(cantidad) DESC LIMIT 1
);`
  },
  {
    id: '1.4.8-4',
    category: '1.4.8 Subconsultas (Básicas)',
    question: '4. Clientes con límite mayor que sus pagos.',
    sql: `SELECT nombre_cliente 
FROM cliente 
WHERE limite_credito > (
  SELECT IFNULL(SUM(total),0) FROM pago WHERE pago.codigo_cliente = cliente.codigo_cliente
);`
  },
  {
    id: '1.4.8-5',
    category: '1.4.8 Subconsultas (Básicas)',
    question: '5. Producto con más stock.',
    sql: 'SELECT nombre FROM producto WHERE cantidad_en_stock = (SELECT MAX(cantidad_en_stock) FROM producto);'
  },
  
  // 1.4.8.2 Subconsultas con ALL y ANY (Simulated with MAX/MIN for SQLite)
  {
    id: '1.4.8-2-8',
    category: '1.4.8 Subconsultas (ALL/ANY)',
    question: '8. Cliente con mayor límite de crédito (Equiv. >= ALL).',
    sql: 'SELECT nombre_cliente FROM cliente WHERE limite_credito >= (SELECT MAX(limite_credito) FROM cliente);'
  },
  {
    id: '1.4.8-2-9',
    category: '1.4.8 Subconsultas (ALL/ANY)',
    question: '9. Producto más caro (Equiv. >= ALL).',
    sql: 'SELECT nombre FROM producto WHERE precio_venta >= (SELECT MAX(precio_venta) FROM producto);'
  },
  {
    id: '1.4.8-2-10',
    category: '1.4.8 Subconsultas (ALL/ANY)',
    question: '10. Producto con menos stock (Equiv. <= ALL).',
    sql: 'SELECT nombre FROM producto WHERE cantidad_en_stock <= (SELECT MIN(cantidad_en_stock) FROM producto);'
  },

  // 1.4.8.3 Subconsultas con IN y NOT IN
  {
    id: '1.4.8-3-11',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '11. Empleados que no representan a nadie.',
    sql: `SELECT nombre, apellido1, puesto FROM empleado 
WHERE codigo_empleado NOT IN (SELECT DISTINCT codigo_empleado_rep_ventas FROM cliente WHERE codigo_empleado_rep_ventas IS NOT NULL);`
  },
  {
    id: '1.4.8-3-12',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '12. Clientes que NO han realizado pagos.',
    sql: 'SELECT nombre_cliente FROM cliente WHERE codigo_cliente NOT IN (SELECT DISTINCT codigo_cliente FROM pago);'
  },
  {
    id: '1.4.8-3-13',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '13. Clientes que SÍ han realizado pagos.',
    sql: 'SELECT nombre_cliente FROM cliente WHERE codigo_cliente IN (SELECT DISTINCT codigo_cliente FROM pago);'
  },
  {
    id: '1.4.8-3-14',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '14. Productos nunca pedidos.',
    sql: 'SELECT nombre FROM producto WHERE codigo_producto NOT IN (SELECT DISTINCT codigo_producto FROM detalle_pedido);'
  },
  {
    id: '1.4.8-3-15',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '15. Datos empleados no representantes y datos oficina.',
    sql: `SELECT e.nombre, e.apellido1, e.puesto, o.telefono 
FROM empleado e 
JOIN oficina o ON e.codigo_oficina = o.codigo_oficina
WHERE e.codigo_empleado NOT IN (SELECT DISTINCT codigo_empleado_rep_ventas FROM cliente WHERE codigo_empleado_rep_ventas IS NOT NULL);`
  },
  {
    id: '1.4.8-3-16',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '16. Oficinas sin empleados que vendieron Frutales.',
    sql: `SELECT * FROM oficina WHERE codigo_oficina NOT IN (
    SELECT DISTINCT e.codigo_oficina
    FROM empleado e
    WHERE e.codigo_empleado IN (
        SELECT c.codigo_empleado_rep_ventas
        FROM cliente c
        WHERE c.codigo_cliente IN (
            SELECT p.codigo_cliente
            FROM pedido p
            WHERE p.codigo_pedido IN (
                SELECT dp.codigo_pedido
                FROM detalle_pedido dp
                WHERE dp.codigo_producto IN (
                    SELECT pr.codigo_producto FROM producto pr WHERE pr.gama = 'Frutales'
                )
            )
        )
    )
);`
  },
  {
    id: '1.4.8-3-17',
    category: '1.4.8 Subconsultas (IN/NOT IN)',
    question: '17. Clientes con pedidos pero sin pagos.',
    sql: `SELECT nombre_cliente FROM cliente 
WHERE codigo_cliente IN (SELECT DISTINCT codigo_cliente FROM pedido) 
AND codigo_cliente NOT IN (SELECT DISTINCT codigo_cliente FROM pago);`
  },

  // 1.4.8.4 Subconsultas con EXISTS y NOT EXISTS
  {
    id: '1.4.8-4-18',
    category: '1.4.8 Subconsultas (EXISTS)',
    question: '18. Clientes sin pagos (NOT EXISTS).',
    sql: `SELECT nombre_cliente FROM cliente c 
WHERE NOT EXISTS (SELECT 1 FROM pago p WHERE p.codigo_cliente = c.codigo_cliente);`
  },
  {
    id: '1.4.8-4-19',
    category: '1.4.8 Subconsultas (EXISTS)',
    question: '19. Clientes con pagos (EXISTS).',
    sql: `SELECT nombre_cliente FROM cliente c 
WHERE EXISTS (SELECT 1 FROM pago p WHERE p.codigo_cliente = c.codigo_cliente);`
  },
  {
    id: '1.4.8-4-20',
    category: '1.4.8 Subconsultas (EXISTS)',
    question: '20. Productos nunca pedidos (NOT EXISTS).',
    sql: `SELECT nombre FROM producto p 
WHERE NOT EXISTS (SELECT 1 FROM detalle_pedido dp WHERE dp.codigo_producto = p.codigo_producto);`
  }
];