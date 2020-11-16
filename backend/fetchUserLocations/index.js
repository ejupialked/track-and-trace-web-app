module.exports = async function (context, req) {
  context.log("Calling fetchUserLocations ...");
  const startDate = req.query.startDate || req.body.startDate;
  const endDate = req.query.endDate || req.body.endDate;

  console.log("start date: " + startDate);
  console.log("end date: " + endDate);

  const user = context.bindings.checkinsTable;

  var userJSON = JSON.stringify(user);

  var json = JSON.parse(userJSON);

  console.log("User Json: " + userJSON);

  //Date validation
  if (!isValidDate(startDate.split('$')[0]) || !isValidDate(endDate.split('$')[0])) {
    context.res = {
      status: 400,
      body: "The start and end date should have this format yyyy-mm-dd.",
    };
  } else {
    if (json.length == 0) {
      context.res = {
        status: 200,
        body: [],
      };
    } else if (json.length > 0) {
      for (var i = 0; i < json.length; i++) {
        var obj = json[i];

        console.log(obj.RowKey);
      }
      context.res = {
        body: userJSON,
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
};

//Taken from stackoverflow
function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
}
