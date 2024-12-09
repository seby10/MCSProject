const URL = "http://localhost:4000/MCSPROJECT";

document.addEventListener("DOMContentLoaded", function () {
  cargarUsuario();
  cargarMenus();
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
    const response = await $.ajax({
      url: `${URL}/eventos_noticias/getEventosNoticias`,
      type: "GET",
      dataType: "json",
    });

    let tableBody = document.getElementById("tbody");
    let rows = "";

    for (const noticia of response.response) {
      let fecha = new Date(noticia.FEC_EVE_NOT);
      let opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
      let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

      let maxLength = 30;
      let infoText =
        noticia.INF_EVE_NOT.length > maxLength
          ? noticia.INF_EVE_NOT.substring(0, maxLength) + "..."
          : noticia.INF_EVE_NOT;

      let imagenDisplay = noticia.IMG_EVE_NOT
        ? `<img src="${noticia.IMG_EVE_NOT}" alt="Imagen" style="max-width: 100px; max-height: 100px;">`
        : "Sin imagen";

      let row = `
        <tr>
          <td>${noticia.ID_EVE_NOT}</td>
          <td>${noticia.NOM_EVE_NOT}</td>
          <td>${fechaFormateada}</td>
          <td>${infoText}</td>
          <td>${noticia.UBI_FEC_NOT}</td>
          <td>${imagenDisplay}</td>
          <td>
            <input type="checkbox" class="estado-checkbox" data-id="${
              noticia.id
            }" 
            ${noticia.ESTADO ? "checked" : ""} disabled>
          </td>
          <td>
            <button class="btn btn-primary edit-btn mr-2" data-id="${
              noticia.ID_EVE_NOT
            }">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger delete-btn" data-id="${noticia.ID_EVE_NOT}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;

      rows += row;
    }

    tableBody.innerHTML = rows;

    // Add event listeners for edit and delete buttons
    setupEventListeners();
  } catch (error) {
    console.error("Error fetching noticias: ", error);
    showErrorAlert("Error al cargar noticias");
  }
}

function setupEventListeners() {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const noticiaId = this.getAttribute("data-id");
      toggleNoticiaStatus(noticiaId);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const noticiaId = this.getAttribute("data-id");
      openEditModal(noticiaId);
    });
  });
}

function openEditModal(noticiaId) {
  // Implement modal population logic
  $("#editModal").modal("show");
}

function toggleNoticiaStatus(noticiaId) {
  showConfirmationQuestion(
    "¿Estás seguro de cambiar el estado de esta noticia?",
    async function (confirmed) {
      if (confirmed) {
        try {
          const response = await $.ajax({
            url: `${URL}/eventos_noticias/toggleEventoNoticiaStatus`,
            type: "POST",
            data: {
              id: noticiaId,
              estado: 0, // Change to hidden
            },
            dataType: "json",
          });

          if (response.success) {
            showSuccessAlert("Estado de la noticia actualizado");
            loadNoticias();
          }
        } catch (error) {
          console.error("Error toggling noticia status:", error);
          showErrorAlert("Error al cambiar el estado");
        }
      }
    }
  );
}

// Add event listener for adding a new noticia
document.getElementById("addModuleBtn").addEventListener("click", function () {
  $("#addModal").modal("show");
});

document
  .getElementById("addNoticiaForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    try {
      const response = await $.ajax({
        url: `${URL}/eventosNoticias/addEventoNoticia`,
        type: "POST",
        data: formData,
        processData: false, // Importante para FormData
        contentType: false, // Importante para FormData
        dataType: "json",
      });

      if (response.success) {
        showSuccessAlert("Noticia agregada exitosamente");
        loadNoticias();
        $("#addModal").modal("hide");
        document.getElementById("addNoticiaForm").reset();
      }
    } catch (error) {
      console.error("Error adding noticia:", error);
      showErrorAlert("Error al agregar noticia");
    }
  });

// Load noticias when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  loadNoticias();
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
