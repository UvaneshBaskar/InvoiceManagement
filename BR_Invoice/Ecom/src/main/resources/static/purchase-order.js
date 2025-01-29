// Make removeProductRow globally accessible
function removeProductRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    calculateTotalAmount();
}

// Function to calculate CGST, SGST, and Amount
function calculateRowAmount(row) {
    const quantityInput = row.querySelector('.quantity');
    const rateInput = row.querySelector('.rate');
    const cgstInput = row.querySelector('.cgst');
    const sgstInput = row.querySelector('.sgst');
    const amountInput = row.querySelector('.amount');

    const quantity = parseFloat(quantityInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;

    if (quantity > 0 && rate > 0) {
        const total = quantity * rate;
        const cgst = total * 0.09; // 9% CGST
        const sgst = total * 0.09; // 9% SGST
        const amount = total + cgst + sgst;

        cgstInput.value = cgst.toFixed(2);
        sgstInput.value = sgst.toFixed(2);
        amountInput.value = amount.toFixed(2);
    } else {
        cgstInput.value = "";
        sgstInput.value = "";
        amountInput.value = "";
    }

    calculateTotalAmount();
}

// Function to calculate total invoice amounts
function calculateTotalAmount() {
    let netValue = 0, netTotalTax = 0, totalAmount = 0;

    document.querySelectorAll("#productTableBody tr").forEach(row => {
        const amount = parseFloat(row.querySelector('.amount')?.value) || 0;
        const cgst = parseFloat(row.querySelector('.cgst')?.value) || 0;
        const sgst = parseFloat(row.querySelector('.sgst')?.value) || 0;

        netValue += (amount - cgst - sgst);
        netTotalTax += (cgst + sgst);
        totalAmount += amount;
    });

    document.getElementById('netValue').value = netValue.toFixed(2);
    document.getElementById('netTotalTax').value = netTotalTax.toFixed(2);
    document.getElementById('totalAmount').value = totalAmount.toFixed(2);
    document.getElementById('amountInWords').value = numberToWords(totalAmount);

}

// Function to add a new product row
function addProductRow() {
    const productTableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" required></td>
        <td><input type="text" required></td>
        <td><input type="text" required></td>
        <td><input type="text" required></td>
        <td><input type="number" class="quantity" required></td>
        <td><input type="number" class="rate" required></td>
        <td><input type="text" class="cgst" readonly></td>
        <td><input type="text" class="sgst" readonly></td>
        <td><input type="text" class="amount" readonly></td>
        <td><button type="button" class="remove-btn">Remove</button></td>
    `;
    productTableBody.appendChild(newRow);

    // Add event listeners to newly created Quantity & Rate fields
    newRow.querySelector('.quantity').addEventListener('input', () => calculateRowAmount(newRow));
    newRow.querySelector('.rate').addEventListener('input', () => calculateRowAmount(newRow));
}

// Event listener for dynamically added Remove buttons
document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("remove-btn")) {
        removeProductRow(event.target);
    }
});

// Event Listeners on DOM Load
document.addEventListener('DOMContentLoaded', function () {
    let customerDetails = [];

    function fetchCustomerDetails() {
        fetch('/api/customer-details')
            .then(response => response.json())
            .then(data => {
                customerDetails = data;
                populateCustomerDropdown();
            })
            .catch(error => console.error('Error fetching customer details:', error));
    }

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

    function autofillCustomerDetails() {
        const selectedCustomerId = document.getElementById('customerDropdown').value;
        if (!selectedCustomerId) return;

        const selectedCustomer = customerDetails.find(customer => customer.id == selectedCustomerId);
        document.getElementById('customerName').value = selectedCustomer.companyName || '';
        document.getElementById('customerAddress').value = selectedCustomer.billingAddress || '';
        document.getElementById('customerGstin').value = selectedCustomer.gstNumber || '';
        document.getElementById('customerState').value = selectedCustomer.stateCode || '';
        document.getElementById('vendorCode').value = selectedCustomer.vendorCode || '';
    }

    // Add event listeners
    document.getElementById('customerDropdown').addEventListener('change', autofillCustomerDetails);
    document.getElementById('addProductRowButton').addEventListener('click', addProductRow);

    // Modal Handling
    document.getElementById('openModalButton').addEventListener('click', () => {
        document.getElementById('purchaseOrderModal').style.display = 'block';
    });

    document.getElementById('closeModalButton').addEventListener('click', () => {
        document.getElementById('purchaseOrderModal').style.display = 'none';
    });

    fetchCustomerDetails();
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        console.log('Submit button clicked'); // Debugging check

        const customerId = document.getElementById('customerDropdown').value;
        if (!customerId) {
            alert('Please select a customer.');
            return;
        }

        const purchaseOrderData = {
            customerId: customerId,
            invoiceNumber: document.getElementById('invoiceNumber')?.value || "",
            invoiceDate: document.getElementById('invoiceDate')?.value || "",
            purchaseOrderNumber: document.getElementById('purchaseOrderNumber')?.value || "",
            totalAmount: parseFloat(document.getElementById('totalAmount')?.value) || 0,
            vendorCode: document.getElementById('vendorCode')?.value || "",
            amountInWords: document.getElementById('amountInWords')?.value || "",
            products: []
        };

        document.querySelectorAll("#productTableBody tr").forEach(row => {
            purchaseOrderData.products.push({
                productCode: row.cells[0]?.querySelector('input')?.value || "",
                description: row.cells[1]?.querySelector('input')?.value || "",
                hsnCode: row.cells[2]?.querySelector('input')?.value || "",
                uom: row.cells[3]?.querySelector('input')?.value || "",
                quantity: parseFloat(row.cells[4]?.querySelector('input')?.value) || 0,
                rate: parseFloat(row.cells[5]?.querySelector('input')?.value) || 0
            });
        });

        //console.log("Sending Data:", JSON.stringify(purchaseOrderData, null, 2)); // Debugging

        fetch(`/api/purchase-order/${customerId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseOrderData)
        })
        .then(response => response.json())
        .then(data => {
            //console.log("Response Data:", data); // Debugging
            alert("Purchase Order Saved Successfully!");
            window.location.href = "/purchase-order.html";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to save Purchase Order");
        });
    });
});

