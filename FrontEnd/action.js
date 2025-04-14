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

                // Append all columns to the row
                row.appendChild(id);
                row.appendChild(name);
                row.appendChild(age);
                row.appendChild(designation);
                row.appendChild(salary);
                row.appendChild(phone);
                row.appendChild(shift);

                // Append the row to the table
                rowSession.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
        });
}

TableData();
