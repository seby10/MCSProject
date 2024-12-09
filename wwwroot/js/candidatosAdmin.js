const URL = "http://localhost:4000/MCSPROJECT";

const addCandidato = async (
  firstName,
  lastName,
  birthDate,
  position,
  information,
  party,
  isActive
) => {
  const response = await $.ajax({
    url: `${URL}/candidatos/addCandidato`,
    type: "POST",
    data: {
      firstName,
      lastName,
      birthDate,
      position,
      information,
      party,
      isActive,
    },
    dataType: "json",
  });
  return response;
};

async function saveCandidate(candidate) {
  try {
    const response = await $.ajax({
      url: `${URL}/candidatos/updateCandidato`,
      type: "POST",
      data: {
        id: candidate.id,
        nombre: candidate.nombre,
        apellido: candidate.apellido,
        fechaNacimiento: candidate.fechaNacimiento,
        cargo: candidate.cargo,
        informacion: candidate.informacion,
        partido: candidate.partido,
        activo: candidate.activo ? 1 : 0,
      },
      dataType: "json",
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar el candidato:", error);
    showErrorAlert("Hubo un error al actualizar el candidato");
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
        </td>`;

      rows += `<tr>${
        id + name + lname + fnac + cargo + info + part + activo + actionButtons
      }</tr>`;
    }

    tableBody.innerHTML = rows;

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async function () {
        const candidatoId = this.getAttribute("data-id");
        const candidato = datos.response.find((u) => u.ID_CAN == candidatoId);
        document.getElementById("editCandidateId").value = candidato.ID_CAN;
        document.getElementById("editCandidateName").value = candidato.NOM_CAN;
        document.getElementById("editCandidatelName").value = candidato.APE_CAN;
        let fechaNacimiento = new Date(candidato.FEC_NAC_CAN);
        let fechaFormatoDate = fechaNacimiento.toISOString().split("T")[0];
        document.getElementById("editBirthDate").value = fechaFormatoDate;
        document.getElementById("editCargo").value = candidato.CAR_CAN;
        document.getElementById("editInfo").value = candidato.INF_CAN;
        document.getElementById("editParty").value = candidato.PAR_CAN;
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
  const updatedCandidate = {
    id: document.getElementById("editCandidateId").value,
    nombre: document.getElementById("editCandidateName").value,
    apellido: document.getElementById("editCandidatelName").value,
    fechaNacimiento: formatDate(document.getElementById("editBirthDate").value),
    cargo: document.getElementById("editCargo").value,
    informacion: document.getElementById("editInfo").value,
    partido: document.getElementById("editParty").value,
    activo: document.getElementById("activeStatus").checked ? 1 : 0,
  };

  try {
    let response = await saveCandidate(updatedCandidate);

    if (response.success) {
      showSuccessAlert("Candidato actualizado exitosamente");
      $("#editModal").modal("hide");
      loadcandidatos();
    } else {
      showErrorAlert("Error al actualizar el candidato");
    }
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    showErrorAlert("Hubo un error al intentar guardar los cambios");
  }
}

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

document
  .getElementById("addCandidateBtn")
  .addEventListener("click", async () => {
    $("#addCandidateModal").modal("show");
  });

document
  .getElementById("addCandidateForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const cNom = document.getElementById("candidateName").value.trim();
    const cApe = document.getElementById("candidateLastName").value.trim();
    const cFnac = document.getElementById("birthDate").value.trim();
    const cCar = document.getElementById("position").value.trim();
    const cInfo = document.getElementById("info").value.trim();
    const cPar = document.getElementById("party").value.trim();
    const isActive = document.getElementById("activeStatus").checked ? 1 : 0;

    try {
      const response = await addCandidato(
        cNom,
        cApe,
        cFnac,
        cCar,
        cInfo,
        cPar,
        isActive
      );

      console.log("Candidato registrado exitosamente:", response);
      showSuccessAlert("Candidato registrado exitosamente");

      $("#addCandidateModal").modal("hide");
      document.getElementById("addCandidateForm").reset();

      loadcandidatos();
    } catch (error) {
      console.error("Error durante el registro:", error);
      showErrorAlert("Ocurrió un error durante el registro");
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
