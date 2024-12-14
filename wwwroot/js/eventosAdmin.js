const URL = "http://localhost:4000/MCSPROJECT";

const addNoticia = async (noticia, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("nombre", noticia.nombre);
    const fechaSeleccionada = noticia.fecha;
    const fechaFormateada = fechaSeleccionada.split(".")[0].replace("T", " ");

    formData.append("fecha", fechaFormateada);

    formData.append("fecha", fechaFormateada);
    formData.append("informacion", noticia.informacion);
    formData.append("ubicacion", noticia.ubicacion);

    if (imageFile) {
      formData.append("imagen", imageFile);
    }

    const response = await $.ajax({
      url: `${URL}/eventos_noticias/addEventoNoticia`,
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error al insertar la noticia:", error);
    showErrorAlert("Hubo un error al insertar la noticia");
  }
};

async function saveNoticia(noticia, imageFile) {
  try {
    const formData = new FormData();
    formData.append("id", noticia.id);
    formData.append("nombre", noticia.nombre);
    formData.append("fecha", noticia.fecha);
    formData.append("informacion", noticia.informacion);
    formData.append("ubicacion", noticia.ubicacion);
    if (imageFile) {
      formData.append("imagen", imageFile);
    }

    const response = await $.ajax({
      url: `${URL}/eventos_noticias/updateEventoNoticia`,
      type: "PUT",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar la noticia:", error);
    showErrorAlert("Hubo un error al actualizar la noticia");
  }
}

async function showNoticias() {
  try {
    const response = await $.ajax({
      url: `${URL}/eventos_noticias/getEventosNoticiasAll`,
      type: "GET",
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    showErrorAlert("Hubo un error al cargar las noticias");
  }
}

async function changeNoticiaStatus(noticiaId, currentStatus) {
  try {
    const nuevoEstado = currentStatus === 1 ? 0 : 1;
    
    console.log("Enviando datos:", {
      id: noticiaId,
      estado: nuevoEstado
    });

    const response = await $.ajax({
      url: `${URL}/eventos_noticias/toggleStatus`,
      type: "PUT",
      data: JSON.stringify({
        id: noticiaId,
        estado: nuevoEstado
      }),
      contentType: "application/json",
      dataType: "json",
      
      // Añade estos para más información de depuración
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error AJAX:", {
          status: jqXHR.status,
          responseText: jqXHR.responseText,
          textStatus: textStatus,
          errorThrown: errorThrown
        });
      }
    });

    if (response.success) {
      showSuccessAlert("Estado de la noticia actualizado exitosamente");
      loadNoticias();
    } else {
      showErrorAlert("No se pudo actualizar el estado de la noticia");
    }
  } catch (error) {
    console.error("Error al cambiar el estado de la noticia:", error);
    showErrorAlert("Hubo un error al cambiar el estado de la noticia");
  }
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
    loadNoticias();
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
  console.log(usuario);
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

  console.log(menus);

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

async function loadNoticias() {
  try {
    const datos = await showNoticias();
    //console.log(datos);
    let tableBody = document.getElementById("tbody");
    let rows = "";

    for (const noticia of datos.response) {
      let fechaFormateada = new Date(noticia.FEC_EVE_NOT).toLocaleString(
        "es-ES"
      );

      let maxLength = 100;
      let infoText =
        noticia.INF_EVE_NOT.length > maxLength
          ? noticia.INF_EVE_NOT.substring(0, maxLength) + "..."
          : noticia.INF_EVE_NOT;

      let id = `<td>${noticia.ID_EVE_NOT}</td>`;
      let name = `<td>${noticia.NOM_EVE_NOT}</td>`;
      let fecha = `<td>${fechaFormateada}</td>`;
      let info = `<td>${infoText}</td>`;
      let ubicacion = `<td>${noticia.UBI_EVE_NOT}</td>`;

      let imagenDisplay = noticia.IMG_EVE_NOT
        ? `<td><img src="${noticia.IMG_EVE_NOT}" alt="Imagen" style="max-width: 100px; max-height: 100px; display: block; margin: 0 auto;"></td>`
        : `<td>Sin imagen</td>`;

      let activo = `
          <td>
            <input type="checkbox" class="estado-checkbox" data-id="${
              noticia.ID_EVE_NOT
            }" ${noticia.ESTADO ? "checked" : ""} disabled>
          </td>`;

      let actionButtons = `
          <td>
          <button class="btn btn-primary edit-btn" data-id="${noticia.ID_EVE_NOT}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger delete-btn" data-id="${noticia.ID_EVE_NOT}" data-estado="${noticia.ESTADO}"><i class="fas fa-trash-alt"></i></button>
        </td>`;

      rows += `<tr>${
        id +
        name +
        fecha +
        info +
        ubicacion +
        imagenDisplay +
        activo +
        actionButtons
      }</tr>`;
    }

    tableBody.innerHTML = rows;
    // Añadir event listeners para los botones de eliminar
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const noticiaID = this.getAttribute("data-id");
        const currentStatus = this.getAttribute("data-estado") === 1;

        // Personalizar el mensaje según el estado actual
        const confirmationMessage = currentStatus 
          ? "¿Quieres cambiar el estado de la noticia a oculta?" 
          : "¿Quieres cambiar el estado de la noticia a visible?";

        showConfirmationQuestion(
          confirmationMessage,
          function (confirmed) {
            if (confirmed) {
              changeNoticiaStatus(noticiaID, currentStatus);
            }
          }
        );
      });
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async function () {
        const noticiaID = this.getAttribute("data-id");
        const noticia = datos.response.find((u) => u.ID_EVE_NOT == noticiaID);
        document.getElementById("editNewsId").value = noticia.ID_EVE_NOT;
        document.getElementById("editNewsTitle").value = noticia.NOM_EVE_NOT;
        let fechaFormated = new Date(noticia.FEC_EVE_NOT)
          .toISOString()
          .slice(0, 16);
        document.getElementById("editNewsDate").value = fechaFormated;
        document.getElementById("editNewsContent").value = noticia.INF_EVE_NOT;
        document.getElementById("editNewsLocation").value = noticia.UBI_EVE_NOT;
        $("#editModal").modal("show");
      });
    });

    const saveChangesButton = document.getElementById("saveChanges");
    saveChangesButton.removeEventListener("click", handleSaveChanges);
    saveChangesButton.addEventListener("click", handleSaveChanges);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function handleSaveChanges() {
  const updatedNoticia = {
    id: document.getElementById("editNewsId").value,
    nombre: document.getElementById("editNewsTitle").value,
    fecha: formatDate(document.getElementById("editNewsDate").value),
    informacion: document.getElementById("editNewsContent").value,
    ubicacion: document.getElementById("editNewsLocation").value,
    //activo: document.getElementById("newsActiveStatus").checked ? 1 : 0,
  };

  const imageFile = document.getElementById("editNewsImage").files[0];

  try {
    let response = await saveNoticia(updatedNoticia, imageFile);

    if (response.success) {
      showSuccessAlert("Noticia actualizada exitosamente");
      $("#editModal").modal("hide");
      loadNoticias();
    } else {
      showErrorAlert("Error al actualizar la noticia");
    }
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    showErrorAlert("Hubo un error al intentar guardar los cambios");
  }
}

