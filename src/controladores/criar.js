const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const { procurar } = require("../mid");

const criarConsulta = async (req, res) => {
  const { tipoConsulta, valorConsulta } = req.body;

  if (!tipoConsulta || !valorConsulta || typeof valorConsulta !== "number") {
    return res.status(400).json({ mensagem: "Dados de consulta faltando" });
  }

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

  const paciente = req.paciente;

  if (!paciente) {
    return res
      .status(400)
      .json({ mensagem: "Paciente não encontrado na requisição." });
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
