const express = require("express");

const app = express();

require("./configs/db.config");
require("./configs/app.config")(app);
require("./routers/router")(app);