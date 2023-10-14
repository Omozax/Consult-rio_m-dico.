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
        nome: "lyssa",
        cpf: "098765445678",
        dataNascimento: "19/02/1997",
        celular: "1234321567",
        email: "lyssa@gmail.com",
        senha: "kjhgfdfgh",
        tipoConsulta: "GERAL",
        valorConsulta: 150,
      },
      finalizada: false,
    },
  ],
  consultasFinalizadas: [],
  laudos: [],
};
