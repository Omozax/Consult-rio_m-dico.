const express = require("express");
const rotas = express.Router();
const {
  atualizar,
  criar,
  excluir,
  finalizar,
  //listar,
} = require("./controladores");
const { paciente } = require("./mid");

rotas.post("/consultas", paciente, criar);
rotas.put("/consultas/:identificadorConsulta", paciente, atualizar);
rotas.delete("/consultas/:identificadorConsulta", excluir);
rotas.post("/consultas/finalizar", finalizar);
//rotas.get("/consultas", listar);
//rotas.get("/laudos", listarLaudoConsulta);
//rotas.get("/consultas/medico", listarConsultasMedico);

module.exports = rotas;
