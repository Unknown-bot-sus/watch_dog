const signupForm = document.getElementById('signup-form');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = emailElement.value;
    const password = passwordElement.value;

    const formData = {
        email,
        password
    };

    try {
        const response = await fetch('/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user', data.user);
            location.href = '/login';
        } else {
            const errorData = await response.json();
            console.error('Signup failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
        // Show a general error message to the user
    }
});