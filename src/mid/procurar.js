function procurar(elemento, bancoDeDados, propriedade) {
  for (const chave in bancoDeDados) {
    if (!propriedade) {
      if (bancoDeDados[chave] === elemento) {
        return bancoDeDados[chave];
      }
    } else if (bancoDeDados[chave][propriedade] === elemento) {
      return bancoDeDados[chave];
    } else if (typeof bancoDeDados[chave] === "object") {
      const resultado = procurar(elemento, bancoDeDados[chave], propriedade);
      if (resultado) {
        return resultado;
      }
    }
  }
  return null;
}

module.exports = procurar;
