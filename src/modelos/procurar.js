function procurar(
  elementos,
  bancoDeDados,
  propriedade,
  retornarIndice = false
) {
  if (!Array.isArray(elementos)) {
    elementos = [elementos]; // Transforma em um array se não for um array
  }

  for (let chave in bancoDeDados) {
    const dado = bancoDeDados[chave];

    if (!dado) continue;

    if (propriedade && dado[propriedade]) {
      if (elementos.includes(dado[propriedade].toString())) {
        return retornarIndice ? chave : dado;
      }
    } else if (elementos.includes(dado)) {
      return retornarIndice ? chave : dado;
    }
  }
  return null;
}

module.exports = procurar;
