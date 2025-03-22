const express = require("express");

const corsConfig = require("./cors.config");

module.exports = Middleware = (app) => {
    app.use(corsConfig);
    app.use(express.json({ limit: "50mb" }));

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Xtreme Works, Inc - Backend Server: http://localhost:${process.env.SERVER_PORT}`)
        console.log(`Swagger UI: http://localhost:${process.env.SERVER_PORT}/api-documentation`)
    });
}