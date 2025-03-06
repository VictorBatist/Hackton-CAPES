async function retornaArtigos(inputUsuario) {
  try {
    const response = await fetch(
      `https://api.openalex.org/works?search=${encodeURIComponent(inputUsuario)}`
    );
    const dados = await response.json();
    return dados.results || [];
  } catch (e) {
    throw new Error("Erro ao buscar artigos.", e);
  }
}

module.exports = { retornaArtigos };