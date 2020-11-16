import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Homepage");
  }

  async init() {}

  async getHtml() {
    console.log("Returning html...");
    return `   <h1>Welcome to the COVID-19 Track and Trace app</h1>
      <p>Created by Alked Ejupi</p>
      

        `;
  }
}
