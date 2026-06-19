const API_URL = "http://localhost:5000/users";
const CASE_API ="http://localhost:5000/cases";
async function loadUsers() {
  try {

    const res = await fetch(API_URL);
    const data = await res.json();

    const table = document.getElementById("userTable");

    let output = "";

    data.forEach(user => {

      output += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>

        <td>

<button onclick="editUser(
${user.id},
'${user.name}',
'${user.email}'
)">
Edit
</button>

<button onclick="deleteUser(${user.id})">
Delete
</button>

</td>

      </tr>
      `;

    });

    table.innerHTML = output;

  } catch (error) {
    console.error("Error loading users:", error);
  }
}
async function addUser() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please enter both name and email");
    return;
  }

  try {

    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    });

    const result = await res.json();

    alert(result.message);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";

    loadUsers();

  } catch (error) {

  console.error("Actual Error:", error);

}

}
function deleteUser(id) {

  if (confirm("Delete this user?")) {

    fetch(
      `http://localhost:5000/delete-user/${id}`,
      {
        method: "DELETE"
      }
    )
    .then(res => res.text())
    .then(data => {

      alert(data);

      loadUsers();

    });

  }

}
async function editUser(id, currentName, currentEmail) {

  const name = prompt(
    "Enter new name:",
    currentName
  );

  const email = prompt(
    "Enter new email:",
    currentEmail
  );

  if (!name || !email) {
    return;
  }

  try {

    const res = await fetch(
      `http://localhost:5000/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email
        })
      }
    );

    const result = await res.json();

    alert(result.message);

    loadUsers();

  } catch (error) {
    console.error(error);
  }

}
async function loadCases() {

  try {

    const res =
    await fetch(CASE_API);

    const data =
    await res.json();

    let output = "";

    data.forEach(caseItem => {

      output += `
      <tr>

      <td>${caseItem.id}</td>

      <td>${caseItem.case_number}</td>

      <td>${caseItem.party_name}</td>

      <td>${caseItem.case_type}</td>

<td>
<button onclick="editCase(
${caseItem.id},
'${caseItem.case_number}',
'${caseItem.party_name}',
'${caseItem.case_type}'
)">
Edit
</button>
<button onclick="deleteCase(${caseItem.id})">
Delete
</button>
</td>

      </tr>
      `;

    });

    document
    .getElementById("caseTable")
    .innerHTML = output;

  }
  catch(error){

    console.log(error);

  }

}
async function addCase() {

  const case_number =
  document.getElementById(
  "caseNumber").value;

  const party_name =
  document.getElementById(
  "partyName").value;

  const case_type =
  document.getElementById(
  "caseType").value;

  try {

    const res =
    await fetch(
      CASE_API,
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({

          case_number,
          party_name,
          case_type

        })

      }
    );

    const result =
    await res.json();

    alert(result.message);

    loadCases();

  }
  catch(error){

    console.log(error);

  }

}
function deleteCase(id){

if(confirm("Delete this case?")){

fetch(
`http://localhost:5000/cases/${id}`,
{
method:"DELETE"
}
)

.then(res=>res.json())

.then(data=>{

alert(data.message);

loadCases();

});

}

}
async function editCase(
id,
currentNumber,
currentParty,
currentType
){

const case_number =
prompt("Case Number", currentNumber);

const party_name =
prompt("Party Name", currentParty);

const case_type =
prompt("Case Type", currentType);

if(!case_number || !party_name || !case_type){
return;
}

const res = await fetch(
`http://localhost:5000/cases/${id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
case_number,
party_name,
case_type
})
}
);

const result = await res.json();

alert(result.message);

loadCases();

}