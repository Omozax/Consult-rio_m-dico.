const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const procurar = require("../modelos/index");
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

const listarLaudoConsulta = async (req, res) => {
  const { identificador_consulta } = req.query;

  if (!identificador_consulta) {
    return res.status(400).json({
      mensagem: "Identificador da consulta é obrigatório.",
    });
  }

  // Verificar se existe um laudo para a consulta
  const laudo = procurar(
    identificador_consulta,
    laudos,
    "identificadorConsulta"
  );

  if (!laudo) {
    return res
      .status(404)
      .json({ mensagem: "Laudo não encontrado para a consulta." });
  }

  return res.status(200).json(laudo);
};

const listarConsultasMedico = async (req, res) => {
  const { identificador_medico } = req.query;

  if (!identificador_medico) {
    return res.status(400).json({
      mensagem: "Identificador do médico é obrigatório.",
    });
  }

  const medico = procurar(
    identificador_medico,
    consultorio.medicos,
    "identificador"
  );

  if (!medico) {
    return res.status(404).json({
      mensagem: "Médico não encontrado.",
    });
  }

  const consultasMedico = consultas.filter((consulta) => {
    return consulta.identificadorMedico === medico.identificador;
  });

  if (consultasMedico.length === 0) {
    return res.status(404).json({
      mensagem: "Nenhuma consulta encontrada para o médico informado.",
    });
  }

  return res.status(200).json(consultasMedico);
};

module.exports = {
  listarConsultas,
  listarLaudoConsulta,
  listarConsultasMedico,
};
