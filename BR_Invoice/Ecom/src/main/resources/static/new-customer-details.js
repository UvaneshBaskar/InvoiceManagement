// Handle form submission
document.getElementById('new-customer-details-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = {
        id: document.getElementById('id').value,
        accountNumber: document.getElementById('accountNumber').value,
        bankName: document.getElementById('bankName').value,
        billingAddress: document.getElementById('billingAddress').value,
        branchName: document.getElementById('branchName').value,
        companyName: document.getElementById('companyName').value,
        contactNumber: document.getElementById('contactNumber').value,
        displayName: document.getElementById('displayName').value,
        emailId: document.getElementById('emailId').value,
        gstNumber: document.getElementById('gstNumber').value,
        ifscCode: document.getElementById('ifscCode').value,
        shippingAddress: document.getElementById('shippingAddress').value,
        stateCode: document.getElementById('stateCode').value,
        vendorCode: document.getElementById('vendorCode').value,
    };

    try {
        // Send a POST request to the backend
        const response = await fetch('http://localhost:8080/api/customer-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convert form data to JSON
        });

        if (response.ok) {
            alert('Customer details saved successfully!');
            window.location.href = 'customer-details.html'; // Redirect back to the main page
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Failed to save Customer details.'}`);
        }
    } catch (error) {
        console.error('Error saving Customer details:', error);
        alert('Error saving Customer details. Please try again.');
    }
});
