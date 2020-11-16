const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
  context.log("Calling report positive test...");
  context.bindings.reportsTable = [];
  const reportsTable = context.bindings.reportsTable;

  const date = req.query.date || req.body.date;
  const user = context.bindings.userEntity;

  if (!isValidDate(date)) {
    context.res = {
      status: 400,
      body: "The date should have this format <b>yyyy-mm-dd.</b>",
    };
  } else {
    if (user.length == 0) {
      console.log("USER NOT FOUND!");
      context.res = {
        status: 400,
        body: "User not Found!",
      };
    } else {
      console.log("USER FOUND!");

      var userJSON = JSON.stringify(user);

      console.log("date: " + date);

      //parse this
      var json = JSON.parse(userJSON.substring(1, userJSON.length - 1));

      console.log("userId: " + json.PartitionKey);


      var split = date.split('-');

      reportsTable.push({
        PartitionKey: "Positive Test",
        RowKey: split[2]+"-"+split[1]+"-"+split[0] + uuidv4(),
        Date: date,
        User: json.PartitionKey,
        UserName: json.Name
      });

      context.res = {
        body: "You have reported that <b>" + json.Name + "</b> is positive. Date of the results: <b>" + date + "</b>. Only the most recent report will be used to track and trace."
      };
    }
  }

  context.done();
};

//Taken from stackoverflow
function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; 
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; 
  return d.toISOString().slice(0, 10) === date;
}

