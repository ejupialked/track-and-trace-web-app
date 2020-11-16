module.exports = async function (context, req) {

  context.log("Calling searchInfectedUsers..");
  const startDate = req.query.startDate || req.body.startDate;
  const endDate = req.query.endDate || req.body.endDate;
  const positiveUser = req.query.positiveUser || req.body.positiveUser;
  const venueId = req.query.venueId || req.body.venueId;

  console.log("start date: " + startDate);
  console.log("end date: " + endDate);
  console.log("positiveUser: " + positiveUser);
  console.log("venueId: " + venueId);

  const checkinsTable = context.bindings.checkinsTable;

  context.res = {
    body: checkinsTable,
  };

  context.done();
};
