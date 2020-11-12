const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
  context.log("Calling create user profile...");
  context.bindings.outputTable = [];


  const name = req.query.name || req.body.name;
  const age = req.query.age || req.body.age;
  const address = req.query.address || req.body.address;
  const gender = req.query.gender || req.body.gender;
  const email = req.query.email || req.body.email;
  let id = uuidv4();

  if (name && age && address && gender && email) {
    console.log("Creating user...");
    console.log("Name: " + name);
    context.bindings.outputTable.push({
      PartitionKey: id,
      RowKey: email,
      Name: name,
      Age: age,
      Address: address,
      Gender: gender,
    });

    context.res = {
      status: 200,
      body: "User created",
    };
  } else {
    context.res = {
      status: 400,
      body:
        "The function must be called with six arguments " +
        '"name: String", ' +
        '"age: String", ' +
        '"gender: String", ' +
        '"address: String", ' +
        '"email: String',
    };
  }
  context.done();
};
