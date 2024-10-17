import mssql from "mssql";
import { getConnection, sql } from "../helpers/connection.js";

export const selectEvents = async ({ usuarioID }) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("UsuarioID", sql.Int, usuarioID)
      .execute("spObtenerEventos");
    return result;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Error fetching events: " + error.message);
  }
};

export const insertEvent = async ({ usuarioID, titulo, descripcion, fechaInicio, fechaFin, esTodoElDia }) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("UsuarioID", sql.Int, usuarioID)
      .input("Titulo", sql.NVarChar(255), titulo)
      .input("Descripcion", sql.NVarChar(1000), descripcion)
      .input("FechaInicio", sql.DateTime, fechaInicio)
      .input("FechaFin", sql.DateTime, fechaFin)
      .input("EsTodoElDia", sql.Bit, esTodoElDia)
      .execute("spInsertarEvento");
    return result;
  } catch (error) {
    console.error("Error inserting event:", error);
    throw new Error("Error inserting event: " + error.message);
  }
};

export const updateEventDB = async ({ eventoID, usuarioID, titulo, descripcion, fechaInicio, fechaFin, esTodoElDia }) => {
  try {
    const pool = await getConnection();
    await pool.request()
      .input("EventoID", sql.Int, eventoID)
      .input("UsuarioID", sql.Int, usuarioID)
      .input("Titulo", sql.NVarChar(255), titulo)
      .input("Descripcion", sql.NVarChar(1000), descripcion)
      .input("FechaInicio", sql.DateTime, fechaInicio)
      .input("FechaFin", sql.DateTime, fechaFin)
      .input("EsTodoElDia", sql.Bit, esTodoElDia)
      .execute("spActualizarEvento");
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Error updating event: " + error.message);
  }
};

export const deleteEventDB = async ({ eventoID }) => {
  try {
    const pool = await getConnection();
    await pool.request()
      .input("EventoID", sql.Int, eventoID)
      .execute("spEliminarEvento");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Error deleting event: " + error.message);
  }
};
