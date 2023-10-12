function procurar(elemento, bancoDeDados) {
  for (const chave in bancoDeDados) {
    if (bancoDeDados[chave] === elemento) {
      return bancoDeDados[chave];
    } else if (typeof bancoDeDados[chave] === "object") {
      const resultado = procurar(elemento, bancoDeDados[chave]);
      if (resultado) {
        return resultado;
      }
    }
  }
  return null;
}
