module.exports = async function (context, req) {
  context.log("Calling infected users ...");

  const userReports = context.bindings.reportsTable;
  
  var userJSON = JSON.stringify(userReports);

  var json = JSON.parse(userJSON);

  console.log("User reports: " + userJSON);

  let uniquePositiveUsers = new Map(); //Map used to find unique users

  for (let i = 0; i < json.length; i++) {
    console.log("user: " + json[i].User);
    console.log("name: " + json[i].UserName);

    uniquePositiveUsers.set(json[i].User, json[i].UserName);
  }
  //Convert Map to JSON
  positiveUsers = [];
  for (let [key, value] of uniquePositiveUsers) {
    u = {};
    u["userId"] = key;
    u["name"] = value;
    positiveUsers.push(u);
  }

  console.log(JSON.stringify(positiveUsers));
//////////////////////////////////////////////

    context.res = {
      status: 200,
      body: positiveUsers,
    };
 

  context.done();
};
