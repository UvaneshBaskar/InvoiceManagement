async function fetchChallans() {
    try {
        const response = await fetch('http://localhost:8080/api/delivery-challans');
        if (!response.ok) throw new Error('Failed to fetch challans');

        const challans = await response.json();
        const tableBody = document.getElementById('challans-table-body');
        const noChallansMessage = document.getElementById('no-challans-message');
        tableBody.innerHTML = '';

        if (challans.length === 0) {
            noChallansMessage.style.display = 'block'; // Show "No challans" message
        } else {
            noChallansMessage.style.display = 'none'; // Hide "No challans" message
            challans.forEach(challan => {
                const itemCodes = challan.itemCode.split('##').join('<br>');
                const descriptions = challan.description.split('##').join('<br>');
                const quantities = challan.quantity.split('##').join('<br>');
                const remarks = challan.remarks.split('##').join('<br>');

                const row = `
                    <tr>
                        <td>${challan.clientId}</td>
                        <td>${challan.clientDeliveryChallanNo}</td>
                        <td>${challan.deliveryChallanNo}</td>
                        <td>${challan.date}</td>
                        <td>${challan.purchaseOrderNumber}</td>
                        <td>${itemCodes}</td>
                        <td>${descriptions}</td>
                        <td>${quantities}</td>
                        <td>${remarks}</td>
                    </tr>`;
                tableBody.innerHTML += row;
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchChallans);
