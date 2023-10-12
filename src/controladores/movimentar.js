const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const { LogPaciente, loglaudos } = require("./listar");
const fs = require("fs");
const path = require("path");

//////////////////////////////////////////////////
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
        const novaConsulta = {
          identificador: consultas.length + 1,
          tipoConsulta,
          valorConsulta,
          identificadorMedico: medicoDisponivel.identificador,
          paciente: LogPaciente(req.body),
          finalizada: false,
        };

        consultas.push(novaConsulta);

        return res.status(201);
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

//////////////////////////////////////////////////
const atualizarConsulta = async (req, res) => {
  const { identificador } = req.query;
  const id = procurar(identificador, consultas);

  if (id) {
    if (id.finalizada) {
      return res.status(400).json({
        mensagem: "A consulta está finalizada e não pode ser atualizada.",
      });
    }

    const pacienteAtualizado = LogPaciente(req.body);

    if (pacienteAtualizado === null) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios faltando no corpo da requisição.",
      });
    }

    for (const campo in pacienteAtualizado) {
      if (pacienteAtualizado[campo]) {
        id.paciente[campo] = pacienteAtualizado[campo];
      }
    }

    return res.status(204);
  } else {
    return res.status(404).json({ mensagem: "Consulta não encontrada." });
  }
};

//////////////////////////////////////////////////
const excluirConsulta = async (req, res) => {
  const { identificador } = req.query;
  const consultaParaExcluir = procurar(identificador, consultas);

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

//////////////////////////////////////////////////
const finalizarConsulta = async (req, res) => {
  const { identificadorConsulta, textoMedico } = req.body;

  if (!identificadorConsulta || !textoMedico) {
    return res.status(400).json({ mensagem: "Dados obrigatórios faltando" });
  }

  const consultaEncontrada = procurar(identificadorConsulta, consultas);
  if (!consultaEncontrada) {
    return res.status(400).json({ mensagem: "Consulta não encontrada" });
  }

  const consultaFinalizada = procurar(
    identificadorConsulta,
    consultasFinalizadas
  );
  if (consultaFinalizada) {
    return res.status(400).json({ mensagem: "A consulta já está finalizada" });
  }

  if (textoMedico.length === 0 || textoMedico.length > 200) {
    return res.status(400).json({
      mensagem: "O tamanho do textoMedico não está dentro do esperado",
    });
  }

  const medicoEspecializado = procurar(
    consultaEncontrada.tipoConsulta,
    consultorio.medicos
  );

  if (!medicoEspecializado) {
    return res.status(400).json({ mensagem: "Especialidade médica inválida" });
  }

  const consulta_Finalizada = {
    identificador: consultasFinalizadas.length + 1,
    tipoConsulta: consultaEncontrada.tipoConsulta,
    valorConsulta: consultaEncontrada.valorConsulta,
    identificadorMedico: medicoEspecializado.identificador,
    paciente: consultaEncontrada.paciente,
    finalizada: true,
    identificadorLaudo: laudos.length + 1,
  };

  consultasFinalizadas.push(consulta_Finalizada);

  const laudo = {
    identificador: laudos.length + 1,
    identificadorConsulta: identificadorConsulta,
    identificadorMedico: medicoEspecializado.identificador,
    textoMedico,
    paciente: consultaEncontrada.paciente,
  };

  laudos.push(laudo);

  res.status(201).json(consultaFinalizada);
};

module.exports = {
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
  finalizarConsulta,
};
