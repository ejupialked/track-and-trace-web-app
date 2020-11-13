import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Venue Visitors over time");
  }

  async init() {
    document.getElementById("venues").style.visibility = "hidden";

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
          opt.value = data[i].PartitionKey + ":" + data[i].RowKey;
          sel.appendChild(opt);
        }
        document.getElementById("venuesLoader").remove();
        document.getElementById("venues").style.visibility = "visible";
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
            <select name="venues" id="venues"></select>
          </div>
          <div style="display: inline-block;">
            <div id="venuesLoader" class="loader"></div>
          </div>
          <br />
          <label for="Date">Start date: </label>
          <input
            type="date"
            id="startDate"
            name="date"
            placeholder="yyyy-mm-dd"
          /><br />
          <label for="Date">End date</label>
          <input
            type="date"
            id="endDate"
            name="date"
            placeholder="yyyy-mm-dd"
          /><br />
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
    injectSubmit();
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

  let venueId = document.getElementById("venues").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  var details = `<br>
    <p>
      Visitors that have visited
      <b>${venueId.split(":")[1]}</b> from <b>${startDate}</b> to
      <b>${endDate}</b>.
    </p>`;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    AbstractView.showError(
      "Please ensure that start and end date have the right format."
    );
  } else {
    console.log("venue id " + venueId.split(":")[0]);
    const body = JSON.stringify({
      venueId: venueId.split(":")[0],
      startDate: startDate,
      endDate: endDate,
    });

    fetch("http://localhost:7071/api/fetchVenueVisitors", {
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

function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
}

function removeOutput() {
  document.getElementById("detailsTable").innerHTML = "";
  document.getElementById("visitorsTable").innerHTML = "";
}

function injectSubmit() {
  document.getElementById("submit").innerHTML =
    '<input type="submit" value="Search" />';
}