const { laudos } = require("../bancodedados");

const LogPaciente = (req) => {
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;
  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return null;
  }

  const paciente = {
    nome: nome,
    cpf: cpf,
    dataNascimento: dataNascimento,
    celular: celular,
    email: email,
    senha: senha,
  };

  return paciente;
  next();
};

const loglaudo = (req) => {
  const { identificadorConsulta, textoMedico } = req.body;
  if (!identificadorConsulta || !textoMedico) {
    return null;
  }

  const laudo = {
    identificador: laudos.length + 1,
    especialidade: verificar_especialidade(),
    identificadorConsulta: identificadorConsulta,
    identificadorMedico: identificadorMedico,
    finalizada: true,
    textoMedico: textoMedico,
    paciente: paciente,
  };
  laudos.push(laudo);
  return laudo;
  next();
};
