const LogPaciente = (req) => {
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;
  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return null;
  }

  const paciente = {
    nome,
    cpf,
    dataNascimento,
    celular,
    email,
    senha,
  };

  return paciente;
};
