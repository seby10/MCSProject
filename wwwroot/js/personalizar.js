const direccion = `${URL}/personalizacion/getData`;
$(document).ready(function () {
  $.ajax({
    url: direccion,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.success) {

        if (data.response[0].color_principal) {
            document.documentElement.style.setProperty('--color-principal', data.response[0].color_principal);
        }

        if (data.response[0].color_principal) {
            document.documentElement.style.setProperty('--background-color', data.response[0].color_principal);
          }
  
        if (data.response[0].color_principal) {
            document.documentElement.style.setProperty('--border-color', data.response[0].color_principal);
        }

        const backgroundElement = document.getElementById("background");
        if (backgroundElement) {
          backgroundElement.src = data.response[0].background_path;
        }

        const logoElement = document.getElementById("logo");
        if (logoElement) {
          logoElement.src = data.response[0].logo_path;
        }

        const faviconElement = document.getElementById("favicon");
        if (faviconElement) {
          faviconElement.href = data.response[0].icon_path;
        }

        const title1Element = document.getElementById("Title1");
        if (title1Element) {
          title1Element.innerText =
            data.response[0].titulo1 || title1Element.innerText;
        }

        const title2Element = document.getElementById("Title2");
        if (title2Element) {
          title2Element.innerText =
            data.response[0].titulo2 || title2Element.innerText;
        }

        const title3Element = document.getElementById("Title3");
        if (title3Element) {
          title3Element.innerText =
            data.response[0].titulo3 || title3Element.innerText;
        }
      } else {
        console.error("No se pudo obtener los datos de personalización.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
    },
  });
});
