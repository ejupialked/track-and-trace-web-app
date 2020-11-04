import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Add User");
    }

    async getHtml() {
        return "<h1> Add User </h1>"
    }
}