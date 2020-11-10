import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Register Venue");
  }

  async init() {
    
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
          <label for="venues">Venue type: </label>
          <select name="venues" id="venus">
            <option value="pub">Pub</option>
            <option value="business">Business centre</option>
            <option value="sport">Sport Club</option>
            <option value="academic">Academic venue</option>
          </select> <br>
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
