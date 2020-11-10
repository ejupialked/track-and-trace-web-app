import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("infected Users");
  }

  async init() {}

  async getHtml() {
    return `
      <h1>Infected Users</h1>
      <p>Select a positive user and click submit to see the users who have got in contact with him/her. <br> The users appearing in this list have previously submitted a positive test.</p>
      <div id="output"></div>
      <div class="container">
        <form id="userLocationsForm">
          <label for="venues">Positive users: </label>
          <select name="venues" id="venues">
            <option value="pub">Pub</option>
            <option value="business">Business centre</option>
            <option value="sport">Sport Club</option>
            <option value="academic">Academic venue</option>
          </select> <br>
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
