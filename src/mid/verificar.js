const verificarDados_paciente = (req, res, next) => {
  const paciente = LogPaciente(req);
  if (!paciente) {
    return res.status(400).json({ mensagem: "Dados obrigatórios faltando" });
  }

  next();
};

const verificar_especialidade = (req, res, next) => {
  const { tipoConsulta } = req.body;

  if (
    !tipoConsulta ||
    !medicos.some((medico) => medico.especialidade === tipoConsulta)
  ) {
    return res.status(400).json({ mensagem: "Especialidade médica inválida" });
  }

  next();
};
