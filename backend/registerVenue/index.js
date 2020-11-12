const { v4: uuidv4 } = require("uuid");
module.exports = async function (context, req) {
  context.bindings.outputTable = [];

  context.log("Calling register venues...");

  const name = req.query.name || req.body.name;
  const postcode = req.query.postcode || req.body.postcode;
  let id = uuidv4();

  if (name && postcode) {
    console.log("Creating venue...");
    context.bindings.outputTable.push({
      PartitionKey: id,
      RowKey: name,
      Postcode: postcode,
    });
    context.res = {
      status: 200,
      body: "Venue created!",
    };
  } else {
    context.res = {
      status: 400,
      body: "Error while registering your venue. Make sure you enter all details correctly."
    };
  }
  context.done();
};
