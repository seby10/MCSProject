const URL = "http://localhost:4000/proyectoMCS";

async function getEvents(usuarioID) {
  try {
    const response = await $.ajax({
      url: `${URL}/calendar/getEvents`,
      type: "POST",
      data: { usuarioID },
      dataType: "json",
    });
    
    console.log("Respuesta de getEvents:", response);
    const events = response.map(event => ({
      id: event.EventoID,
      title: event.Titulo,
      start: event.FechaInicio,
      end: event.FechaFin,
      allDay: event.EsTodoElDia === 1,
    }));

    console.log("Eventos formateados para FullCalendar:", events);
    return events; 
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Error fetching events");
  }
}

async function addEvent(eventData) {
  try {
    const response = await $.ajax({
      url: `${URL}/calendar/addEvent`,
      type: "POST",
      data: eventData,
      dataType: "json",
    });
    console.log("Respuesta de addEvent:", response);
    return response;
  } catch (error) {
    console.error("Error adding event:", error);
    throw new Error("Error adding event");
  }
}

async function updateEventInDB(eventData) {
  try {
    await $.ajax({
      url: `${URL}/calendar/updateEvent`,
      type: "POST",
      data: eventData,
      dataType: "json",
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Error updating event");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const currentUserId = JSON.parse(sessionStorage.getItem("user")).id;
  console.log(currentUserId);
  if (!currentUserId) {
    console.error("Usuario ID no está disponible en sessionStorage.");
    return;
  }

  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    events: async function (fetchInfo, successCallback, failureCallback) {
      try {
        const events = await getEvents(currentUserId);
        console.log("Eventos para FullCalendar:", events);
        successCallback(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        failureCallback(error);
      }
    },
    dateClick: function (info) {
      const modal = new bootstrap.Modal(document.getElementById('eventModal'));
      modal.show();
      $("#eventTitle").val("");
      $("#eventDescription").val("");
      $("#eventStartDate").val(info.dateStr);
      $("#eventEndDate").val(info.dateStr);
      $("#eventAllDay").prop("checked", false);
      $("#eventId").val("");
      $("#saveEventButton")
        .off("click")
        .on("click", () => saveEvent(info.dateStr));
      $("#deleteEventButton").hide(); 
    },
    eventClick: function (info) {
      const modal = new bootstrap.Modal(document.getElementById('eventModal'));
      modal.show();
      $("#eventTitle").val(info.event.title);
      $("#eventDescription").val(info.event.extendedProps.description || "");
      $("#eventStartDate").val(info.event.startStr);
      $("#eventEndDate").val(info.event.endStr);
      $("#eventAllDay").prop("checked", info.event.allDay);
      $("#eventId").val(info.event.id);
      $("#saveEventButton")
        .off("click")
        .on("click", () => updateEvent(info.event.id));
      $("#deleteEventButton")
        .off("click")
        .on("click", () => deleteEvent(info.event.id))
        .show();
    },
  });

  calendar.render();

  async function saveEvent(startDate) {
    const eventData = {
      usuarioID: currentUserId,
      titulo: $("#eventTitle").val(),
      descripcion: $("#eventDescription").val(),
      fechaInicio: $("#eventStartDate").val(),
      fechaFin: $("#eventEndDate").val(),
      esTodoElDia: $("#eventAllDay").is(":checked") ? 1 : 0,
      activo: 1,
    };
    try {
      const result = await addEvent(eventData);
      calendar.addEvent({
        id: result.NuevoEventoID,
        title: eventData.titulo,
        start: eventData.fechaInicio,
        end: eventData.fechaFin,
        allDay: eventData.esTodoElDia,
      });
      const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
      modal.hide();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }

  async function updateEvent(eventId) {
    const eventData = {
      eventoID: eventId,
      usuarioID: currentUserId,
      titulo: $("#eventTitle").val(),
      descripcion: $("#eventDescription").val(),
      fechaInicio: $("#eventStartDate").val(),
      fechaFin: $("#eventEndDate").val(),
      esTodoElDia: $("#eventAllDay").is(":checked") ? 1 : 0,
    };
    try {
      await updateEventInDB(eventData);
      const event = calendar.getEventById(eventId);
      if (event) {
        event.setProp("title", eventData.titulo);
        event.setDates(eventData.fechaInicio, eventData.fechaFin);
        event.setExtendedProp("description", eventData.descripcion);
        event.setProp("allDay", eventData.esTodoElDia);
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
      modal.hide();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  }

  async function deleteEvent(eventId) {
    try {
      await deleteEventFromDB({ eventoID: eventId });
      calendar.getEventById(eventId).remove();
      const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
      modal.hide();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
});

async function deleteEventFromDB(eventData) {
  try {
    await $.ajax({
      url: `${URL}/calendar/deleteEvent`,
      type: "POST",
      data: eventData,
      dataType: "json",
    });
  } catch (error) {
    console.error("Error deleting event from DB:", error);
    throw new Error("Error deleting event from DB");
  }
}