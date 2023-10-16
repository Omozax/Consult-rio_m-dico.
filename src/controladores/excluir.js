const { consultas, consultasFinalizadas } = require("../bancodedados");
const procurar = require("../modelos/index");

const excluirConsulta = async (req, res) => {
  console.log("----- | x01 |------");

  const { identificadorConsulta } = req.params;
  const consultaParaExcluir = procurar(
    identificadorConsulta,
    consultasFinalizadas,
    "identificadorConsulta"
  );

  if (consultaParaExcluir) {
    console.log("----- | x02 |------");

    if (consultaParaExcluir.finalizada === false) {
      console.log("----- | x03 |------");

      const index = consultas.indexOf(consultaParaExcluir);
      if (index !== -1) {
        consultas.splice(index, 1);
        return res.status(204).send();
      } else {
        console.log("----- | x05 |------");
        return res.status(500).json({
          mensagem: "Erro interno ao excluir a consulta",
        });
      }
    } else {
      console.log("----- | x04 |------");
      return res.status(400).json({
        mensagem:
          "A consulta só pode ser removida se a mesma não estiver finalizada",
      });
    }
  } else {
    console.log("----- | x06 |------");
    return res.status(404).json({
      mensagem: "Consulta não encontrada",
    });
  }
};

module.exports = excluirConsulta;
