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
