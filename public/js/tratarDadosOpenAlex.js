const { retornaArtigos } = require("./requestApi");

async function TratarDadosOpenAlex(pesquisaUsuario){
    try {
    
      const dados = await retornaArtigos(pesquisaUsuario);
      const qntDados = dados.length
      const artigos = (dados || []).map(artigo => ({
          title: artigo.title || "Título indisponível",
          authorships: artigo.authorships || [],
          publication_date: artigo.publication_date || "Data não disponível",
          doi: artigo.doi ? `https://doi.org/${artigo.doi}` : null,
        }));
      return {
        artigos,
        totalResults: qntDados,
        error: null
      };
      
    } catch (error) {
      console.error("Erro na API OpenAlex:", error);
    }

    return {
        artigos: [],
        totalResults: 0,
        error: "Erro ao buscar os dados da OpenAlex.",
      };

}

module.exports = { TratarDadosOpenAlex };