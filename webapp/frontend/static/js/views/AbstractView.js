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

    static isTimeValid(time) {
    var isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
    return isValid;
  }
static isValidDate(date) {

    console.log('Validing: '+ date);

  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
}


    
}