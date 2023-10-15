const { consultas, consultasFinalizadas } = require("../bancodedados");
const fs = require("fs");
const path = require("path");

const excluirConsulta = async (req, res) => {
  const { identificadorConsulta } = req.query;
  const consultaParaExcluir = procurar(
    identificadorConsulta,
    consultas.identificadorConsulta
  );

  if (consultaParaExcluir) {
    if (consultaParaExcluir.finalizada === false) {
      const index = consultas.indexOf(consultaParaExcluir);
      if (index !== -1) {
        consultas.splice(index, 1);
        return res.status(204).send();
      } else {
        return res.status(500).json({
          mensagem: "Erro interno ao excluir a consulta",
        });
      }
    } else {
      return res.status(400).json({
        mensagem:
          "A consulta só pode ser removida se a mesma não estiver finalizada",
      });
    }
  } else {
    return res.status(404).json({
      mensagem: "Consulta não encontrada",
    });
  }
};

module.exports = excluirConsulta;
