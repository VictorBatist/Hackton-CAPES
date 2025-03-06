const { retornaArtigos } = require("../public/js/requestApi");

describe('Testes da api Open Alex ', () => {
  it('Deve retornar os títulos dos artigos corretos ao buscar "Peter Jandi Junior" na API', async () => {
    const resultadosEsperados = [
      'Indigenous Self-Determination in Australia: Histories and Historiography', 'Indigenous Self-Determination in Australia'
    ]
    
    const resultadoRetornado = await retornaArtigos("Peter Jandi Junior")

    expect(resultadoRetornado[0].title).toEqual(resultadosEsperados[0])
    expect(resultadoRetornado[1].title).toEqual(resultadosEsperados[1])
  })
  
  it('Deve retornar 25 resultados ao buscar por "IFPB" na api', async () => {
    const qntResultadosEsperados = 25
    const resultadoRetornado = await retornaArtigos("IFPB")

    expect(qntResultadosEsperados).toEqual(resultadoRetornado.length)
  })

  it('Deve retornar 25 resultados ao buscar por "IFPB" na api', async () => {
    const qntResultadosEsperados = 25
    const resultadoRetornado = await retornaArtigos("IFPB")

    expect(qntResultadosEsperados).toEqual(resultadoRetornado.length)
  })
})
