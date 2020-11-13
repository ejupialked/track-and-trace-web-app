import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Report Positive COVID-19 Test");
  }

   init() {
    document.getElementById("users").style.visibility = "hidden";

    //set min for calendar
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("date")[0].setAttribute("max", today);

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

    const reportForm = document.getElementById("reportForm");
    reportForm.addEventListener("submit", function (e) {
      AbstractView.removeResponse();
      document.getElementById("submit").innerHTML =
        '<div id="submitLoader" class="loader"></div>';
      e.preventDefault();
      sendReport();
      reportForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Report Positive Test</h1>
      <p>Complete all the required field to report a positive COVID-19 test.</p>
      <div id="output"></div>
      <div class="container">
        <form id="reportForm">

        <div style="display: inline-block;">
            <label for="users">User: </label>
          </div>
          <div style="display: inline-block;">
            <select name="users" id="users"></select>
          </div>
          <div style="display: inline-block;">
            <div id="usersLoader" class="loader"></div>
          </div>
        <br>
           <label for="Date">Date results: </label>
          <input type="date" id="date" name="date" placeholder="yyyy-mm-dd" required><br><br>
               <div id="submit">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    `;
  }
}

function processResponse(response) {
  if (response.status != 200) {
    response.text().then((text) => AbstractView.showError(text));
  } else {
    response.text().then((text) => AbstractView.showSuccess(text));
  }

  injectSubmit();
}

function sendReport() {
  let user = document.getElementById("users").value;
  let date = document.getElementById("date").value;

  const body = JSON.stringify({
    date: date,
    userId: user,
  });

  fetch("http://localhost:7071/api/reportPositiveTest", {
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

function injectSubmit() {
  document.getElementById("submit").innerHTML =
    '<input type="submit" value="Register" />';
}
