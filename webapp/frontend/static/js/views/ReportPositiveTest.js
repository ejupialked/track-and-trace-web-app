import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Report Positive COVID-19 Test");
  }

  async init() {
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
      });

    const reportForm = document.getElementById("reportForm");
    reportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      sendReport();
      checkInForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Report Positive Test</h1>
      <p>Complete all the required field to report a positive COVID-19 test.</p>
      <div id="output"></div>
      <div class="container">
        <form id="reportForm">
        <label for="users">Select user: </label>
          <select name="users" id="users">
          </select> <br>
           <label for="Date">Date results: </label>
          <input type="date" id="date" name="date"><br><br>
          <input type="submit" value="Send"/>
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
}


function sendReport() {
  let user = document.getElementById("users").value;
  let date = document.getElementById("date").value;

  const body = JSON.stringify({
    date: date,
    userId: user
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