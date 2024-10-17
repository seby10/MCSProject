import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const wwwrouter = express.Router();

wwwrouter.use("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "contact.html"));
});

wwwrouter.use("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "index.html"));
});

wwwrouter.use("/propuestas_candidato1", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "propuestas_candidato1.html"));
});

wwwrouter.use("/propuestas_candidato2", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "propuestas_candidato2.html"));
});

wwwrouter.use("/propuestas_candidato3", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "propuestas_candidato3.html"));
});

wwwrouter.use("/calendar", function (req, res) {
  res.sendFile(path.join(__dirname, "../wwwroot", "calendar.html"));
});

export default wwwrouter;
