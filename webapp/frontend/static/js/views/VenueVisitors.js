import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Venue Visitors over time");
  }

  async init() {
    
  }

  async getHtml() {
    return `
      <h1>Venue Visitors over time</h1>
      <p>Enter a venue and select two dates to show a list of vistors over time</p>
      <div id="output"></div>
      <div class="container">
        <form id="userLocationsForm">
          <label for="venues">Venue: </label>
          <select name="venues" id="venues">
            <option value="pub">Pub</option>
            <option value="business">Business centre</option>
            <option value="sport">Sport Club</option>
            <option value="academic">Academic venue</option>
          </select> <br>
          <label for="Date">Start date: </label>
          <input type="date" id="startDate" name="date"  placeholder="yyyy-mm-dd" ><br>
          <label for="Date">End date</label>
          <input type="date" id="endDate" name="date"  placeholder="yyyy-mm-dd"><br>
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
