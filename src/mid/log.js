const { laudos, consultas } = require("../bancodedados");

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

const logLaudo = (req) => {
  const { identificadorConsulta, textoMedico } = req.body;

  if (identificadorConsulta && textoMedico) {
    const consultaEncontrada = procurar(
      identificadorConsulta,
      consultas.identificadorConsulta
    );
    const medicoID = procurar(
      identificadorMedico,
      consultaEncontrada.identificadorMedico
    );
  }

  const laudo = {
    identificador: laudos.length + 1,
    especialidade: medicoID.especialidade,
    identificadorConsulta,
    identificadorMedico: medicoID,
    finalizada: true,
    textoMedico,
    paciente: consultaEncontrada.paciente,
  };
  return laudo;
};
