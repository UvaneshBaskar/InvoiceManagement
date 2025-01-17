// Function to fetch Customer details from the backend

function openNewCustomerDetailsPage() {
    window.location.href = 'new-customer-details.html'; // Redirect to the Customer details form page
}

async function fetchCustomerDetails() {
    try {
        const response = await fetch('http://localhost:8080/api/customer-details'); // Update with your Spring Boot API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const customerDetails = await response.json(); // Parse the response as JSON
        console.log("Fetched Customer Details:", customerDetails); // Log the fetched data for debugging

        // Select the table body where rows will be added
        const tableBody = document.getElementById('customer-details-table-body');
        tableBody.innerHTML = ''; // Clear any existing rows

        // Loop through Customer details and add them to the table
        customerDetails.forEach(customerDetail => {
            const row = `<tr>
                <td>${customerDetail.id}</td>
                <td>${customerDetail.accountNumber}</td>
                <td>${customerDetail.bankName}</td>
                <td>${customerDetail.billingAddress}</td>
                <td>${customerDetail.branchName}</td>
                <td>${customerDetail.companyName}</td>
                <td>${customerDetail.contactNumber}</td>
                <td>${customerDetail.displayName}</td>
                <td>${customerDetail.emailId}</td>
                <td>${customerDetail.gstNumber}</td>
                <td>${customerDetail.ifscCode}</td>
                <td>${customerDetail.shippingAddress}</td>
                <td>${customerDetail.stateCode}</td>
                <td>${customerDetail.vendorCode}</td>

            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching Customer Details:", error); // Log any errors
    }
}

// Fetch the Customer details when the page loads
document.addEventListener('DOMContentLoaded', fetchCustomerDetails);
