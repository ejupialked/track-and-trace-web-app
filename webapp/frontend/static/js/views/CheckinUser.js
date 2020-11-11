import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Check-in User");
  }

  async init() {
  
  }

  async getHtml() {
    return `
      <h1>Check-in User</h1>
      <p>Complete all the required to check-in a user</p>
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
          <label for="venues">Select venue: </label>
          <select name="venues" id="venues">
            <option value="1">Alked</option>
            <option value="2">Jim</option>
            <option value="3">Jason</option>
            <option value="4">John</option>
          </select> <br>
           <label for="Date">Date user has visited the venue: </label>
          <input type="date" id="date" name="date"  placeholder="yyyy-mm-dd"><br><br>
          <input type="submit" value="Register"/>
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
