import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Register Venue");
  }

  async init() {
    const venueForm = document.getElementById("venueForm");

    venueForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let postcode = document.getElementById("postcode").value;

      const body = JSON.stringify({
        name: name,
        postcode: postcode,
      });

      console.log(body);

      fetch("https://covidtrackandtrace.azurewebsites.net/api/registerVenue", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: body,
      }).then((response) => processResponse(response));

      venueForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Register Venue</h1>
      <p>Complete all the required fields to create a venue</p>
      <div id="output"></div>
      <div class="container">
        <form id="venueForm">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Venue name"
            required
          />
          <input
            type="text"
            name="postcode"
            id="postcode"
            required
            placeholder="Postcode (e.g SO18 2NU)"
          />
          <input type="submit" value="Register" />
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
