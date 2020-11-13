module.exports = async function (context, req) {
    
  const startDate = req.query.startDate || req.body.startDate;
  const endDate = req.query.endDate || req.body.endDate;

  console.log("StartDate: " + startDate);
  console.log("EndDate: " + endDate);

  const visitors = context.bindings.checkinsTable;

  var visitorsJSON = JSON.stringify(visitors);

  var visitorsJSONValue = JSON.parse(visitorsJSON);

  console.log("visitors Json: " + visitorsJSON);


   if (!isValidDate(startDate) || !isValidDate(endDate)) {
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



function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
}
