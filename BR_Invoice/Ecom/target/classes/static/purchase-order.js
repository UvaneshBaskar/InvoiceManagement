// Define a global variable to hold customer details
let customerDetails = [];

// Fetch customer details and populate the dropdown
function fetchCustomerDetails() {
    fetch('/api/customer-details')
        .then(response => response.json())
        .then(data => {
            customerDetails = data;
            populateCustomerDropdown();
        })
        .catch(error => console.error('Error fetching customer details:', error));
}

// Populate the customer dropdown with the fetched data
function populateCustomerDropdown() {
    const customerDropdown = document.getElementById('customerDropdown');
    customerDropdown.innerHTML = '<option value="">Select a customer</option>';

    customerDetails.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.displayName;
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
        document.getElementById('customerName').value = selectedCustomer.companyName || '';
        document.getElementById('customerAddress').value = selectedCustomer.billingAddress || '';
        document.getElementById('customerGstin').value = selectedCustomer.gstNumber || '';
        document.getElementById('customerState').value = selectedCustomer.stateCode || '';
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
        <td><input type="text" name="cgst[]" readonly /></td>
        <td><input type="text" name="sgst[]" readonly /></td>
        <td><input type="text" name="amount[]" readonly /></td>
        <td><button type="button" onclick="removeProductRow(this)">Remove</button></td>
    `;

    productTableBody.appendChild(newRow);
}

// Remove a product row from the form
function removeProductRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    calculateTotalAmount();
}

// Calculate and update the total amount
function calculateTotalAmount() {
    const quantityInputs = document.getElementsByName('quantity[]');
    const rateInputs = document.getElementsByName('rate[]');
    const amountInputs = document.getElementsByName('amount[]');
    const cgstInputs = document.getElementsByName('cgst[]');
    const sgstInputs = document.getElementsByName('sgst[]');

    let total = 0;
    let totalCgst = 0;
    let totalSgst = 0;

    for (let i = 0; i < quantityInputs.length; i++) {
        const quantity = parseFloat(quantityInputs[i].value) || 0;
        const rate = parseFloat(rateInputs[i].value) || 0;
        const amount = quantity * rate;
        const cgst = amount * 0.09; // CGST is 9%
        const sgst = amount * 0.09; // SGST is 9%

        amountInputs[i].value = amount.toFixed(2);
        cgstInputs[i].value = cgst.toFixed(2);
        sgstInputs[i].value = sgst.toFixed(2);

        total += amount;
        totalCgst += cgst;
        totalSgst += sgst;
    }

    const totalAfterTax = total + totalCgst + totalSgst;

    document.getElementById('totalAmount').value = total.toFixed(2);
    document.getElementById('cgst').value = totalCgst.toFixed(2);
    document.getElementById('sgst').value = totalSgst.toFixed(2);
    document.getElementById('totalAmountAfterTax').value = totalAfterTax.toFixed(2);
    document.getElementById('amountInWords').value = convertNumberToWords(totalAfterTax);
}

// Convert a number to words (basic implementation)
function convertNumberToWords(number) {
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

document.getElementById("purchase-order-form").addEventListener("submit", function (e) {
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
        totalAmountAfterTax: parseFloat(document.getElementById("totalAmountAfterTax").value) || 0,
        products: [...document.querySelectorAll("#productTableBody tr")].map(row => ({
            productCode: row.querySelector("input[name='productCode[]']").value,
            hsnCode: row.querySelector("input[name='hsnCode[]']").value,
            uom: row.querySelector("input[name='uom[]']").value,
            quantity: parseFloat(row.querySelector("input[name='quantity[]']").value) || 0,
            rate: parseFloat(row.querySelector("input[name='rate[]']").value) || 0,
            cgst: parseFloat(row.querySelector("input[name='cgst[]']").value) || 0,
            sgst: parseFloat(row.querySelector("input[name='sgst[]']").value) || 0,
        }))
    };

    fetch(`/api/purchase-order/${customerId}`, {
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
