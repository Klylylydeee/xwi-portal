const cors = require("cors");

const whitelist = [
    process.env.DEPLOYMENT_STATUS === "YES" ? "https://api.silangmedical.com" : "http://localhost:1000",
    process.env.DEPLOYMENT_STATUS === "YES" ? "https://portal.silangmedical.com" : "http://localhost:3000",
    process.env.DEPLOYMENT_STATUS === "YES" ? "https://silangmedical.com" : "http://localhost:3000",
    process.env.DEPLOYMENT_STATUS === "YES" ? "http://localhost:3001" : "http://localhost:3001",
    process.env.DEPLOYMENT_STATUS === "YES" && process.env.SERVER_MODE === "admin" &&  "https://admin-api.silangmedical.com",
];

const corsConfig = cors({
    origin: (origin, callback) => {
        let error = new Error("Site Origin is not allowed by CORS");
        error.statusCode = 400
   //   whitelist.indexOf(origin) !== -1 || !origin ?
    //      callback(null, true) : callback(error)
        callback(null,true)
    },
    methods: "GET,PUT,PATCH,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
})

module.exports = corsConfig;