// Function to fetch Customer details from the backend



async function fetchCustomerDetails() {
    try {
        const response = await fetch('http://localhost:8080/api/customer-details'); // Update with your Spring Boot API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const customerDetails = await response.json(); // Parse the response as JSON
        const tableBody = document.getElementById('customer-details-table-body');
        tableBody.innerHTML = ''; // Clear any existing rows

        // Loop through Customer details and add them to the table
        customerDetails.forEach(customerDetail => {
            const row = `<tr class="text-start customer-row" data-id="${customerDetail.id}" title="Click to View More Details">
                            <td style="display:none;">${customerDetail.id}</td>
                            <td></td>
                            <td><b>${customerDetail.companyName}</b></td>
                            <td>${customerDetail.displayName}</td>
                            <td>${customerDetail.clientType}</td>
                            <td>${customerDetail.emailId}</td>
                            <td>${customerDetail.contactNumber}</td>
                        </tr>`;
            tableBody.innerHTML += row;
        });

        // Add event listeners after rows are inserted
        document.querySelectorAll(".customer-row").forEach(row => {
            row.addEventListener("click", function () {
                const customerId = this.dataset.id;
                window.location.href = `new-customer-details.html?id=${customerId}`;
            });
        });
    } catch (error) {
        console.error("Error fetching Customer Details:", error);
    }
}

// Fetch the Customer details when the page loads
document.addEventListener('DOMContentLoaded', fetchCustomerDetails);



function optionbtn(event)
{
    // alert("options !");
    event.stopPropagation();
}



// function editbtn(event)
// {
//     alert("Editing!");
//     event.stopPropagation();
// }



// function contactdetailsbtn(event)
// {
//     alert("Contact Details!");
//     event.stopPropagation();
// }



function Cust_name_search()
{
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("textsearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("Customer_Details_Table");
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

                // let tp = document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML;


                // var splitends1 = '<mark>';
                // var splitends2 = '</mark>';
                // var ret = tp.replace(splitends1,'');
                // ret = ret.replace(splitends2,'');
                // // console.log(ret);
                // document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML = String(ret);
                // let tp1 = document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML;

                // // Highlighting Filtered Text
                // // let tmpp = txtValue.split(input.value);
                // // let ttmmpp = "<mark class='marked'>" + input.value + "</mark>";
                // // let fullword = tmpp[0] + ttmmpp + tmpp[1];

                // // console.log("111: " + document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML);

                // /////////////////
                // // Highlighting Filtered Text
                // // let tmpp = document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML.split(input.value, 2);
                // // let ttmmpp = "<mark class='marked'>" + input.value + "</mark>";
                // // let fullword = tmpp[0] + ttmmpp + tmpp[1];
                // //////////////////


                // let first = tp1.substring(0, tp1.indexOf(input.value)) //Split[0]
                // let mid = "<mark>" + input.value + "</mark>";
                // let second = tp1.substring(tp1.indexOf(input.value)+1) //Split[1]
                // let allfull = first + mid + second;

                // // console.log(fullword);

                // // try putting the word back using document.getele
                // document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML = String(allfull);

                // console.log("222: " + document.getElementById("Customer_Details_Table").getElementsByTagName("tr")[i].getElementsByTagName("td")[index].innerHTML);

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

    Cust_name_search();

}