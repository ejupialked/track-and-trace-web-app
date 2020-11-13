import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Venue Visitors over time");
  }

  init() {
    document.getElementById("entities").style.visibility = "hidden";
    //set max for calendar
    var today = new Date().toISOString().split("T")[0];
    document.getElementById("startDate").setAttribute("max", today);
    document.getElementById("endDate").setAttribute("max", today);

    fetch("https://comp3207functions.azurewebsites.net/api/fetchVenues")
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
          opt.innerHTML = data[i].RowKey;
          opt.value = data[i].PartitionKey + ":" + data[i].RowKey;
          sel.appendChild(opt);
        }
        document.getElementById("loader").remove();
        document.getElementById("entities").style.visibility = "visible";
      });

    const venueVisitorsForm = document.getElementById("venueVisitorsForm");
    venueVisitorsForm.addEventListener("submit", function (e) {
      removeOutput();
      e.preventDefault();
      fetchVenueVisitors();
      venueVisitorsForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Venue Visitors over time</h1>
      <p>
        Enter a venue and select two dates to show a list of visitors over time
      </p>
      <div id="output"></div>
      <div class="container">
        <form id="venueVisitorsForm">
          <div style="display: inline-block;">
            <label for="venues">Venue: </label>
          </div>
          <div style="display: inline-block;">
            <select name="venues" id="entities"></select>
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
          <label for="Date">End date</label>
          <input
            type="date"
            id="endDate"
            name="date"
            placeholder="yyyy-mm-dd"
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
      </div>
      <div id="detailsTable"></div>
      <div id="visitorsTable">  
      </div>
    `;
  }
}

function processResponse(response, details) {
  if (response.status != 200) {
    response.text().then((text) => AbstractView.showError(text));
  } else {
    response.text().then((text) => {
      var json = JSON.parse(text);

      console.log(json.length);

      if (json.length === 0) {
        AbstractView.showWarning("This location does not have any visitors.");
      } else {
        document.getElementById("detailsTable").innerHTML = details;

        var htmlTable = "<table><tr><th>Date</th><th>Visitor</th></tr>";
        htmlTable += json
          .map(
            (v) => ` 
        <tr>
          <td>${v.Date}</td>
          <td>${v.VisitorName}</td>
        </tr>`
          )
          .join("");
        htmlTable += "</table>";

        document.getElementById("visitorsTable").innerHTML = htmlTable;

        AbstractView.showInfo("Found " + json.length + " visitors.");
      }
    });
  }

  injectSubmit();
}

function fetchVenueVisitors() {
  document.getElementById("submit").innerHTML =
    '<div id="submitLoader" class="loader"></div>';

  let venueId = document.getElementById("entities").value;
  let startDate = document.getElementById("startDate").value;
  let startTime = document.getElementById("startTime").value;

  let endTime = document.getElementById("endTime").value;
  let endDate = document.getElementById("endDate").value;

  var details = `<br>
    <p>
      Visitors that have visited
      <b>${venueId.split(":")[1]}</b> from <b>${startDate}, ${startTime}</b> to
      <b>${endDate}, ${endTime}</b>.
    </p>`;

    console.log("venue id " + venueId.split(":")[0]);
    const body = JSON.stringify({
      venueId: venueId.split(":")[0],
      startDate: startDate + "$" + startTime,
      endDate: endDate + "$" + endTime,
    });

    fetch(
      "https://comp3207functions.azurewebsites.net/api/fetchVenueVisitors",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: body,
      }
    )
      .then((response) => processResponse(response, details))
      .catch((error) => processResponse(error, ""));
  

  injectSubmit();
}

function removeOutput() {
  document.getElementById("detailsTable").innerHTML = "";
  document.getElementById("visitorsTable").innerHTML = "";
}

function injectSubmit() {
  document.getElementById("submit").innerHTML =
    '<input type="submit" value="Search" />';
}
