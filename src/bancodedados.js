module.exports = {
  consultorio: {
    nome: "Cubos Healthcare",
    identificador: 1,
    cnes: "1001",
    senha: "CubosHealth@2022",
    medicos: [
      {
        identificador: 1,
        nome: "Bill",
        especialidade: "GERAL",
      },
      {
        identificador: 2,
        nome: "Irineu",
        especialidade: "ODONTOLOGIA",
      },
    ],
  },
  consultas: [
    {
      identificadorConsulta: 1,
      tipoConsulta: "GERAL",
      valorConsulta: 150,
      identificadorMedico: 1,
      paciente: {
        nome: "ana",
        cpf: "1234567890",
        dataNascimento: "19/02/1997",
        celular: "0987654321",
        email: "ana@banana.com",
        senha: "12345",
        tipoConsulta: "GERAL",
        valorConsulta: 150,
      },
      finalizada: false,
    },
  ],
  consultasFinalizadas: [],
  laudos: [],
};
