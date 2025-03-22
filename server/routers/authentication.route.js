const express = require("express");
const { check, query} = require("express-validator");

const userAuthController = require("../controllers/authentication.controller");

const router = express.Router();

router.post(
    "/sign-up",
    [
        check("firstName").not().isEmpty(),
        check("lastName").not().isEmpty(),
        check("address.primaryAddressLine").not().isEmpty(),
        check("address.secondaryAddressLine").not().isEmpty(),
        check("address.city").not().isEmpty(),
        check("address.province").not().isEmpty(),
        check("address.postalCode").not().isEmpty(),
        check("financial.bank").not().isEmpty(),
        check("financial.bankAccount").not().isEmpty(),
        check("financial.salary").not().isEmpty(),
        check("email").not().isEmpty(),
        check("phoneNumber").not().isEmpty(),
        check("department").not().isEmpty(),
        check("designation").not().isEmpty(),
        check("immediateSupervisor").not().isEmpty(),
        check("dateOfBirth").not().isEmpty()
    ],
    userAuthController.userSignUp
);

router.post(
    "/sign-in",
    [
        check("email").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    userAuthController.userSignIn
);

router.patch(
    "/forgot-password",
    [
        check("email").not().isEmpty()
    ],
    userAuthController.userForgotPassword
);

module.exports = router;