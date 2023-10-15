const {
  consultas,
  consultasFinalizadas,
  laudos,
  consultorio,
} = require("../bancodedados");
const { paciente, procurar } = require("../mid");
const fs = require("fs");
const path = require("path");
const finalizarConsulta = require("./finalizar");

const atualizarConsulta = (req, res) => {
  const { consulta } = req;
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return res.status(400).json({
      mensagem:
        "O corpo da requisição não possui todos os campos obrigatórios.",
    });
  }

  const cpfExistente = procurar(cpf, consultas, "paciente.cpf");
  if (
    cpfExistente &&
    cpfExistente.identificadorConsulta !== consulta.identificadorConsulta
  ) {
    return res.status(400).json({ mensagem: "CPF já consta na base!" });
  }

  const emailExistente = procurar(email, consultas, "paciente.email");
  if (
    emailExistente &&
    emailExistente.identificadorConsulta !== consulta.identificadorConsulta
  ) {
    return res.status(400).json({ mensagem: "E-mail já consta na base!" });
  }

  consulta.paciente = {
    nome,
    cpf,
    dataNascimento,
    celular,
    email,
    senha,
  };

  res.status(204).send();
};

module.exports = atualizarConsulta;
