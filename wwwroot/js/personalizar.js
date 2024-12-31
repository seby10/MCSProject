const direccion = `${URL}/personalizacion/getData`;

$(document).ready(function () {
  $.ajax({
    url: direccion,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.success) {

        const colorPrincipal = data.response[0].color_principal;

        if (colorPrincipal) {
          document.documentElement.style.setProperty('--color-principal', colorPrincipal);

          const lightColor = lightenColor(colorPrincipal, 20); 
          const darkColor = darkenColor(colorPrincipal, 20);

          document.documentElement.style.setProperty('--background-color', lightColor);
          document.documentElement.style.setProperty('--border-color', lightColor);
          document.documentElement.style.setProperty('--hover-color', darkColor); 
          document.documentElement.style.setProperty('--box-shadow', darkColor);
        }

        // Modificar imágenes y texto
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
          title1Element.innerText = data.response[0].titulo1 || title1Element.innerText;
        }

        const title2Element = document.getElementById("Title2");
        if (title2Element) {
          title2Element.innerText = data.response[0].titulo2 || title2Element.innerText;
        }

        const title3Element = document.getElementById("Title3");
        if (title3Element) {
          title3Element.innerText = data.response[0].titulo3 || title3Element.innerText;
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

// Función para cargar el archivo CSS dinámicamente
function loadStylesheet(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function lightenColor(hex, percent) {
  let color = hexToRgb(hex);
  color.r = Math.min(255, color.r + (255 - color.r) * (percent / 100));
  color.g = Math.min(255, color.g + (255 - color.g) * (percent / 100));
  color.b = Math.min(255, color.b + (255 - color.b) * (percent / 100));
  return rgbToHex(color.r, color.g, color.b);
}

function darkenColor(hex, percent) {
  let color = hexToRgb(hex);
  color.r = Math.max(0, color.r - color.r * (percent / 100));
  color.g = Math.max(0, color.g - color.g * (percent / 100));
  color.b = Math.max(0, color.b - color.b * (percent / 100));
  return rgbToHex(color.r, color.g, color.b);
}

function hexToRgb(hex) {
  let r = 0, g = 0, b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r: r, g: g, b: b };
}

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}