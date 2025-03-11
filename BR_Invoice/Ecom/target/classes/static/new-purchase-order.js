// Define a global variable to hold customer details
let customerDetails = [];

// Fetch customer details and populate the dropdown
function fetchCustomerDetails()
{

    fetch('/api/customer-details')
        .then(response => response.json())
        .then(data => {
            customerDetails = data;
            populateCustomerDropdown();
        })
        .catch(error => console.error('Error fetching customer details:', error));
}



// Populate the customer dropdown with the fetched data
function populateCustomerDropdown()
{
    const customerDropdown = document.getElementById('customerDropdown');
    customerDropdown.innerHTML = '<option value="">Choose</option>';

    customerDetails.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.companyName;
        option.textContent = customer.displayName;
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

    if (selectedCustomer)
    {
        document.getElementById("purchaseOrderId").value = purchaseOrder.id;
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
function addProductRow() {
    const productTableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');
    newRow.style.height = "100px";
    newRow.innerHTML = `
    <td><textarea name="productCode[]" rows="2" cols="50" placeholder="Type Item Description" required class="form-control"></textarea>
    </td>
    <td><input type="text" name="hsnCode[]" placeholder="HSN Code" required class="form-control">
    </td>
    <td><input type="text" name="quantity[]" placeholder="Quantity" required class="form-control">
    </td>
    <td><input type="text" name="rate[]" placeholder="Price" required class="form-control">
    </td>
    <td><input type="text" name="cgst[]" placeholder="CGST" required class="form-control">
    </td>
    <td><input type="text" name="sgst[]" placeholder="SGST" required class="form-control">
    </td>
    <td><input type="text" name="amount[]" placeholder="Item Total" required class="form-control">
    </td>
    <td><!-- <button type="button" onclick="removeProductRow(this)">Remove</button> -->
        <button type="button" onclick="removeProductRow(this)" class="btn"><i class="fa fa-times"></i></button>
    </td>
    `;

    productTableBody.appendChild(newRow);
}

// Remove a product row from the form
function removeProductRow(button)
{
    const row = button.parentElement.parentElement;
    row.remove();
    calculateTotalAmount();
}

// Calculate and update the total amount
function calculateTotalAmount()
{

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

    const quantityInputs = document.getElementsByName('quantity[]');
    const rateInputs = document.getElementsByName('rate[]');
    const amountInputs = document.getElementsByName('amount[]');
    const cgstInputs = document.getElementsByName('cgst[]');
    const sgstInputs = document.getElementsByName('sgst[]');

    const productCode = document.getElementsByName('productCode[]');
    const hsnCode = document.getElementsByName('hsnCode[]');

    let total = 0;
    let totalCgst = 0;
    let totalSgst = 0;

    for (let i = 0; i < quantityInputs.length; i++)
    {
        const quantity = parseFloat(quantityInputs[i].value) || 0;
        const rate = parseFloat(rateInputs[i].value) || 0;
        const amount = quantity * rate;
        const cgst = amount * parseFloat(gstratevalue);
        const sgst = amount * parseFloat(gstratevalue);

        amountInputs[i].value = amount.toFixed(2);
        cgstInputs[i].value = cgst.toFixed(2);
        sgstInputs[i].value = sgst.toFixed(2);

        total += amount;
        totalCgst += cgst;
        totalSgst += sgst;

        if(productCode[i].value.length < 1)
        {
            productCode[i].style.border = "1px solid red";
        }
        else
        {
            productCode[i].style.border = "none";
        }

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



function formatDateForInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}


function fetchPoDetails(poId) {
    console.log(poId, "POOOOIDDDDD");
    fetch(`/api/purchase-order/${poId}`)
        .then(response => response.json())
        .then(data => {
            const { poDetails, products } = data;
            document.getElementById('purchaseOrderNumber').value = poDetails.poNumber || '';
            document.getElementById('purchaseOrderDate').value = formatDateForInput(poDetails.poDate);
            document.getElementById('customerAddress').value = poDetails.customerAddress || '';
            document.getElementById('totalAmountAfterTax').value = poDetails.netValue || '';
            document.getElementById('gst_rate').value = poDetails.gstRate || '';
            document.getElementById('customerDropdown').value = poDetails.customerName || '';
            document.getElementById('customerGstin').value = poDetails.customerGstin || '';
            document.getElementById('amountInWords').value = poDetails.amountInWords || '';
            document.getElementById('totalAmount').value = poDetails.totalAmount || '';
            document.getElementById('cgst').value = poDetails.cgst || '';
            document.getElementById('sgst').value = poDetails.sgst || '';



            // Autofill Product Details
            //let productTable = document.getElementById("productTableBody");
            const productTableBody = document.getElementById('productTableBody');
            //productTable.innerHTML = ""; // Clear previous rows before adding new ones
            productTableBody.innerHTML = '';
            products.forEach(product => addProductRow());
            setTimeout(() => {
                const rows = [...document.querySelectorAll('#productTableBody tr')];
                rows.forEach((row, index) => {
                    row.querySelector("textarea[name='productCode[]']").value = products[index].productCode || '';
                    row.querySelector("input[name='hsnCode[]']").value = products[index].hsnCode || '';
                    row.querySelector("input[name='quantity[]']").value = products[index].quantity || '';
                    row.querySelector("input[name='rate[]']").value = products[index].rate || '';
                    row.querySelector("input[name='cgst[]']").value = products[index].cgst || '';
                    row.querySelector("input[name='sgst[]']").value = products[index].sgst || '';
                    row.querySelector("input[name='amount[]']").value = products[index].amount || '';
                });
                calculateTotalAmount();
            }, 0);


            // Autofill customer details if needed
//            const customerDropdown = document.getElementById('customerDropdown');
//            for (let option of customerDropdown.options) {
//                if (option.textContent === poDetails.customerName) {
//                    customerDropdown.value = option.value;
//                    autofillCustomerDetails();
//                    break;
//                }
//            }
        })
        .catch(error => console.error("Error fetching PO details:", error));
}

// Initialize the script
document.addEventListener('DOMContentLoaded', function () {
    fetchCustomerDetails();

     const urlParams = new URLSearchParams(window.location.search);
        const poId = urlParams.get('poId');
        if (poId) {
                fetchPoDetails(poId);
            }

    document.getElementById('customerDropdown').addEventListener('change', autofillCustomerDetails);
    document.getElementById('productTable').addEventListener('input', calculateTotalAmount);
    document.getElementById('gst_rate').addEventListener('input', calculateTotalAmount);
    document.getElementById('addProductRowButton').addEventListener('click', addProductRow);

    // const invoiceDateInput = document.getElementById("invoiceDate");
    // invoiceDateInput.value = new Date().toISOString().split("T")[0];
});

document.getElementById("purchase-order-form").addEventListener("submit", function (e)
{
    e.preventDefault();

    const customerId = document.getElementById("customerDropdown").value; // not used anywhere check this
    const purchaseOrderId = document.getElementById("purchaseOrderId").value; // Get ID from hidden field

    console.log("cusotmer id:")
    console.log(customerId);

    console.log([...document.querySelectorAll("#productTableBody tr")]);
    const poData =
    {
        // invoiceNumber: document.getElementById("invoiceNumber").value,
        // invoiceDate: document.getElementById("invoiceDate").value,
        poNumber: document.getElementById("purchaseOrderNumber").value || null,
        poDate: document.getElementById("purchaseOrderDate").value || null,
        poStatus: "RECEIVED",
        poPayment: "UNPAID",

        // vendorCode: document.getElementById("customerName").value,

        customerName: document.getElementById("customerName").value,
        customerAddress: document.getElementById("customerAddress").value, // GIVE IT SOME VALUE TO STORE

        taxValue: (parseFloat(document.getElementById("cgst").value) + parseFloat(document.getElementById("sgst").value)) || 0,
        netValue: parseFloat(document.getElementById("totalAmountAfterTax").value) || 0,

        gstRate: parseFloat(document.getElementById("gst_rate").value) || 0,


        products: [...document.querySelectorAll("#productTableBody tr")].map(row => ({
            productCode: row.querySelector("textarea[name='productCode[]']")?.value || '',
            hsnCode: row.querySelector("input[name='hsnCode[]']").value,
            // uom: row.querySelector("input[name='uom[]']").value,
            quantity: parseFloat(row.querySelector("input[name='quantity[]']").value) || 0,
            rate: parseFloat(row.querySelector("input[name='rate[]']").value) || 0,
            cgst: parseFloat(row.querySelector("input[name='cgst[]']").value) || 0,
            sgst: parseFloat(row.querySelector("input[name='sgst[]']").value) || 0,
        }))
    };


    // console.log(JSON.stringify(poData));
//    console.log("hello");
//    //console.log(purchaseOrderId);
//    console.log(purchaseOrderNumber);
//    console.log(id);
    //const purchaseOrderId = document.getElementById("purchaseOrderNumber").value;
    //console.log("Purchase Order ID:", purchaseOrderId , "helololo");
    const urlParamsNew = new URLSearchParams(window.location.search);
    const poIdNew = urlParamsNew.get('poId');
    //console.log("Pppp new if i can use this:", poIdNew , "helololo");


    fetch(`/api/purchase-order/${poIdNew}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poData)
    })
    .then(response => {
        if (response.ok)
        {
            alert("Purchase Order created successfully!");
            window.location.href = 'purchase-order.html'; // Redirect back to the main page
        }
        else
        {
            alert("Failed to Create PO!");
        }
    })
    .catch(error => console.error("Error Creating PO:", error));
});


$(document).on('click', '.inv_num_setting', function(){


    $('#invoice_number_edit_modal').modal('show');
 });