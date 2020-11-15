const axios = require("axios");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let infectedUsers = [];

  let positiveUsersRequest = await axios.get( "https://comp3207functions.azurewebsites.net/api/fetchPositiveUsers");

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
    console.log("user: " + infectedUsers[i].infectedUser);
    console.log("name: " + infectedUsers[i].time);

    uniquePositiveUsers.set(infectedUsers[i].infectedUser, infectedUsers[i].time);
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
    body: positiveUsers,
  };
};
