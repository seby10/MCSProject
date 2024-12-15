const URL = "http://localhost:4000/MCSPROJECT";

const addCandidato = async (mName, isActive) => {
  const response = await $.ajax({
    url: `${URL}/candidatos/addCandidato`,
    type: "POST",
    data: {
      mName,
      isActive,
    },
    dataType: "json",
  });
  return response;
};

const deleteMenu = async (menuId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/candidatos/deleteMenu`,
      type: "POST",
      data: {
        menuId,
      },
      dataType: "json",
    });

    console.log(response);

    if (response.success) {
      deleteMenuRole(menuId);
      loadcandidatos();
    }
    return response;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

async function saveMenu(menu) {
  try {
    const response = await $.ajax({
      url: `${URL}/menus/updateMenu`,
      type: "POST",
      data: {
        id: menu.id,
        nombre: menu.nombre,
      },
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    showErrorAlert("Failed to update user data");
  }
}

async function showCandidatos() {
  const response = await $.ajax({
    url: `${URL}/candidatos/getCandidatos`,
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

function confirmDeleteMenu(menuId) {
  showConfirmationQuestion(
    "Are you sure you want to delete this menu?",
    function (confirmed) {
      if (confirmed) {
        deleteMenu(menuId);
      }
    }
  );
}
function exito() {
  showSuccessAlert("Exito");
}
function error() {
  showErrorAlert("Error");
}

const usuario = JSON.parse(sessionStorage.getItem("user"));

if (!usuario) {
  window.location.replace("login");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    cargarUsuario(usuario);
    cargarMenus();
    loadcandidatos();
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

async function loadcandidatos() {
  try {
    const datos = await showCandidatos();
    console.log(datos);
    let tableBody = document.getElementById("tbody");
    let rows = "";

    for (const candidato of datos.response) {
      let fecha = new Date(candidato.FEC_NAC_CAN);
      let opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
      let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

      let maxLength = 30;
      let infoText =
        candidato.INF_CAN.length > maxLength
          ? candidato.INF_CAN.substring(0, maxLength) + "..."
          : candidato.INF_CAN;

      let id = `<td>${candidato.ID_CAN}</td>`;
      let name = `<td>${candidato.NOM_CAN}</td>`;
      let lname = `<td>${candidato.APE_CAN}</td>`;
      let fnac = `<td>${fechaFormateada}</td>`;
      let cargo = `<td>${candidato.CAR_CAN}</td>`;
      let info = `<td>${infoText}</td>`;
      let part = `<td>${candidato.PAR_CAN}</td>`;
      let activo = `
        <td>
          <input type="checkbox" class="activo-checkbox" data-id="${
            candidato.ID_CAN
          }" 
          ${candidato.activo ? "checked" : ""} disabled>
        </td>`;

      let actionButtons = `
        <td>
          <button class="btn btn-primary edit-btn mr-2" data-id="${candidato.ID_CAN}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger delete-btn" data-id="${candidato.ID_CAN}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>`;

      rows += `<tr>${
        id + name + lname + fnac + cargo + info + part + activo + actionButtons
      }</tr>`;
    }

    tableBody.innerHTML = rows;

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const menuId = this.getAttribute("data-id");
        confirmDeleteMenu(menuId);
      });
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async function () {
        const candidatoId = this.getAttribute("data-id");
        const candidato = datos.response.find((u) => u.ID_CAN == candidatoId);
        document.getElementById("editMenuId").value = candidato.ID_CAN;
        document.getElementById("editMenuName").value = candidato.NOM_CAN;
        document.getElementById("editMenulName").value = candidato.APE_CAN;
        document.getElementById("activeStatus").checked = candidato.activo;
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
  const updatedMenu = {
    id: document.getElementById("editMenuId").value,
    nombre: document.getElementById("editMenuName").value,
  };

  await saveMenu(updatedMenu);

  showSuccessAlert("Successful");
  $("#editModal").modal("hide");
  loadMenus();
}

document.getElementById("addMenuBtn").addEventListener("click", async () => {
  $("#addMenuModal").modal("show");
});

document
  .getElementById("addMenuForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const mName = document.getElementById("menuName").value.trim();
    const isActive = document.getElementById("activeStatus").checked ? 1 : 0;

    try {
      const response = await addMenu(mName, isActive);
      const menuId = response.response.MenuID;
      console.log(menuId);
      showSuccessAlert("Successful registration");
      loadMenus();
      $("#addMenuModal").modal("hide");
      document.getElementById("addMenuForm").reset();
    } catch (error) {
      console.error("Error during registration:", error);
      showErrorAlert("Error occurred during registration");
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
