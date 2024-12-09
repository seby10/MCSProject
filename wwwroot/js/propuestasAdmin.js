const URL = "http://localhost:4000/MCSPROJECT";

async function deletePropuesta(id) {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/deletePropuesta/${id}`,
      type: "DELETE",
      dataType: "json",
    });

    console.log(response);

    if (response.success) {
      showSuccessAlert("Propuesta eliminada exitosamente");
      loadPropuestas();
    } else {
      showErrorAlert("Error al eliminar la propuesta");
    }
  } catch (error) {
    console.error("Error eliminando propuesta: ", error);
    showErrorAlert("No se pudo eliminar la propuesta");
  }
}

function confirmDeletePropuesta(propuestaId) {
  showConfirmationQuestion("¿Estás seguro de eliminar esta propuesta?", (confirmed) => {
    if (confirmed) {
      deletePropuesta(propuestaId);
    }
  });
}

async function addPropuesta(propuesta) {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/insertPropuesta`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(propuesta),
    });

    if (response.success) {
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
  .addEventListener("click", function () {

    const name = document.getElementById("roleName").value.trim();
    const group = document.getElementById("roleGroup").value.trim();
    const description = document.getElementById("rDescription").value.trim();

    if (!name || !group || !description) {
      showErrorAlert("Todos los campos son obligatorios");
      return;
    }
  
    const propuesta = {
      NOM_PRO: name,
      GRUP_DIR_PRO: group,
      INF_PRO: description,
    };
  
    addPropuesta(propuesta);
    $("#addRoleModal").modal("hide");
  
  });

async function updatePropuesta(propuesta) {
  try {
    const response = await $.ajax({
      url: `${URL}/propuestas/updatePropuesta`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(propuesta),
    });

    if (response.success) {
      showSuccessAlert("Propuesta actualizada exitosamente");
      loadPropuestas();
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

  if (!id || !name || !group || !description) {
    showErrorAlert("Todos los campos son obligatorios");
    return;
  }

  const propuesta = {
    ID_PRO: id,
    NOM_PRO: name,
    GRUP_DIR_PRO: group,
    INF_PRO: description,
  };

  updatePropuesta(propuesta);
  $("#editModal").modal("hide");
});


function handleSaveChanges() {
  const propuesta = {
    ID_PRO: document.getElementById("editRoleId").value,
    NOM_PRO: document.getElementById("editRoleName").value,
    INF_PRO: document.getElementById("editDescription").value,
    GRUP_DIR_PRO: document.getElementById("editRoleGroup").value,
  };
  updatePropuesta(propuesta);
  $("#editModal").modal("hide");
}



async function showPropuestas() {
  const response = await $.ajax({
    url: `${URL}/propuestas/getPropuestas`,
    type: "GET",
    dataType: "json",
  });
  console.log(response);
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

async function loadPropuestas() {
  try {
    const datos = await showPropuestas(); // Cambia esta función para obtener datos desde tu backend
    console.log(datos);
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

      let actionButtons = `
        <td>
          <button class="btn btn-primary edit-btn mr-2" data-id="${propuesta.ID_PRO}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger delete-btn" data-id="${propuesta.ID_PRO}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>`;

      rows += `<tr>${id + name + group + info + actionButtons}</tr>`;
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
        document.getElementById("editRoleId").value = propuesta.ID_PRO;
        document.getElementById("editRoleName").value = propuesta.NOM_PRO;
        document.getElementById("editRoleGroup").value = propuesta.GRUP_DIR_PRO;
        document.getElementById("editDescription").value = propuesta.INF_PRO;
        $("#editModal").modal("show");
      });
    });

    const saveChangesButton = document.getElementById("saveChanges");
    saveChangesButton.removeEventListener("click", handleSaveChanges);
    saveChangesButton.addEventListener("click", handleSaveChanges); // Implementa `handleSaveChanges`
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
