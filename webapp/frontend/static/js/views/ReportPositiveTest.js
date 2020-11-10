import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Report Positive COVID-19 Test");
  }

  async init() {}

  async getHtml() {
    return `
      <h1>Report Positive Test</h1>
      <p>Complete all the required field to report a positive COVID-19 test.</p>
      <div id="output"></div>
      <div class="container">
        <form id="venueForm">
        <label for="users">Select user: </label>
          <select name="users" id="users">
            <option value="1">Alked</option>
            <option value="2">Jim</option>
            <option value="3">Jason</option>
            <option value="4">John</option>
          </select> <br>
           <label for="Date">Date results: </label>
          <input type="date" id="birthday" name="date"><br><br>
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
