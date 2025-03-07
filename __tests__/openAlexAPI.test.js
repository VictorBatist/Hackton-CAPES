const { retornaArtigos } = require("../public/js/requestApi");
const { TratarDadosOpenAlex } = require("../public/js/tratarDadosOpenAlex");

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

  it('Deve retornar um array vazio ao buscar por conteúdo indisponível na api', async () => {
    const arrayEsperado = []
    const resultadoRetornado = await retornaArtigos("ALOK_CARNAVAL_CAJAZEIRAS")

    expect(arrayEsperado).toEqual(resultadoRetornado)
  })

  it('Deve retornar um artigo completo ao buscar JAVASCRIPT no TratarDadosOpenAlex', async () => {
    const resultadoEsperado = "JavaScript: The Definitive Guide"

    const resultadoRetornado = (await TratarDadosOpenAlex("JAVASCRIPT")).artigos[0].title

    expect(resultadoEsperado).toEqual(resultadoRetornado)
  })

  it('Deve retornar um objeto vazio ao buscar input inválido no TratarDadosOpenAlex', async () => {
    const resultadoEsperado = { artigos: [], totalResults: 0, error: null }

    const resultadoRetornado = await TratarDadosOpenAlex("JAVASCRIPT_EH_A_MELHOR_LINGUAGEM")
    console.log(resultadoRetornado)

    expect(resultadoEsperado).toEqual(resultadoRetornado)
  })


})
