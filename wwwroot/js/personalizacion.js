const editButtons = document.querySelectorAll(".edit-button");

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
        { MenuLink: "/personalizacion", MenuName: "Personalizar" },
        { MenuLink: "/candidatos_catalog", MenuName: "Candidatos" },
        { MenuLink: "/noticias_catalog", MenuName: "Noticias/Eventos" },
        { MenuLink: "/propuestas_catalog", MenuName: "Propuestas" },
        { MenuLink: "/sugerencias_catalog", MenuName: "Sugerencias" },
        { MenuLink: "/votos_catalog", MenuName: "Votos" }
      );
    } else if (usuario.role === "super_admin") {
      menus.push(
        { MenuLink: "/personalizacion", MenuName: "Personalizar" },
        { MenuLink: "/admin_catalog", MenuName: "Administradores" },
        { MenuLink: "/candidatos_catalog", MenuName: "Candidatos" },
        { MenuLink: "/noticias_catalog", MenuName: "Noticias/Eventos" },
        { MenuLink: "/propuestas_catalog", MenuName: "Propuestas" },
        { MenuLink: "/sugerencias_catalog", MenuName: "Sugerencias" },
        { MenuLink: "/votos_catalog", MenuName: "Votos" }
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
  showConfirmationQuestion("Seguro que quiere salir?", function (confirmed) {
    if (confirmed) {
      sessionStorage.removeItem("user");
      window.location.href = "login";
    }
  });
});
editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    input.disabled = !input.disabled;
    if (input.disabled) {
      button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    } else {
      button.innerHTML = '<i class="fas fa-check"></i>';
    }
    input.focus();
  });
});

const colorInput = document.getElementById("colorInput");
const colorPreview = document.getElementById("colorPreview");

colorInput.addEventListener("input", (event) => {
  colorPreview.style.backgroundColor = event.target.value;
});

const logoInput = document.getElementById("logoInput");
const iconInput = document.getElementById("iconInput");
const backgroundInput = document.getElementById("backgroundInput");
const imagenPrevisualizacion = document.getElementById(
  "imagenPrevisualizacion"
);
const imagenPrevisualizacion1 = document.getElementById(
  "imagenPrevisualizacion1"
);
const imagenPrevisualizacion2 = document.getElementById(
  "imagenPrevisualizacion2"
);

logoInput.addEventListener("change", (event) => {
  const archivo = event.target.files[0];

  if (archivo) {
    const lector = new FileReader();

    lector.onload = (e) => {
      imagenPrevisualizacion.src = e.target.result;
      imagenPrevisualizacion.style.display = "block";
    };

    lector.readAsDataURL(archivo);
  } else {
    imagenPrevisualizacion.src = "#";
    imagenPrevisualizacion.style.display = "none";
  }
});

iconInput.addEventListener("change", (event) => {
  const archivo = event.target.files[0];

  if (archivo) {
    const lector = new FileReader();

    lector.onload = (e) => {
      imagenPrevisualizacion1.src = e.target.result;
      imagenPrevisualizacion1.style.display = "block";
    };

    lector.readAsDataURL(archivo);
  } else {
    imagenPrevisualizacion1.src = "#";
    imagenPrevisualizacion1.style.display = "none";
  }
});
backgroundInput.addEventListener("change", (event) => {
  const archivo = event.target.files[0];

  if (archivo) {
    const lector = new FileReader();

    lector.onload = (e) => {
      imagenPrevisualizacion2.src = e.target.result;
      imagenPrevisualizacion2.style.display = "block";
    };

    lector.readAsDataURL(archivo);
  } else {
    imagenPrevisualizacion2.src = "#";
    imagenPrevisualizacion2.style.display = "none";
  }
});

document.getElementById("saveButton").addEventListener("click", function () {
  const formData = new FormData();

  const title1 = document.getElementById("Title1").value;
  const title2 = document.getElementById("Title2").value;
  const title3 = document.getElementById("Title3").value;

  formData.append("Title1", title1);
  formData.append("Title2", title2);
  formData.append("Title3", title3);

  const color = document.getElementById("colorInput").value;
  formData.append("color", color);

  const logo = document.getElementById("logoInput").files[0];
  const icon = document.getElementById("iconInput").files[0];
  const background = document.getElementById("backgroundInput").files[0];

  if (logo) formData.append("logo", logo);
  if (icon) formData.append("icon", icon);
  if (background) formData.append("background", background);
  console.log("Datos que se enviarán al servidor:", formData);
  const direccion = `${URL}/personalizacion/updateData`;
  $.ajax({
    url: direccion,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,

    success: function (response) {
      if (response.success) {
        iziToast.success({
          title: "Éxito",
          message: "Datos guardados correctamente.",
        });

        setTimeout(function () {
          location.reload(); 
        }, 2000); 
      } else {
        iziToast.error({
          title: "Error",
          message: "Hubo un problema al guardar los datos.",
        });
      }
    },
    error: function (xhr, status, error) {
      console.log("Error al realizar la solicitud AJAX:");
      console.log("Estado:", status);
      console.log("Error:", error);
      console.log("Respuesta del servidor:", xhr.responseText);
      iziToast.error({
        title: "Error",
        message: "No se pudo enviar la solicitud al servidor.",
      });
      console.error("Error AJAX:", error);
    },
  });
});

$(document).ready(function () {
  $.ajax({
    url: direccion,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.success) {
        // Precargar los valores de personalización

        const colorPrincipal = data.response[0].color_principal;

        const title1Element = document.getElementById("Title1");
        const title2Element = document.getElementById("Title2");
        const title3Element = document.getElementById("Title3");

        if (colorPrincipal) {
          document.getElementById("colorInput").value = colorPrincipal;
          document.getElementById("colorPreview").style.backgroundColor = colorPrincipal;
        }

        if (title1Element) {
          title1Element.value = data.response[0].titulo1 || title1Element.value;
        }

        if (title2Element) {
          title2Element.value = data.response[0].titulo2 || title2Element.value;
        }

        if (title3Element) {
          title3Element.value = data.response[0].titulo3 || title3Element.value;
        }
      } else {
        console.error("No se pudo obtener los datos de personalización.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
    },
  });
});
