const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  context.bindings.checkinsTable = [];
  const checkinsTable = context.bindings.checkinsTable;
  const venueEntity = context.bindings.venueEntity;

  const date = req.query.date || req.body.date;
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
      console.log("venue: " + JSON.stringify(venueEntity));


      var jsonString = JSON.stringify(venueEntity);
      var jsonValue = JSON.parse(jsonString.substring(1, jsonString.length - 1));



      //parse this
      var json = JSON.parse(userJSON.substring(1, userJSON.length - 1));

      console.log(jsonValue.RowKey);
      console.log(jsonValue.PartitionKey);

    checkinsTable.push({
      PartitionKey: json.PartitionKey, //UserID
      RowKey: uuidv4(), //Checkin ID
      Date: date, //Date of checkin
      VenueId: jsonValue.PartitionKey, //VenueID
      Venue: jsonValue.RowKey, //VenueName
      VisitorName: json.Name // Name of the visitors
    });

    context.res = {
      body: "Check in performed!",
    };
  }

  context.done();
};
