import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const wwwrouter = express.Router();

wwwrouter.use("/sugerencias", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "sugerencias.html"));
});

wwwrouter.use("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "index.html"));
});

wwwrouter.use("/propuestas", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "propuestas_candidatos.html"));
});

wwwrouter.use("/informacion", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "informacion_candidatos.html"));
});

wwwrouter.use("/eventos_noticias", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "eventos_noticias.html"));
});

export default wwwrouter;
