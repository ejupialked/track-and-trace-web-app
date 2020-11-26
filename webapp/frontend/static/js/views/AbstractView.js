export default class  {
    constructor() { }
    setTitle(title) {
        document.title = title;
    }

    async getHtml(){
        return "";
    }

    init(){}

    static showError(error){
        var output = `<div class="error" role="alert">${error}</div>`;
        document.getElementById('output').innerHTML = output;
    }

    static removeResponse(){
        document.getElementById("output").innerHTML = '';
    }


     static showSuccess(success){
        var output = `<div class="success" role="alert">${success}</div>`;
        document.getElementById("output").innerHTML = output;
    }


    static showInfo(info){
        var output = `<div class="info" role="alert">${info}</div>`;
        document.getElementById("output").innerHTML = output;
    }

    static showWarning(warning){
        var output = `<div class="warning" role="alert">${warning}</div>`;
        document.getElementById("output").innerHTML = output;
    }

    static info(info){
        console.log('d');
    }
    //Taken from stackverflow  
    static isTimeValid(time) {
    var isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
    return isValid;
  }


//Taken from stackverflow  
static isValidDate(date) {

    console.log('Validing: '+ date);

  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; 
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === date;
}


    
}