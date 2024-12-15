

// Función para obtener la lista de candidatos
const getCandidatosPropuestas = async () => {
  const response = await $.ajax({
    url: `${URL}/candidatos/getCandidatos`,
    type: "GET",
    dataType: "json",
  });
  console.log(response.response);
  return response.response;
};

// Almacén de candidatos seleccionados
const selectedCandidates = new Set();

const generarBotonesCandidatos = async () => {
  const candidatos = await getCandidatosPropuestas();
  if (!Array.isArray(candidatos) || candidatos.length === 0) {
    console.error("La lista de candidatos no es válida o está vacía.");
    return;
  }

  const candidatoContainer = document.querySelector(".candidato-menu");
  if (!candidatoContainer) return;

  candidatoContainer.innerHTML = ""; // Limpiar botones previos

  candidatos.forEach((candidato) => {
    const button = document.createElement("button");
    button.classList.add("tab-button"); // Usamos la misma clase para estilo
    button.setAttribute("data-candidato-id", candidato.ID_CAN);
    button.textContent = `${candidato.NOM_CAN}`;

    button.addEventListener("click", async () => {
      if (selectedCandidates.has(candidato.ID_CAN)) {
        // Si el candidato ya está seleccionado, desmarcar
        selectedCandidates.delete(candidato.ID_CAN);
        button.classList.remove("active");
      } else {
        // Si no está seleccionado, marcar
        selectedCandidates.add(candidato.ID_CAN);
        button.classList.add("active");
      }

      // Actualizar las propuestas mostradas
      await updateDisplayedPropuestas();
      actualizarEncabezado();
    });

    candidatoContainer.appendChild(button);
  });
};


// Función para obtener las propuestas de una categoría
const getPropuestaByGrupDir = async (grup, candidatoId = null) => {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/getPropuestas/${grup}`,
      type: "GET",
      data: { idCandidato: candidatoId }, // Se pasa el idCandidato como parámetro de la query
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

function actualizarEncabezado() {
  const encabezado = document.querySelector("#encabezado h2");

  if (selectedGroups.size === 0) {
    encabezado.textContent = "Selecciona una o más categorías para ver las propuestas";
  } else {
    const candidatosSeleccionados = Array.from(selectedCandidates).join(", ");
    const categoriasSeleccionadas = Array.from(selectedGroups)
      .map((group) => group.charAt(0).toUpperCase() + group.slice(1).toLowerCase())
      .join(", ");

    encabezado.textContent = `Mostrando propuestas de ${candidatosSeleccionados || "todos los candidatos"} para: ${categoriasSeleccionadas}`;
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

  // Añadir las propuestas correspondientes
  propuestas.forEach((propuesta, index) => {
    const propuestaHTML = `
      <section class="about_section layout_padding">
        <div class="container">
          <div class="row">
            <div class="col-md-6 px-0">
              <div class="img_container">
                <div class="img-box">
                  <img src="${propuesta.URL_IMAGEN || "images/estudiante1.jpg"}" alt="Propuesta ${index + 1}" />
                </div>
              </div>
            </div>
            <div class="col-md-6 px-0">
              <div class="detail-box">
                <div class="heading_container">
                  <h2>Propuesta</h2>
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
  });

  // Mostrar la sección
  section.style.display = "block";
};


async function updateDisplayedPropuestas() {
  if (selectedCandidates.size > 0) {
    // Si hay candidatos seleccionados, mostrar propuestas de esos candidatos
    for (const group of selectedGroups) {
      let allPropuestas = [];

      for (const candidatoId of selectedCandidates) {
        const propuestas = await getPropuestaByGrupDir(group, candidatoId);
        if (propuestas) allPropuestas = allPropuestas.concat(propuestas);
      }

      // Mostrar todas las propuestas para el grupo
      displayPropuestas(allPropuestas, group);
    }
  } else {
    // Si no hay candidatos seleccionados, mostrar propuestas de todos los candidatos
    for (const group of selectedGroups) {
      const propuestas = await getPropuestaByGrupDir(group, null); // Pasar null para incluir todos los candidatos
      if (propuestas) displayPropuestas(propuestas, group);
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



(async () => {
  await generarSecciones();
  await generarBotones(); 
  await generarBotonesCandidatos();  
})();

