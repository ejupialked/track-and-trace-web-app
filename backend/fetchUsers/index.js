module.exports = async function (context, req) {
  const inputTable = context.bindings.inputTable;

  var users = [];

  try {
    for (let i = 0; i < inputTable.length; i++) {
      var user = inputTable[i];
      users.push(user);
    }

    console.log("length: " + inputTable.length);

    context.res = {
      status: 200,
      body: users,
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: "Couldn't retrieve users: " + error
    };
  }

  context.done();
};
