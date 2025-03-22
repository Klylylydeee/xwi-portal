const mongoose = require("mongoose");

module.exports = (async function () {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
        });
        console.log(`MongoDB ODM to DB Server: ${connect.connection.host}`);
        return connect
    } catch (err) {
        console.log(err);
        console.log("Closing NodeJS Server");
        process.exit(1);
    };
})()