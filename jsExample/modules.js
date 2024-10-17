const URL = "http://localhost:4000/proyectoMCS";

const addModule = async (mName, isActive) => {
  const response = await $.ajax({
    url: `${URL}/modules/addModule`,
    type: "POST",
    data: {
      mName,
      isActive,
    },
    dataType: "json",
  });
  return response;
};

async function checkModule(mName) {
  const response = await $.ajax({
    url: `${URL}/modules/getName`,
    type: "POST",
    data: {
      mName,
    },
    dataType: "json",
  });
  console.log(response);
  return response;
}

const deleteModule = async (moduleId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/modules/deleteModule`,
      type: "POST",
      data: {
        moduleId,
      },
      dataType: "json",
    });

    console.log(response);

    if (response.success) {
      deleteModuleMenu(moduleId);
      loadModules();
    }
    return response;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
const deleteModuleMenu = async (moduleId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/modules/deleteModuleMenu`,
      type: "POST",
      data: {
        moduleId,
      },
      dataType: "json",
    });

    console.log(response);

    if (response.success) {
      loadModules();
    }
    return response;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
async function updateModuleActiveStatus(moduleId, isActive) {
  try {
    const activeValue = isActive ? 1 : 0;

    const response = await $.ajax({
      url: `${URL}/modules/updateActiveModule`,
      type: "POST",
      data: {
        moduleId,
        isActive: activeValue,
      },
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error updating module:", error);
    showErrorAlert("Failed to update module data");
  }
}

async function checkModuleUpdate(id, nombre, ) {
  try {
    const response = await $.ajax({
      url: `${URL}/modules/checkModule`,
      type: "POST",
      data: { id, nombre },
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error checking name:", error);
    throw new Error("Error checking name");
  }
}

async function saveModule(module) {
  try {
    const nameExists = await checkModuleUpdate(module.id, module.nombre, );
    if (nameExists) {
      showErrorAlert("Module name is already registered");
      return;
    }

    const response = await $.ajax({
      url: `${URL}/modules/updateModule`,
      type: "POST",
      data: {
        id: module.id,
        nombre: module.nombre, 
      },
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    showErrorAlert("Failed to update user data");
  }
}

async function showModules() {
  const response = await $.ajax({
    url: `${URL}/modules/getAllModule`,
    type: "POST",
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

function confirmDeleteModule(moduleId) {
  showConfirmationQuestion(
    "Are you sure you want to delete this module?",
    function (confirmed) {
      if (confirmed) {
        deleteModule(moduleId);
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
$.blockUI({ css: { backgroundColor: '#888', color: '#fff'} });
const usuario = JSON.parse(sessionStorage.getItem("user"));

if (!usuario) {
  window.location.replace("login");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    cargarUsuario(usuario);
    cargarMenus();
    loadModules();

    $.unblockUI();
  });
}

function cargarUsuario(usuario) {
  const nombreUsuario = usuario.first_name + " " + usuario.last_name;
  document.querySelector(".text-gray-600.small").textContent = nombreUsuario;
}

function cargarMenus() {
  const menus = JSON.parse(sessionStorage.getItem("menus"));

  if (menus && menus.length > 0) {
    const menuContainer = document.getElementById("dynamicMenuContainer");
    
    menuContainer.innerHTML = "";

    menus.forEach(menu => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("nav-item");

      menuItem.innerHTML = `
        <a class="nav-link" href="${menu.MenuLink}">
          <i class="fas fa-fw fa-circle"></i> <!-- Icono de ejemplo, puedes personalizar -->
          <span>${menu.MenuName}</span>
        </a>
      `;

      menuContainer.appendChild(menuItem);
    });
  } else {
    console.log("No hay menús disponibles en sessionStorage");
  }
}

async function loadModules() {
  try {
    const datos = await showModules();

    let tableBody = document.getElementById("tbody");
    let rows = "";

    datos.response.forEach((module) => {
      let id = `<td>${module.id}</td>`;
      let name = `<td>${module.nombre}</td>`;
      let activo = `
        <td>
          <input type="checkbox" class="activo-checkbox" data-id="${module.id}" 
          ${module.activo ? "checked" : ""} disabled>
        </td>`;
      let actionButtons = `
        <td>
          <button class="btn btn-primary edit-btn mr-2" data-id="${module.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger delete-btn" data-id="${module.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>`;

      rows += `<tr>${id + name + activo + actionButtons}</tr>`;
    });

    tableBody.innerHTML = rows;

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const moduleId = this.getAttribute("data-id");
        confirmDeleteModule(moduleId);
      });
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const moduleId = this.getAttribute("data-id");
        const module = datos.response.find((u) => u.id == moduleId);
        document.getElementById("editModuleId").value = module.id;
        document.getElementById("editModuleName").value = module.nombre;
        document.getElementById("activeStatus").checked = module.activo;
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
  const updatedModule = {
    id: document.getElementById("editModuleId").value,
    nombre: document.getElementById("editModuleName").value,
  };
  const isActive = document.getElementById("activeStatus").checked;

  await updateModuleActiveStatus(updatedModule.id, isActive);
  await saveModule(updatedModule);
  $("#editModal").modal("hide");
  loadModules();
}

document.getElementById("addModuleBtn").addEventListener("click", () => {
  $("#addModuleModal").modal("show");
});

document
  .getElementById("addModuleForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const mName = document.getElementById("moduleName").value.trim();
    const isActive = document.getElementById("activeStatus").checked ? 1 : 0;

    try {
      const response = await checkModule(mName);
      if (response) {
        showErrorAlert("Module is already registered");
      } else {
        await addModule(mName, isActive);
        showSuccessAlert("Successful registration");
        loadModules();
        $("#addModuleModal").modal("hide");
        document.getElementById("addModuleForm").reset();
      }
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
