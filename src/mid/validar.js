const { consultas } = require("../bancodedados");
const procurar = require("./procurar");

const validarConsulta = (req, res, next) => {
  const { identificadorConsulta } = req.params;

  const consulta = procurar(
    identificadorConsulta,
    consultas,
    "identificadorConsulta"
  );

  if (!consulta) {
    return res.status(404).json({ mensagem: "Consulta não encontrada." });
  }

  if (consulta.finalizada) {
    return res.status(400).json({
      mensagem: "A consulta está finalizada e não pode ser atualizada.",
    });
  }

  req.consulta = consulta;
  next();
};

module.exports = validarConsulta;
