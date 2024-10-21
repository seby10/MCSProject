const radios = document.querySelectorAll('input[name="voto"]');
const submitButtonVoto = document.getElementById('submitVoto');
const submitButtonSugerencia = document.getElementById('submitVoto');

radios.forEach(radio => {
  radio.addEventListener('click', function() {
    if (this.checked) {
        this.checked=true;
    } else {
        radios.forEach(r => r.checked = false)
        this.checked = true;


    }
  });
});

  const URL = "http://localhost:4000/MCSPROJECT";

  document.getElementById('submitVoto').addEventListener('click', async function() {
    const radios = document.querySelectorAll('input[name="voto"]');
    let selectedId = null;
  
    // Busca la opción seleccionada
    radios.forEach(radio => {
      if (radio.checked) {
        selectedId = radio.value; // Obtener el valor (id) de la opción seleccionada
      }
    });
  
    // Verifica si se ha seleccionado alguna opción
    if (selectedId) {
      try {
        const currentDate = new Date().toISOString().split('T')[0]; 
        // Llamada AJAX para enviar el voto
        const response = await $.ajax({
          url: `${URL}/votos/addVotos`, // Cambia esta URL según tu endpoint
          type: "POST",
          data: {
            canVoto: selectedId, // Envía el id de la opción seleccionada
            date: currentDate
          },
          dataType: "json",
        });
  
        console.log(response); // Maneja la respuesta según sea necesario
      } catch (error) {
        console.error("Error al enviar el voto:", error);
      }
    } else {
      alert('Por favor, selecciona una opción antes de enviar.');
    }
  });
  