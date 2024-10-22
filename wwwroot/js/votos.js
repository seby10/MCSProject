const URL = "http://localhost:4000/MCSPROJECT";
const submitButtonSugerencia = document.getElementById('submitSugerencia');
const submitButtonVoto = document.getElementById('submitVoto');
const modalAceptarButton = document.getElementById('modalAceptar');
const radios = document.querySelectorAll('input[name="voto"]');
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
        url: `${URL}/sugerencias/addSugerencias`,
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
      alert("Sugerencia enviada correctamente.");
      document.getElementById('sugerenciaInput').value = '';
      document.getElementById('correoModalInput').value = '';
      $('#correoModal').modal('hide'); 
    } catch (error) {
      console.error("Error al enviar la sugerencia:", error);
      alert("Error al enviar la sugerencia: " + error.message);
    }
  } else {
    alert('Por favor, ingresa tu correo.');
  }
});

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
