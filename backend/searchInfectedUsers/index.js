module.exports = async function (context, req) {
  //   "filter": "Date gt '{startDate}' and Date lt {endDate} and PartitionKey ne '{positiveUser}' and VenueId eq '{venueId}'",

  context.log("Calling searchRecentUserCheckins..");
  const startDate = req.query.startDate || req.body.startDate;
  const endDate = req.query.endDate || req.body.endDate;
  const positiveUser = req.query.positiveUser || req.body.positiveUser;
  const venueId = req.query.venueId || req.body.venueId;

  console.log("start date: " + startDate);
  console.log("end date: " + endDate);
  console.log("positiveUser: " + positiveUser);
  console.log("venueId: " + endDate);

  const checkinsTable = context.bindings.checkinsTable;

  context.res = {
    body: checkinsTable,
  };

  context.done();
};
