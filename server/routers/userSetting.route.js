const express = require("express");
const { check, query} = require("express-validator");

const userSettingController = require("../controllers/userSetting.controller");

const router = express.Router();

router.patch(
    "/details",
    [
        check("firstName").not().isEmpty(),
        check("lastName").not().isEmpty(),
        check("email").not().isEmpty(),
        check("address.primaryAddressLine").not().isEmpty(),
        check("address.secondaryAddressLine").not().isEmpty(),
        check("address.city").not().isEmpty(),
        check("address.province").not().isEmpty(),
        check("address.postalCode").not().isEmpty(),
        check("phoneNumber").not().isEmpty(),
        check("dateOfBirth").not().isEmpty()
    ],
    userSettingController.userChangeDetails
);

router.patch(
    "/deactivate",
    [
        check("email").not().isEmpty()
    ],
    userSettingController.deactivateUser
);

module.exports = router;