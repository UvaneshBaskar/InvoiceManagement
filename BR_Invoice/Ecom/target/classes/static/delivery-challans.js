async function fetchChallans() {
    try {
        const response = await fetch('http://localhost:8080/api/delivery-challans');
        if (!response.ok) throw new Error('Failed to fetch challans');

        const challans = await response.json();
        const tableBody = document.getElementById('challans-table-body');
        const noChallansMessage = document.getElementById('no-challans-message');
        const noChallansMessage = document.getElementById('no-challans-message');
        tableBody.innerHTML = '';

        if (challans.length === 0) {
            noChallansMessage.style.display = 'block'; // Show "No challans" message
        } else {
            noChallansMessage.style.display = 'none'; // Hide "No challans" message
            challans.forEach(challan => {   
                const descriptions = challan.description.split('##').join('<br>');
                const quantities = challan.quantity.split('##').join('<br>');
                const remarks = challan.remarks.split('##').join('<br>');

                var ccustDeliveryChallanDate = formatDate(challan.custDeliveryChallanDate);
                var courDeliveryChallanDate = formatDate(challan.ourDeliveryChallanDate);
                var cpurchaseOrderDate = formatDate(challan.purchaseOrderDate);

                const row = `
                    <tr class="text-start">
                        <td style="display:none;">${challan.Id}</td>
                        <td></td>
                        <td>${challan.custDeliveryChallanNo}</td>
                        <td>${ccustDeliveryChallanDate}</td>

                        <td>${challan.ourDeliveryChallanNo}</td>   
                        <td>${courDeliveryChallanDate}</td>

                        <td>${challan.purchaseOrderNumber}</td>
                        <td>${cpurchaseOrderDate}</td>

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

function dc_name_search() 
{
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("textsearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("challans-table");
    tr = table.getElementsByTagName("tr");
    clear_filters = document.getElementById("clear_filters");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) 
    {
        allTDs = tr[i].getElementsByTagName("td");

        // console.log(allTDs);

        for (index = 0; index < allTDs.length; index++)
        {
            txtValue = allTDs[index].textContent || allTDs[index].innerText;
            // txtValue = allTDs[index].textContent || allTDs[index].innerText;


            if (txtValue.toUpperCase().indexOf(filter) > -1) 
            {
                tr[i].style.display = "";    

                break;
            } 
            else 
            {
                tr[i].style.display = "none";
                // document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerText = txtValue;
            }

        }

    }

    

    // Show / Hide the clear filter button
    if (filter.length > 0) 
    {
        clear_filters.style.display  = "block";
        // input.style.width = '60%';
    }
    else
    {
        clear_filters.style.display  = "none";
        // input.style.width = '100%';
    }

}


function clear_filter_text() 
{
    var data;
    data = document.getElementById("textsearch");

    data.value = '';

    dc_name_search();
    
}

function formatDate(dateString) 
{

    let date = new Date(dateString); // Convert string to Date object

    let day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day

    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month as it starts from 0

    let year = date.getFullYear(); 

    return `${day}-${month}-${year}`;

}
