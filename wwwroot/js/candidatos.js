const URL = "http://localhost:4000/MCSPROJECT";

const getCandidatos = async () => {
  const response = await $.ajax({
    url: `${URL}/candidatos/getCandidatos`,
    type: "GET",
    dataType: "json",
  });
  console.log(response.response);
  return response.response || [];
};

const getCandidatosActivos = async () => {
  const allCandidatos = await getCandidatos();
  return allCandidatos.filter((candidato) => candidato.activo === 1);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const createCandidatoHTML = (candidato, index) => {
  return `
    <section class="about_section layout_padding" id="informacion_candidato${
      index + 1
    }">
      <div class="container">
        <div class="row">
          <div class="col-md-6 px-0">
            <div class="img_container">
              <div class="img-box">
                <img src="${candidato.IMG_CAN || "images/default.png"}" alt="${
    candidato.NOM_CAN
  } ${candidato.APE_CAN}" />
              </div>
            </div>
          </div>
          <div class="col-md-6 px-0">
            <div class="detail-box">
              <div class="heading_container">
                <h2>${candidato.NOM_CAN} ${candidato.APE_CAN}</h2>
              </div>
              <p>
                <strong>Fecha de Nacimiento:</strong> ${formatDate(
                  candidato.FEC_NAC_CAN
                )}<br>
                <strong>Cargo:</strong> ${candidato.CAR_CAN}<br>
                <strong>Información:</strong> ${candidato.INF_CAN}<br>
                <strong>Partido:</strong> ${candidato.PAR_CAN}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

$(document).ready(async () => {
  try {
    const candidatos = await getCandidatosActivos();

    if (candidatos.length > 0) {
      const container = $("#contenedor-candidatos");
      candidatos.slice(0, 6).forEach((candidato, index) => {
        const candidatoHTML = createCandidatoHTML(candidato, index);
        container.append(candidatoHTML);
      });
    } else {
      $("#contenedor-candidatos").html(
        `<p>No hay candidatos activos disponibles.</p>`
      );
    }
  } catch (error) {
    console.error("Error al cargar los candidatos:", error);
  }
});
