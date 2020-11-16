module.exports = async function (context, req) {
  const inputTable = context.bindings.inputTable;

  var venues = [];

  try {
    for (let i = 0; i < inputTable.length; i++) {
      var venue = inputTable[i];
      venues.push(venue);
    }

    console.log("length: " + inputTable.length);

    context.res = {
      status: 200,
      body: venues,
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: "Couldn't retrieve venues: " + error
    };
  }

  context.done();
}