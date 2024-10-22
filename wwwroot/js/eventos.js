// Función para obtener eventos por fecha
async function fetchEventsByDate(date) {
  try {
    const response = await fetch(`/api/eventos_noticias/${date}`);
    const events = await response.json();

    if (response.ok) {
      displayEvents(events); // Función que muestra los eventos en la página
    } else {
      console.log(events.message);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Función para mostrar los eventos en el HTML
function displayEvents(events) {
  const eventsContainer = document.getElementById("eventsContainer");
  eventsContainer.innerHTML = ""; // Limpiar el contenido anterior

  if (events.length === 0) {
    eventsContainer.innerHTML = "<p>No hay eventos para esta fecha.</p>";
  }

  events.forEach((event) => {
    const eventElement = document.createElement("div");
    eventElement.innerHTML = `
        <h3>${event.NOM_EVE_NOT}</h3>
        <p>${event.INF_EVE_NOT}</p>
        <p>Fecha: ${event.FEC_EVE_NOT}</p>
        <p>Ubicación: ${event.UBI_EVE_NOT}</p>
      `;
    eventsContainer.appendChild(eventElement);
  });
}

// Capturar la fecha seleccionada en el input type="date"
document.getElementById("fecha").addEventListener("change", function () {
  const selectedDate = this.value;
  fetchEventsByDate(selectedDate); // Llamar a la función con la fecha seleccionada
});

// Al cargar la página, mostrar los eventos del día actual
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0]; // Obtener la fecha actual
  document.getElementById("fecha").value = today; // Establecer la fecha actual en el selector
  fetchEventsByDate(today); // Mostrar eventos de la fecha actual
});
