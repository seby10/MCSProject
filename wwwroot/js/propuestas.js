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


const displayPropuestas = (propuestaDocentes, propuestaEstudiantes, propuestaAdministrativo, propuestaFacultades) => {

  $("#propuestas_estudiantes h2").text("Propuesta para los estudiantes");
  $("#propuestas_estudiantes p").html(
    `<strong>Nombre:</strong> ${propuestaEstudiantes.NOM_PRO}<br>
     <strong>Grupo Dirigido:</strong> ${propuestaEstudiantes.GRUP_DIR_PRO}<br>
     <strong>Información:</strong> ${propuestaEstudiantes.INF_PRO}<br>
     <strong>ID del Candidato:</strong> ${propuestaEstudiantes.ID_CAN}`
  );

  $("#propuestas_docentes h2").text("Propuesta para los docentes");
  $("#propuestas_docentes p").html(
    `<strong>Nombre:</strong> ${propuestaDocentes.NOM_PRO}<br>
     <strong>Grupo Dirigido:</strong> ${propuestaDocentes.GRUP_DIR_PRO}<br>
     <strong>Información:</strong> ${propuestaDocentes.INF_PRO}<br>
     <strong>ID del Candidato:</strong> ${propuestaDocentes.ID_CAN}`
  );

  $("#propuestas_administrativo h2").text("Propuesta para administrativo");
  $("#propuestas_administrativo p").html(
    `<strong>Nombre:</strong> ${propuestaAdministrativo.NOM_PRO}<br>
     <strong>Grupo Dirigido:</strong> ${propuestaAdministrativo.GRUP_DIR_PRO}<br>
     <strong>Información:</strong> ${propuestaAdministrativo.INF_PRO}<br>
     <strong>ID del Candidato:</strong> ${propuestaAdministrativo.ID_CAN}`
  );
  $("#propuestas_facultades h2").text("Propuesta para las facultades");
  $("#propuestas_facultades p").html(
    `<strong>Nombre:</strong> ${propuestaFacultades.NOM_PRO}<br>
     <strong>Grupo Dirigido:</strong> ${propuestaFacultades.GRUP_DIR_PRO}<br>
     <strong>Información:</strong> ${propuestaFacultades.INF_PRO}<br>
     <strong>ID del Candidato:</strong> ${propuestaFacultades.ID_CAN}`
  );
  
};

$(document).ready(async () => {
  const propuestaEstudiantes = await getPropuestaByID(1);
  const propuestaDocentes = await getPropuestaByID(2);
  const propuestaAdministrativo = await getPropuestaByID(2);
  const propuestaFacultades = await getPropuestaByID(2);
  displayPropuestas(propuestaDocentes, propuestaEstudiantes, propuestaAdministrativo, propuestaFacultades);
});

// Función para mostrar la sección correcta y activar el botón correspondiente
function showSection(sectionId, buttonId) {
  // Ocultar todas las secciones
  const allSections = document.querySelectorAll(".tab-content");
  allSections.forEach(section => section.style.display = "none");

  // Mostrar la sección seleccionada
  document.getElementById(sectionId).style.display = "block";

  // Quitar la clase "active" de todos los botones
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach(button => button.classList.remove("active"));

  // Agregar la clase "active" al botón seleccionado
  document.getElementById(buttonId).classList.add("active");
}

// Asignar eventos a los botones
document.getElementById("btn-estudiantes").addEventListener("click", function() {
  showSection('propuestas_estudiantes', 'btn-estudiantes');
});

document.getElementById("btn-docentes").addEventListener("click", function() {
  showSection('propuestas_docentes', 'btn-docentes');
});

document.getElementById("btn-administrativo").addEventListener("click", function() {
  showSection('propuestas_administrativo', 'btn-administrativo');
});

document.getElementById("btn-facultades").addEventListener("click", function() {
  showSection('propuestas_facultades', 'btn-facultades');
});