const {
  consultas,
  consultasFinalizadas,
  consultorio,
} = require("../bancodedados");
const procurar = require("../modelos/index");

const criarConsulta = async (req, res) => {
  const { tipoConsulta, valorConsulta, paciente } = req.body;

  if (!tipoConsulta || !valorConsulta || typeof valorConsulta !== "number") {
    return res
      .status(400)
      .json({ mensagem: "Dados de consulta faltando ou inválidos." });
  }

  // Verificar se o tipo da consulta existe nas especialidades dos médicos
  const medicoDisponivel = procurar(
    tipoConsulta,
    consultorio.medicos,
    "especialidade"
  );
  if (!medicoDisponivel) {
    return res.status(400).json({
      mensagem: "Não há médico com a especialidade necessária para a consulta.",
    });
  }

  const novaConsulta = {
    identificadorConsulta: consultas.length + 1,
    tipoConsulta,
    valorConsulta,
    identificadorMedico: medicoDisponivel.identificador,
    paciente,
    finalizada: false,
  };

  consultas.push(novaConsulta);

  return res.status(201).json({ mensagem: "Consulta criada com sucesso" });
};

module.exports = criarConsulta;
