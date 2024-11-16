const suggestions = [
    "Inteligência Artificial",
    "Mudanças Climáticas",
    "Energias Renováveis",
    "Saúde Pública",
    "Educação Inclusiva",
    "Tecnologias Assistivas",
    "Ciência de Dados",
    "Psicologia Cognitiva",
    "Biotecnologia",
    "Direitos Humanos",
    "Desenvolvimento Sustentável",
    "Neurociência",
    "Engenharia de Software",
    "Ética na Inteligência Artificial",
    "Sistemas de Informação",
    "Marketing Digital",
    "Governança Corporativa",
    "Terapias Alternativas",
    "Gestão de Projetos",
    "Agricultura Sustentável",
    "Cultura Organizacional",
    "Blockchain na Educação",
    "Políticas Públicas",
    "Epidemiologia",
    "Física Quântica",
    "Microbiologia",
    "Design Thinking",
    "Indústria 4.0",
    "Antropologia Cultural",
    "Ciência dos Materiais",
    "IFPB",
    "Medicina",
    "Peter Jandi Junior"
  ];
  
  const searchInput = document.getElementById("searchInput");
  const suggestionsList = document.getElementById("suggestions");
  
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = "";
  
    if (query) {
      const filteredSuggestions = suggestions
        .filter((item) => item.toLowerCase().includes(query))
        .slice(0, 4);
  
      filteredSuggestions.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
  
        li.addEventListener("click", () => {
          searchInput.value = item;
          suggestionsList.innerHTML = "";
        });
  
        suggestionsList.appendChild(li);
      });
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const createAccountLink = document.getElementById("createAccount");

  createAccountLink.addEventListener('click', () => {
      scrollToPosition(600)
    });
    
    
});

function scrollToPosition(position){
    alert('clicou')
    window.scrollTo({
        top: `${position}px`,
        behavior: 'smooth'
    })
}

document.getElementById('cpf').addEventListener('input', function(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    input.value = value;
});