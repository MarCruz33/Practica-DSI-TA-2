// ===== LOGIN CON EMAIL (VERSIÓN MEJORADA CON DEPURACIÓN) =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Página de login cargada correctamente');

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('loginError');
    const submitBtn = document.querySelector('.btn-login');

    // Verificar elementos del DOM
    if (!loginForm) console.error('❌ No se encontró el formulario');
    if (!emailInput) console.error('❌ No se encontró el campo email');
    if (!passwordInput) console.error('❌ No se encontró el campo password');
    if (!errorDiv) console.error('❌ No se encontró el div de error');

    // Verificar si ya hay sesión activa
    if (sessionStorage.getItem('loggedIn') === 'true') {
        console.log('👤 Sesión activa encontrada, redirigiendo...');
        window.location.href = 'index.html';
        return;
    }

    // ===== USUARIOS AUTORIZADOS =====
    const usuariosAutorizados = [
        {
            email: 'dsm23190341.jsotelo@alumnos.utsv.edu.mx',
            password: 'Sotelo2026',
            nombre: 'Sotelo'
        },
        {
            email: 'dsm22190090.jlopez@alumnos.utsv.edu.mx',
            password: 'Lopez2026',
            nombre: 'López'
        },
        {
            email: 'dsm22190295.mvazquez@alumnos.utsv.mx',
            password: 'Vazquez2026',
            nombre: 'Vázquez'
        },
        {
            email: 'dsm22190367.ajimenez@alumnos.utsv.edu.mx',
            password: 'Jimenez2026',
            nombre: 'Jiménez'
        }
    ];

    // Mostrar ayuda en consola
    console.log('📧 CORREOS AUTORIZADOS:');
    usuariosAutorizados.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email}`);
        console.log(`   Contraseña: ${user.password}`);
        console.log('   ---');
    });

    // ===== EVENTO DEL FORMULARIO =====
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('📝 Formulario enviado');

        // Limpiar errores
        errorDiv.textContent = '';
        errorDiv.className = 'error-message';

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log(`📧 Email ingresado: "${email}"`);
        console.log(`🔑 Contraseña ingresada: "${password}"`);

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

        // ===== BUSCAR USUARIO =====
        const usuarioEncontrado = usuariosAutorizados.find(user =>
            user.email.toLowerCase() === email.toLowerCase()
        );

        console.log(`🔍 Usuario encontrado: ${usuarioEncontrado ? 'SÍ' : 'NO'}`);

        if (usuarioEncontrado) {
            console.log(`✅ Usuario: ${usuarioEncontrado.nombre}`);

            // Verificar contraseña
            if (password === usuarioEncontrado.password) {
                console.log('✅ Contraseña correcta');

                // Éxito - Guardar sesión
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userName', usuarioEncontrado.nombre);
                sessionStorage.setItem('loginTime', Date.now().toString());

                errorDiv.textContent = `✅ ¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo...`;
                errorDiv.style.color = '#27ae60';
                errorDiv.className = 'success-message';

                // Deshabilitar botón
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ Redirigiendo...';

                // Redirigir después de 1.5 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                console.log('❌ Contraseña incorrecta');
                errorDiv.textContent = '❌ Contraseña incorrecta. Intenta nuevamente.';
                errorDiv.style.color = '#e74c3c';
                passwordInput.value = '';
                passwordInput.focus();
            }
        } else {
            console.log('❌ Usuario no autorizado');

            // Mostrar mensaje con los correos disponibles
            let correosLista = usuariosAutorizados.map(u =>
                `• ${u.email}`
            ).join('<br>');

            errorDiv.innerHTML = `
                ❌ Correo no autorizado.<br><br>
                <strong>Correos autorizados:</strong><br>
                ${correosLista}<br><br>
                <small style="font-size: 12px;">💡 Copia y pega exactamente uno de estos correos</small>
            `;
            errorDiv.style.color = '#e74c3c';
            emailInput.value = '';
            passwordInput.value = '';
            emailInput.focus();
        }
    });

    // ===== LIMPIAR ERROR AL ESCRIBIR =====
    emailInput.addEventListener('input', function () {
        errorDiv.textContent = '';
        errorDiv.className = 'error-message';
    });

    passwordInput.addEventListener('input', function () {
        errorDiv.textContent = '';
        errorDiv.className = 'error-message';
    });

});