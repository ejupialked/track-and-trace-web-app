import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Venue check-in");
    }

    async getHtml() {
        return "<h1> Venue check-in </h1>"
    }
}