const express = require("express");

const userAuthController = require("../controllers/authentication.controller");

const router = express.Router();

router.post(
    "/sign-up",
    userAuthController.userSignUp
);

router.post(
    "/sign-in",
    userAuthController.userSignIn
);

module.exports = router;