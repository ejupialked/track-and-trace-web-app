module.exports = async function (context, req) {
    context.log('Calling create user profile...container');

    let responseMessage;
    let status;

    const name = req.query.name;
    const age = req.query.age;
    const address = req.query.address;
    const gender = req.query.gender;
    const email = req.query.email;

    if (
        typeof name != "string" ||
        isNaN(age) ||
        typeof gender != "string" ||
        typeof address != "string" ||
        typeof email != "string"
    ) {
        status = 400;
        responseMessage =
        "The function must be called with six arguments " +
        '"name: String", ' +
        '"age: String", ' +
        '"gender: String", ' +
        '"address: String", ' +
        '"email: String"';
    } else {
        responseMessage = "User added!";
        status = 200;
    }
    
    context.res = {
        status: status,
        body: responseMessage,
    };
}