function formatDate(dateString) {
  const d = new Date(dateString);

  if (isNaN(d.getTime())) {
    console.error("Fecha inválida:", dateString);
    return null;
  }

  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

document.getElementById("addNoticiaBtn").addEventListener("click", async () => {
  $("#addNoticiaModal").modal("show");
});

document
  .getElementById("addNoticiaForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const Noticia = {
      nombre: document.getElementById("nombre").value,
      fecha: formatDate(document.getElementById("fecha").value),
      informacion: document.getElementById("informacion").value,
      ubicacion: document.getElementById("ubicacion").value,
      //activo: document.getElementById("activeStatus").checked ? 1 : 0,
    };

    const imageFile = document.getElementById("imagen").files[0];

    if (imageFile) {
      try {
        let response = await addNoticia(Noticia, imageFile);
        console.log("Noticia registrada exitosamente:", response);
        showSuccessAlert("Noticia registrada exitosamente");

        $("#addNoticiaModal").modal("hide");
        document.getElementById("addNoticiaForm").reset();

        loadNoticias();
      } catch (error) {
        console.error("Error durante el registro:", error);
        showErrorAlert("Ocurrió un error durante el registro");
      }
    } else {
      showErrorAlert("Por favor, seleccione una imagen para la noticia");
    }
  });

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
