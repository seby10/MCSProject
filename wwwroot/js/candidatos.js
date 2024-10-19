const URL = "http://localhost:4000/proyectoMCS";

const getCandidatoByID = async (id) => {
  const response = await $.ajax({
    url: `${URL}/candidatos/getCandidato/${id}`,
    type: "GET",
    dataType: "json",
  });
  console.log(response);
  return response[0];
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayCandidatos = (candidato1, candidato2) => {
  $("#informacion_candidato1 h2").text(
    "Información de " + candidato1.NOM_CAN + " " + candidato1.APE_CAN
  );
  $("#informacion_candidato1 p").html(
    `<strong>Fecha de Nacimiento:</strong> ${formatDate(
      candidato1.FEC_NAC_CAN
    )}<br>
       <strong>Cargo:</strong> ${candidato1.CAR_CAN}<br>
       <strong>Información:</strong> ${candidato1.INF_CAN}<br>
       <strong>Partido:</strong> ${candidato1.PAR_CAN}`
  );

  $("#informacion_candidato2 h2").text(
    "Información de " + candidato2.NOM_CAN + " " + candidato2.APE_CAN
  );
  $("#informacion_candidato2 p").html(
    `<strong>Fecha de Nacimiento:</strong> ${formatDate(
      candidato2.FEC_NAC_CAN
    )}<br>
       <strong>Cargo:</strong> ${candidato2.CAR_CAN}<br>
       <strong>Información:</strong> ${candidato2.INF_CAN}<br>
       <strong>Partido:</strong> ${candidato2.PAR_CAN}`
  );
};

$(document).ready(async () => {
  const candidato1 = await getCandidatoByID(1);
  const candidato2 = await getCandidatoByID(2);
  displayCandidatos(candidato1, candidato2);
});
