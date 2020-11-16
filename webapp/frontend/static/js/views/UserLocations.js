import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("User Locations");
  }

  init() {
    //set max for calendar
    var today = new Date().toISOString().split("T")[0];
    document.getElementById("startDate").setAttribute("max", today);
    document.getElementById("endDate").setAttribute("max", today);

    document.getElementById("entities").style.visibility = "hidden";

    fetch("https://comp3207functions.azurewebsites.net/api/fetchUsers")
      .then((response) => {
        console.log("Response: " + response);
        if (!response.ok) {
          throw Error("Error");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        var sel = document.getElementById("entities");
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement("option");
          opt.innerHTML = data[i].Name;
          opt.value = data[i].PartitionKey + ":" + data[i].Name;
          sel.appendChild(opt);
        }
        document.getElementById("loader").remove();
        document.getElementById("entities").style.visibility = "visible";
      });

    const userLocationsForm = document.getElementById("userLocationsForm");
    userLocationsForm.addEventListener("submit", function (e) {
      AbstractView.removeResponse();
      removeOutput();
      e.preventDefault();
      fetchUserLocations();
      userLocationsForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Show user locations over time</h1>
      <p>
        Select a user and select two dates to show a list of venues the user has
        visited
      </p>
      <div id="output"></div>
      <div class="container">
        <form id="userLocationsForm">
          <div style="display: inline-block;">
            <label for="users">User: </label>
          </div>
          <div style="display: inline-block;">
            <select name="users" id="entities"></select>
          </div>
          <div style="display: inline-block;">
            <div id="loader" class="loader"></div>
          </div>
          <br />
          <label for="Date">Start date: </label>
          <input
            type="date"
            id="startDate"
            name="date"
            placeholder="yyyy-mm-dd"
            required
          />
         
          <div style="display: inline-block;">
            <input
              type="time"
              id="startTime"
              name="time"
              min="00:00"
              max="23:59"
              required
              placeholder="--:--"
            />
          </div>
          
          <br />
          <label for="Date">End date: </label>
          <input
            type="date"
            id="endDate"
            name="date"
            placeholder="yyyy-mm-dd"
            required
          />
            <div style="display: inline-block;">
            <input
              type="time"
              id="endTime"
              name="time"
              min="00:00"
              max="23:59"
              required
              placeholder="--:--"
            />
          </div>
          
          <br />
          <div id="submit">
            <input type="submit" value="Search" />
          </div>
        </form>
      </div>
      <div id="detailsTable"></div>
      <div id="locationsTable"></div>
    `;
  }
}

function processResponse(response, details) {
  if (response.status != 200) {
    response.text().then((text) => AbstractView.showError(text));
    injectSubmit();
  } else {
    response.text().then((text) => {
      var json = JSON.parse(text);

      console.log(json.length);

      if (json.length === 0) {
        AbstractView.showWarning("This user has no check-ins.");
      } else {
        document.getElementById("detailsTable").innerHTML = details;
        
        var htmlTable =
          "<table><tr><th>Date</th><th>Time</th><th>Location</th></tr>";
        htmlTable += json
          .map(
            (v) => ` 
        <tr>
          <td>${v.Date.split('$')[0]}</td>
          <td>${v.Date.split('$')[1]}</td>
          <td>${v.Venue}</td>
        </tr>`
          )
          .join("");
        htmlTable += "</table>";

        document.getElementById("locationsTable").innerHTML = htmlTable;
        injectSubmit();


        AbstractView.showInfo("Found " + json.length + " locations.");
      }
    });
  }
}
function fetchUserLocations() {
  if (validateUserLocationsForm()) {
    document.getElementById("submit").innerHTML =
      '<div id="submitLoader" class="loader"></div>';

    let userId = document.getElementById("entities").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;

    var details = `<br />
    <p>
      Locations that
      <b>${
        userId.split(":")[1]
      }</b> has visited from <b>${startDate}, ${startTime}</b> to
      <b>${endDate}, ${endTime}</b>.
    </p>`;

    console.log("user id " + userId.split(":")[0]);
    const body = JSON.stringify({
      userId: userId.split(":")[0],
      startDate: startDate+"$"+startTime,
      endDate: endDate+"$"+endTime
    });

    fetch("https://comp3207functions.azurewebsites.net/api/fetchUserLocations", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: body,
    })
      .then((response) => processResponse(response, details))
      .catch((error) => processResponse(error, ""));
  }
}

function injectSubmit() {
  document.getElementById("submit").innerHTML =
    '<input type="submit" value="Register" />';
}
function removeOutput() {
  document.getElementById("detailsTable").innerHTML = "";
  document.getElementById("locationsTable").innerHTML = "";
}

function validateUserLocationsForm() {
  let startTime = document.getElementById("startTime").value;
  let endTime = document.getElementById("endTime").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  if (!AbstractView.isTimeValid(startTime)) {
    alert( "Please insert a valid format for the start time: hh:mm. (e.g. 17:30)");
    return false;
  }

  if (!AbstractView.isTimeValid(endTime)) {
    alert("Please insert a valid format for the end time: hh:mm. (e.g. 17:30)");
    return false;
  }

  if (!AbstractView.isValidDate(startDate)) {
    alert("Please insert a valid format for the start date: yyyy-mm-dd. (e.g. 2020-11-10)");
    return false;
  }
  if (!AbstractView.isValidDate(endDate)) {
    alert("Please insert a valid format for the end date: yyyy-mm-dd. (e.g. 2020-11-10)");
    return false;
  }

  return true;
}
