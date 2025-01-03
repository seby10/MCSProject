
const submitButtonSugerencia = document.getElementById('submitSugerencia');
const modalAceptarButton = document.getElementById('modalAceptar');
let sugerenciaInputValue = ''; 

submitButtonSugerencia.addEventListener('click', function (e) {
  e.preventDefault(); 

  sugerenciaInputValue = document.getElementById('sugerenciaInput').value;


  if (sugerenciaInputValue) {
    $('#correoModal').modal('show'); 
  } else {
    alert('Por favor, ingresa una sugerencia.'); 
  }
});

modalAceptarButton.addEventListener('click', async function () {
  const correoModalInput = document.getElementById('correoModalInput').value;

  if (correoModalInput) {
    try {
      const userResponse = await $.ajax({
        url: `${URL}/users/findByEmail`,
        type: "POST",
        data: { email: correoModalInput },
        dataType: "json",
      });

      let userId;
      if (userResponse && userResponse.userId) {
        userId = userResponse.userId;
      } else {
        const createUserResponse = await $.ajax({
          url: `${URL}/users/createUser`,
          type: "POST",
          data: { email: correoModalInput },
          dataType: "json",
        });
        userId = createUserResponse.userId;
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const suggestionResponse = await $.ajax({
        url: `${URL}/sugerenciaVoto/addSugerencias`,
        type: "POST",
        data: {
          fecha: currentDate,
          descripcion: sugerenciaInputValue,
          userId: userId,
          correo: correoModalInput,
        },
        dataType: "json",
      });

      console.log(suggestionResponse);
      showSuccessAlert("Sugerencia enviada correctamente.");
      document.getElementById('sugerenciaInput').value = '';
      document.getElementById('correoModalInput').value = '';
      $('#correoModal').modal('hide'); 
    } catch (error) {
      console.error("Error al enviar la sugerencia:", error);
      showErrorAlert("Error al enviar la sugerencia: " + error.message);
    }
  } else {
    showErrorAlert('Por favor, ingresa tu correo.');
  }
});




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