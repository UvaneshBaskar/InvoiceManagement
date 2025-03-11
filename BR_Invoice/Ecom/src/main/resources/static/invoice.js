// Define a global variable to hold customer details
let customerDetails = [];

// Fetch customer details and populate the dropdown
function fetchCustomerDetails() 
{
    fetch('/api/customer-details') // Adjust the endpoint if necessary
        .then(response => response.json())
        .then(data => {
            customerDetails = data;
            populateCustomerDropdown();
            // console.log('API Response:', data);
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
function autofillCustomerDetails() 
{

    const selectedCustomerId = document.getElementById('customerDropdown').value;

    if (!selectedCustomerId) 
    {
        document.getElementById('show_cust_addr').style.display = 'none';
        clearCustomerDetails();
        return;
    }

    const selectedCustomer = customerDetails.find(customer => customer.id == selectedCustomerId);


    // document.getElementById('customerName').value = selectedCustomer.companyName || ''; // Updated to use "companyName"
    //     document.getElementById('customerAddress').value = selectedCustomer.billingAddress || ''; // Updated to use "billingAddress"
    //     document.getElementById('customerGstin').value = selectedCustomer.gstNumber || ''; // Updated to use "gstNumber"
    //     document.getElementById('customerState').value = selectedCustomer.stateCode || ''; // Updated to use "stateCode"


    if (selectedCustomer)
    {
        document.getElementById('customerName').value = selectedCustomer.companyName || '';
        document.getElementById('customerAddress').value = selectedCustomer.billingAddress || '';
        // document.getElementById('customerGstin').value = selectedCustomer.gstNumber || '';
        // document.getElementById('customerState').value = selectedCustomer.stateCode || '';

        var billaddr = selectedCustomer.billingAddress + "\n" + selectedCustomer.billCountry + "\n" + selectedCustomer.billState + "\n" + selectedCustomer.billPincode;
        document.getElementById('cust_bill_address').innerText = billaddr || '';


        var shipaddr = selectedCustomer.shippingAddress + "\n" + selectedCustomer.shipCountry + "\n" + selectedCustomer.shipState + "\n" + selectedCustomer.shipPincode;
        document.getElementById('cust_ship_address').innerText = shipaddr || '';


        document.getElementById('customerGstin').value = selectedCustomer.gstNumber;

        document.getElementById('show_cust_addr').style.display = 'block';
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
function addProductRow() 
{
    const productTableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
         <td>
            <textarea name="productCode[]" rows="2" cols="50" placeholder="Type Item Description" required class="form-control"></textarea>
        </td>
        <td>
            <input type="text" name="hsnCode[]" placeholder="HSN Code" required class="form-control">
        </td>
        <td>
            <input type="number" name="quantity[]" placeholder="Quantity" required class="form-control">
        </td>
        <td>
            <input type="number" name="rate[]" placeholder="Price" required class="form-control">
        </td>
        <td>
            <input type="text" name="amount[]" placeholder="Item Total" required class="form-control" disabled>
        </td>
        <td>
            <input type="text" name="cgst[]" placeholder="CGST" required class="form-control" disabled>
        </td>
        <td>
            <input type="text" name="sgst[]" placeholder="SGST" required class="form-control" disabled>
        </td>
        <td>
            <input type="text" name="tempamount[]" placeholder="Item Total" required class="form-control" disabled>
        </td>
        <td>
            <button type="button" onclick="removeProductRow(this)" class="btn"><i class="fa fa-times"></i></button>
        </td>
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
function calculateTotalAmount() 
{
    const quantityInputs = document.getElementsByName('quantity[]');
    const rateInputs = document.getElementsByName('rate[]');
    const amountInputs = document.getElementsByName('amount[]');
    const tempamountInputs = document.getElementsByName('tempamount[]');
    const cgstEach = document.getElementsByName('cgst[]');
    const sgstEach = document.getElementsByName('sgst[]');

    

    let total = 0;


    const gstrateforcalc = document.getElementById('gst_rate').value;
    var gstratevalue = 0;

    if(gstrateforcalc == -1)
    {
        gstratevalue = 0;
        document.getElementById('gst_rate_warning').style.display = 'block';
    }
    else
    {
        gstratevalue = (gstrateforcalc / 100) || 0;
        document.getElementById('gst_rate_warning').style.display = 'none';
    }


    for (let i = 0; i < quantityInputs.length; i++) 
    {
        const quantity = parseFloat(quantityInputs[i].value) || 0;
        const rate = parseFloat(rateInputs[i].value) || 0;
        const amount = quantity * rate;


        amountInputs[i].value = amount.toFixed(2);

        var ctemp = amount * gstratevalue; 
        var stemp = amount * gstratevalue; 


        cgstEach[i].value = ctemp.toFixed(2);
        sgstEach[i].value = stemp.toFixed(2);

        total += amount;
        var tttt = amount + ctemp+ stemp;
        tempamountInputs[i].value = tttt.toFixed(2);
    }

    const cgst = total * gstratevalue; 
    const sgst = total * gstratevalue; 

    const taxTotal = cgst + sgst;
    const totalAfterTax = total + cgst + sgst; // Total after including taxes

    document.getElementById('totalAmount').value = total.toFixed(2);
    document.getElementById('cgst').value = cgst.toFixed(2);
    document.getElementById('sgst').value = sgst.toFixed(2);
    document.getElementById('taxTotal').value = taxTotal.toFixed(2);
    document.getElementById('totalAmountAfterTax').value = totalAfterTax.toFixed(2); // Updated field
    document.getElementById('amountInWords').value = convertNumberToWords(totalAfterTax); // Updated to use totalAfterTax
}

// Convert a number to words (basic implementation)
function convertNumberToWords(number) 
{
    // Implement a number-to-words converter here or use a library
    return `${number} Only`; // Placeholder implementation
}

function inv_num_creation(ele)
{
    // alert(ele.value);

    if(ele.value == "auto_inv_num")
    {
        $("#inv_num_pattern").attr("hidden", false);
    }
    else
    {
        $("#inv_num_pattern").attr("hidden", true);
    }
    
}


// Initialize the script
document.addEventListener('DOMContentLoaded', () => {
    fetchCustomerDetails();

    document.getElementById('customerDropdown').addEventListener('change', autofillCustomerDetails);
    document.getElementById('productTable').addEventListener('input', calculateTotalAmount);
    document.getElementById('gst_rate').addEventListener('input', calculateTotalAmount);

    document.getElementById('addProductRowButton').addEventListener('click', addProductRow);
    const invoiceDateInput = document.getElementById("invoiceDate");
    invoiceDateInput.value = new Date().toISOString().split("T")[0];
});

document.getElementById("invoice-form").addEventListener("submit", function (e) 
{
    e.preventDefault();

    const customerId = document.getElementById("customerDropdown").value;
    const invoiceData = 
    {
        invoiceNumber: document.getElementById("invoiceNumber").value,
        invoiceDate: document.getElementById("invoiceDate").value,
        purchaseOrderNumber: document.getElementById("purchaseOrderNumber").value || null,
        purchaseOrderDate: document.getElementById("purchaseOrderDate").value || null,

        gstRate: parseFloat(document.getElementById("gst_rate").value) || 0,

        products: [...document.querySelectorAll("#productTableBody tr")].map(row => ({
            productDescription: row.querySelector("textarea[name='productCode[]']").value,
            hsnCode: row.querySelector("input[name='hsnCode[]']").value,
            quantity: parseFloat(row.querySelector("input[name='quantity[]']").value) || 0,
            rate: parseFloat(row.querySelector("input[name='rate[]']").value) || 0
        }))
    };

    // console.log("Invoice Data to be Sent:", invoiceData);
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


$(document).on('click', '.inv_num_setting', function()
{  

    $('#invoice_number_edit_modal').modal('show');
});


