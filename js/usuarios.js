// ===== USUARIOS API =====
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('usuariosContainer');
    const loading = document.getElementById('loading');

    // URL de la API JSONPlaceholder
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    loading.style.display = 'block';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = 'none';
            mostrarUsuarios(data);
        })
        .catch(error => {
            loading.style.display = 'none';
            container.innerHTML = `
                <div class="error-api">
                    <p>❌ Error al cargar los usuarios</p>
                    <p style="font-size:0.9rem; color:#7f8c8d;">${error.message}</p>
                    <button onclick="location.reload()" class="btn-reintentar">Reintentar</button>
                </div>
            `;
            console.error('Error:', error);
        });
});

function mostrarUsuarios(usuarios) {
    const container = document.getElementById('usuariosContainer');

    container.innerHTML = usuarios.map(user => `
        <div class="usuario-card">
            <div class="usuario-avatar">
                <span>${user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div class="usuario-info">
                <h3>${user.name}</h3>
                <p><strong>📧 Email:</strong> ${user.email}</p>
                <p><strong>🏢 Empresa:</strong> ${user.company.name}</p>
                <p><strong>🌐 Web:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p><strong>📍 Dirección:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>📞 Teléfono:</strong> ${user.phone}</p>
            </div>
        </div>
    `).join('');
}