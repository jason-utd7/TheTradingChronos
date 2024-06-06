document.addEventListener('DOMContentLoaded', function () {
    const authForm = document.getElementById('authForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupBtn = document.getElementById('signupBtn');
    const signinBtn = document.getElementById('signinBtn');
    const message = document.getElementById('message');

    authForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        if (email.trim() === '' || password.trim() === '') {
            showMessage('Please enter email and password.');
            return;
        }

        if (e.target === signupBtn) {
            // signup action
            showMessage('Sign Up button clicked.');
        } else if (e.target === signinBtn) {
            // signin action
            showMessage('Sign In button clicked.');
        }
    });

    function showMessage(msg) {
        message.textContent = msg;
    }
});
