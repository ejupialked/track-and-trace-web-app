import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Add User");
  }

  async init() {
    const profileForm = document.getElementById("profileForm");

    profileForm.addEventListener("submit", function (e) {
      AbstractView.removeResponse();

      document.getElementById("submit").innerHTML =
        '<div id="submitLoader" class="loader"></div>';
      e.preventDefault();

      let name = document.getElementById("name").value;
      let age = document.getElementById("age").value;
      let address = document.getElementById("address").value;
      let gender = document.getElementById("male").value;

      if (!gender.checked) {
        gender = "male";
      } else {
        gender = "female";
      }

      let email = document.getElementById("email").value;

      const bo = JSON.stringify({
        name: name,
        age: age,
        address: address,
        gender: gender,
        email: email,
      });

      console.log(bo);

      fetch("https://comp3207functions.azurewebsites.net/api/registerUser", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: bo,
      }).then((response) => processResponse(response));

      profileForm.reset();
    });
  }

  async getHtml() {
    return `
      <h1>Register User</h1>
      <p>Complete all the required fields to create a profile</p>
      <div id="output"></div>
      <div class="container">
        <form id="profileForm">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
          />
          <input
            type="number"
            name="age"
            id="age"
            required
            min="3"
            max="140"
            placeholder="Age"
          />
          <input
            type="text"
            name="address"
            id="address"
            required
            placeholder="Address"
          />
          <div class="radioGroup">
            <label for="gender">Male</label>
            <input type="radio" name="gender" id="male" value="male" checked />
            <label for="gender">Female</label>
            <input type="radio" name="gender" id="female" value="female" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email"
          />
          <div id="submit">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    `;
  }
}

function processResponse(response) {
  if (response.status != 200) {
    response.text().then((text) => AbstractView.showError(text));
    injectSubmit();
  } else {
    response.text().then((text) => AbstractView.showSuccess(text));
    injectSubmit();
  }
}

function injectSubmit() {
  document.getElementById("submit").innerHTML =
    '<input type="submit" value="Register" />';
}
