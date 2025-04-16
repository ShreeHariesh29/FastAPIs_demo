// function TableData() {
//     fetch('http://127.0.0.1:8000/home_data')
//     .then(res => res.json())
//     .then(data => {})
//     const rowSession = document.getElementById("table");

//     const row = document.createElement("tr"); // One row for all employee data

//     // Create each column (cell)
//     const id = document.createElement("td");
//     const name = document.createElement("td");
//     const age = document.createElement("td");
//     const designation = document.createElement("td");
//     const salary = document.createElement("td");
//     const phone = document.createElement("td");
//     const shift = document.createElement("td");

//     // Set the text content
//     // id.textContent = "1";
//     // name.textContent = "John Doe";
//     // age.textContent = "30";
//     // designation.textContent = "Software Engineer";
//     // salary.textContent = "70000";
//     // phone.textContent = "9876543210";
//     // shift.textContent = "Day";

//     // Append <td>s to the row
//     row.appendChild(id);
//     row.appendChild(name);
//     row.appendChild(age);
//     row.appendChild(designation);
//     row.appendChild(salary);
//     row.appendChild(phone);
//     row.appendChild(shift);

//     // Append the row to the table body
//     rowSession.appendChild(row);
// }

// TableData();
function TableData() {
    fetch('http://127.0.0.1:8000/employee_data')
        .then(res => res.json())
        .then(data => {
            const rowSession = document.getElementById("table");

            data.forEach(employee => {
                const row = document.createElement("tr");

                const id = document.createElement("td");
                id.textContent = employee.id;

                const name = document.createElement("td");
                name.textContent = employee.employee_name;

                const age = document.createElement("td");
                age.textContent = employee.employee_age;

                const designation = document.createElement("td");
                designation.textContent = employee.employee_designation;

                const salary = document.createElement("td");
                salary.textContent = employee.employee_salary;

                const phone = document.createElement("td");
                phone.textContent = employee.employee_number;

                const shift = document.createElement("td");
                shift.textContent = employee.employee_shift;
                
                const edit_but = document.createElement("button");
                edit_but.textContent = "Edit"
                edit_but.addEventListener('click', ()=>{
                    const name = prompt("Enter Your new name :",employee.employee_name);
                    const age = prompt("Enter Your new name :",employee.employee_age);
                    const number = prompt("Enter Your new name :",employee.employee_number);
                    const desig = prompt("Enter Your new name :",employee.employee_designation);
                    const salary = prompt("Enter Your new name :",employee.employee_salary);
                    const shift = prompt("Enter Your new name :",employee.employee_shift);
                    const updated_data = {
                        employee_name: name,
                        employee_age: parseInt(age),
                        employee_designation: desig,
                        employee_salary: parseFloat(salary),
                        employee_number: number,
                        employee_shift: shift,
                    }
                    updateEmployee(employee.id, updated_data);

                })
                

                // Append all columns to the row
                row.appendChild(id);
                row.appendChild(name);
                row.appendChild(age);
                row.appendChild(designation);
                row.appendChild(salary);
                row.appendChild(phone);
                row.appendChild(shift);
                row.appendChild(edit_but);

                // Append the row to the table
                rowSession.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
        });
}

TableData();
// function update(id, name, age){
//     fetch(`http://127.0.0.1:8000/update_employee/${id}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data, name, age);
        
//     })
    
//     .catch(error => {
//         console.error("Error fetching employee by ID:", error);
//     });
//     // window.location.href = "./index.html";

// }
async function updateEmployee(employeeId, updatedData) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/update_employee/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            location.reload(); // Refresh table
        } else {
            alert("Update failed: " + result.detail);
        }
    } catch (error) {
        console.error("Error updating employee:", error);
    }
}


function formsubmit(){
    const form = document.getElementById("employeeForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the page from reloading
    
        // Get form data
        const formData = new FormData(form);                  // Collects all form input values
        const data = Object.fromEntries(formData.entries());  // Converts it into a plain JavaScript object
        console.log(data)
        // Send the data to FastAPI backend
        const response = await fetch("http://127.0.0.1:8000/add_employee_json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data) // Send data in JSON format
        });
    
        const result = await response.json(); // Get the response from FastAPI
    
        if (response.ok) {
            alert(result.message); // Show success alert
            window.location.href = "./EmployeeTable.html"; // Redirect to table page
        } else {
            alert("Failed to add employee: " + result.detail); // Show error
        }
    });
      
    
}
