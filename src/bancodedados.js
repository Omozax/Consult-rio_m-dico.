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
        cpf: "00000000000",
        dataNascimento: "19/02/1997",
        celular: "00000000000",
        email: "ana@banana.com",
        senha: "000000000",
        tipoConsulta: "GERAL",
        valorConsulta: 150,
      },
      finalizada: false,
    },
  ],
  consultasFinalizadas: [
    {
      identificadorConsulta: 1,
      tipoConsulta: "GERAL",
      valorConsulta: 150,
      identificadorMedico: 1,
      paciente: {
        nome: "joao",
        cpf: "111111111",
        dataNascimento: "19/02/1997",
        celular: "11111111111",
        email: "joao@feijao.com",
        senha: "111111",
        tipoConsulta: "GERAL",
        valorConsulta: 150,
      },
      finalizada: true,
    },
  ],
  laudos: [
    {
      identificador: 1,
      identificadorConsulta: 1,
      identificadorMedico: 1,
      textoMedico:
        "qwertyuiopasdfghjklçzxcvbnmmnbvcxzlkjhgfdsapoiuytrewqqwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuiopasdfghjklzxcvbnm",
      paciente: {
        nome: "joao",
        cpf: "111111111",
        dataNascimento: "19/02/1997",
        celular: "11111111111",
        email: "joao@feijao.com",
        senha: "111111",
        tipoConsulta: "GERAL",
        valorConsulta: 150,
      },
    },
  ],
};
