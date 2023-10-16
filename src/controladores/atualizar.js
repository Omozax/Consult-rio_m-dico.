const { consultas, consultasFinalizadas } = require("../bancodedados");
const procurar = require("../modelos/index");

const atualizarConsulta = (req, res) => {
  const { consulta } = req;
  const { cpf, email } = req.body;

  // Verifique se a consulta existe
  if (!consulta) {
    return res.status(404).json({ mensagem: "Consulta não encontrada." });
  }

  // Verifique se o CPF já está em uso
  const cpfExistente = procurar(cpf, consultas, "paciente.cpf");
  if (
    cpfExistente &&
    cpfExistente.identificadorConsulta !== consulta.identificadorConsulta
  ) {
    return res.status(400).json({ mensagem: "CPF já consta na base!" });
  }

  // Verifique se o E-mail já está em uso
  const emailExistente = procurar(email, consultas, "paciente.email");
  if (
    emailExistente &&
    emailExistente.identificadorConsulta !== consulta.identificadorConsulta
  ) {
    return res.status(400).json({ mensagem: "E-mail já consta na base!" });
  }

  // Atualize os dados do paciente na consulta
  consulta.paciente.cpf = cpf;
  consulta.paciente.email = email;

  res.status(204).send();
};

module.exports = atualizarConsulta;
