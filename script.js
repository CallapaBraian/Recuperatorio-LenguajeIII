document.getElementById('ticket-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Toma de datos atravez de las etiquetas 
    const destination = document.getElementById('destination').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const fechaIda = document.getElementById('departure-date').value;
    const fechaVuelta = document.getElementById('return-date').value;
    const pasajeros = parseInt(document.getElementById('passengers').value, 10);
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    // Realizo la Validación de fechas
    if (fechaVuelta <= fechaIda) {
        errorDiv.textContent = 'La fecha de Vuelta debe ser mayor a la de Ida.';
        errorDiv.style.display = 'block';
        document.getElementById('precio').value = '';
        return;
    }

    // Establecer los Precios base ida/vuelta declaro las constantes
    const precios = {
        "COR-Cordoba": 120000,
        "MDZ-Mendoza": 210800,
        "BUE-Buenos Aires": 135000
    };

    let precioBase = precios[destination] || 0;

    // Si es solo ida, se cobra la mitad
    if (tipo === "ida") {
        precioBase = precioBase / 2;
    }

    // Realizo los Calculos  del precio total con IVA
    const precioFinal = precioBase * pasajeros * 1.21;

    // Muestro el resultado del precio en formato moneda de Argentina
    document.getElementById('precio').value = precioFinal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
});