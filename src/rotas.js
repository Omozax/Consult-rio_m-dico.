const express = require("express");
const rotas = express.Router();
const {} = require("");
const {
  listarConsultas,
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
  finalizarConsulta,
  listarLaudoConsulta,
  listarConsultasMedico,
} = require("./ctrl/controladores");

rotas.get("/consultas", listarConsultas);
rotas.post("/consultas", criarConsulta);
rotas.put("/consultas/:identificadorConsulta", atualizarConsulta);
rotas.delete("/consultas/:identificadorConsulta", excluirConsulta);
rotas.post("/consultas/finalizar", finalizarConsulta);
rotas.get("/laudos", listarLaudoConsulta);
rotas.get("/consultas/medico", listarConsultasMedico);

module.exports = rotas;
