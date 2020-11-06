import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Homepage");
  }

  async init() {
    

  }

  async getHtml() {
    console.log("Returning html...");
    return `
        `;
  }
}

