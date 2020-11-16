const axios = require("axios");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let infectedUsers = [];

  const date = req.query.date || req.body.date;

  if (isValidDate(date)){
       context.res = {
         body: "Insert a valid date: yyyy-mm-dd",
       };
  }

  let positiveUsersRequest = await axios.get("https://comp3207functions.azurewebsites.net/api/fetchPositiveUsers");

  var promises = [];

  positiveUsersRequest.data.forEach((e) => {
    promises.push(axios.get("https://comp3207functions.azurewebsites.net/api/fetchInfectedUsers?userId=" + e.userId));
  });

  let userInfected = await Promise.all(promises);
  console.log(userInfected);

  userInfected.forEach((json) => {
    console.log("JSON promise: " + JSON.stringify(json.data));

    json.data.forEach((u) => {
      if (u.hasOwnProperty("infectedUser")) {
        infectedUsers.push(u);
      }
    });
  });


  let uniquePositiveUsers = new Map(); //Map used to find unique users

  for (let i = 0; i < infectedUsers.length; i++) {

    if (infectedUsers[i].date == date){
        var us = infectedUsers[i];
        uniquePositiveUsers.set(us.infectedUser, us.date + "$" + us.time + "$" + us.venue);
    }
  }

  //Convert Map to JSON
  positiveUsers = [];
  for (let [key, value] of uniquePositiveUsers) {
    u = {};
    u["name"] = key;
    u["time"] = value;
    positiveUsers.push(u);
  }
  console.log(JSON.stringify(positiveUsers));

  context.res = {
    body: positiveUsers.length,
  };
};



function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false;
  var d = new Date(date);
  var n = d.getTime();
  if (!n && n !== 0) return false;
  return d.toISOString().slice(0, 10) === date;
}
