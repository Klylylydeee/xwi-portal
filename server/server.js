const express = require("express");

const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./configs/swagger.config");

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Xtreme Works, Inc - Backend Server: http://localhost:${process.env.SERVER_PORT}`)
    console.log(`Swagger UI: http://localhost:${process.env.SERVER_PORT}/api-documentation`)
});

app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerConfig));