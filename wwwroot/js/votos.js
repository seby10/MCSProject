const submitButtonVoto = document.getElementById('submitVoto');
const radios = document.querySelectorAll('input[name="voto"]');
const graficaWrapper = document.getElementById('grafica-wrapper');
const votoContainer = document.getElementById('votoContainer');

window.onload = function() {
  const votoGuardado = localStorage.getItem('voto');
  
  if (votoGuardado) {
    graficaWrapper.style.display = 'block';
    votoContainer.style.display = 'none';
    loadVotos();
    disableVoting();
  } else {
    graficaWrapper.style.display = 'none';
    votoContainer.style.display = 'block';
    enableVoting();
  }
};

function disableVoting() {
  submitButtonVoto.disabled = true;
  radios.forEach(radio => {
    radio.disabled = true;
  });
}

function enableVoting() {
  submitButtonVoto.disabled = false;
  radios.forEach(radio => {
    radio.disabled = false;
  });
}

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

      localStorage.setItem('voto', selectedId);
      disableVoting();
      
      showSuccessAlert("Voto enviado correctamente.");
      votoContainer.style.display = 'none';
      graficaWrapper.style.display = 'block';
      loadVotos();
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

async function loadVotos() {
  try {
    const datos = await showVotos();
    if (!datos || !Array.isArray(datos.response)) {
      console.error("Datos inválidos o no disponibles.");
      return;
    }

    const votosPorCandidato = {};
    let totalVotos = 0;

    datos.response.forEach(voto => {
      const candidatoCompleto = `${voto.NOM_CAN} ${voto.APE_CAN}`;
      if (votosPorCandidato[candidatoCompleto]) {
        votosPorCandidato[candidatoCompleto]++;
      } else {
        votosPorCandidato[candidatoCompleto] = 1;
      }
      totalVotos++;
    });

    const porcentajesPorCandidato = {};
    for (const candidato in votosPorCandidato) {
      porcentajesPorCandidato[candidato] = ((votosPorCandidato[candidato] / totalVotos) * 100).toFixed(2);
    }

    createChart(porcentajesPorCandidato);
  } catch (error) {
    console.error("Error al cargar votos:", error);
  }
}

function createChart(porcentajesPorCandidato) {
  const $grafica = document.querySelector("#grafica");
  if (!$grafica) {
    console.error('Elemento canvas no encontrado.');
    return;
  }

  const etiquetas = Object.keys(porcentajesPorCandidato);
  const porcentajes = Object.values(porcentajesPorCandidato);

  const colores = [
    'rgba(242, 99, 255, 0.2)', 
    'rgba(150, 103, 198, 0.2)'
  ];

  const datosGrafica = {
    label: "Porcentajes de votos por candidatos",
    data: porcentajes,
    backgroundColor: colores.slice(0, porcentajes.length),
    borderColor: colores.map(color => color.replace('0.2', '1')),
    borderWidth: 1,
  };

  new Chart($grafica, {
    type: 'bar',
    data: {
      labels: etiquetas,
      datasets: [datosGrafica],
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
