const express = require("express");

const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./configs/swagger.config");

const databaseConnection = require("./configs/db.config");

databaseConnection();

app.use(express.json({ limit: "50mb" }));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Xtreme Works, Inc - Backend Server: http://localhost:${process.env.SERVER_PORT}`)
    console.log(`Swagger UI: http://localhost:${process.env.SERVER_PORT}/api-documentation`)
});

app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use('/authentication', require("./routers/router"));


app.use(require("./middlewares/errorHandler").notFoundHandler);
app.use(require("./middlewares/errorHandler").catchHandler);