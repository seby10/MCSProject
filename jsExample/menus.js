const URL = "http://localhost:4000/proyectoMCS";

const addMenu = async (mName, isActive) => {
  const response = await $.ajax({
    url: `${URL}/menus/addMenu`,
    type: "POST",
    data: {
      mName,
      isActive,
    },
    dataType: "json",
  });
  return response;
};

async function checkMenu(mName) {
  const response = await $.ajax({
    url: `${URL}/menus/getName`,
    type: "POST",
    data: {
      mName,
    },
    dataType: "json",
  });
  console.log(response);
  return response;
}

const deleteMenu = async (menuId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/menus/deleteMenu`,
      type: "POST",
      data: {
        menuId,
      },
      dataType: "json",
    });

    console.log(response);

    if (response.success) {
      deleteMenuRole(menuId);
      deleteMenuModule(menuId);
      loadMenus();
    }
    return response;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};
const deleteMenuRole = async (menuId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/menus/deleteMenuRole`,
      type: "POST",
      data: {
        menuId,
      },
      dataType: "json",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};
const deleteMenuModule = async (menuId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/menus/deleteMenuModule`,
      type: "POST",
      data: {
        menuId,
      },
      dataType: "json",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

const removeMenuModule = async (menuId, moduleId) => {
  try {
    const response = await $.ajax({
      url: `${URL}/menus/deleteRelation`,
      type: "POST",
      data: {
        menuId,
        moduleId,
      },
      dataType: "json",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error deleting rel:", error);
    throw error;
  }
};

async function updateMenuActiveStatus(menuId, isActive) {
  try {
    const activeValue = isActive ? 1 : 0;

    const response = await $.ajax({
      url: `${URL}/menus/updateActiveMenu`,
      type: "POST",
      data: {
        menuId,
        isActive: activeValue,
      },
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error updating menu:", error);
    showErrorAlert("Failed to update menu data");
  }
}

async function checkMenuUpdate(id, nombre) {
  try {
    const response = await $.ajax({
      url: `${URL}/menus/checkMenu`,
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
const addMenuModule = async (idMenu, idModule) => {
  const response = await $.ajax({
    url: `${URL}/menus/addMenuModule`,
    type: "POST",
    data: {
      idMenu,
      idModule,
    },
    dataType: "json",
  });
  return response;
};
async function saveMenu(menu) {
  try {
    const nameExists = await checkMenuUpdate(menu.id, menu.nombre);
    if (nameExists) {
      showErrorAlert("Menu name is already registered");
      return;
    }

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

async function showMenus() {
  const response = await $.ajax({
    url: `${URL}/menus/getAllMenus`,
    type: "POST",
    dataType: "json",
  });
  console.log(response);
  return response;
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
async function showRelations(id) {
  const response = await $.ajax({
    url: `${URL}/menus/getAllRelations`,
    type: "POST",
    data: {
      id,
    },
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

function confirmDeleteMenu(moduleId) {
  showConfirmationQuestion(
    "Are you sure you want to delete this menu?",
    function (confirmed) {
      if (confirmed) {
        deleteMenu(moduleId);
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
    loadMenus();
    llenarCheckboxList();

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

async function loadMenus() {
  try {
    const datos = await showMenus();

    let tableBody = document.getElementById("tbody");
    let rows = "";

    for (const menu of datos.response) {
      const relations = await showRelations(menu.id);

      let id = `<td>${menu.id}</td>`;
      let name = `<td>${menu.nombre}</td>`;
      let activo = `
        <td>
          <input type="checkbox" class="activo-checkbox" data-id="${menu.id}" 
          ${menu.activo ? "checked" : ""} disabled>
        </td>`;

      let relationsData = `<td>`;
      if (Array.isArray(relations.response)) {
        relationsData += relations.response
          .map((rel) => rel.ModuleName)
          .join(", ");
      } else {
        relationsData += "No relations data";
      }
      relationsData += `</td>`;

      let actionButtons = `
        <td>
          <button class="btn btn-primary edit-btn mr-2" data-id="${menu.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger delete-btn" data-id="${menu.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>`;

      rows += `<tr>${id + name + activo + relationsData + actionButtons}</tr>`;
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
        const menuId = this.getAttribute("data-id");
        const menu = datos.response.find((u) => u.id == menuId);
        document.getElementById("editMenuId").value = menu.id;
        document.getElementById("editMenuName").value = menu.nombre;
        document.getElementById("activeStatus").checked = menu.activo;
        await llenarCheckboxList1(menuId);
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
  const isActive = document.getElementById("activeStatus").checked;

  await updateMenuActiveStatus(updatedMenu.id, isActive);
  await saveMenu(updatedMenu);

  const currentModules = (await showRelations(updatedMenu.id)).response.map(
    (rel) => rel.modulo_id
  );
  const selectedModules = [];
  $('#miCheckboxList1 input[type="checkbox"]:checked').each(function () {
    selectedModules.push($(this).val());
  });
  
  for (const moduleId of selectedModules) {
    if (!currentModules.includes(parseInt(moduleId))) {
      await addMenuModule(updatedMenu.id, moduleId);
    }
  }

  for (const moduleId of currentModules) {
    if (!selectedModules.includes(moduleId.toString())) {
      console.log(
        `Eliminando módulo con ID ${moduleId} del menú ${updatedMenu.id}`
      );
      await removeMenuModule(updatedMenu.id, moduleId);
    }
  }
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
      const response = await checkMenu(mName);
      if (response) {
        showErrorAlert("Menu is already registered");
      } else {
        const response = await addMenu(mName, isActive);
        const menuId = response.response.MenuID;
        console.log(menuId);

        const selectedModules = [];
        $('#miCheckboxList input[type="checkbox"]:checked').each(function () {
          selectedModules.push($(this).val());
        });

        for (const moduleId of selectedModules) {
          console.log(moduleId);
          await addMenuModule(menuId, moduleId);
        }
        showSuccessAlert("Successful registration");
        loadMenus();
        $("#addMenuModal").modal("hide");
        document.getElementById("addMenuForm").reset();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      showErrorAlert("Error occurred during registration");
    }
  });

async function llenarCheckboxList() {
  try {
    const response = await showModules();
    console.log(response);

    const checkboxList = $("#miCheckboxList");
    checkboxList.empty();

    response.response.forEach(function (item) {
      const checkboxItem = $(`
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${item.id}" id="checkbox${item.id}">
                    <label class="form-check-label" for="checkbox${item.id}">
                        ${item.nombre}
                    </label>
                </div>
            `);
      checkboxList.append(checkboxItem);
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
async function llenarCheckboxList1(menuId) {
  try {
    const response = await showModules();
    const selectedModules = await showRelations(menuId);
    console.log(response);

    const checkboxList = $("#miCheckboxList1");
    checkboxList.empty();

    response.response.forEach(function (item) {
      const isChecked = selectedModules.response.some(
        (rel) => rel.modulo_id === item.id
      );
      const checkboxItem = $(`
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${
                      item.id
                    }" id="checkbox${item.id}" ${isChecked ? "checked" : ""}>
                    <label class="form-check-label" for="checkbox${item.id}">
                        ${item.nombre}
                    </label>
                </div>
            `);
      checkboxList.append(checkboxItem);
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
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
