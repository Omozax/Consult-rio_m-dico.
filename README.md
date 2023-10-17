# API de Consultório Médico 


  Neste projeto, desenvolvi uma API RESTful para um Consultório Médico como parte de um desafio para a escola **CUBOS**. O objetivo era criar um MVP (Produto Viável Mínimo) para listar, criar, atualizar, excluir, finalizar consultas médicas e listar laudos de consultas. Os dados são armazenados em memória no arquivo `bancodedados.js`.

---

### Endpoints

Aqui estão os principais endpoints da API:

- **Listar Consultas Médicas**: `GET /consultas`
- **Criar Consulta Médica**: `POST /consulta`
- **Atualizar Dados da Consulta**: `PUT /consulta/:identificadorConsulta/paciente`
- **Excluir Consulta Médica**: `DELETE /consulta/:identificadorConsulta`
- **Finalizar Consulta Médica**: `POST /consulta/finalizar`
- **Listar Laudo de Consulta**: `GET /consulta/laudo`
- **Listar Consultas de um Médico**: `GET /consultas/medico`

---

Cada endpoint possui suas regras e validações específicas, como verificação de senhas, validações de dados e controle de status de consulta. 


![Exemplo de solicitação no Insomnia](https://github.com/Omozax/Consult-rio_m-dico./blob/main/Capture.PNG)

Para facilitar o uso da API, você também pode utilizar ferramentas como o [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para fazer solicitações e testar as funcionalidades.

Lembre-se de seguir as melhores práticas de autenticação, validação de entrada e segurança ao usar esta API em seus projetos.

Para aqueles que desejam verificar os endpoints da API, você pode encontrar o documento exportado com uma URL neste [link](https://github.com/Omozax/Consult-rio_m-dico./blob/main/Insomnia_2023-10-16.json).


---

## Método `procurar` - Visão Geral

Para auxiliar no desenvolvimento desta API, criei um método chamado `procurar`, que tem como objetivo facilitar a busca de elementos em um banco de dados. O método aceita diversos tipos de elementos e oferece flexibilidade nas buscas.

### Função `procurar`

Aqui está o código do método `procurar`:

```javascript
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
```

### O que ela faz

O método `procurar` permite pesquisar elementos em um banco de dados com base em um conjunto de elementos, propriedades e critérios. Ele verifica se os elementos são encontrados nas propriedades dos dados no banco de dados e retorna o primeiro resultado correspondente. Isso é útil para pesquisas flexíveis em diversas situações.

### Exemplos de Uso

Aqui estão alguns exemplos de uso do método `procurar` com diferentes tipos de elementos:

#### Exemplo com Strings:

```javascript
const dados = {
  1: { nome: "Alice" },
  2: { nome: "Bob" },
  3: { nome: "Charlie" },
};

const resultado = procurar("Alice", dados, "nome");
// Resultado: { nome: "Alice" }
```

#### Exemplo com Números:

```javascript
const dados = {
  1: { idade: 25 },
  2: { idade: 30 },
  3: { idade: 35 },
};

const resultado = procurar(30, dados, "idade");
// Resultado: { idade: 30 }
```

#### Exemplo com Arrays:

```javascript
const dados = {
  1: { cores: ["vermelho", "azul"] },
  2: { cores: ["verde", "amarelo"] },
  3: { cores: ["vermelho", "verde"] },
};

const resultado = procurar(["vermelho", "azul"], dados, "cores");
// Resultado: { cores: ["vermelho", "azul"] }
```

#### Exemplo com Objetos:

```javascript
const dados = {
  1: { produto: { nome: "Laptop", preco: 1000 } },
  2: { produto: { nome: "Smartphone", preco: 500 } },
  3: { produto: { nome: "Tablet", preco: 300 } },
};

const resultado = procurar({ nome: "Smartphone", preco: 500 }, dados, "produto");
// Resultado: { produto: { nome: "Smartphone", preco: 500 } }
```

Espero que esse método seja útil para programadores que desejam realizar pesquisas flexíveis em seus bancos de dados.





