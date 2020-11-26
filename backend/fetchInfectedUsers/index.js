const axios = require("axios");

module.exports = async function (context, req) {
  console.log("Calling searchInfectedUser....");

  var infectedUsers = []; //JSON to be returned
  var promises = [];

  //Reports of the positiveUser
  const reportsTable = context.bindings.reportsTable;

  console.log(reportsTable);

  var report = reportsTable[reportsTable.length-1];

  if (reportsTable.length > 0) {
    var userId = report.User;
    var reportDate = report.Date; //e.g 2020-12-10
    var splitDate = reportDate.split("-"); //Splitting string to get yyyy, mm and dd separately
    var dateObj = new Date(splitDate[0], parseInt(splitDate[1]) - 1, splitDate[2]); //create a Date object
    var newDate = new Date(dateObj - 14 * 24 * 60 * 60 * 1000); //Calculate date 7 days ago


    var sDate = formatDate(newDate) + "$00:00";
    var eDate = formatDate(dateObj) + "$23:59";

    ///INSERT THIS DATES in the report
    report["report"] = "";
    report["startDate"] = sDate;
    report["endDate"] = eDate;

    infectedUsers.push(report);
    let request = "https://comp3207functions.azurewebsites.net/api/fetchRecentUserCheckins?startDate=" + sDate + "&endDate=" + eDate + "&userId=" + userId;


    let userCheckins = await axios.get(request);

    userCheckins.data.forEach((c) => {
      infectedUsers.push(c);
   

      // c.Date --> 2020-12-01$12:10

      let dateCheckIn = c.Date.split("$")[0]; // eg. 2020-12-01

      let dateSplitted = dateCheckIn.split("-");
      let yyyy = dateSplitted[0];
      let mm = dateSplitted[1];
      let dd = dateSplitted[2];

      let startTime = c.Date.split("$")[1]; // eg. 12:10
      let timeSplitted = startTime.split(":");
      let hh = timeSplitted[0];
      let min = timeSplitted[1];

      //Create the end Date with the time
      var date = new Date(yyyy, mm, dd, hh, min);
      date.setMonth(date.getMonth() - 1); //By default the month is ahead by 1.
      date.addHours(1);


      let positiveUser = c.PartitionKey;
      let venuedId = c.VenueId;
      let startDate = c.Date;
      let endDate = getDateWithZeros(date) + "$" + hoursWithZeros(date) + ":" +  minutesWithZeros(date);

      let request2 =
      "https://comp3207functions.azurewebsites.net/api/searchInfectedUsers?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&positiveUser=" +
        positiveUser +
        "&venueId=" +
        venuedId;

      console.log("Request2: " + request2);

      promises.push(axios.get(request2));
    });

    let userInfected = await Promise.all(promises);

    userInfected.forEach((json) => {
      console.log("JSON promise: " + JSON.stringify(json.data));

      json.data.forEach((u) => {
        uJson = {};
        uJson["infectedUser"] = u.VisitorName;
        uJson["date"] = u.Date.split("$")[0];
        uJson["time"] = u.Date.split("$")[1];
        uJson["venue"] = u.Venue;
        infectedUsers.push(uJson);
      });
    });

    context.res = {
      body: infectedUsers,
    };
  } else if (reportsTable.length == 0) {
    console.log("This user is not positive.");
    context.res = {
      body: "[]",
    };
  } else {
    console.error("error in logic");

    context.res = {
      status: 400,
      body: "error",
    };
  }
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

//Taken from stackoverflow
function getDateWithZeros(date) {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}
//Taken from stackoverflow
function minutesWithZeros(dt) {
  return (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
}
//Taken from stackoverflow
function hoursWithZeros(dt) {
  return (dt.getHours() < 10 ? "0" : "") + dt.getHours();
}
