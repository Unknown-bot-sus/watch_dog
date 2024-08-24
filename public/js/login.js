const loginForm = document.getElementById('login-form');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const params = new URLSearchParams(window.location.search);

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = emailElement.value;
    const password = passwordElement.value;

    const formData = {
        email,
        password
    };

    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = params.get("redirect") || '/';
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            // Show an error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Show a general error message to the user
    }
});