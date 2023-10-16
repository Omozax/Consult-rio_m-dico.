const atualizar = require("./atualizar");
const criar = require("./criar");
const excluir = require("./excluir");
const finalizar = require("./finalizar");
const {
  listarConsultas,
  listarLaudoConsulta,
  listarConsultasMedico,
} = require("./listar");

module.exports = {
  atualizar,
  criar,
  excluir,
  finalizar,
  listarConsultas,
  listarLaudoConsulta,
  listarConsultasMedico,
};
