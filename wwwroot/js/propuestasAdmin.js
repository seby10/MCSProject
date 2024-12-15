const URL = "http://localhost:4000/MCSPROJECT";

async function deletePropuesta(id) {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/deletePropuesta/${id}`,
      type: "DELETE",
      dataType: "json",
    });

    // Verificar si la respuesta contiene el campo 'message' y no es un error
    if (response.message === "Propuesta eliminada con éxito") {
      showSuccessAlert("Propuesta eliminada exitosamente");
      loadPropuestas();
    } else {
      // Si no es la respuesta esperada, mostrar un error
      showErrorAlert("Error al eliminar la propuesta");
    }
  } catch (error) {
    console.error("Error eliminando propuesta: ", error);
    showErrorAlert("No se pudo eliminar la propuesta");
  }
}

function confirmDeletePropuesta(propuestaId) {
  showConfirmationQuestion(
    "¿Estás seguro de eliminar esta propuesta?",
    (confirmed) => {
      if (confirmed) {
        deletePropuesta(propuestaId);
      }
    }
  );
}

async function addPropuesta(propuesta, imageFile) {
  try {
    const formData = new FormData();
    formData.append("NOM_PRO", propuesta.NOM_PRO);
    formData.append("GRUP_DIR_PRO", propuesta.GRUP_DIR_PRO);
    formData.append("INF_PRO", propuesta.INF_PRO);
    formData.append("ID_CANT_PRO", propuesta.ID_CANT_PRO);
    if (imageFile) {
      formData.append("image", imageFile); // Añadir el archivo al FormData solo si existe
    }

    const response = await $.ajax({
      url: `${URL}/propuestas/insertPropuesta`,
      type: "POST",
      data: formData,
      processData: false, // Evitar que jQuery convierta los datos
      contentType: false, // Dejar que el navegador gestione el tipo de contenido
    });

    if (response.message == "Propuesta creada con éxito") {
      showSuccessAlert("Propuesta agregada exitosamente");
      loadPropuestas();
    } else {
      showErrorAlert("Error al agregar la propuesta");
    }
  } catch (error) {
    console.error("Error agregando propuesta: ", error);
    showErrorAlert("No se pudo agregar la propuesta");
  }
}

document
  .getElementById("addRoleForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("roleName").value.trim();
    const group = document.getElementById("roleGroup").value.trim();
    const description = document.getElementById("rDescription").value.trim();
    const candidateId = document.getElementById("rCandidateSelect").value;
    const imageFile = document.getElementById("addUrlImagen").files[0]; // Obtener el archivo de imagen

    // Validación de campos
    if (!name || !group || !description || !candidateId) {
      showErrorAlert("Todos los campos son obligatorios");
      return;
    }

    const propuesta = {
      NOM_PRO: name,
      GRUP_DIR_PRO: group,
      INF_PRO: description,
      ID_CANT_PRO: candidateId, // Incluye el ID del candidato seleccionado
    };

    // Llamar a la función para agregar la propuesta, pasando también el archivo
    addPropuesta(propuesta, imageFile);
    $("#addRoleModal").modal("hide");
  });

async function updatePropuesta(propuesta, imageFile) {
  try {
    const formData = new FormData();
    formData.append("ID_PRO", propuesta.ID_PRO); // Agregar ID de la propuesta
    formData.append("NOM_PRO", propuesta.NOM_PRO);
    formData.append("GRUP_DIR_PRO", propuesta.GRUP_DIR_PRO);
    formData.append("INF_PRO", propuesta.INF_PRO);
    formData.append("ID_CANT_PRO", propuesta.ID_CANT_PRO);
    formData.append("ESTADO", propuesta.ESTADO); // Asegúrate de incluir estado

    // Si se ha cargado una nueva imagen, añadirla al FormData
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await $.ajax({
      url: `${URL}/propuestas/updatePropuesta`, // Endpoint para actualizar
      type: "PUT", // O PATCH dependiendo de la implementación del backend
      data: formData,
      processData: false,
      contentType: false,
    });

    if (response.message === "Propuesta actualizada con éxito") {
      showSuccessAlert("Propuesta actualizada exitosamente");
      loadPropuestas(); // Recargar las propuestas
    } else {
      showErrorAlert("Error al actualizar la propuesta");
    }
  } catch (error) {
    console.error("Error actualizando propuesta: ", error);
    showErrorAlert("No se pudo actualizar la propuesta");
  }
}

document.getElementById("saveChanges").addEventListener("click", function () {
  const id = document.getElementById("editRoleId").value;
  const name = document.getElementById("editRoleName").value.trim();
  const group = document.getElementById("editRoleGroup").value.trim();
  const description = document.getElementById("editDescription").value.trim();
  const estado = document.getElementById("editEstado").checked ? 1 : 0;
  const candidateId = document.getElementById("candidateSelect").value;
  const file = document.getElementById("editUrlImagen").files[0]; // Obtener archivo de imagen

  // Validación de campos
  if (!id || !name || !group || !description || !candidateId) {
    showErrorAlert("Todos los campos son obligatorios");
    return;
  }

  const propuesta = {
    ID_PRO: id,
    NOM_PRO: name,
    GRUP_DIR_PRO: group,
    INF_PRO: description,
    ESTADO: estado,
    ID_CANT_PRO: candidateId,
  };

  // Llamar a la función para actualizar la propuesta
  updatePropuesta(propuesta, file);
  $("#editModal").modal("hide"); // Cerrar el modal
});

async function loadCandidates() {
  try {
    // Realizamos la solicitud AJAX para obtener los candidatos
    const response = await $.ajax({
      url: `${URL}/candidatos/getCandidatos`, // Endpoint para obtener los candidatos
      type: "GET",
      dataType: "json",
    });

    // Verificamos si la respuesta contiene un campo 'response' que es un arreglo
    if (response.response && Array.isArray(response.response)) {
      // Si la respuesta tiene el campo 'response' como arreglo de candidatos
      const options = response.response
        .map(
          (candidate) =>
            `<option value="${candidate.ID_CAN}">${candidate.NOM_CAN} ${candidate.APE_CAN}</option>`
        )
        .join(""); // Unimos las opciones con un salto de línea entre ellas

      // Insertamos las opciones dentro del select
      const candidateSelect = document.getElementById("candidateSelect");
      candidateSelect.innerHTML = options;
    } else {
      // Si no se encuentra el campo 'response' o no es un arreglo, mostramos un error
      console.error(
        "Error: La estructura de la respuesta no contiene un arreglo de candidatos",
        response
      );
      showErrorAlert("No se pudieron cargar los candidatos");
    }
  } catch (error) {
    // Si ocurre un error durante la solicitud AJAX, lo mostramos en consola
    console.error("Error cargando candidatos: ", error);
    showErrorAlert("No se pudieron cargar los candidatos");
  }
}
async function loadCandidatesPropuestas() {
  try {
    // Realizamos la solicitud AJAX para obtener los candidatos
    const response = await $.ajax({
      url: `${URL}/candidatos/getCandidatos`, // Endpoint para obtener los candidatos
      type: "GET",
      dataType: "json",
    });

    // Verificamos si la respuesta contiene un campo 'response' que es un arreglo
    if (response.response && Array.isArray(response.response)) {
      // Si la respuesta tiene el campo 'response' como arreglo de candidatos
      const options = response.response
        .map(
          (candidate) =>
            `<option value="${candidate.ID_CAN}">${candidate.NOM_CAN} ${candidate.APE_CAN}</option>`
        )
        .join(""); // Unimos las opciones con un salto de línea entre ellas

      // Insertamos las opciones dentro del select
      const candidateSelect = document.getElementById("rCandidateSelect");
      candidateSelect.innerHTML = options;
    } else {
      // Si no se encuentra el campo 'response' o no es un arreglo, mostramos un error
      console.error(
        "Error: La estructura de la respuesta no contiene un arreglo de candidatos",
        response
      );
      showErrorAlert("No se pudieron cargar los candidatos");
    }
  } catch (error) {
    // Si ocurre un error durante la solicitud AJAX, lo mostramos en consola
    console.error("Error cargando candidatos: ", error);
    showErrorAlert("No se pudieron cargar los candidatos");
  }
}

async function showPropuestas() {
  const response = await $.ajax({
    url: `${URL}/propuestas/getPropuestas`,
    type: "GET",
    dataType: "json",
  });
  return response;
}

function showErrorAlert(message) {
  iziToast.error({
    title: "Error",
    message: message,
    position: "topRight",
  });
}

function showSuccessAlert(message) {
  iziToast.success({
    title: "Success",
    message: message,
    position: "topRight",
  });
}

function exito() {
  showSuccessAlert("Exito");
}
function error() {
  showErrorAlert("Error");
}

document.addEventListener("DOMContentLoaded", function () {
  loadCandidatesPropuestas();
  cargarUsuario();
  cargarMenus();
  loadPropuestas();
});
function showConfirmationQuestion(message, callback) {
  iziToast.question({
    title: "Confirmation",
    message: message,
    position: "center",
    timeout: false,
    close: false,
    overlay: true,
    buttons: [
      [
        "<button><b>Yes</b></button>",
        function (instance, toast) {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          if (callback) callback(true);
        },
        true,
      ],
      [
        "<button>No</button>",
        function (instance, toast) {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          if (callback) callback(false);
        },
      ],
    ],
  });
}

const usuario = JSON.parse(sessionStorage.getItem("user"));

if (!usuario) {
  window.location.replace("login");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    cargarUsuario(usuario);
    cargarMenus();
    loadPropuestas();
  });
}
function cargarUsuario() {
  const usuario = JSON.parse(sessionStorage.getItem("user"));

  if (usuario) {
    const nombreUsuario = usuario.name;
    document.querySelector(".text-gray-600.small").textContent = nombreUsuario;
  } else {
    const loginButton = document.createElement("a");
    loginButton.href = "login";
    loginButton.classList.add("btn", "btn-primary", "btn-sm");
    loginButton.textContent = "Iniciar sesión";

    const container = document.querySelector(".text-gray-600.small");
    container.textContent = "";
    container.appendChild(loginButton);
  }
}
function cargarMenus() {
  const usuario = JSON.parse(sessionStorage.getItem("user"));
  const menus = [];
  if (usuario && usuario.role) {
    if (usuario.role === "admin") {
      menus.push(
        { MenuLink: "/candidatos_catalog", MenuName: "Candidatos" },
        { MenuLink: "/noticias_catalog", MenuName: "Noticias/Eventos" },
        { MenuLink: "/propuestas_catalog", MenuName: "Propuestas" },
        { MenuLink: "/sugerencias_catalog", MenuName: "Sugerencias/Votos" }
      );
    } else if (usuario.role === "super_admin") {
      menus.push(
        { MenuLink: "/admin_catalog", MenuName: "Administradores" },
        { MenuLink: "/candidatos_catalog", MenuName: "Candidatos" },
        { MenuLink: "/noticias_catalog", MenuName: "Noticias/Eventos" },
        { MenuLink: "/propuestas_catalog", MenuName: "Propuestas" },
        { MenuLink: "/sugerencias_catalog", MenuName: "Sugerencias/Votos" }
      );
    }
  }

  if (menus.length > 0) {
    const menuContainer = document.getElementById("dynamicMenuContainer");

    menuContainer.innerHTML = "";

    menus.forEach((menu) => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("nav-item");

      menuItem.innerHTML = `
        <a class="nav-link" href="${menu.MenuLink}">
          <i class="fas fa-fw fa-circle"></i>
          <span>${menu.MenuName}</span>
        </a>
      `;

      menuContainer.appendChild(menuItem);
    });
  } else {
    console.log("No hay menús disponibles o rol no válido");
  }
}

async function loadPropuestas() {
  try {
    const datos = await showPropuestas(); // Cambia esta función para obtener datos desde tu backend
    let tableBody = document.getElementById("tbody");
    let rows = "";

    for (const propuesta of datos.response) {
      let maxLength = 30;
      let infoText =
        propuesta.INF_PRO.length > maxLength
          ? propuesta.INF_PRO.substring(0, maxLength) + "..."
          : propuesta.INF_PRO;

      let id = `<td>${propuesta.ID_PRO}</td>`;
      let name = `<td>${propuesta.NOM_PRO}</td>`;
      let group = `<td>${propuesta.GRUP_DIR_PRO}</td>`;
      let info = `<td>${infoText}</td>`;
      let estado = `<td>${propuesta.ESTADO ? "Activo" : "Inactivo"}</td>`;
      let imagenDisplay = propuesta.URL_IMAGEN
        ? `<td><img src="${propuesta.URL_IMAGEN}" alt="Imagen" style="max-width: 100px; max-height: 100px; display: block; margin: 0 auto;"></td>`
        : `<td>Sin imagen</td>`;

      let actionButtons = `
        <td>
          <button class="btn btn-primary edit-btn mr-2" data-id="${propuesta.ID_PRO}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger delete-btn" data-id="${propuesta.ID_PRO}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>`;

      rows += `<tr>${
        id + name + group + info + estado + imagenDisplay + actionButtons
      }</tr>`;
    }

    tableBody.innerHTML = rows;

    // Asignar eventos a los botones
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const propuestaId = this.getAttribute("data-id");
        confirmDeletePropuesta(propuestaId); // Implementa esta función
      });
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async function () {
        const propuestaId = this.getAttribute("data-id");
        const propuesta = datos.response.find((u) => u.ID_PRO == propuestaId);

        // Llenar campos del modal
        document.getElementById("editRoleId").value = propuesta.ID_PRO;
        document.getElementById("editRoleName").value = propuesta.NOM_PRO;
        document.getElementById("editRoleGroup").value = propuesta.GRUP_DIR_PRO;
        document.getElementById("editDescription").value = propuesta.INF_PRO;
        const estadoCheckbox = document.getElementById("editEstado");
        estadoCheckbox.checked = propuesta.ESTADO === 1;

        // Cargar candidatos y seleccionar el actual
        await loadCandidates(); // Asegúrate de que esta función se ejecute
        document.getElementById("candidateSelect").value =
          propuesta.ID_CANT_PRO;

        $("#editModal").modal("show");
      });
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

document.getElementById("logoutButton").addEventListener("click", function () {
  showConfirmationQuestion(
    "Are you sure you want to logout?",
    function (confirmed) {
      if (confirmed) {
        sessionStorage.removeItem("user");
        window.location.href = "login";
      }
    }
  );
});
