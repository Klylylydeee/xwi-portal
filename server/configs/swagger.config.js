const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.1.1",
        info: {
            title: "Xtreme Works, Inc - Backend Server",
            version: "1.0.0",
            description: "Public and Private Routes",
        },
        servers: [
            {
                url: `http://localhost:${process.env.SERVER_PORT}`,
            }
        ],
    },
    apis: ["server.js", "./view/*.js", "./model/*.js"],
};

const swaggerConfig = swaggerJsDoc(options);

module.exports = swaggerConfig;