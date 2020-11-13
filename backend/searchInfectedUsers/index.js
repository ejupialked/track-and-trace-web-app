module.exports = async function (context, req) {
  //POSITIVE User
  const positiveUser = context.bindings.positiveUser;
  //Reports of the positiveUser
  const reportsTable = context.bindings.reportsTable;
  //Checkins of the positiveUser
  const checkinsTable = context.bindings.checkinsTable;

  console.log(JSON.stringify(positiveUser));
  console.log(JSON.stringify(reportsTable));
  console.log(JSON.stringify(checkinsTable));

  if (positiveUser.length == 1) {
    context.res = {
      body: reportsTable,
    };
  } else if (positiveUser.length == 0) {
    console.log("The user is not valid.");
    context.res = {
      body: "[]",
    };
  } else if (positiveUser.length > 1) {
    //Should not return more than one user
    console.log("The user is not valid.");
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

  context.done();
};