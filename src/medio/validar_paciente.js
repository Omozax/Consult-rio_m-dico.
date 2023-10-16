const { consultas, consultasFinalizadas } = require("../bancodedados");
const procurar = require("../modelos/procurar");

const validar_paciente = (req, res, next) => {
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

  // Verifique se a requisição possui um corpo válido
  if (nome && cpf && dataNascimento && celular && email && senha) {
    next();
  } else {
    return res.status(400).json({
      mensagem: "O corpo da requisição não possui os campos obrigatórios.",
    });
  }
};

module.exports = validar_paciente;
