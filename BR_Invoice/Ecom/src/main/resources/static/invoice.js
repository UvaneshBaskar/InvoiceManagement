// Define a global variable to hold customer details
let customerDetails = [];

// Fetch customer details and populate the dropdown
function fetchCustomerDetails() {
    fetch('/api/customer-details') // Adjust the endpoint if necessary
        .then(response => response.json())
        .then(data => {
            customerDetails = data;
            populateCustomerDropdown();
            console.log('API Response:', data);
        })
        .catch(error => console.error('Error fetching customer details:', error));
}

// Populate the customer dropdown with the fetched data
function populateCustomerDropdown() {
    const customerDropdown = document.getElementById('customerDropdown');
    customerDropdown.innerHTML = '<option value="">Select a customer</option>';

    customerDetails.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id; // Assuming the customer object has an "id" property
        option.textContent = customer.displayName; // Updated to use "displayName" property
        customerDropdown.appendChild(option);
    });
}

// Autofill the form when a customer is selected
function autofillCustomerDetails() {
    const selectedCustomerId = document.getElementById('customerDropdown').value;

    if (!selectedCustomerId) {
        clearCustomerDetails();
        return;
    }

    const selectedCustomer = customerDetails.find(customer => customer.id == selectedCustomerId);

    if (selectedCustomer) {
        document.getElementById('customerName').value = selectedCustomer.companyName || ''; // Updated to use "companyName"
        document.getElementById('customerAddress').value = selectedCustomer.billingAddress || ''; // Updated to use "billingAddress"
        document.getElementById('customerGstin').value = selectedCustomer.gstNumber || ''; // Updated to use "gstNumber"
        document.getElementById('customerState').value = selectedCustomer.stateCode || ''; // Updated to use "stateCode"
    }
}

// Clear customer-related fields when no customer is selected
function clearCustomerDetails() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerGstin').value = '';
    document.getElementById('customerState').value = '';
}

// Add more product rows to the form
function addProductRow() {
    const productTableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><input type="text" name="productCode[]" placeholder="Product Code" required /></td>
        <td><input type="text" name="hsnCode[]" placeholder="HSN Code" required /></td>
        <td><input type="text" name="uom[]" placeholder="UOM" required /></td>
        <td><input type="number" name="quantity[]" placeholder="Quantity" required /></td>
        <td><input type="number" name="rate[]" placeholder="Rate" required /></td>
        <td><input type="number" name="amount[]" placeholder="Amount" readonly /></td>
        <td><button type="button" onclick="removeProductRow(this)">Remove</button></td>
    `;

    productTableBody.appendChild(newRow);
}

// Remove a product row from the form
function removeProductRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    calculateTotalAmount(); // Recalculate total when a row is removed
}

// Calculate and update the total amount
function calculateTotalAmount() {
    const quantityInputs = document.getElementsByName('quantity[]');
    const rateInputs = document.getElementsByName('rate[]');
    const amountInputs = document.getElementsByName('amount[]');

    let total = 0;

    for (let i = 0; i < quantityInputs.length; i++) {
        const quantity = parseFloat(quantityInputs[i].value) || 0;
        const rate = parseFloat(rateInputs[i].value) || 0;
        const amount = quantity * rate;

        amountInputs[i].value = amount.toFixed(2);
        total += amount;
    }

    const cgst = total * 0.09; // Example: 9% CGST
    const sgst = total * 0.09; // Example: 9% SGST
    const totalAfterTax = total + cgst + sgst; // Total after including taxes

    document.getElementById('totalAmount').value = total.toFixed(2);
    document.getElementById('cgst').value = cgst.toFixed(2);
    document.getElementById('sgst').value = sgst.toFixed(2);
    document.getElementById('totalAmountAfterTax').value = totalAfterTax.toFixed(2); // Updated field
    document.getElementById('amountInWords').value = convertNumberToWords(totalAfterTax); // Updated to use totalAfterTax
}

// Convert a number to words (basic implementation)
function convertNumberToWords(number) {
    // Implement a number-to-words converter here or use a library
    return `${number} Only`; // Placeholder implementation
}

// Initialize the script
document.addEventListener('DOMContentLoaded', () => {
    fetchCustomerDetails();

    document.getElementById('customerDropdown').addEventListener('change', autofillCustomerDetails);
    document.getElementById('productTable').addEventListener('input', calculateTotalAmount);

    document.getElementById('addProductRowButton').addEventListener('click', addProductRow);
    const invoiceDateInput = document.getElementById("invoiceDate");
    invoiceDateInput.value = new Date().toISOString().split("T")[0];
});

document.getElementById("invoice-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const customerId = document.getElementById("customerDropdown").value;
    const invoiceData = {
        invoiceNumber: document.getElementById("invoiceNumber").value,
        invoiceDate: document.getElementById("invoiceDate").value,
        purchaseOrderNumber: document.getElementById("purchaseOrderNumber").value || null,
        customerName: document.getElementById("customerName").value,
        customerAddress: document.getElementById("customerAddress").value,
        customerGstin: document.getElementById("customerGstin").value,
        totalAmount: parseFloat(document.getElementById("totalAmount").value) || 0,
        cgst: parseFloat(document.getElementById("cgst").value) || 0,
        sgst: parseFloat(document.getElementById("sgst").value) || 0,
        totalAmountAfterTax: parseFloat(document.getElementById("totalAmountAfterTax").value) || 0, // Added field
        products: [...document.querySelectorAll("#productTableBody tr")].map(row => ({
            productCode: row.querySelector("input[name='productCode[]']").value,
            hsnCode: row.querySelector("input[name='hsnCode[]']").value,
            uom: row.querySelector("input[name='uom[]']").value,
            quantity: parseFloat(row.querySelector("input[name='quantity[]']").value) || 0,
            rate: parseFloat(row.querySelector("input[name='rate[]']").value) || 0
        }))
    };

    console.log("Invoice Data to be Sent:", invoiceData);
    console.log("Payload sent to backend:", JSON.stringify(invoiceData, null, 2));

    fetch(`/api/invoices/${customerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData)
    })
    .then(response => {
        if (response.ok) {
            alert("Invoice saved successfully!");
        } else {
            alert("Failed to save invoice.");
        }
    })
    .catch(error => console.error("Error saving invoice:", error));
});
