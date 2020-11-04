import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Homepage");
    }

    async getHtml() {
        return `<h1> Homepage </h1>
        
        
        <p>Welcome to the Covid Track and Trace app, please use venue check in to enter a public space.</p>
        
        `
        
    
    }
}