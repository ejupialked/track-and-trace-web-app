export default class  {
    constructor() { }
    setTitle(title) {
        document.title = title;
    }

    async getHtml(){
        return "";
    }

    async init(){}

    static showError(error){
        output = `<div class="error" role="alert">${error}</div>`;
        document.getElementById('output').innerHTML = output;
    }



    static showSuccess(success){
        output = `<div class="success" role="alert">${success}</div>`;
        document.getElementById("output").innerHTML = output;
    }

    static info(info){
        console.log('d');
    }

    
}