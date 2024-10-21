const URL = "http://localhost:4000/MCSPROJECT";

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

const displayCandidatos = (candidato1, candidato2, candidato3, candidato4) => {
  $("#informacion_candidato1 h2").text(
    candidato1.NOM_CAN + " " + candidato1.APE_CAN
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
    candidato2.NOM_CAN + " " + candidato2.APE_CAN
  );
  $("#informacion_candidato2 p").html(
    `<strong>Fecha de Nacimiento:</strong> ${formatDate(
      candidato2.FEC_NAC_CAN
    )}<br>
     <strong>Cargo:</strong> ${candidato2.CAR_CAN}<br>
     <strong>Información:</strong> ${candidato2.INF_CAN}<br>
     <strong>Partido:</strong> ${candidato2.PAR_CAN}`
  );

  $("#informacion_candidato3 h2").text(
    candidato3.NOM_CAN + " " + candidato3.APE_CAN
  );
  $("#informacion_candidato3 p").html(
    `<strong>Fecha de Nacimiento:</strong> ${formatDate(
      candidato3.FEC_NAC_CAN
    )}<br>
     <strong>Cargo:</strong> ${candidato3.CAR_CAN}<br>
     <strong>Información:</strong> ${candidato3.INF_CAN}<br>
     <strong>Partido:</strong> ${candidato3.PAR_CAN}`
  );

  $("#informacion_candidato4 h2").text(
    candidato4.NOM_CAN + " " + candidato4.APE_CAN
  );
  $("#informacion_candidato4 p").html(
    `<strong>Fecha de Nacimiento:</strong> ${formatDate(
      candidato4.FEC_NAC_CAN
    )}<br>
     <strong>Cargo:</strong> ${candidato4.CAR_CAN}<br>
     <strong>Información:</strong> ${candidato4.INF_CAN}<br>
     <strong>Partido:</strong> ${candidato4.PAR_CAN}`
  );
};

const showCandidatos = (candidato1, candidato2, candidato3, candidato4) => {
  $(".col-md-4")
    .eq(0)
    .find("h5")
    .text(candidato1.NOM_CAN + " " + candidato1.APE_CAN);
  $(".col-md-4").eq(0).find("h6").text(candidato1.CAR_CAN);

  $(".col-md-4")
    .eq(1)
    .find("h5")
    .text(candidato2.NOM_CAN + " " + candidato2.APE_CAN);
  $(".col-md-4").eq(1).find("h6").text(candidato2.CAR_CAN);

  $(".col-md-4")
    .eq(2)
    .find("h5")
    .text(candidato3.NOM_CAN + " " + candidato3.APE_CAN);
  $(".col-md-4").eq(2).find("h6").text(candidato3.CAR_CAN);

  $(".col-md-4")
    .eq(3)
    .find("h5")
    .text(candidato4.NOM_CAN + " " + candidato4.APE_CAN);
  $(".col-md-4").eq(3).find("h6").text(candidato4.CAR_CAN);
};

$(document).ready(async () => {
  const candidato1 = await getCandidatoByID(1);
  const candidato2 = await getCandidatoByID(2);
  const candidato3 = await getCandidatoByID(3);
  const candidato4 = await getCandidatoByID(4);

  displayCandidatos(candidato1, candidato2, candidato3, candidato4);
  showCandidatos(candidato1, candidato2, candidato3, candidato4);
});
