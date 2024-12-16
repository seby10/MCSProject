
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
  updateContent(currentDate);
};

const formateDate = (dateTimeString) => {
  let abreviation;
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  if (hours>11) {
    abreviation = "PM";
  }else{
    abreviation = "AM";
  }
  return `${day}/${month}/${year} ${hours}:${minutes} ${abreviation}`;
};

// Función para actualizar el título según la fecha
const updateTitle = (selectedDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate = new Date(selectedDate);
  selectedDate.setHours(0, 0, 0, 0);
  
  const titleElement = $(".heading_container h2");
  if (selectedDate >= today) {
    titleElement.fadeOut(300, function() {
      $(this).text("Eventos Próximos").fadeIn(300);
    });
  } else {
    titleElement.fadeOut(300, function() {
      $(this).text("Noticias Pasadas").fadeIn(300);
    });
  }
};

const displayEventosNoticias = (eventosNoticias) => {
  const container = $("#eventsContainer");
  container.fadeOut(300, function() {
    container.empty();

    const eventosVisibles = eventosNoticias.filter(item => item.ESTADO === 1);

    if (!eventosVisibles || eventosVisibles.length === 0) {
      container.append(`
        <div class="alert alert-info" role="alert">
          No hay eventos o noticias para esta fecha
        </div>
      `);
    } else {
      container.append(`
        <div class="events-grid">
          ${eventosVisibles
            .map(
              (item) => `
            <div class="event-card">
              ${item.IMG_EVE_NOT ? `
                <div class="event-image">
                  <img src="/images/noticias/${item.IMG_EVE_NOT}" alt="${item.NOM_EVE_NOT}" onerror="this.style.display='none';">
                </div>
              ` : ''}
              <div class="event-header">
                <h3>${item.NOM_EVE_NOT}</h3>
                <div class="event-date">${formateDate(item.FEC_EVE_NOT)}</div>
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
    }
    container.fadeIn(300);
  });
};

// Función para actualizar todo el contenido
const updateContent = (date) => {
  updateTitle(date);
  getEventosNoticiasByDate(formatDateForInput(date))
    .then(displayEventosNoticias)
    .catch(error => console.error('Error al actualizar contenido:', error));
};

$(document).ready(() => {
  // Envolver el input date en un contenedor con los botones de navegación
  $("#fecha").wrap('<div class="date-navigation"></div>');
  const navigationContainer = $(".date-navigation");
  
  // Añadir botones de navegación incluyendo el botón "Hoy"
  navigationContainer.prepend(`
    <button class="nav-btn prev-btn" aria-label="Día anterior">
      <i class="fa fa-chevron-left"></i>
    </button>
  `);
  navigationContainer.append(`
    <button class="nav-btn next-btn" aria-label="Día siguiente">
      <i class="fa fa-chevron-right"></i>
    </button>
    <button class="nav-btn today-btn" aria-label="Ir a hoy">
      Hoy
    </button>
  `);

  // Set initial date to today
  const today = new Date();
  $("#fecha").val(formatDateForInput(today));

  // Load initial events and update title
  updateContent(today);

  // Event listeners
  $(".prev-btn").click(() => navigateDate(-1));
  $(".next-btn").click(() => navigateDate(1));
  $(".today-btn").click(() => {
    const today = new Date();
    $("#fecha").val(formatDateForInput(today));
    updateContent(today);
  });

  // Update events when date changes
  $("#fecha").on('change', (e) => {
    const selectedDate = new Date(e.target.value);
    updateContent(selectedDate);
  });
});