import mysql from 'mysql2/promise';

export const getConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',        
    user: 'root',       
    password: '', 
    database: 'elecciones2024', 
    port:3307,
  });
};

