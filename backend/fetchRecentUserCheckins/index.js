module.exports = async function (context, req) {
  context.log("Calling fetchRecentUserCheckins ...");
  const startDate = req.query.startDate || req.body.startDate;
  const endDate = req.query.endDate || req.body.endDate;

  console.log("start date: " + startDate);
  console.log("end date: " + endDate);

  const checkinsTable = context.bindings.checkinsTable;

    context.res = {
      body: checkinsTable,
    };

    context.done();
};
