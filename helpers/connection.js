import mysql from 'mysql2/promise';

export const getConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',        // Cambia si no es localhost
    user: 'root',       // Usuario de MySQL
    password: '', // Contraseña de MySQL
    database: 'elecciones2024', // Nombre de la base de datos
  });
};
