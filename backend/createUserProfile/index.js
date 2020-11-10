module.exports = async function (context, req) {
    context.log('Calling create user profile...');

    const name = req.query.name || req.body;
    const age = req.query.age || req.body.age;
    const address = req.query.address || req.body.address;
    const gender = req.query.gender || req.body.gender;
    const email = req.query.email || req.body.email;
    
    if ((req.query.name || (req.body && req.body.name)) &&
        (req.query.age || (req.body && req.body.age)) &&
        (req.query.address || (req.body && req.body.address)) &&
        (req.query.gender || (req.body && req.body.gender)) &&
        (req.query.email || (req.body && req.body.email)) 
        ) {
        
        console.log("Creating user...");

        //Create user

        context.res = {
          status: 200,
          body: "User created",
        };
      } else {
        context.res = {
          status: 400,
          body: "The function must be called with six arguments " +
        '"name: String", ' +
        '"age: String", ' +
        '"gender: String", ' +
        '"address: String", ' +
        '"email: String',
        };
      }
      context.done();    
}