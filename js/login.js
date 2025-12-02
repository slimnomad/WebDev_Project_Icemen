document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.login-form');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const error = document.getElementById('loginError');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (error) {
      error.textContent = '';
      error.style.color = 'crimson';
    }

    const userVal = username ? username.value.trim() : '';
    const passVal = password ? password.value : '';

    if (userVal.length < 3) {
      if (error) error.textContent = 'Username must be at least 3 characters.';
      if (username) username.focus();
      return;
    }

    if (passVal.length < 8) {
      if (error) error.textContent = 'Password must be at least 8 characters.';
      if (password) password.focus();
      return;
    }

    // Passed client-side validation
    if (error) {
      error.style.color = 'green';
      error.textContent = 'Login successful — redirecting...';
    }
    setTimeout(function () {
      // Redirect to main page or continue to real login flow
      window.location.href = '../index.html';
    }, 700);
  });
});
