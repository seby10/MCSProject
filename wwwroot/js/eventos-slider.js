
let currentSlide = 0;
let eventos = [];

const formatDateEvents = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const getRecentEvents = async () => {
  try {
    console.log('Solicitando eventos recientes...');
    const response = await $.ajax({
      url: `${URL}/eventos_noticias/recent`,
      type: "GET",
      dataType: "json",
    });
    console.log('Eventos recibidos:', response);
    return response;
  } catch (error) {
    console.error("Error al obtener eventos recientes:", error);
    return [];
  }
};

const updateSlider = () => {
  if (eventos.length === 0) return;
  
  const evento = eventos[currentSlide];
  const sliderContent = document.querySelector('.eventos-slider-content');
  
  sliderContent.style.opacity = 0;
  
  setTimeout(() => {
    sliderContent.innerHTML = `
      <div class="slider-event-card">
        <h3>${evento.NOM_EVE_NOT}</h3>
        <div class="event-date">${formatDateEvents(evento.FEC_EVE_NOT)}</div>
        <p>${evento.INF_EVE_NOT}</p>
        ${evento.UBI_EVE_NOT ? `<div class="location"><i class="fa fa-map-marker"></i> ${evento.UBI_EVE_NOT}</div>` : ''}
      </div>
    `;
    sliderContent.style.opacity = 1;
  }, 300);
  
  // Actualizar indicadores
  const indicators = document.querySelector('.slider-indicators');
  indicators.innerHTML = eventos.map((_, index) => 
    `<button class="indicator ${index === currentSlide ? 'active' : ''}" data-slide="${index}"></button>`
  ).join('');
};

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % eventos.length;
  updateSlider();
};

const prevSlide = () => {
  currentSlide = (currentSlide - 1 + eventos.length) % eventos.length;
  updateSlider();
};

const setupEventListeners = () => {
  // Agregar event listeners para los botones
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Event listener para los indicadores
  document.querySelector('.slider-indicators').addEventListener('click', (e) => {
    if (e.target.classList.contains('indicator')) {
      currentSlide = parseInt(e.target.dataset.slide);
      updateSlider();
    }
  });
};

const initSlider = async () => {
  console.log('Inicializando slider...');
  eventos = await getRecentEvents();
  console.log('Eventos cargados:', eventos);
  
  if (eventos.length > 0) {
    updateSlider();
    setupEventListeners();
    // Auto-play
    setInterval(nextSlide, 5000);
  }
};

// Inicializar cuando el DOM esté listo
$(document).ready(() => {
  console.log('DOM listo, iniciando slider...');
  initSlider();
});