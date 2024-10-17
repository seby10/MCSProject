import sql from "mssql";

const connectionSettings = {
  server: "localhost",
  database: "darliDB",
  user: "sa",
  password: "15abril2004",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    return await sql.connect(connectionSettings);
  } catch (error) {
    console.log(error);
  }
}

export { sql };