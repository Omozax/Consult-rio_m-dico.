const { laudos, consultas } = require("../bancodedados");
const procurar = require("./procurar");

const LogPaciente = (req) => {
  console.log("logPaciente/1", req.nome);

  const { nome, cpf, dataNascimento, celular, email, senha } = req;

  if (nome && cpf && dataNascimento && celular && email && senha) {
    const paciente = {
      nome,
      cpf,
      dataNascimento,
      celular,
      email,
      senha,
    };
    console.log("logPaciente/2");
    return paciente;
  } else {
    return null;
  }
};

const logLaudo = (req) => {
  const { identificadorConsulta, textoMedico } = req.body;

  let consultaEncontrada, medicoID;

  if (identificadorConsulta && textoMedico) {
    consultaEncontrada = procurar(identificadorConsulta, consultas);
    medicoID = procurar(consultaEncontrada.identificadorMedico, consultas);
  }

  if (consultaEncontrada && medicoID) {
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
  } else {
    return null;
  }
};

module.exports = {
  logLaudo,
  LogPaciente,
};

module.exports = {
  logLaudo,
  LogPaciente,
};
