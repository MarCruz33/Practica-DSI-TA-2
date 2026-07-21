// ===== RESERVAS Y VUELOS =====
document.addEventListener('DOMContentLoaded', function () {
    cargarReservas();
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        fechaInput.value = tomorrow.toISOString().split('T')[0];
    }
});

// ===== DATOS DE VUELOS SIMULADOS (API) =====
const vuelosDisponibles = [
    { id: 1, origen: 'CDMX', destino: 'Cancún', precio: 3200, duracion: '2h 30min', escalas: 'Directo', aerolinea: 'Aeroméxico' },
    { id: 2, origen: 'CDMX', destino: 'Guadalajara', precio: 2100, duracion: '1h 45min', escalas: 'Directo', aerolinea: 'Volaris' },
    { id: 3, origen: 'CDMX', destino: 'Monterrey', precio: 2800, duracion: '2h 10min', escalas: 'Directo', aerolinea: 'Viva Aerobus' },
    { id: 4, origen: 'CDMX', destino: 'Tijuana', precio: 4500, duracion: '3h 45min', escalas: '1 escala', aerolinea: 'Aeroméxico' },
    { id: 5, origen: 'CDMX', destino: 'Mérida', precio: 3500, duracion: '2h 15min', escalas: 'Directo', aerolinea: 'Volaris' },
    { id: 6, origen: 'Guadalajara', destino: 'Cancún', precio: 3800, duracion: '2h 50min', escalas: 'Directo', aerolinea: 'Viva Aerobus' },
    { id: 7, origen: 'Monterrey', destino: 'Cancún', precio: 4000, duracion: '2h 40min', escalas: 'Directo', aerolinea: 'Aeroméxico' },
    { id: 8, origen: 'CDMX', destino: 'Puerto Vallarta', precio: 2900, duracion: '1h 50min', escalas: 'Directo', aerolinea: 'Volaris' },
];

// ===== BUSCAR VUELOS =====
function buscarVuelos() {
    const origen = document.getElementById('origen').value.trim().toUpperCase();
    const destino = document.getElementById('destino').value.trim().toUpperCase();
    const fecha = document.getElementById('fecha').value;

    if (!origen || !destino) {
        alert('Por favor, ingresa origen y destino.');
        return;
    }

    // Filtrar vuelos
    const resultados = vuelosDisponibles.filter(v =>
        v.origen.toUpperCase().includes(origen) &&
        v.destino.toUpperCase().includes(destino)
    );

    const container = document.getElementById('vuelosContainer');

    if (resultados.length === 0) {
        container.innerHTML = `
            <div class="vuelo-card" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="color:#95a5a6; font-size:1.2rem;">✈️ No se encontraron vuelos para ${origen} → ${destino}</p>
                <p style="color:#7f8c8d;">Prueba con otros destinos o fechas</p>
            </div>
        `;
        return;
    }

    // Renderizar resultados
    container.innerHTML = resultados.map(v => `
        <div class="vuelo-card">
            <div class="vuelo-info">
                <h3>🛫 ${v.origen} → ${v.destino}</h3>
                <p><strong>Precio:</strong> $${v.precio.toLocaleString()} MXN</p>
                <p><strong>Duración:</strong> ${v.duracion}</p>
                <p><strong>Escalas:</strong> ${v.escalas}</p>
                <p><strong>Aerolínea:</strong> ${v.aerolinea}</p>
                <button class="btn-reservar-vuelo" onclick="reservarVuelo(${v.id}, '${v.origen}', '${v.destino}', ${v.precio}, '${v.aerolinea}')">
                    Reservar ahora
                </button>
            </div>
        </div>
    `).join('');
}

// ===== RESERVAR VUELO =====
function reservarVuelo(id, origen, destino, precio, aerolinea) {
    // Obtener reservas actuales
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    // Verificar si ya está reservado
    if (reservas.some(r => r.id === id)) {
        alert('Este vuelo ya está en tus reservas.');
        return;
    }

    // Crear nueva reserva
    const nuevaReserva = {
        id: id,
        origen: origen,
        destino: destino,
        precio: precio,
        aerolinea: aerolinea,
        fecha: document.getElementById('fecha').value || new Date().toISOString().split('T')[0],
        fechaReserva: new Date().toLocaleString()
    };

    reservas.push(nuevaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // Actualizar lista
    cargarReservas();
    alert(`✅ Vuelo reservado: ${origen} → ${destino} por $${precio.toLocaleString()} MXN`);
}

// ===== CARGAR RESERVAS =====
function cargarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const container = document.getElementById('listaReservas');

    if (reservas.length === 0) {
        container.innerHTML = `<p class="no-reservas">📭 No tienes reservas activas</p>`;
        return;
    }

    container.innerHTML = reservas.map(r => `
        <div class="reserva-item">
            <div class="reserva-info">
                <strong>🛫 ${r.origen} → ${r.destino}</strong>
                <span style="margin-left:0.8rem; color:#2c6e7e;">$${r.precio.toLocaleString()} MXN</span>
                <span style="margin-left:0.8rem; color:#5d7a8a;">${r.aerolinea}</span>
                <span style="margin-left:0.8rem; color:#95a5a6; font-size:0.85rem;">📅 ${r.fecha}</span>
            </div>
            <button class="btn-cancelar" onclick="cancelarReserva(${r.id})">Cancelar</button>
        </div>
    `).join('');
}

// ===== CANCELAR RESERVA =====
function cancelarReserva(id) {
    if (!confirm('¿Estás seguro de cancelar esta reserva?')) return;

    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas = reservas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    cargarReservas();
    alert('❌ Reserva cancelada.');
}