document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');

    // ===== USUARIOS AUTORIZADOS =====
    const usuariosAutorizados = [
        {
            email: 'abdi@turismoaventura.com',
            password: 'Abdi2026'
        },
        {
            email: 'alexis@turismoaventura.com',
            password: 'Alexis2026'
        },
        {
            email: 'jenn@turismoaventura.com',
            password: 'Jenn2026'
        },
        {
            email: 'mary@turismoaventura.com',
            password: 'Mary2026'
        }
    ];

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validación de campos vacíos
        if (!email || !password) {
            errorDiv.textContent = '⚠️ Por favor, completa todos los campos.';
            errorDiv.style.color = '#dc3545';
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = '⚠️ Ingresa un correo electrónico válido.';
            errorDiv.style.color = '#dc3545';
            return;
        }

        // Buscar usuario en la lista autorizada
        const usuarioEncontrado = usuariosAutorizados.find(user =>
            user.email.toLowerCase() === email.toLowerCase()
        );

        // Validar credenciales
        if (usuarioEncontrado) {
            if (password === usuarioEncontrado.password) {
                // Éxito - Guardar sesión
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('userEmail', email);

                errorDiv.textContent = '✅ Inicio de sesión exitoso. Redirigiendo...';
                errorDiv.style.color = '#28a745';

                // Redirigir al menú principal
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                errorDiv.textContent = '❌ Contraseña incorrecta. Intenta nuevamente.';
                errorDiv.style.color = '#dc3545';
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
            }
        } else {
            errorDiv.textContent = '❌ Correo no autorizado. Contacta al administrador.';
            errorDiv.style.color = '#dc3545';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('email').focus();
        }
    });

    // Limpiar mensaje de error al escribir
    document.getElementById('email').addEventListener('input', function () {
        errorDiv.textContent = '';
    });
    document.getElementById('password').addEventListener('input', function () {
        errorDiv.textContent = '';
    });

    // Mostrar credenciales en consola (ayuda para pruebas)
    console.log('📧 Credenciales de acceso:');
    usuariosAutorizados.forEach(user => {
        console.log(`  • ${user.email} | Contraseña: ${user.password}`);
    });
});