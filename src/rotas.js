const express = require("express");
const rotas = express.Router();
const {
  atualizar,
  criar,
  excluir,
  finalizar,
  listarConsultas,
  listarLaudoConsulta,
  listarConsultasMedico,
} = require("./controladores");
const { paciente, senha, consulta } = require("./medio");

rotas.post("/consultas", paciente, criar);
rotas.put("/consultas/:identificadorConsulta", paciente, consulta, atualizar);
rotas.delete("/consultas/:identificadorConsulta", consulta, excluir);
rotas.post("/consultas/finalizar", finalizar);
rotas.get("/consultas", listarConsultas);
rotas.get("/consulta/laudo", senha, consulta, listarLaudoConsulta);
rotas.get("/consultas/medico", listarConsultasMedico);

module.exports = rotas;
