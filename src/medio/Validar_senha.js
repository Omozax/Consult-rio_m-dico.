const { consultas, consultasFinalizadas, laudos } = require("../bancodedados");
const procurar = require("../modelos/procurar");

const validarSenha = (req, res, next) => {
  const { senha } = req.query;
  console.log(req.query);
  if (senha !== "1234") {
    return res.status(400).json({
      mensagem: "Senha invalída.",
    });
  }

  next();
};

module.exports = validarSenha;
