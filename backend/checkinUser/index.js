const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  context.bindings.checkinsTable = [];
  const checkinsTable = context.bindings.checkinsTable;

  const date = req.query.date || req.body.date;
  const venue = req.query.venue || req.body.venue;
  const user = context.bindings.userEntity;

  


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
      console.log("venue: " + venue);

      //parse this
      var json = JSON.parse(userJSON.substring(1, userJSON.length - 1));


    checkinsTable.push({
      PartitionKey: json.PartitionKey,
      RowKey: uuidv4(),
      Date: date,
      Venue: venue,
    });

    context.res = {
      body: "Check in performed!",
    };
  }

  context.done();
};
