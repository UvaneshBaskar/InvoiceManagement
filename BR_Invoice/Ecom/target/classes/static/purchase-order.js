
async function fetchPoDetails() 
{
    try 
    {
        const response = await fetch('http://localhost:8080/api/purchase-order'); // Change this to po api

        if (!response.ok) 
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const poDetails = await response.json(); // Parse the response as JSON
        // console.log("Fetched Customer Details:", customerDetails); // Log the fetched data for debugging

        // Select the table body where rows will be added
        const tableBody = document.getElementById('po_details_table_body');
        tableBody.innerHTML = ''; // Clear any existing rows

        // Loop through Customer details and add them to the table
        poDetails.forEach(poDetails => {

            var status_text, td_value;

            // color_Received, color_In_Process, color_Partially_Closed, color_Completed, color_On_Hold, color_Cancelled

            status_text = poDetails.poStatus;
            if(status_text == "RECEIVED")
            {
                td_value = '<td class="color_Received">'+status_text+'</td>';
            }
            else if(status_text == "IN-PROCESS")
            {
                td_value = '<td class="color_In_Process">'+status_text+'</td>';
            }
            else if(status_text == "PARTIALLY CLOSED")
            {
                td_value = '<td class="color_Partially_Closed">'+status_text+'</td>';
            }
            else if(status_text == "COMPLETED")
            {
                td_value = '<td class="color_Completed">'+status_text+'</td>';
            }
            else if(status_text == "ON HOLD")
            {
                td_value = '<td class="color_On_Hold">'+status_text+'</td>';
            }
            else if(status_text == "CANCELLED")
            {
                td_value = '<td class="color_Cancelled">'+status_text+'</td>';
            }

            var format_date = formatDate(poDetails.poDate);

            const formattedNumber = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(poDetails.netValue);

            const row = `<tr class="text-start" onclick="redirectToPoDetails(${poDetails.id})" title="Click to View More Details">
                <td style="display:none;">${poDetails.id}</td>
                <td></td>
                <td>${format_date}</td>
                <td><b>${poDetails.poNumber}</b></td>
                <td>${poDetails.customerName}</td>
                ${td_value}
                <td>${formattedNumber}</td>
                <td>${poDetails.poPayment}</td>
            </tr>`;

            tableBody.innerHTML += row;

        });

    } 
    catch (error) 
    {
        console.error("Error fetching Customer Details:", error); // Log any errors
    }
}

// Fetch the Customer details when the page loads
document.addEventListener('DOMContentLoaded', fetchPoDetails);


function redirectToPoDetails(poId) {
    window.location.href = `new-purchase-order.html?poId=${poId}`;
}


function po_name_search() 
{
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("textsearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("Po_Details_Table");
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

    po_name_search();
    
}

function formatDate(dateString) 
{

    let date = new Date(dateString); // Convert string to Date object

    let day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day

    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month as it starts from 0

    let year = date.getFullYear(); 

    return `${day}-${month}-${year}`;

}