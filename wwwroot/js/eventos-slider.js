let currentSlide = 0;
let eventos = [];
let currentSlideNoticias = 0;
let noticias = [];

const formatDateEN = (dateTimeString) => {
  let abreviation;
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  if (hours > 11) {
    abreviation = "PM";
  } else {
    abreviation = "AM";
  }
  return `${day}/${month}/${year} ${hours}:${minutes} ${abreviation}`;
};

// Función para obtener eventos recientes
const getRecentEvents = async () => {
  try {
    console.log("Solicitando eventos recientes...");
    const response = await $.ajax({
      url: `${URL}/eventos_noticias/recentEventos`,
      type: "GET",
      dataType: "json",
    });
    console.log("Eventos recibidos:", response);
    return response;
  } catch (error) {
    console.error("Error al obtener eventos recientes:", error);
    return [];
  }
};

const updateSlider = () => {
  if (eventos.length === 0) return;

  const evento = eventos[currentSlide];
  const sliderContent = document.querySelector("#eventos-futuros-content");

  sliderContent.style.opacity = 0;

  setTimeout(() => {
    sliderContent.innerHTML = `
      <div class="slider-event-card">
        ${
          evento.IMG_EVE_NOT
            ? `
          <div class="slider-event-image">
            <img src="/images/noticias/${evento.IMG_EVE_NOT}" alt="${evento.NOM_EVE_NOT}" onerror="this.style.display='none';">
          </div>
        `
            : ""
        }
        <h3>${evento.NOM_EVE_NOT}</h3>
        <div class="event-date">${formatDateEN(evento.FEC_EVE_NOT)}</div>
        <p>${evento.INF_EVE_NOT}</p>
        ${
          evento.UBI_EVE_NOT
            ? `<div class="location"><i class="fa fa-map-marker"></i> ${evento.UBI_EVE_NOT}</div>`
            : ""
        }
      </div>
    `;
    sliderContent.style.opacity = 1;
  }, 300);

  // Actualizar indicadores
  const indicators = document.querySelector("#eventos-indicators");
  indicators.innerHTML = eventos
    .map(
      (_, index) =>
        `<button class="indicator ${
          index === currentSlide ? "active" : ""
        }" data-slide="${index}"></button>`
    )
    .join("");
};

// Funciones de navegación del slider de eventos
const nextSlide = () => {
  currentSlide = (currentSlide + 1) % eventos.length;
  updateSlider();
};

const prevSlide = () => {
  currentSlide = (currentSlide - 1 + eventos.length) % eventos.length;
  updateSlider();
};

// Funciones para los event listeners del slider de eventos
const setupEventListeners = () => {
  const prevBtn = document.querySelector("#eventos-prev");
  const nextBtn = document.querySelector("#eventos-next");

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  document
    .querySelector("#eventos-indicators")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("indicator")) {
        currentSlide = parseInt(e.target.dataset.slide);
        updateSlider();
      }
    });
};

// Función para inicializar el slider de eventos
const initSlider = async () => {
  console.log("Inicializando slider...");
  eventos = await getRecentEvents();
  console.log("Eventos cargados:", eventos);

  eventos = eventos.filter((evento) => evento.ESTADO === 1);

  if (eventos.length > 0) {
    updateSlider();
    setupEventListeners();
    setInterval(nextSlide, 5000);
  } else {
    console.log("No hay eventos visibles para mostrar.");
  }
};

// Función para obtener noticias recientes
const getRecentNoticias = async () => {
  try {
    console.log("Solicitando noticias recientes...");
    const response = await $.ajax({
      url: `${URL}/eventos_noticias/recentNoticias`,
      type: "GET",
      dataType: "json",
    });
    console.log("Noticias recibidas:", response);
    return response;
  } catch (error) {
    console.error("Error al obtener noticias recientes:", error);
    return [];
  }
};

// Función para actualizar el slider de noticias
const updateNoticiasSlider = () => {
  if (noticias.length === 0) return;

  const noticia = noticias[currentSlideNoticias];
  const sliderContent = document.querySelector("#noticias-content");

  sliderContent.style.opacity = 0;

  setTimeout(() => {
    sliderContent.innerHTML = `
      <div class="slider-event-card">
        ${
          noticia.IMG_EVE_NOT
            ? `
          <div class="slider-event-image">
            <img src="/images/noticias/${noticia.IMG_EVE_NOT}" alt="${noticia.NOM_EVE_NOT}" onerror="this.style.display='none';">
          </div>
        `
            : ""
        }
        <h3>${noticia.NOM_EVE_NOT}</h3>
        <div class="event-date">${formatDateEN(noticia.FEC_EVE_NOT)}</div>
        <p>${noticia.INF_EVE_NOT}</p>
        ${
          noticia.UBI_EVE_NOT
            ? `<div class="location"><i class="fa fa-map-marker"></i> ${noticia.UBI_EVE_NOT}</div>`
            : ""
        }
      </div>
    `;
    sliderContent.style.opacity = 1;
  }, 300);

  // Actualizar indicadores
  const indicators = document.querySelector("#noticias-indicators");
  indicators.innerHTML = noticias
    .map(
      (_, index) =>
        `<button class="indicator ${
          index === currentSlideNoticias ? "active" : ""
        }" data-slide="${index}"></button>`
    )
    .join("");
};

// Funciones de navegación del slider de noticias
const nextNoticiaSlide = () => {
  currentSlideNoticias = (currentSlideNoticias + 1) % noticias.length;
  updateNoticiasSlider();
};

const prevNoticiaSlide = () => {
  currentSlideNoticias =
    (currentSlideNoticias - 1 + noticias.length) % noticias.length;
  updateNoticiasSlider();
};

// Funciones para los event listeners del slider de noticias
const setupNoticiasEventListeners = () => {
  const prevBtn = document.querySelector("#noticias-prev");
  const nextBtn = document.querySelector("#noticias-next");

  if (prevBtn) prevBtn.addEventListener("click", prevNoticiaSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextNoticiaSlide);

  document
    .querySelector("#noticias-indicators")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("indicator")) {
        currentSlideNoticias = parseInt(e.target.dataset.slide);
        updateNoticiasSlider();
      }
    });
};

// Función para inicializar el slider de noticias
const initNoticiasSlider = async () => {
  console.log("Inicializando slider de noticias...");
  noticias = await getRecentNoticias();
  console.log("Noticias cargadas:", noticias);

  noticias = noticias.filter((noticia) => noticia.ESTADO === 1);

  if (noticias.length > 0) {
    updateNoticiasSlider();
    setupNoticiasEventListeners();
    setInterval(nextNoticiaSlide, 5000);
  } else {
    console.log("No hay noticias visibles para mostrar.");
  }
};

// Inicializar cuando el DOM esté listo
$(document).ready(() => {
  console.log("DOM listo, iniciando sliders...");
  initSlider(); // Inicializar el slider de eventos
  initNoticiasSlider(); // Inicializar el slider de noticias
});
