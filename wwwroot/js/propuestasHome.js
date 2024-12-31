const obtenerPropuestasFavoritas = async () => {
    try {
        const response = await $.ajax({
            url: `${URL}/propuestas/getPropuestas`,
            type: "GET",
            dataType: "json",
        });
        console.log("Datos obtenidos de la API:", response); // Verificar los datos
        return response.response;
    } catch (error) {
        console.error("Error al obtener las propuestas favoritas:", error);
        return [];
    }
};

const getPropuestaFav = async () => {
    const propuestasFav = await obtenerPropuestasFavoritas();
    if (!Array.isArray(propuestasFav)) {
        console.error("El formato de las propuestas no es un array:", propuestasFav);
        return [];
    }
    return propuestasFav.filter((propuesta) => propuesta.FAVORITA === 1 && propuesta.ESTADO === 1);
};

// Función para limitar las palabras de un texto
const limitarPalabras = (texto, limite) => {
    const palabras = texto.split(" ");
    return palabras.length > limite ? palabras.slice(0, limite).join(" ") + "..." : texto;
};

const mostrarPropuestasFavoritas = async () => {
    const propuestasFavoritas = await getPropuestaFav();
    const contenedorPropuestas = document.querySelector(".propuestas-favoritas-section .row");

    if (!contenedorPropuestas) {
        console.error("No se encontró el contenedor de propuestas favoritas.");
        return;
    }

    if (propuestasFavoritas.length === 0) {
        contenedorPropuestas.innerHTML = `
            <p>No hay propuestas favoritas para mostrar en este momento.</p>
        `;
        return;
    }

    contenedorPropuestas.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas propuestas
    propuestasFavoritas.forEach((propuesta) => {
        const propuestaHTML = `
            <div class="col-md-4">
                <div class="propuesta-card">
                    <div class="propuesta-img-box">
                        <img src="${propuesta.URL_IMAGEN || 'images/placeholder.jpg'}" alt="Propuesta ${propuesta.ID_PRO}">
                    </div>
                    <div class="propuesta-content">
                        <h5>${propuesta.NOM_PRO}</h5>
                        <p>${limitarPalabras(propuesta.INF_PRO, 10)}</p>
                    </div>
                </div>
            </div>
        `;
        contenedorPropuestas.innerHTML += propuestaHTML;
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    await mostrarPropuestasFavoritas();
});
