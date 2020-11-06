import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Venue check-in");
  }

  async getHtml() {
    const venues = ["Giddy Bridge", "SUSU", "Buiding 22", "Costa Coffe"];

    let html = "";

    html = venues
      .map(
        (v) =>
          `<div> <div>${v}</div> </div>`
      )
      .join("");

    return html;
  }
}

async function fetchVenues() {
  fetch("https://reqres.in/api/users?page=2")
    .then((response) => {
      console.log("Response: " + response);

      if (!response.ok) {
        throw Error("Error");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
