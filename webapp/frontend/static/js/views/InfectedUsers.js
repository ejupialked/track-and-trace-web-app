import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("infected Users");
  }

  async init() {
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
        <form id="userLocationsForm">
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
          <input type="submit" value="Search" />
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
