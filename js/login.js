// ===== LOGIN CON EMAIL =====
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('loginError');

    // Verificar si ya hay sesión activa
    if (sessionStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validación básica
        if (!email || !password) {
            errorDiv.textContent = 'Por favor, completa todos los campos.';
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = 'Ingresa un correo electrónico válido.';
            return;
        }

        // Simulación de autenticación (en producción se validaría con backend)
        // Se acepta cualquier email con contraseña de al menos 6 caracteres
        if (password.length >= 6) {
            // Guardar sesión
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            // Redirigir al inicio
            window.location.href = 'index.html';
        } else {
            errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        }
    });
});