function fetchAndDisplayPurchaseOrders() {
    fetch("/api/purchase-order")
        .then(response => response.json())
        .then(data => {
            const purchaseOrderTable = document.getElementById("purchaseOrderTable");
            purchaseOrderTable.innerHTML = ""; // Clear previous content

            if (data.length === 0) {
                purchaseOrderTable.innerHTML = "<tr><td colspan='6'>No purchase orders available</td></tr>";
                return;
            }

            data.forEach(order => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.vendorCode || "N/A"}</td>
                    <td>${order.customerName}</td>
                    <td>${order.netValue}</td>
                    <td>${order.taxValue}</td>
                    <td>${order.grossValue}</td>
                `;
                purchaseOrderTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching purchase orders:", error));
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayPurchaseOrders);



function numberToWords(amount) {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];

    function convert(num) {
        if (num === 0) return "Zero";

        let words = "";
        let index = 0;

        while (num > 0) {
            if (num % 1000 !== 0) {
                words = convertHundreds(num % 1000) + thousands[index] + " " + words;
            }
            num = Math.floor(num / 1000);
            index++;
        }

        return words.trim();
    }

    function convertHundreds(num) {
        let result = "";
        if (num > 99) {
            result += ones[Math.floor(num / 100)] + " Hundred ";
            num %= 100;
        }
        if (num > 19) {
            result += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }
        if (num > 0) {
            result += ones[num] + " ";
        }
        return result;
    }

    return convert(amount);
}
