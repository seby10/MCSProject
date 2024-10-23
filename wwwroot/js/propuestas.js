const URL = "http://localhost:4000/MCSPROJECT";

const getPropuestaByID = async (id) => {
  const response = await $.ajax({
    url: `${URL}/propuestas/getPropuestas/${id}`,
    type: "GET",
    dataType: "json",
  });
  console.log(response);
  return response[0];
};
const displayPropuestas = (propuestaSeguridad, propuestaEconomia) => {
  // Mostrar la información de la propuesta de seguridad
  $("#informacion_seguridad h2").text("Propuesta de Seguridad");
  $("#informacion_seguridad p").html(
    `<strong>Nombre:</strong> ${propuestaSeguridad.NOM_PRO}<br>
     <strong>Grupo Dirigido:</strong> ${propuestaSeguridad.GRUP_DIR_PRO}<br>
     <strong>Información:</strong> ${propuestaSeguridad.INF_PRO}<br>
     <strong>ID del Candidato:</strong> ${propuestaSeguridad.ID_CAN}`
  );

  // Mostrar la información de la propuesta de economía
  $("#informacion_economia h2").text("Propuesta de Economía");
  $("#informacion_economia p").html(
    `<strong>Nombre:</strong> ${propuestaEconomia.NOM_PRO}<br>
     <strong>Grupo Dirigido:</strong> ${propuestaEconomia.GRUP_DIR_PRO}<br>
     <strong>Información:</strong> ${propuestaEconomia.INF_PRO}<br>
     <strong>ID del Candidato:</strong> ${propuestaEconomia.ID_CAN}`
  );
};

$(document).ready(async () => {
  const propuestaSeguridad = await getPropuestaByID(1);
  const propuestaEconomia = await getPropuestaByID(2);
  displayPropuestas(propuestaEconomia, propuestaSeguridad);
});


  // Asignar eventos desde JavaScript
  document.getElementById("btn-seguridad").addEventListener("click", function() {
    showSection('seguridad');
  });

  document.getElementById("btn-economia").addEventListener("click", function() {
    showSection('economia');
  });

  function showSection(section) {
    document.getElementById("seguridad").style.display = "none";
    document.getElementById("economia").style.display = "none";
    document.getElementById(section).style.display = "block";
  }

  // Mostrar la sección de "Seguridad" por defecto
  document.addEventListener("DOMContentLoaded", function () {
    showSection("seguridad");
  });
