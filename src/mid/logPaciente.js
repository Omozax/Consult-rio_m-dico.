const { consultas, consultasFinalizadas } = require("../bancodedados");
const procurar = require("./procurar");

const LogPaciente = (req, res, next) => {
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

  // Verifique se a requisição possui um corpo válido
  if (nome && cpf && dataNascimento && celular && email && senha) {
    // Verifique se o CPF ou email já está vinculado a uma consulta não finalizada
    if (
      consultas.some(
        (consulta) =>
          consulta.paciente.cpf === cpf &&
          !consultasFinalizadas.includes(consulta)
      ) ||
      consultas.some(
        (consulta) =>
          consulta.paciente.email === email &&
          !consultasFinalizadas.includes(consulta)
      )
    ) {
      return res.status(400).json({
        mensagem:
          "Já existe uma consulta em andamento com o CPF ou e-mail informado!",
      });
    }
    next();
  } else {
    return res.status(400).json({
      mensagem: "O corpo da requisição não possui os campos obrigatórios.",
    });
  }
};

module.exports = LogPaciente;
