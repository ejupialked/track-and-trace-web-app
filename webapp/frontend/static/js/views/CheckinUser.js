import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Check-in User");
  }

  async init() {
    document.getElementById("users").style.visibility = "hidden";
    document.getElementById("venues").style.visibility = "hidden";
    fetch("http://localhost:7071/api/fetchUsers")
      .then((response) => {
        console.log("Response: " + response);
        if (!response.ok) {
          throw Error("Error");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        var sel = document.getElementById("users");
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement("option");
          opt.innerHTML = data[i].Name;
          opt.value = data[i].PartitionKey;
          sel.appendChild(opt);
        }
        document.getElementById("usersLoader").remove();
        document.getElementById("users").style.visibility = "visible"; 

      });

    fetch("http://localhost:7071/api/fetchVenues")
      .then((response) => {
        console.log("Response: " + response);
        if (!response.ok) {
          throw Error("Error");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        var sel = document.getElementById("venues");
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement("option");
          opt.innerHTML = data[i].RowKey;
          opt.value = data[i].PartitionKey;
          sel.appendChild(opt);
        }
        document.getElementById("venuesLoader").remove();
        document.getElementById("venues").style.visibility = "visible"; 

      });

           const checkInForm = document.getElementById("checkInForm");
           checkInForm.addEventListener("submit", function (e) {
             e.preventDefault();
             checkinUser();
             checkInForm.reset();
           });
    
  }

  async getHtml() {
    return `
      <h1>Check-in User</h1>
      <p>Complete all the required to check-in a user</p>
      <div id="output"></div>
      <div class="container">
        <form id="checkInForm">
          <div style="display: inline-block;">
            <label for="users">Select user: </label>
          </div>
          <div style="display: inline-block;">
            <select name="users" id="users"></select>
          </div>
          <div style="display: inline-block;">
            <div id="usersLoader" class="loader"></div>
          </div>
          <br />
          <div style="display: inline-block;">
            <label for="venues">Select venue: </label>
          </div>
          <div style="display: inline-block;">
            <select name="venues" id="venues"></select>
          </div>
          <div style="display: inline-block;">
            <div id="venuesLoader" class="loader"></div>
          </div>
          <br />
          <label for="Date">Date user has visited the venue: </label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="yyyy-mm-dd"
          /><br /><br />
          <div id="submit">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    `;
  }
}

function checkinUser() {

  document.getElementById('submit').innerHTML = '<div id="submitLoader" class="loader"></div>';

  let user = document.getElementById("users").value;
  let venue = document.getElementById("venues").value;
  let date = document.getElementById("date").value;

  const body = JSON.stringify({
    venue: venue,
    date: date,
    userId: user
  });

  fetch("http://localhost:7071/api/checkinUser", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: body,
  })
    .then((response) => processResponse(response))
    .catch((error) => processResponse(error));
}

function processResponse(response) {
  if (response.status != 200) {
    response.text().then((text) => AbstractView.showError(text));
    injectSubmit();
  } else {
    response.text().then((text) => AbstractView.showSuccess(text));
    injectSubmit();
  }
}

function injectSubmit(){
    document.getElementById('submit').innerHTML = '<input type="submit" value="Register" />';
}
