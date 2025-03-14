document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("id");

    if (customerId) {
        try {
            const response = await fetch(`http://localhost:8080/api/customer-details/${customerId}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            document.getElementById("accountNumber").value = data.accountNumber || "";
            document.getElementById("bankName").value = data.bankName || "";
            document.getElementById("branchName").value = data.branchName || "";
            document.getElementById("companyName").value = data.companyName || "";
            document.getElementById("contactNumber").value = data.contactNumber || "";
            document.getElementById("displayName").value = data.displayName || "";
            document.getElementById("emailId").value = data.emailId || "";
            document.getElementById("gstNumber").value = data.gstNumber || "";
            document.getElementById("ifscCode").value = data.ifscCode || "";
            document.getElementById("stateCode").value = data.stateCode || "";
            document.getElementById("vendorCode").value = data.vendorCode || "";
            document.getElementById("billingAddress").value = data.billingAddress || "";
            document.getElementById("shippingAddress").value = data.shippingAddress || "";
            document.getElementById("billCountry").value = data.billCountry || "";
            document.getElementById("billState").value = data.billState || "";
            document.getElementById("billCity").value = data.billCity || "";
            document.getElementById("billPincode").value = data.billPincode || "";
            document.getElementById("shipCountry").value = data.shipCountry || "";
            document.getElementById("shipState").value = data.shipState || "";
            document.getElementById("shipCity").value = data.shipCity || "";
            document.getElementById("shipPincode").value = data.shipPincode || "";

        } catch (error) {
            console.error("Error fetching customer details:", error);
        }
    }
});

// Handle form submission (create/update customer)
document.getElementById('new-customer-details-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("id");

    const formData = {
        accountNumber: document.getElementById('accountNumber').value,
        bankName: document.getElementById('bankName').value,
        branchName: document.getElementById('branchName').value,
        companyName: document.getElementById('companyName').value,
        contactNumber: document.getElementById('contactNumber').value,
        displayName: document.getElementById('displayName').value,
        emailId: document.getElementById('emailId').value,
        gstNumber: document.getElementById('gstNumber').value,
        ifscCode: document.getElementById('ifscCode').value,
        stateCode: document.getElementById('stateCode').value,
        vendorCode: document.getElementById('vendorCode').value,
        clientType: "Customer",
        billingAddress: document.getElementById('billingAddress').value,
        shippingAddress: document.getElementById('shippingAddress').value,
        billCountry: document.getElementById('billCountry').value,
        billState: document.getElementById('billState').value,
        billCity: document.getElementById('billCity').value,
        billPincode: document.getElementById('billPincode').value,
        shipCountry: document.getElementById('shipCountry').value,
        shipState: document.getElementById('shipState').value,
        shipCity: document.getElementById('shipCity').value,
        shipPincode: document.getElementById('shipPincode').value
    };

//    try {
//        const url = customerId
//            ? `http://localhost:8080/api/customer-details/${customerId}`
//            : 'http://localhost:8080/api/customer-details';
//
//        const method = customerId ? "PUT" : "POST";
//
//        const response = await fetch(url, {
//            method: method,
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify(formData),
//        });
//
//        if (response.ok) {
//            alert(`Customer details ${customerId ? 'updated' : 'saved'} successfully!`);
//            window.location.href = 'customer-details.html';
//        } else {
//            const errorData = await response.json();
//            alert(`Error: ${errorData.message || 'Failed to save customer details.'}`);
//        }
//    }
    try
    {
        // Send a POST request to the backend
        const response = await fetch(
        'http://localhost:8080/api/customer-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convert form data to JSON
        });

        // console.log(JSON.stringify(formData));

        if (response.ok)
        {
            alert('Customer details saved successfully!');
            window.location.href = 'customer-details.html'; // Redirect back to the main page
        }
        else
        {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Failed to save Customer details.'}`);
        }
    }

     catch (error) {
        console.error('Error saving Customer details:', error);
        alert('Error saving Customer details. Please try again.');
    }
});

// Copy billing address to shipping address
function copy_address(ele)
{
    if(ele.checked)
    {
        // console.log("Checked!");
        billingAddress = document.getElementById('billingAddress').value;
        bCountry = document.getElementById('billCountry').value;
        bState = document.getElementById('billState').value;
        bCity = document.getElementById('billCity').value;
        bPincode = document.getElementById('billPincode').value;

        document.getElementById('shippingAddress').value = billingAddress;
        document.getElementById('shipCountry').value = bCountry;
        document.getElementById('shipState').value = bState;
        document.getElementById('shipCity').value = bCity;
        document.getElementById('shipPincode').value =bPincode;

        document.getElementById('shippingAddress').readOnly = true;
        document.getElementById('shipCountry').readOnly = true;
        document.getElementById('shipState').readOnly = true;
        document.getElementById('shipCity').readOnly = true;
        document.getElementById('shipPincode').readOnly = true;

    }
    else if(!ele.checked)
    {
        // console.log("Not Checked!");
        document.getElementById('shippingAddress').value = '';
        document.getElementById('shipCountry').value = '';
        document.getElementById('shipState').value = '';
        document.getElementById('shipCity').value = '';
        document.getElementById('shipPincode').value = '';

        document.getElementById('shippingAddress').readOnly = false;
        document.getElementById('shipCountry').readOnly = false;
        document.getElementById('shipState').readOnly = false;
        document.getElementById('shipCity').readOnly = false;
        document.getElementById('shipPincode').readOnly = false;
    }
}

// Validate account number confirmation
function checkacnumber()
{
    var acc =  document.getElementById('accountNumber');
    var accheck =  document.getElementById('accnocheck');
    // console.log(acc.value, accheck.value);
    if (acc.value == accheck.value)
    {
        accheck.style.borderColor = "#2EFE2E";
        document.getElementById("cust_submit").disabled = false;

    }
    else
    {
        accheck.style.borderColor = "red";
        document.getElementById("cust_submit").disabled = true;
    }

}
