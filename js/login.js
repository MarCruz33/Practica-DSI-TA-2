// ===== LOGIN CON EMAIL (USUARIOS AUTORIZADOS) =====
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('loginError');
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    // Verificar si ya hay sesión activa y si no ha expirado
    if (sessionStorage.getItem('loggedIn') === 'true') {
        const loginTime = sessionStorage.getItem('loginTime');
        const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

        if (loginTime && (Date.now() - parseInt(loginTime)) < SESSION_DURATION) {
            window.location.href = 'index.html';
        } else {
            // Sesión expirada
            sessionStorage.clear();
        }
    }

    // ===== USUARIOS AUTORIZADOS (CORREGIDOS) =====
    const usuariosAutorizados = [
        {
            email: 'dsm23190341.jsotelo@alumnos.utsv.edu.mx',
            password: 'Sotelo2026'
        },
        {
            email: 'dsm22190090.jlopez@alumnos.utsv.edu.mx', // ✅ CORREGIDO: utsv en lugar de ustv
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

        // Limpiar errores anteriores
        errorDiv.textContent = '';
        errorDiv.className = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // ¡DEPURACIÓN! Muestra lo que estás escribiendo
        console.log('📝 Correo ingresado:', email);
        console.log('📝 Contraseña ingresada:', password);

        // Muestra los correos autorizados para comparar
        console.log('📧 Correos autorizados:');
        usuariosAutorizados.forEach(user => {
            console.log(`  • ${user.email} (Contraseña: ${user.password})`);
        });

        // Deshabilitar botón durante la verificación
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verificando...';

        // Validación básica
        if (!email || !password) {
            errorDiv.textContent = '⚠️ Por favor, completa todos los campos.';
            errorDiv.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.textContent = '🚀 Ingresar';
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = '⚠️ Ingresa un correo electrónico válido.';
            errorDiv.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.textContent = '🚀 Ingresar';
            return;
        }

        try {
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
                    sessionStorage.setItem('loginTime', Date.now().toString());

                    errorDiv.textContent = '✅ Inicio de sesión exitoso. Redirigiendo...';
                    errorDiv.style.color = '#27ae60';
                    errorDiv.className = 'success-message';

                    // Redirigir después de 1.5 segundos
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    errorDiv.textContent = '❌ Contraseña incorrecta. Intenta nuevamente.';
                    errorDiv.style.color = '#e74c3c';
                    passwordInput.value = '';
                    passwordInput.focus();
                    submitBtn.disabled = false;
                    submitBtn.textContent = '🚀 Ingresar';
                }
            } else {
                errorDiv.textContent = '❌ Correo no autorizado. Contacta al administrador.';
                errorDiv.style.color = '#e74c3c';
                emailInput.value = '';
                passwordInput.value = '';
                emailInput.focus();
                submitBtn.disabled = false;
                submitBtn.textContent = '🚀 Ingresar';
            }
        } catch (error) {
            console.error('Error en autenticación:', error);
            errorDiv.textContent = '❌ Error al procesar el inicio de sesión. Intenta nuevamente.';
            errorDiv.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.textContent = '🚀 Ingresar';
        }
    });

    // ===== FUNCIÓN PARA OBTENER NOMBRE DEL USUARIO =====
    function obtenerNombreUsuario(email) {
        try {
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
        } catch (error) {
            console.error('Error al obtener nombre:', error);
            return 'Usuario';
        }
    }

    // ===== LIMPIAR ERROR AL ESCRIBIR =====
    emailInput.addEventListener('input', function () {
        errorDiv.textContent = '';
        errorDiv.className = '';
    });

    passwordInput.addEventListener('input', function () {
        errorDiv.textContent = '';
        errorDiv.className = '';
    });

    // ===== MOSTRAR CORREOS AUTORIZADOS EN CONSOLA (AYUDA) =====
    console.log('📧 Correos autorizados:');
    usuariosAutorizados.forEach(user => {
        console.log(`  • ${user.email} (Contraseña: ${user.password})`);
    });
});