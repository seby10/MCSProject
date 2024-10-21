const URL = "http://localhost:4000/MCSPROJECT";
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


  document.getElementById('submitVoto').addEventListener('click', async function() {
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
          url: `${URL}/votos/addVotos`, 
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
        
        alert("Voto enviado correctamente.");
      } catch (error) {
        console.error("Error al enviar el voto:", error);
      }
    } else {
      alert('Por favor, selecciona una opción antes de enviar.');
    }
  });
  