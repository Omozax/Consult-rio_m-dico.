const { laudos, consultas } = require("../bancodedados");
const procurar = require("./procurar");

const LogPaciente = (req) => {
  console.log("logPaciente/1");
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

  if (nome && cpf && dataNascimento && celular && email && senha) {
    const paciente = req.body;
    console.log("logPaciente/2");
    return paciente;
  } else {
    return null;
  }
};

const logLaudo = (req) => {
  const { identificadorConsulta, textoMedico } = req.body;

  if (identificadorConsulta && textoMedico) {
    const consultaEncontrada = procurar(identificadorConsulta, consultas);
    const medicoID = procurar(
      consultaEncontrada.identificadorMedico,
      consultas
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

module.exports = {
  logLaudo,
  LogPaciente,
};
