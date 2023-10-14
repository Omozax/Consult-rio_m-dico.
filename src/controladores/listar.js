const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const fs = require("fs");
const path = require("path");

const listarConsultas = async (req, res) => {
  const { cnes_consultorio, senha_consultorio } = req.query;

  if (!cnes_consultorio || !senha_consultorio) {
    return res
      .status(400)
      .json({ mensagem: "Por favor, informe todos os dados necessários." });
  }

  if (senha_consultorio !== consultorio.senha) {
    return res.status(401).json({ mensagem: "Cnes ou senha inválidos!" });
  }

  return res.status(200).json(consultas);
};

const listarLaudoConsulta = async (req, res) => {};

const listarConsultasMedico = async (req, res) => {};

module.exports = {
  listarConsultas,
  listarLaudoConsulta,
  listarConsultasMedico,
};
