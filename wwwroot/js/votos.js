const submitButtonVoto = document.getElementById('submitVoto');
const radios = document.querySelectorAll('input[name="voto"]');


submitButtonVoto.addEventListener('click', async function () {
  const radios = document.querySelectorAll('input[name="voto"]');
  let selectedId = null;

  radios.forEach(radio => {
    if (radio.checked) {
      selectedId = radio.value; 
    }
  });

  if (selectedId) {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; 
      
      const response = await $.ajax({
        url: `${URL}/sugerenciaVoto/addVotos`, 
        type: "POST",
        data: {
          canVoto: selectedId, 
          date: currentDate
        },
        dataType: "json",
      });

      console.log(response); 
      submitButtonVoto.disabled = true;
      radios.forEach(radio => {
        radio.disabled = true;
      });
      
      showSuccessAlert("Voto enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar el voto:", error);
    }
  } else {
    showErrorAlert('Por favor, selecciona una opción antes de enviar.');
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