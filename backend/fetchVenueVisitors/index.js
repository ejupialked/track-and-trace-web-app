module.exports = async function (context, req) {
    
  const startDate = req.query.startDate || req.body.startDate;
  const endDate = req.query.endDate || req.body.endDate;

  console.log("StartDate: " + startDate);
  console.log("EndDate: " + endDate);

  const visitors = context.bindings.checkinsTable;

  var visitorsJSON = JSON.stringify(visitors);

  var visitorsJSONValue = JSON.parse(visitorsJSON);

  console.log("visitors Json: " + visitorsJSON);


   if (!isValidDate(startDate.split('$')[0]) && !isValidDate(endDate.split('$')[0])) {
     context.res = {
       status: 400,
       body: "The start and end date should have this format yyyy-mm-dd.",
     };
   } else {
     if (visitorsJSONValue.length == 0) {
       context.res = {
         status: 200,
         body: [],
       };
     } else if (visitorsJSONValue.length > 0) {
       for (var i = 0; i < visitorsJSONValue.length; i++) {
         var obj = visitorsJSONValue[i];

         console.log(obj.VisitorName);
       }
       context.res = {
         body: visitorsJSONValue,
       };
     } else {
       context.res = {
         status: 400,
         body:
           "Please a valid user. The start and end should be of the format yyyy-mm-dd.",
       };
     }
   }


  context.done();


}

//Taken from stackoverflow
function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false;
  var d = new Date(date);
  var n = d.getTime();
  if (!n && n !== 0) return false; 
  return d.toISOString().slice(0, 10) === date;
}
