const URL = "http://localhost:4000/MCSPROJECT";
document.addEventListener("DOMContentLoaded", function () {
  cargarUsuario();
  cargarMenus();
});


async function showSugerencias() {
  try {
    const response = await $.ajax({
      url: `${URL}/sugerenciaVoto/getSugerencias`,
      type: "GET",
      dataType: "json",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return null;
  }
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
    loadSugerencias();
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

async function loadSugerencias() {
  try {
    const datos = await showSugerencias();
    console.log(datos);
    let tableBody = document.getElementById("tbodysug");
    let rows = "";

    // Generar filas para cada sugerencia
    for (const sugerencia of datos.response) {
      let fecha = new Date(sugerencia.FEC_SUG);
      let opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
      let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
      let fnac = `<td>${fechaFormateada}</td>`;
      let id = `<td>${sugerencia.ID_SUG}</td>`;
      let desc = `<td>${sugerencia.DES_SUG}</td>`;
      let est = `
        <td>
          <select class="form-control" id="estado-${sugerencia.ID_SUG}" ${sugerencia.EST_SUG === 'REVISADO' ? 'disabled' : ''}>
            <option value="REVISADO" ${sugerencia.EST_SUG === 'REVISADO' ? 'selected' : ''}>REVISADO</option>
            <option value="POR REVISAR" ${sugerencia.EST_SUG === 'POR REVISAR' ? 'selected' : ''}>POR REVISAR</option>
          </select>
        </td>
      `;
      let saveButton = `
        <td>
          <button class="btn btn-success save-btn" data-id="${sugerencia.ID_SUG}" ${sugerencia.EST_SUG === 'REVISADO' ? 'disabled' : ''}>
            Guardar
          </button>
        </td>
      `;
      let correo = `<td>${sugerencia.COR_USU}</td>`;

      rows += `<tr id="row-${sugerencia.ID_SUG}">${id + fnac + desc + correo + est + saveButton}</tr>`;
    }

    tableBody.innerHTML = rows;

    document.querySelectorAll(".save-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const estado = document.getElementById(`estado-${id}`).value;
        actualizarEstadoSugerencia(id, estado, button); 
      });
    });

  } catch (error) {
    console.error("Error al cargar sugerencias:", error);
  }
}
async function actualizarEstadoSugerencia(id, estado, button) {
  try {
    const response = await $.ajax({
      url: `${URL}/sugerenciaVoto/updateEstadoSugerencia`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ id, estado }),
      dataType: 'json',
    });

    if (response.message === 'Estado de la sugerencia actualizado') {
      const row = document.getElementById(`row-${id}`);
      const select = row.querySelector(`#estado-${id}`);
      const saveBtn = row.querySelector(".save-btn");

      if (estado === 'REVISADO') {
        select.disabled = true;
        saveBtn.disabled = true;
      }

      select.value = estado;
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
  }
}
