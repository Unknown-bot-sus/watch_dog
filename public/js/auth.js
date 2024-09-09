const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

function logout() {
    localStorage.removeItem('token');
    window.location.reload();
}

function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

function redirectIfNotAuthenticated() {
    if (!isAuthenticated()) {
        window.location.href = `/login?redirect=${window.location.pathname}`;
    }
}

const token = localStorage.getItem('token');

redirectIfNotAuthenticated();