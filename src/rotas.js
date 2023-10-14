const express = require("express");
const rotas = express.Router();
const {
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
  finalizarConsulta,
} = require("./controladores/movimentar");
const { listarConsultas } = require("./controladores/listar");

rotas.get("/consultas", listarConsultas);
rotas.post("/consultas", criarConsulta);
rotas.put("/consultas/:identificadorConsulta", atualizarConsulta);
rotas.delete("/consultas/:identificadorConsulta", excluirConsulta);
rotas.post("/consultas/finalizar", finalizarConsulta);
//rotas.get("/laudos", listarLaudoConsulta);
//rotas.get("/consultas/medico", listarConsultasMedico);

module.exports = rotas;
