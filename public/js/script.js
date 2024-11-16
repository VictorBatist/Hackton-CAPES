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
          titulo.innerHTML = 'ACESSO À SUA CONTA E<br>PERSONALIZE SEU AMBIENTE'
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