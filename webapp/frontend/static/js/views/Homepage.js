import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Homepage");
  }

  async init() {}

  async getHtml() {
    console.log("Returning html...");
    return `   <h1>Welcome to the Track and Trace app</h1>
      <p>Please use the side bar to navigate all features of the application. </p>
      

        `;
  }
}
