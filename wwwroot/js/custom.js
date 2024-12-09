// get current year
(function () {
    var year = new Date().getFullYear();
    var currentYearElement = document.querySelector("#currentYear");

    // Verificar si el elemento existe
    if (currentYearElement) {
        currentYearElement.innerHTML = year; // Solo se ejecuta si el elemento existe
    }
})();

const URL = "http://localhost:4000/MCSPROJECT";

// Obtener todos los candidatos desde la API
const getCandidatos = async () => {
  const response = await $.ajax({
    url: `${URL}/candidatos/getCandidatos`,
    type: "GET",
    dataType: "json",
  });
  console.log(response.response);
  return response.response || [];
};

// Filtrar solo los candidatos activos
const getCandidatosActivos = async () => {
  const allCandidatos = await getCandidatos();
  return allCandidatos.filter((candidato) => candidato.activo === 1);
};

// Crear el HTML para un resumen de candidato
const createCandidatoResumenHTML = (candidato, index) => {
  return `
    <div class="col-md-4 col-sm-6 mx-auto">
      <div class="box">
        <div class="img-box">
          <a href="informacion#informacion_candidato${index + 1}">
            <img src="${candidato.IMG_CAN || 'images/default.png'}" alt="${candidato.NOM_CAN} ${candidato.APE_CAN}" />
          </a>
        </div>
        <div class="detail-box">
          <h5>${candidato.NOM_CAN} ${candidato.APE_CAN}</h5>
          <h6 class="">${candidato.CAR_CAN}</h6>
        </div>
      </div>
    </div>
  `;
};

// Mostrar los candidatos de forma resumida en la página principal
$(document).ready(async () => {
  try {
    const candidatos = await getCandidatosActivos();

    if (candidatos.length > 0) {
      const container = $("#candidatos_container");
      candidatos.slice(0, 4).forEach((candidato, index) => {
        const candidatoHTML = createCandidatoResumenHTML(candidato, index);
        container.append(candidatoHTML);
      });
    } else {
      $("#candidatos_container").html(
        `<p>No hay candidatos activos disponibles.</p>`
      );
    }
  } catch (error) {
    console.error("Error al cargar los candidatos:", error);
  }
});

