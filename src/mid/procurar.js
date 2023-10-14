function procurar(
  elementos,
  bancoDeDados,
  propriedade,
  retornarIndice = false
) {
  if (!Array.isArray(elementos)) {
    elementos = [elementos];
  }
  console.log(propriedade);
  for (const chave in bancoDeDados) {
    if (!propriedade) {
      console.log("prop", elementos.includes(bancoDeDados[chave]));
      console.log("prop", bancoDeDados);

      console.log("prop", chave);

      console.log("prop", elementos);

      if (elementos.includes(bancoDeDados[chave])) {
        return retornarIndice ? chave : bancoDeDados[chave];
      }
    } else if (
      elementos.includes(bancoDeDados[chave][propriedade].toString())
    ) {
      console.log("here");
      return retornarIndice ? chave : bancoDeDados[chave];
    } else if (typeof bancoDeDados[chave] === "object") {
      const resultado = procurar(
        elementos,
        bancoDeDados[chave],
        propriedade,
        retornarIndice
      );
      if (resultado) {
        return resultado;
      }
    }
  }
  return null;
}

module.exports = procurar;
