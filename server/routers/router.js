const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("../configs/swagger.config");

module.exports = Routes = (app) => {
    app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
    app.use('/authentication', require("./authentication.route"));
    app.use('/user-setting', require("./userSetting.route"));
    app.use(require("../middlewares/errorHandler.middleware").notFoundHandler);
    app.use(require("../middlewares/errorHandler.middleware").catchHandler);
}