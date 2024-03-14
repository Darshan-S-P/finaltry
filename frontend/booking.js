document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userID = formData.get('userID');
    const flightID = formData.get('flightID');
    const seatNumber = formData.get('seatNumber');
    const reservationDate = formData.get('reservationDate');

    try {
        const response = await fetch('http://localhost:3000/api/book-flight', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID, flightID, seatNumber, reservationDate })
        });

        if (!response.ok) {
            throw new Error('Failed to book flight');
        }

        const responseData = await response.json();
        alert('Flight booked successfully! Ticket ID: ' + responseData.ticketID);
        // Redirect to confirmation page or perform other actions...
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
    }
});
