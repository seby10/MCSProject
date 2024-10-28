const URL = "http://localhost:4000/MCSPROJECT";

const getPropuestaByGrupDir = async (grup) => {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/getPropuestas/${grup}`,
      type: "GET",
      dataType: "json",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al obtener las propuestas:", error);
  }
};

const encabezadosSeccionEstudiantes = document.querySelectorAll(
  "#propuestas_estudiantes h2"
);
encabezadosSeccionEstudiantes.forEach((encabezado) => {
  encabezado.textContent = "Propuestas enfocada a los estudiantes";
});

const encabezadosSeccionDocentes = document.querySelectorAll(
  "#propuestas_docentes h2"
);
encabezadosSeccionDocentes.forEach((encabezado) => {
  encabezado.textContent = "Propuestas enfocada a los docentes";
});
const encabezadosSeccionAdministrativo = document.querySelectorAll(
  "#propuestas_administrativo h2"
);
encabezadosSeccionAdministrativo.forEach((encabezado) => {
  encabezado.textContent = "Propuestas enfocada al área de Administrativo";
});
const encabezadosSeccionFacultades = document.querySelectorAll(
  "#propuestas_facultades h2"
);
encabezadosSeccionFacultades.forEach((encabezado) => {
  encabezado.textContent = "Propuestas enfocada a los Facultades";
});

const displayPropuestas = (propuestas, sectionId) => {
  const section = document.getElementById(sectionId);
  const propuestasContainer = section.querySelector(".propuestas");
  let contador = 1;

  // Limpiar el contenido previo
  propuestasContainer.innerHTML = "";

  // Iterar sobre el array de propuestas y mostrar cada una
  propuestas.forEach((propuesta) => {
    const propuestaHTML = `
    <section class="about_section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-md-6 px-0">
            <div class="img_container">
              <div class="img-box">
                <img src="images/${
                  propuesta.GRUP_DIR_PRO
                }${contador}.jpg" alt="" />
              </div>
            </div>
          </div>
              <div class="col-md-6 px-0">
                <div class="detail-box">
                 <div class="heading_container">
                    <h2>Propuesta ${contador}</h2>
                    <div class="propuesta">
                      <p><strong>Nombre:</strong> ${
                        propuesta.NOM_PRO || "No disponible"
                      }</p>
                      <p><strong>Información:</strong> ${
                        propuesta.INF_PRO || "No disponible"
                      }</p>
                    </div>
                 </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
      
    `;
    propuestasContainer.innerHTML += propuestaHTML; // Agregar cada propuesta a la sección
    contador++;
  });
};

// Asignar eventos a los botones para mostrar las propuestas según el grupo
document
  .getElementById("btn-estudiantes")
  .addEventListener("click", async function () {
    const propuestasEstudiantes = await getPropuestaByGrupDir("ESTUDIANTE");
    displayPropuestas(propuestasEstudiantes, "propuestas_estudiantes");
    showSection("propuestas_estudiantes", "btn-estudiantes");
  });

document
  .getElementById("btn-docentes")
  .addEventListener("click", async function () {
    const propuestasDocentes = await getPropuestaByGrupDir("DOCENTE");
    displayPropuestas(propuestasDocentes, "propuestas_docentes");
    showSection("propuestas_docentes", "btn-docentes");
  });

document
  .getElementById("btn-administrativo")
  .addEventListener("click", async function () {
    const propuestasAdministrativo = await getPropuestaByGrupDir(
      "ADMINISTRATIVO"
    );
    displayPropuestas(propuestasAdministrativo, "propuestas_administrativo");
    showSection("propuestas_administrativo", "btn-administrativo");
  });

document
  .getElementById("btn-facultades")
  .addEventListener("click", async function () {
    const propuestasFacultades = await getPropuestaByGrupDir("FACULTADES");
    displayPropuestas(propuestasFacultades, "propuestas_facultades");
    showSection("propuestas_facultades", "btn-facultades");
  });

// Función para mostrar la sección correcta y activar el botón correspondiente
function showSection(sectionId, buttonId) {
  // Ocultar todas las secciones
  const allSections = document.querySelectorAll(".tab-content");
  allSections.forEach((section) => (section.style.display = "none"));

  // Mostrar la sección seleccionada
  document.getElementById(sectionId).style.display = "block";

  // Quitar la clase "active" de todos los botones
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((button) => button.classList.remove("active"));

  // Agregar la clase "active" al botón seleccionado
  document.getElementById(buttonId).classList.add("active");
}

const loadInitialPropuestas = async () => {
  const propuestasEstudiantes = await getPropuestaByGrupDir("ESTUDIANTE");
  displayPropuestas(propuestasEstudiantes, "propuestas_estudiantes");
  showSection("propuestas_estudiantes", "btn-estudiantes"); // Mostrar la sección de estudiantes
};

loadInitialPropuestas();
