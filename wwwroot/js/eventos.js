const URL = "http://localhost:4000/MCSPROJECT";

const getEventosNoticiasByDate = async (date) => {
  try {
    console.log("Consultando fecha:", date);
    const response = await $.ajax({
      url: `${URL}/eventos_noticias/getEventosNoticias/${date}`,
      type: "GET",
      dataType: "json",
    });
    console.log("Respuesta recibida:", response);
    return response;
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return [];
  }
};

const formatDateForInput = (date) => {
  return date.toISOString().split('T')[0];
};

// Función para navegar entre días
const navigateDate = (direction) => {
  const currentDate = new Date($("#fecha").val());
  currentDate.setDate(currentDate.getDate() + direction);
  $("#fecha").val(formatDateForInput(currentDate));
  getEventosNoticiasByDate(formatDateForInput(currentDate))
    .then(displayEventosNoticias)
    .catch(error => console.error('Error al navegar fecha:', error));
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayEventosNoticias = (eventosNoticias) => {
  const container = $("#eventsContainer");
  container.empty();

  if (!eventosNoticias || eventosNoticias.length === 0) {
    container.append(`
      <div class="alert alert-info" role="alert">
        No hay eventos o noticias para esta fecha
      </div>
    `);
    return;
  }

  // Contenedor con grid para los eventos
  container.append(`
    <div class="events-grid">
      ${eventosNoticias
        .map(
          (item) => `
        <div class="event-card">
          <div class="event-header">
            <h3>${item.NOM_EVE_NOT}</h3>
            <div class="event-date">${formatDate(item.FEC_EVE_NOT)}</div>
          </div>
          <div class="event-content">
            <p class="event-info">${item.INF_EVE_NOT}</p>
            ${
              item.UBI_EVE_NOT
                ? `
              <div class="event-location">
                <i class="fa fa-map-marker"></i>
                <span>${item.UBI_EVE_NOT}</span>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `);
};

$(document).ready(() => {
  const dateContainer = $("#fecha").parent();
  
  // Envolver el input date en un contenedor con los botones de navegación
  $("#fecha").wrap('<div class="date-navigation"></div>');
  const navigationContainer = $(".date-navigation");
  
  // Añadir botones de navegación
  navigationContainer.prepend(`
    <button class="nav-btn prev-btn" aria-label="Día anterior">
      <i class="fa fa-chevron-left"></i>
    </button>
  `);
  navigationContainer.append(`
    <button class="nav-btn next-btn" aria-label="Día siguiente">
      <i class="fa fa-chevron-right"></i>
    </button>
  `);

  // Set initial date to today
  const today = new Date();
  $("#fecha").val(formatDateForInput(today));

  // Load initial events
  getEventosNoticiasByDate(formatDateForInput(today))
    .then(displayEventosNoticias)
    .catch(error => console.error('Error inicial:', error));

  // Event listeners para los botones de navegación
  $(".prev-btn").click(() => navigateDate(-1));
  $(".next-btn").click(() => navigateDate(1));

  // Update events when date changes
  $("#fecha").on('change', (e) => {
    const selectedDate = e.target.value;
    getEventosNoticiasByDate(selectedDate)
      .then(displayEventosNoticias)
      .catch(error => console.error('Error al cambiar fecha:', error));
  });
});