import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("infected Users");
  }

  init() {
    document.getElementById("users").style.visibility = "hidden";

    fetch("http://localhost:7071/api/fetchPositiveUsers")
      .then((response) => {
        console.log("Response: " + response);
        if (!response.ok) {
          document.getElementById("usersLoader").remove();
          document.getElementById("users").style.visibility = "visible";
          throw Error("Error");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        var sel = document.getElementById("users");
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement("option");
          opt.innerHTML = data[i].name;
          opt.value = data[i].userId;
          sel.appendChild(opt);
        }

        document.getElementById("usersLoader").remove();
        document.getElementById("users").style.visibility = "visible";
      });

    const infectedUsersForm = document.getElementById("infectedUsersForm");
    infectedUsersForm.addEventListener("submit", function (e) {
      AbstractView.removeResponse();
      removeOutput();
      e.preventDefault();
      fetchInfectedUsers();
      infectedUsersForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Infected Users</h1>
      <p>
        Select a positive user and click submit to see the users who have got in
        contact with him/her. <br />
        The users appearing in this list have previously submitted a positive
        test.
      </p>
      <div id="output"></div>
      <div class="container">
        <form id="infectedUsersForm">
          <div style="display: inline-block;">
            <label for="users">Positive Users: </label>
          </div>
          <div style="display: inline-block;">
            <select name="users" id="users"></select>
          </div>
          <div style="display: inline-block;">
            <div id="usersLoader" class="loader"></div>
          </div>
          <br />

           <div id="submit">
            <input type="submit" value="Search" />
          </div>
        </form>
      </div>
      <div id="detailsTable"></div>
      <div id="infectedUsersTable"></div>
      <div id="detailsTable2"></div>
      <div id="positiveTable"></div>

    `;
  }
}

function processResponse(response) {
  if (response.status != 200) {
    response.text().then((text) => AbstractView.showError(text));
    injectSubmit();
  } else {
    response.text().then((text) => {
      var json = JSON.parse(text);

      console.log(json.length);

      if (json.length === 0) {
        AbstractView.showWarning("This user hasn't infected anyone.");
      } else {
        var details = "";
        var details2 = "";


        let r = json[0];
        details += `<br /><p> This table shows the people that
      <b>${r.UserName}</b> has infected. <b>${
                r.UserName
              }</b> has reported to be positive on <b>${r.Date}</b>. <br>
      The people infected have had contact with <b>${
        r.UserName
      }</b> 14 days before the date of the report. From <b>${
                r.startDate.split("$")[0]
              }</b> (${r.startDate.split("$")[1]}) to <b>${
                r.endDate.split("$")[0]
              }</b> (${r.endDate.split("$")[1]}).
    </p>`;


        details2 += `<br/><p> This table shows the locations that
      <b>${r.UserName}</b> has visited.
    </p>`;
            
            

        document.getElementById("detailsTable").innerHTML = details;
        document.getElementById("detailsTable2").innerHTML = details2;

        var htmlTable =
          "<table><tr><th>Infected User</th><th>Date</th><th>Time</th><th>Venue where infection occurred</th></tr>";
        htmlTable += json
          .map((v) =>
            v.hasOwnProperty("PartitionKey")
              ? ""
              : ` 
        <tr>
          <td>${v.infectedUser}</td>
          <td>${v.date}</td>
          <td>${v.time}</td>
          <td>${v.venue}</td>
        </tr>`
          )
          .join("");
        htmlTable += "</table>";

        var htmlTable2 =
          "<table><tr><th>Positive User</th><th>Venue</th><th>Date</th><th>Time</th></tr>";
        htmlTable2 += json
          .map((v) =>
            v.hasOwnProperty("PartitionKey") && v.hasOwnProperty("VenueId")
              ? ` 
        <tr>
          <td>${v.VisitorName}</td>
          <td>${v.Venue}</td>
          <td>${v.Date.split("$")[0]}</td>
          <td>${v.Date.split("$")[1]}</td>
        </tr>`
              : ""
          )
          .join("");
        htmlTable2 += "</table>";

        document.getElementById("infectedUsersTable").innerHTML = htmlTable;
        document.getElementById("positiveTable").innerHTML = htmlTable2;

        injectSubmit();

        AbstractView.showInfo("Found " + json.length + " people infected.");
      }
    });
  }
}

function fetchInfectedUsers() {
  document.getElementById("submit").innerHTML =
    '<div id="submitLoader" class="loader"></div>';

  let userId = document.getElementById("users").value;

  const body = JSON.stringify({
    userId: userId,
  });

  fetch("http://localhost:7071/api/fetchInfectedUsers", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: body,
  })
    .then((response) => processResponse(response))
    .catch((error) => processResponse(error, ""));
}

function removeOutput() {
  document.getElementById("detailsTable").innerHTML = "";
  document.getElementById("infectedUsersTable").innerHTML = "";
}
function injectSubmit() {
  document.getElementById("submit").innerHTML =
    '<input type="submit" value="Search" />';
}
