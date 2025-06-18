(function() {
    document.getElementById('hotelForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value,
            roomType: document.getElementById('roomType').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            persons: document.getElementById('persons').value
        };

        // Basic date validation
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        const today = new Date().setHours(0, 0, 0, 0);

        if (checkInDate < today) {
            alert('Check-in date cannot be in the past');
            return;
        }
        if (checkOutDate <= checkInDate) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Map room type to display name and price
        const roomDetails = {
            'super_deluxe_ac': 'Super Deluxe (AC) - ₹5000',
            'super_deluxe_non_ac': 'Super Deluxe (Non-AC) - ₹4000',
            'deluxe_ac': 'Deluxe (AC) - ₹3500',
            'deluxe_non_ac': 'Deluxe (Non-AC) - ₹3000'
        }[formData.roomType] || 'Unknown Room';

        // Construct email body
        const emailBody = `
            Subject: New Hotel Booking Request

            Name: ${formData.name}
            Your Email: ${formData.email}
            Contact: ${formData.contact}
            Room Type: ${roomDetails}
            Check-In Date: ${formData.checkIn}
            Check-Out Date: ${formData.checkOut}
            Number of Persons: ${formData.persons}

            Please confirm the booking.
        `.trim();

        // Open email client with pre-filled details
        const hotelEmail = 'nishimajawdiya2004@gmail.com'; // Hardcoded hotel email
        const mailtoLink = `mailto:${hotelEmail}?subject=New%20Hotel%20Booking%20Request&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;

        // Show success message
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.innerText = 'Your booking request has been prepared. Please send the email that opened!';

        // Reset form
        this.reset();
    });

    // Set minimum date for check-in to today
    const checkInInput = document.getElementById('checkIn');
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);

    // Update check-out min date based on check-in
    checkInInput.addEventListener('change', function() {
        const checkOutInput = document.getElementById('checkOut');
        checkOutInput.setAttribute('min', this.value);
    });
})();