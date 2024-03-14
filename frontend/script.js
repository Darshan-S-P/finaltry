document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, name, email, phone })
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        alert('User registered successfully!');
        // Hide registration form and show flight booking form
        document.getElementById('registrationSection').style.display = 'none';
        document.getElementById('bookingSection').style.display = 'block';
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
    }
});
