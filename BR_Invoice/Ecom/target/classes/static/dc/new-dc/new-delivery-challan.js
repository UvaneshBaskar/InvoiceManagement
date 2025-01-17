// Add new item row
document.getElementById('add-item').addEventListener('click', function () {
    const itemsDiv = document.getElementById('items');
    const itemHTML = `
        <div class="item-row">
            <label>Item Code:</label>
            <input type="text" name="itemCode" required>
            <label>Description:</label>
            <input type="text" name="description" required>
            <label>Quantity:</label>
            <input type="number" name="quantity" required>
            <label>Remarks:</label>
            <input type="text" name="remarks"><br><br>
        </div>`;
    itemsDiv.innerHTML += itemHTML;
});

// Handle form submission
document.getElementById('new-challan-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const itemCodes = [];
    const descriptions = [];
    const quantities = [];
    const remarksArray = [];

    document.querySelectorAll('.item-row').forEach(row => {
        itemCodes.push(row.querySelector('input[name="itemCode"]').value.trim());
        descriptions.push(row.querySelector('input[name="description"]').value.trim());
        quantities.push(row.querySelector('input[name="quantity"]').value.trim());
        remarksArray.push(row.querySelector('input[name="remarks"]').value.trim());
    });

    const challan = {
        clientId: document.getElementById('clientId').value.trim(),
        clientDeliveryChallanNo: document.getElementById('ClientDeliveryChallanNo').value.trim(),
        deliveryChallanNo: document.getElementById('deliveryChallanNo').value.trim(),
        date: document.getElementById('date').value,
        purchaseOrderNumber: document.getElementById('purchaseOrderNumber').value.trim(),
        itemCode: itemCodes.join('##'),
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
            window.location.href = '../delivery-challans.html';
        } else {
            const errorData = await response.json();
            alert(`Failed to save challan. Error: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the delivery challan.');
    }
});
