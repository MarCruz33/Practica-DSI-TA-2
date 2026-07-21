// ===== CLIMA API (simulada) =====
function buscarClima() {
    const ciudad = document.getElementById('ciudadInput').value.trim();
    if (!ciudad) {
        alert('Por favor, ingresa una ciudad.');
        return;
    }

    // Simulación de respuesta de API (en producción se usaría OpenWeatherMap)
    const climas = [
        { temp: 22, desc: 'Cielo despejado', humedad: 45, viento: 10, icono: '☀️' },
        { temp: 18, desc: 'Parcialmente nublado', humedad: 60, viento: 15, icono: '⛅' },
        { temp: 28, desc: 'Soleado', humedad: 35, viento: 8, icono: '☀️' },
        { temp: 12, desc: 'Lluvia ligera', humedad: 80, viento: 20, icono: '🌧️' },
        { temp: 5, desc: 'Nevada', humedad: 90, viento: 25, icono: '❄️' },
        { temp: 30, desc: 'Tormenta', humedad: 75, viento: 30, icono: '⛈️' },
        { temp: 15, desc: 'Niebla', humedad: 85, viento: 5, icono: '🌫️' },
    ];

    // Seleccionar un clima aleatorio basado en la ciudad (para simulación)
    const index = ciudad.length % climas.length;
    const clima = climas[index];

    // Actualizar la UI
    document.getElementById('climaCiudad').textContent = ciudad;
    document.getElementById('climaTemp').textContent = `🌡️ ${clima.temp}°C`;
    document.getElementById('climaDesc').textContent = clima.desc;
    document.getElementById('climaHumedad').textContent = `💧 Humedad: ${clima.humedad}%`;
    document.getElementById('climaViento').textContent = `💨 Viento: ${clima.viento} km/h`;
    document.getElementById('climaIcono').textContent = clima.icono;
}

// Cargar clima inicial al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    buscarClima();
});