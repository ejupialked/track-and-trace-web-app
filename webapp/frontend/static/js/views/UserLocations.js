import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("User Locations");
  }

  async init() {

  }

  async getHtml() {
    return `
      <h1>Show user locations over time</h1>
      <p>Select a user and select two dates to show a list of venues the user has visited</p>
      <div id="output"></div>
      <div class="container">
        <form id="userLocationsForm">
          <label for="venues">User: </label>
          <select name="users" id="users">
            <option value="pub">Pub</option>
            <option value="business">Business centre</option>
            <option value="sport">Sport Club</option>
            <option value="academic">Academic venue</option>
          </select> <br>
          <label for="Date">Start date: </label>
          <input type="date" id="startDate" name="date"><br>
          <label for="Date">End date</label>
          <input type="date" id="endDate" name="date"><br>
          <input type="submit" value="Search" />
        </form>
      </div>
      <div>
      <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
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
