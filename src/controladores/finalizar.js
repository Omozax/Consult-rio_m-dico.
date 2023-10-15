const { consultas, consultasFinalizadas, laudos } = require("../bancodedados");
const fs = require("fs");
const path = require("path");

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

module.exports = finalizarConsulta;
