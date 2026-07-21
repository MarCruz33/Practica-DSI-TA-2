// ===== LOGIN CON EMAIL (USUARIOS AUTORIZADOS) =====
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('loginError');

    // Verificar si ya hay sesión activa
    if (sessionStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }

    // ===== USUARIOS AUTORIZADOS =====
    const usuariosAutorizados = [
        {
            email: 'dsm23190341.jsotelo@alumnos.utsv.edu.mx',
            password: 'Sotelo2026'
        },
        {
            email: 'dsm22190090.jlopez@alumnos.ustv.edu.mx',
            password: 'Lopez2026'
        },
        {
            email: 'dsm22190295.mvazquez@alumnos.utsv.mx',
            password: 'Vazquez2026'
        },
        {
            email: 'dsm22190367.ajimenez@alumnos.utsv.edu.mx',
            password: 'Jimenez2026'
        }
    ];

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validación básica
        if (!email || !password) {
            errorDiv.textContent = '⚠️ Por favor, completa todos los campos.';
            errorDiv.style.color = '#e74c3c';
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = '⚠️ Ingresa un correo electrónico válido.';
            errorDiv.style.color = '#e74c3c';
            return;
        }

        // ===== BUSCAR USUARIO EN LA LISTA AUTORIZADA =====
        const usuarioEncontrado = usuariosAutorizados.find(user =>
            user.email.toLowerCase() === email.toLowerCase()
        );

        // ===== VALIDAR CREDENCIALES =====
        if (usuarioEncontrado) {
            // Verificar contraseña
            if (password === usuarioEncontrado.password) {
                // Éxito - Guardar sesión
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userName', obtenerNombreUsuario(email));

                errorDiv.textContent = '✅ Inicio de sesión exitoso. Redirigiendo...';
                errorDiv.style.color = '#27ae60';

                // Redirigir después de 1 segundo
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                errorDiv.textContent = '❌ Contraseña incorrecta. Intenta nuevamente.';
                errorDiv.style.color = '#e74c3c';
                passwordInput.value = '';
                passwordInput.focus();
            }
        } else {
            errorDiv.textContent = '❌ Correo no autorizado. Contacta al administrador.';
            errorDiv.style.color = '#e74c3c';
            emailInput.value = '';
            passwordInput.value = '';
            emailInput.focus();
        }
    });

    // ===== FUNCIÓN PARA OBTENER NOMBRE DEL USUARIO =====
    function obtenerNombreUsuario(email) {
        // Extraer nombre de la parte antes del @
        const partes = email.split('@')[0];
        // Buscar el nombre después del último punto
        const nombrePartes = partes.split('.');
        if (nombrePartes.length >= 2) {
            const nombreCompleto = nombrePartes[nombrePartes.length - 1];
            // Capitalizar primera letra
            return nombreCompleto.charAt(0).toUpperCase() + nombreCompleto.slice(1);
        }
        return 'Usuario';
    }

    // ===== LIMPIAR ERROR AL ESCRIBIR =====
    emailInput.addEventListener('input', function () {
        errorDiv.textContent = '';
    });

    passwordInput.addEventListener('input', function () {
        errorDiv.textContent = '';
    });

    // ===== MOSTRAR CORREOS AUTORIZADOS EN CONSOLA (AYUDA) =====
    console.log('📧 Correos autorizados:');
    usuariosAutorizados.forEach(user => {
        console.log(`  • ${user.email} (Contraseña: ${user.password})`);
    });
});