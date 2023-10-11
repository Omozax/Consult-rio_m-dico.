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
    const medicoDisponivel = consultorio.medicos.find(
      (medico) => medico.especialidade === tipoConsulta
    );

    if (medicoDisponivel) {
      if (
        !consultas.find(
          (consulta) => consulta.paciente.cpf === cpf && !consulta.finalizada
        )
      ) {
        const novoIDConsulta = consultas.length + 1;

        const novaConsulta = {
          identificador: novoIDConsulta,
          tipoConsulta,
          valorConsulta,
          paciente: LogPaciente(req),
          identificadorMedico: medicos.identificador,
        };

        consultas.push(novaConsulta);

        salvarDados();

        return res.status(201).json(novaConsulta);
      } else {
        return res.status(400).json({
          mensagem: "Já existe uma consulta em andamento com o CPF informado!",
        });
      }
    } else {
      return res.status(400).json({
        mensagem:
          "Não há médico com a especialidade necessária para a consulta.",
      });
    }
  } else {
    return res.status(400).json({ mensagem: "Dados de consulta inválidos" });
  }
};

const atualizarConsulta = async (req, res) => {};

const excluirConsulta = async (req, res) => {};

const finalizarConsulta = async (req, res) => {
  const { identificadorConsulta, textoMedico } = req.body;

  const consultaFinalizadaEncontrada = consultasFinalizadas.find(
    (consulta) => consulta.identificadorConsulta === identificadorConsulta
  );
  if (
    consultaFinalizadaEncontrada === undefined &&
    textoMedico.length > 0 &&
    textoMedico.length <= 200
  ) {
    const identificador = consultas.find(
      (consulta) => consulta.identificador === identificadorConsulta
    );

    const consultaFinalizada = {
      identificador: consultasFinalizadas.length + 1,
      tipoConsulta: identificador.tipoConsulta,
      //identificadorMedico:
      //finalizada:
      //identificadorLaudo:
      //valorConsulta:
      //paciente:
    };

    consultasFinalizadas.push();
  }
};

module.exports = {
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
  finalizarConsulta,
};
