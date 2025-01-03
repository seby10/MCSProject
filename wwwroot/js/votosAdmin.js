const URL = "http://localhost:4000/MCSPROJECT";
document.addEventListener("DOMContentLoaded", function () {
  cargarUsuario();
  cargarMenus();
  loadVotos();
  loadVotosTotales();
});

async function showVotos() {
  try {
    const response = await $.ajax({
      url: `${URL}/sugerenciaVoto/getVotos`,
      type: "GET",
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error fetching votes:", error);
    return null;
  }
}


async function loadVotosTotales() {
  try {
    const datos = await showVotos();

    let tableBody = document.getElementById("tbodyvotocantidad");
    let rows = "";

    const votosPorCandidato = {};
    let totalVotos = 0;

    for (const voto of datos.response) {

      let candidatoCompleto = `${voto.NOM_CAN} ${voto.APE_CAN}`;

      if (votosPorCandidato[candidatoCompleto]) {
        votosPorCandidato[candidatoCompleto]++;
      } else {
        votosPorCandidato[candidatoCompleto] = 1;
      }
      totalVotos++; 

    }

    for (const candidato in votosPorCandidato) {
      let votos = votosPorCandidato[candidato];
      rows += `<tr>
                 <td>${votos}</td>
                 <td>${candidato}</td>
               </tr>`;
    }

    rows += `<tr>
               <td><strong>${totalVotos}</strong></td>
               <td><strong>Total Votos</strong></td>
             </tr>`;

    tableBody.innerHTML = rows;

    const porcentajesPorCandidato = {};
    for (const candidato in votosPorCandidato) {
      porcentajesPorCandidato[candidato] = ((votosPorCandidato[candidato] / totalVotos) * 100).toFixed(2);
    }
    createChart(porcentajesPorCandidato);

    const votoContainer = document.getElementById('voto-container');
    if (votoContainer) {
      votoContainer.style.maxHeight = '400px'; 
      votoContainer.style.overflowY = 'auto';  
    }

  } catch (error) {
    console.error("Error al cargar votos:", error);
  }
}


async function loadVotos() {
  try {
    const datos = await showVotos();

    let tableBody = document.getElementById("tbodyvot");
    let rows = "";

    const votosPorCandidato = {};
    let totalVotos = 0;
    const primeros10Votos = datos.response.slice(0, 10);

    for (const voto of datos.response) {
      let fecha = new Date(voto.FEC_VOT);
      let opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
      let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

      let id = `<td>${voto.ID_VOT}</td>`;
      let fechaTd = `<td>${fechaFormateada}</td>`;
      let candidatoCompleto = `${voto.NOM_CAN} ${voto.APE_CAN}`;
      let candidato = `<td>${candidatoCompleto}</td>`;

      if (votosPorCandidato[candidatoCompleto]) {
        votosPorCandidato[candidatoCompleto]++;
      } else {
        votosPorCandidato[candidatoCompleto] = 1;
      }
      totalVotos++; 

      rows += `<tr>${id + fechaTd + candidato}</tr>`;
    }
    tableBody.innerHTML = rows;
    // console.log("Votos por Candidato: ", votosPorCandidato);
    const porcentajesPorCandidato = {};
    for (const candidato in votosPorCandidato) {
      porcentajesPorCandidato[candidato] = ((votosPorCandidato[candidato] / totalVotos) * 100).toFixed(2);
    }
    // console.log("Porcentajes por Candidato: ", porcentajesPorCandidato);
    createChart(porcentajesPorCandidato);
    const votoContainer = document.getElementById('voto-container');
    if (votoContainer) {
      votoContainer.style.maxHeight = '400px'; 
      votoContainer.style.overflowY = 'auto';  
    }
  } catch (error) {
    console.error("Error al cargar votos:", error);
  }
}


function createChart(porcentajesPorCandidato) {
  const ctx = document.getElementById('grafica1');
  if (!ctx) {
    console.error("No se encontró el canvas con id 'grafica1'.");
    return;
  }

    console.log(porcentajesPorCandidato);

    const $grafica1 = document.querySelector("#grafica1");
    const etiquetas = Object.keys(porcentajesPorCandidato); 
    const porcentajes = Object.values(porcentajesPorCandidato);
    

    const colores = [
      'rgba(242, 99, 255, 0.2)',
      'rgba(150, 103, 198, 0.2)',
      'rgba(255, 206, 86, 0.2)'
    ];
    const votos = {
      label: "Porcentajes de votos por candidatos ",
      data: porcentajes,
      backgroundColor: colores.slice(0, porcentajes.length),
      borderColor: colores.map(color => color.replace('0.2', '1')),
      borderWidth: 1,
    };
    new Chart($grafica1, {
      type: 'bar',
      data: {
        labels: etiquetas,
        datasets: [votos],
      },
      options: {
        legend: {
          display: false, 
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100, 
              callback: function(value) {
                return value + '%';
              }
            }
          }],
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const value = tooltipItem.yLabel;
              return value + '%';
            }
          }
        }
      }
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
  if (usuario && usuario.role) {
    if (usuario.role === "admin") {
      menus.push(
        { MenuLink: "/candidatos_catalog", MenuName: "Candidatos" },
        { MenuLink: "/noticias_catalog", MenuName: "Noticias/Eventos" },
        { MenuLink: "/propuestas_catalog", MenuName: "Propuestas" },
        { MenuLink: "/sugerencias_catalog", MenuName: "Sugerencias" },
        { MenuLink: "/votos_catalog", MenuName: "Votos" }
      );
    } else if (usuario.role === "super_admin") {
      menus.push(
        { MenuLink: "/admin_catalog", MenuName: "Administradores" },
        { MenuLink: "/candidatos_catalog", MenuName: "Candidatos" },
        { MenuLink: "/noticias_catalog", MenuName: "Noticias/Eventos" },
        { MenuLink: "/propuestas_catalog", MenuName: "Propuestas" },
        { MenuLink: "/sugerencias_catalog", MenuName: "Sugerencias" },
        { MenuLink: "/votos_catalog", MenuName: "Votos" }
      );
    }
  }


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
