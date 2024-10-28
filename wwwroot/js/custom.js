// get current year
(function () {
    var year = new Date().getFullYear();
    var currentYearElement = document.querySelector("#currentYear");

    // Verificar si el elemento existe
    if (currentYearElement) {
        currentYearElement.innerHTML = year; // Solo se ejecuta si el elemento existe
    }
})();
