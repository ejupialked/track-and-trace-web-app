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

    static removeResponse(){
        document.getElementById("output").innerHTML = '';
    }


     static showSuccess(success){
        output = `<div class="success" role="alert">${success}</div>`;
        document.getElementById("output").innerHTML = output;
    }


    static showInfo(info){
        output = `<div class="info" role="alert">${info}</div>`;
        document.getElementById("output").innerHTML = output;
    }

    static showWarning(warning){
        output = `<div class="warning" role="alert">${warning}</div>`;
        document.getElementById("output").innerHTML = output;
    }

    static info(info){
        console.log('d');
    }

    
}