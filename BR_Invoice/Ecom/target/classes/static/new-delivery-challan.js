// // Define a global variable to hold customer details
// let customerDetails = [];

// // Fetch customer details and populate the dropdown
// function fetchCustomerDetails()

// // Populate the customer dropdown with the fetched data
// function populateCustomerDropdown() 

// // Autofill the form when a customer is selected
// function autofillCustomerDetails() 

// // Clear customer-related fields when no customer is selected
// function clearCustomerDetails() 

$(document).on('click', '.dc_num_setting', function()
{  


    $('#dc_number_edit_modal').modal('show');
 });

// Add more product rows to the form
function addProductRow() 
{
    const productTableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');

    newRow.style.height = "100px";
    newRow.classList.add("item-row");
    
    newRow.innerHTML = `
        <td>
            <textarea name="description" rows="2" cols="50" placeholder="Type Item Description" required class="form-control"></textarea>
        </td>
        <td>
            <input type="text" name="quantity" placeholder="Quantity" required class="form-control">
        </td>
        <td>
            <input type="text" name="remarks" placeholder="Price" required class="form-control">
        </td>
        <td>
            <!-- <button type="button" onclick="removeProductRow(this)">Remove</button> -->
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
}



// Initialize the script
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('ourDeliveryChallanDate').valueAsDate = new Date();

    document.getElementById('add-item').addEventListener('click', addProductRow);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Handle form submission
document.getElementById('new-challan-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const descriptions = [];
    const quantities = [];
    const remarksArray = [];

    document.querySelectorAll('.item-row').forEach(row => {
        descriptions.push(row.querySelector('textarea[name="description"]').value.trim());
        quantities.push(row.querySelector('input[name="quantity"]').value.trim());
        remarksArray.push(row.querySelector('input[name="remarks"]').value.trim());
    });

    const challan = {
        customerId: document.getElementById('customerDropdown').value.trim(),

        custDeliveryChallanNo: document.getElementById('custDeliveryChallanNo').value.trim(),
        custDeliveryChallanDate: document.getElementById('custDeliveryChallanDate').value.trim(),

        ourDeliveryChallanNo: document.getElementById('ourDeliveryChallanNo').value.trim(),
        ourDeliveryChallanDate: document.getElementById('ourDeliveryChallanDate').value.trim(),

        purchaseOrderNumber: document.getElementById('purchaseOrderNumber').value.trim(),
        purchaseOrderDate: document.getElementById('purchaseOrderDate').value.trim(),

        // purchaseOrderNumber: document.getElementById('purchaseOrderNumber').value.trim(),
        description: descriptions.join('##'),
        quantity: quantities.join('##'),
        remarks: remarksArray.join('##'),
    };

    try {
        const response = await fetch('/api/delivery-challans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(challan),
        });

        if (response.ok) {
            alert('Delivery Challan saved successfully!');
            // Adjusted redirect path to reflect the directory structure
            window.location.href = 'delivery-challans.html';
        } else {
            const errorData = await response.json();
            alert(`Failed to save challan. Error: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the delivery challan.');
    }
});


