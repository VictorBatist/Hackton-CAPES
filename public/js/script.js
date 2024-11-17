const suggestions = [
  "Inteligência Artificial", "Mudanças Climáticas", "Energias Renováveis", "Saúde Pública", 
  "Educação Inclusiva", "Tecnologias Assistivas", "Ciência de Dados", "Psicologia Cognitiva", 
  "Biotecnologia", "Direitos Humanos", "Desenvolvimento Sustentável", "Neurociência", 
  "Engenharia de Software", "Ética na Inteligência Artificial", "Sistemas de Informação", 
  "Marketing Digital", "Governança Corporativa", "Terapias Alternativas", "Gestão de Projetos", 
  "Agricultura Sustentável", "Cultura Organizacional", "Blockchain na Educação", "Políticas Públicas", 
  "Epidemiologia", "Física Quântica", "Microbiologia", "Design Thinking", "Indústria 4.0", 
  "Antropologia Cultural", "Ciência dos Materiais", "IFPB", "Medicina", "Peter Jandi Junior"
];
  
const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");
searchInput.style.animation = 'fadeIn 0.3s linear';
setTimeout(() => {
  searchInput.style.animation = '';
}, 300);

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


document.addEventListener("click", (event) => {
  if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
    suggestionsList.innerHTML = ""; 
  }
});



  document.addEventListener("DOMContentLoaded", () => {
    createInformativos(informativos);
    const scrollToSection = (elementId) => {
        const targetSection = document.getElementById(elementId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const toggleForms = (isLogin) => {
        const formulario = document.querySelector('.formulario')
        const formularioInputs = document.querySelector('.form-inputs')
        const cadastroForm = document.getElementById("cadastroForm");
        const loginForm = document.getElementById("loginForm");
        const titulo = document.querySelector('#cadastro #title');

        
        if (isLogin) {
          formulario.style.marginTop = `23px`
          cadastroForm.style.display = "none";
          loginForm.style.display = "block";
          titulo.innerHTML = 'ACESSE A SUA CONTA E<br>PERSONALIZE SEU AMBIENTE'
          titulo.style.animation = 'fadeIn 0.3s linear'
          setTimeout(() => {
            titulo.style.animation = '';
          }, 300);
        } else {
          console.log(formularioInputs)
          cadastroForm.style.display = "block";
          formulario.style.marginTop = `165px`
          loginForm.style.display = "none";
          titulo.innerHTML = 'CRIE SUA CONTA E TENHA UM <br> AMBIENTE PERSONALIZADO'
          titulo.style.animation = 'fadeIn 0.3s linear'
          setTimeout(() => {
            titulo.style.animation = '';
          }, 300);
        }
    };

    document.getElementById("createAccount")?.addEventListener("click", () => {
        toggleForms(false);
        scrollToSection("cadastro");
    });

    document.getElementById("Login")?.addEventListener("click", () => {
        toggleForms(true);
        scrollToSection("cadastro");
    });

    document.getElementById("confirm")?.addEventListener("click", () => {
        toggleForms(false); 
    });
});


document.querySelectorAll('#cpf').forEach(function(element) {
  element.addEventListener('input', function(event) {
      let input = event.target;
      let value = input.value.replace(/\D/g, '');

      if (value.length <= 11) {
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      input.value = value; 
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderContent = document.querySelectorAll('.slider-content');
  
  const addFadeIn = (element, index) => {
    setTimeout(() => {
      element.classList.add('fadeIn');
    }, index * 200);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        addFadeIn(entry.target, index);
      }
    });
  }, {
    threshold: 0.5
  });

  sliderContent.forEach((content) => {
    observer.observe(content);
  });
});

// JSON com as postagens
const informativos = {
  "informativos": [
    {
      "img": "./assets/image/image1.png",
      "title": "Análise Textual, Design e Questões de Gênero são temas de cursos",
      "subtitle": "“Treinamento será nos dias 6, 14 e 18 de novembro...”",
      "date": "05/11/2024"
    },
    {
      "img": "./assets/image/image2.png",
      "title": "Premiação reconhece pesquisadoras de todo o Brasil",
      "subtitle": "“As 15 cientistas selecionadas foram destaque nas áreas de...”",
      "date": "29/10/2024"
    },
    {
      "img": "./assets/image/image3.png",
      "title": "Pesquisas em Ciências de Alimentos são destaques em publicação",
      "subtitle": "“Textos constam do Journal of Food Science e são resultados de...”",
      "date": "14/11/2024"
    },
    {
      "img": "./assets/image/image4.png",
      "title": "Treinamento discute publicação de artigo na Biochemical Society",
      "subtitle": "“Evento promovido pela PortlandPress acontece quinta-feira às.”",
      "date": "06/11/2024"
    }
  ]
};

// Função para criar dinamicamente os elementos
function createInformativos(json) {
  const slider = document.getElementById('slider');

  json.informativos.forEach(info => {
    const link = document.createElement('a');
    link.href = "#";

    const sliderContent = document.createElement('div');
    sliderContent.classList.add('slider-content');

    const img = document.createElement('img');
    img.src = info.img;

    const title = document.createElement('span');
    title.id = "title";
    title.textContent = info.title;

    const subtitle = document.createElement('span');
    subtitle.id = "subtitle";
    subtitle.textContent = info.subtitle;

    const date = document.createElement('span');
    date.id = "data";
    date.textContent = info.date;

    // Adiciona os elementos ao conteúdo
    sliderContent.appendChild(img);
    sliderContent.appendChild(title);
    sliderContent.appendChild(subtitle);
    sliderContent.appendChild(date);

    // Adiciona o conteúdo ao link
    link.appendChild(sliderContent);

    // Adiciona o link ao slider
    slider.appendChild(link);
  });
}

// Adiciona event listeners para todas as sugestões
document.querySelectorAll('.sugestions span').forEach(span => {
  span.addEventListener('click', (event) => {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = event.target.textContent; // Substitui o valor do input com o texto do span clicado
  });
});

// Função para redirecionar com base no valor do input
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim(); // Remove espaços extras

  if (query) {
    // Redireciona para a rota GET
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  }
}

// Detecta clique no botão ou na lupa
let isMouseDown = false;

document.querySelector('.btn-input').addEventListener('mousedown', (event) => {
  if (event.target.tagName === 'IMG' || event.target.tagName === 'BUTTON') {
    isMouseDown = true; // Clique inicial detectado
  }
});

document.querySelector('.btn-input').addEventListener('mouseup', (event) => {
  if (isMouseDown && (event.target.tagName === 'IMG' || event.target.tagName === 'BUTTON')) {
    handleSearch(); // Clique válido, executa a função
  }
  isMouseDown = false; // Reseta o estado
});

// Detecta "Enter" no campo de pesquisa
document.getElementById('searchInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
