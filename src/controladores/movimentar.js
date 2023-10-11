const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const fs = require("fs");
const path = require("path");

const criarConsulta = async (req, res) => {
  const { tipoConsulta, valorConsulta, cpf } = req.body;

  if (tipoConsulta && valorConsulta && typeof valorConsulta === "number") {
    if (
      !consultas.find(
        (consulta) => consulta.usuario.cpf === cpf && !consulta.finalizada
      )
    ) {
      const novaConsulta = {
        numero: consultas.length + 1,
        paciente: req.body,
      };

      consultas.push(novaConsulta);

      salvarDados();

      return res.status(201).json(novaConsulta);
    } else {
      return res.status(400).json({
        mensagem: "Já existe uma consulta em andamento com o cpf informado!",
      });
    }
  } else {
    return res.status(400).json({ mensagem: "Dados de consulta inválidos" });
  }
};

const atualizarConsulta = async (req, res) => {};

const excluirConsulta = async (req, res) => {};

const finalizarConsulta = async (req, res) => {};

module.exports = {
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
  finalizarConsulta,
};
