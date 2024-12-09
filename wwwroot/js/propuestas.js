const URL = "http://localhost:4000/MCSPROJECT";

// Función para obtener las propuestas de una categoría
const getPropuestaByGrupDir = async (grup) => {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/getPropuestas/${grup}`,
      type: "GET",
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener las propuestas:", error);
  }
};

// Función para obtener las categorías disponibles
const getCategorias = async () => {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/categorias`,
      type: "GET",
      dataType: "json",
    });
    return response[0];
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
};

const generarSecciones = async () => {
  const categorias = await getCategorias();
  if (!categorias || categorias.length === 0) return;

  const mainContainer = document.querySelector("main"); // Contenedor principal de las secciones
  if (!mainContainer) {
    console.error("No se encontró el contenedor principal <main> en el DOM.");
    return;
  }

  categorias.forEach((categoria) => {
    const groupName = categoria.categoria;
    const sectionId = `propuestas_${groupName.toUpperCase()}`;

    // Verificar si la sección ya existe para evitar duplicados
    if (!document.getElementById(sectionId)) {
      const section = document.createElement("section");
      section.id = sectionId;
      section.classList.add("tab-content");
      section.style.display = "none"; // Ocultar por defecto

      // Agregar un contenedor interno para las propuestas
      section.innerHTML = `
        <div class="propuestas">
          <p>No hay propuestas disponibles para esta categoría aún.</p>
        </div>
      `;

      mainContainer.appendChild(section); // Agregar la nueva sección al contenedor principal
    }
  });
};

generarSecciones();



// Almacén de grupos seleccionados (para permitir múltiples selecciones)
const selectedGroups = new Set();

// Función para generar los botones dinámicamente
const generarBotones = async () => {
  const categorias = await getCategorias();
  if (!categorias || categorias.length === 0) return;

  const tabMenu = document.querySelector(".tab-menu");
  if (!tabMenu) return;

  tabMenu.innerHTML = ""; // Limpiar botones previos

  categorias.forEach((categoria) => {
    const groupName = categoria.categoria;
    if (!groupName) return;

    const button = document.createElement("button");
    button.classList.add("tab-button");
    button.setAttribute("data-group", groupName);
    button.textContent = groupName.charAt(0).toUpperCase() + groupName.slice(1).toLowerCase();

    button.addEventListener("click", async () => {
      if (selectedGroups.has(groupName)) {
        selectedGroups.delete(groupName);  // Si ya está seleccionado, desmarcar
        button.classList.remove("active");
      } else {
        selectedGroups.add(groupName);  // Si no está seleccionado, marcar
        button.classList.add("active");
      }
      // Actualizar las propuestas mostradas según las categorías seleccionadas
      await updateDisplayedPropuestas();
      actualizarEncabezado();
    });

    tabMenu.appendChild(button);
  });
};

// Función para actualizar el encabezado general
function actualizarEncabezado() {
  const encabezado = document.querySelector("#encabezado h2");
  if (selectedGroups.size === 0) {
    encabezado.textContent = "Selecciona una o más categorías para ver las propuestas";
  } else {
    encabezado.textContent = `Mostrando propuestas para: ${Array.from(selectedGroups)
      .map((group) => group.charAt(0).toUpperCase() + group.slice(1).toLowerCase())
      .join(", ")}`;
  }
}

// Función para mostrar las propuestas de las categorías seleccionadas
const displayPropuestas = (propuestas, group) => {
  const sectionId = `propuestas_${group.toUpperCase()}`;
  const section = document.getElementById(sectionId);

  if (!section) {
    console.error(`No se encontró la sección con ID ${sectionId}.`);
    return;
  }

  // Limpiar el contenido previo de la sección
  const propuestasContainer = section.querySelector(".propuestas");
  propuestasContainer.innerHTML = "";

  let contador = 1;

  // Añadir las propuestas correspondientes
  propuestas.forEach((propuesta) => {
    const propuestaHTML = `
      <section class="about_section layout_padding">
        <div class="container">
          <div class="row">
            <div class="col-md-6 px-0">
              <div class="img_container">
                <div class="img-box">
                  <img src="images/${propuesta.GRUP_DIR_PRO}${contador}.jpg" alt="Propuesta ${contador}" />
                </div>
              </div>
            </div>
            <div class="col-md-6 px-0">
              <div class="detail-box">
                <div class="heading_container">
                  <h2>Propuesta ${contador}</h2>
                  <div class="propuesta">
                    <p><strong>Nombre:</strong> ${propuesta.NOM_PRO || "No disponible"}</p>
                    <p><strong>Información:</strong> ${propuesta.INF_PRO || "No disponible"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    propuestasContainer.innerHTML += propuestaHTML;
    contador++;
  });

  // Mostrar la sección
  section.style.display = "block";
};


// Función para actualizar las propuestas mostradas
async function updateDisplayedPropuestas() {
  for (const group of selectedGroups) {
    const propuestas = await getPropuestaByGrupDir(group);
    if (propuestas) {
      displayPropuestas(propuestas, group);
    }
  }

  // Ocultar secciones que no están seleccionadas
  const allSections = document.querySelectorAll(".tab-content");
  allSections.forEach((section) => {
    const group = section.id.replace("propuestas_", "");
    if (!selectedGroups.has(group)) {
      section.style.display = "none";
    }
  });
}
// Iniciar generando los botones
(async () => {
  await generarSecciones(); // Crear las secciones dinámicas según las categorías
  await generarBotones();   // Crear los botones dinámicos
})();

