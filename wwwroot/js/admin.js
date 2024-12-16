const URL = "http://localhost:4000/MCSPROJECT";
document.addEventListener("DOMContentLoaded", function () {
  cargarUsuario();
  cargarMenus();
  loadAdmins();
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
    "Seguro que quiere salir?",
    function (confirmed) {
      if (confirmed) {
        sessionStorage.removeItem("user");
        window.location.href = "login";
      }
    }
  );
});

const addAdmin = async (user, password, rol) => {
  try {
    const response = await $.ajax({
      url: `${URL}/admins/addAdmin`,
      type: "POST",
      data: {
        nombre: user,
        contrasenia: password,
        rol: rol,
      },
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error al insertar el administrador:", error);
    showErrorAlert("Hubo un error al insertar el administrador");
  }
};

async function saveAdmin(id, nombre, contraseña, rol, activo) {
  try {
    console.log(id, nombre, contraseña, rol, activo);

    const response = await $.ajax({
      url: `${URL}/admins/updateAdmin`,
      type: "POST",
      data: {
        id: id,
        nombre: nombre,
        contrasenia: contraseña,
        rol: rol,
        activo: activo,
      },
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar el administrador:", error);
    showErrorAlert("Hubo un error al actualizar el administrador");
  }
}

async function showAdmins() {
  const response = await $.ajax({
    url: `${URL}/admins/getAdmins`,
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

function exito() {
  showSuccessAlert("Exito");
}
function error() {
  showErrorAlert("Error");
}

async function loadAdmins() {
  try {
    const datos = await showAdmins();
    console.log(datos);
    let tableBody = document.getElementById("tbody");
    let rows = "";

    for (const admin of datos.response) {
      let id = `<td>${admin.id}</td>`;
      let name = `<td>${admin.name}</td>`;
      let password = `<td>${"*".repeat(admin.password.length)}</td>`;
      let role = `<td>${admin.role}</td>`;
      let activo = `
          <td>
              <input type="checkbox" class="activo-checkbox" data-id="${
                admin.activo
              }" 
              ${admin.activo ? "checked" : ""} disabled>
          </td>`;

      let actionButtons = `
          <td>
              <button class="btn btn-primary edit-btn mr-2" data-id="${admin.id}">
                  <i class="fas fa-edit"></i>
              </button>
          </td>`;

      rows += `<tr>${
        id + name + password + role + activo + actionButtons
      }</tr>`;
    }

    tableBody.innerHTML = rows;

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async function () {
        const adminId = this.getAttribute("data-id");
        const admin = datos.response.find((u) => u.id == adminId);
        document.getElementById("editAdminId").value = admin.id;
        document.getElementById("editUser").value = admin.name;
        document.getElementById("editPassword").value = admin.password;
        document.getElementById("editRol").value = admin.role;
        document.getElementById("activeStatus").checked = admin.activo;
        $("#editModal").modal("show");
      });
    });

    const saveChangesButton = document.getElementById("saveChanges");
    saveChangesButton.removeEventListener("click", handleSaveChanges);
    saveChangesButton.addEventListener("click", function () {
      var password = document.getElementById("editPassword").value;
      var confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        showErrorAlert("Las contraseñas no coinciden.");
        return;
      }
      handleSaveChanges();
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function handleSaveChanges() {
  const id = document.getElementById("editAdminId").value;
  const nombre = document.getElementById("editUser").value;
  const contraseña = document.getElementById("editPassword").value;
  const rol = document.getElementById("editRol").value;
  const activo = document.getElementById("activeStatus").checked ? 1 : 0;

  try {
    let response = await saveAdmin(id, nombre, contraseña, rol, activo);

    if (response.success) {
      showSuccessAlert("Administrador actualizado exitosamente");
      $("#editModal").modal("hide");
      loadAdmins();
    } else {
      showErrorAlert("Error al actualizar el administrador");
    }
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    showErrorAlert("Hubo un error al intentar guardar los cambios");
  }
}

document.getElementById("addAdminBtn").addEventListener("click", async () => {
  $("#addAdminModal").modal("show");
});

document
  .getElementById("addAdminForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("user").value;
    const contraseña = document.getElementById("password").value;
    const rol = document.getElementById("Rol").value;

    try {
      let response = await addAdmin(nombre, contraseña, rol);
      console.log("Candidato registrado exitosamente:", response);
      showSuccessAlert("Candidato registrado exitosamente");

      $("#addAdminModal").modal("hide");
      document.getElementById("addAdminForm").reset();

      loadAdmins();
    } catch (error) {
      console.error("Error durante el registro:", error);
      showErrorAlert("Ocurrió un error durante el registro");
    }
  });
