//Chamada da API da OpenAlex usando Input do usuário
async function retornaArtigos(inputUsuario) {
  try {
    const response = await fetch(
      `https://api.openalex.org/works?search=${inputUsuario}`,
    );

    const dados = await response.json();

    return dados.results;
  } catch (e) {
    console.error("Erro na requisição: " + e);
  }
}

async function listaArtigos() {
  const artigos = await retornaArtigos(); //Lança o input do Usuario aqui

  artigos.forEach((artigo) => {
    //Chama a função para escrever o codigo HTML na página
  });
}
