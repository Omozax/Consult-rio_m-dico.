const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const { LogPaciente } = require("../mid/log");
const procurar = require("../mid/procurar");

const fs = require("fs");
const path = require("path");

//////////////////////////////////////////////////
const criarConsulta = async (req, res) => {
  const { tipoConsulta, valorConsulta, cpf } = req.body;
  const paciente = LogPaciente(req.body);

  if (
    !tipoConsulta ||
    !valorConsulta ||
    typeof valorConsulta !== "number" ||
    paciente === null
  ) {
    return res.status(400).json({ mensagem: "Dados de consulta inválidos" });
  }

  console.log("criarconta/1");
  const medicoDisponivel = procurar(
    tipoConsulta,
    consultorio.medicos,
    "especialidade"
  );

  const cpfDuplicado = consultas.some(
    (consulta) =>
      consulta.paciente && consulta.paciente.cpf === cpf && !consulta.finalizada
  );

  if (!medicoDisponivel) {
    return res.status(400).json({
      mensagem: "Não há médico com a especialidade necessária para a consulta.",
    });
  } else if (cpfDuplicado) {
    return res.status(400).json({
      mensagem: "Já existe uma consulta em andamento com o CPF informado!",
    });
  } else {
    const novaConsulta = {
      identificadorConsulta: consultas.length + 1,
      tipoConsulta,
      valorConsulta,
      identificadorMedico: medicoDisponivel.identificador,
      paciente,
      finalizada: false,
    };
    console.log(novaConsulta);
    consultas.push(novaConsulta);

    return res.status(201).json({ mensagem: "Consulta criada com sucesso" });
  }
  console.log("controlador/criarconta2");
};

//////////////////////////////////////////////////
const atualizarConsulta = async (req, res) => {
  const { identificadorConsulta } = req.params;
  console.log("atualiza/0", identificadorConsulta, "req: ", req.body); ////////
  const consulta = procurar(
    identificadorConsulta,
    consultas,
    "identificadorConsulta",
    true
  );

  console.log("atualiza/1", identificadorConsulta, consulta);

  if (consulta !== null) {
    if (consulta.finalizada === true) {
      console.log("atualiza/2", consulta); ///////////
      return res.status(400).json({
        mensagem: "A consulta está finalizada e não pode ser atualizada.",
      });
    }

    const pacienteAtualizado = LogPaciente(req.body);

    if (pacienteAtualizado === null) {
      console.log("atualiza/3", pacienteAtualizado);
      return res.status(400).json({
        mensagem: "Campos obrigatórios faltando no corpo da requisição.",
      });
    }

    // Atualize os campos da consulta com base nos dados do paciente atualizado
    for (const campo in pacienteAtualizado) {
      if (pacienteAtualizado[campo]) {
        consulta.paciente[campo] = pacienteAtualizado[campo];
      }
    }

    return res.status(204).send(); // 204 significa "No Content" para uma atualização bem-sucedida.
  } else {
    return res.status(404).json({ mensagem: "Consulta não encontrada." });
  }
};

//////////////////////////////////////////////////
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

//////////////////////////////////////////////////
const finalizarConsulta = async (req, res) => {
  const { identificadorConsulta, textoMedico } = req.body;

  if (!identificadorConsulta || !textoMedico) {
    return res.status(400).json({ mensagem: "Dados obrigatórios faltando" });
  }

  const consultaEncontrada = procurar(identificadorConsulta, consultas);
  if (consultaEncontrada === null) {
    return res.status(400).json({ mensagem: "Consulta não encontrada" });
  }

  const consultaFinalizada = procurar(
    identificadorConsulta,
    consultasFinalizadas
  );
  if (consultaFinalizada !== null) {
    return res.status(400).json({ mensagem: "A consulta já está finalizada" });
  }

  if (textoMedico.length === 0 || textoMedico.length > 200) {
    return res.status(400).json({
      mensagem: "O tamanho do textoMedico não está dentro do esperado",
    });
  }

  const consulta_Finalizada = {
    identificadorConsulta: consultasFinalizadas.length + 1,
    tipoConsulta: consultaEncontrada.tipoConsulta,
    valorConsulta: consultaEncontrada.valorConsulta,
    identificadorMedico: consultaEncontrada.identificadorMedico,
    paciente: consultaEncontrada.paciente,
    finalizada: true,
    identificadorLaudo: laudos.length + 1,
  };

  consultasFinalizadas.push(consulta_Finalizada);

  const laudo = {
    identificador: laudos.length + 1,
    identificadorConsulta,
    identificadorMedico: consultaEncontrada.identificadorMedico,
    textoMedico,
    paciente: consultaEncontrada.paciente,
  };

  laudos.push(laudo);

  res.status(201).json(consulta_Finalizada);
};

module.exports = {
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
  finalizarConsulta,
};
