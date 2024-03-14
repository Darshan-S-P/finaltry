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

        // Call the function to populate the select element with flights
        populateFlightsSelect();
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
    }
});

// Flight booking form submission handler
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userID = formData.get('userID'); // Assuming you have a hidden input field for userID
    const flightID = formData.get('flight');
    const seatNumber = formData.get('seatNumber'); // Assuming you have an input field for seatNumber
    const reservationDate = formData.get('departureDate'); // Assuming you have an input field for departureDate

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

        const data = await response.json();
        alert(`Flight booked successfully! Ticket ID: ${data.ticketID}`);
        // Additional logic if needed after booking the flight

    } catch (error) {
        console.error(error);
        alert('An error occurred while booking the flight. Please try again later.');
    }
});

// Fetch available flights from the server
async function fetchFlights() {
    try {
        const response = await fetch('http://localhost:3000/api/flights');
        if (!response.ok) {
            throw new Error(`Failed to fetch flights: ${response.status} ${response.statusText}`);
        }
        const flights = await response.json();
        return flights;
    } catch (error) {
        console.error('Error fetching flights:', error);
        return [];
    }
}

// Populate the select element with flights
async function populateFlightsSelect() {
    const flights = await fetchFlights();
    const select = document.getElementById('flight');
    select.innerHTML = ''; // Clear previous options
    flights.forEach(flight => {
        const option = document.createElement('option');
        option.value = flight.FlightID; // Assuming flight id is used as the value
        option.textContent = `${flight.DepartureAirport} to ${flight.ArrivalAirport}`; // Use DepartureAirport and ArrivalAirport properties
        select.appendChild(option);
    });
}
