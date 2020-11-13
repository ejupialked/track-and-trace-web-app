const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
  context.log("Calling repor positive test...");
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

      reportsTable.push({
        PartitionKey: "Positive Test",
        RowKey: uuidv4(),
        Date: date,
        User: json.PartitionKey,
        UserName: json.Name
      });

      context.res = {
        body: "Positive Covid Test sent!",
      };
    }
  }

  context.done();
};

function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
}
