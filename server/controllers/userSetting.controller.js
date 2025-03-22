const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/user.model");

const validateRequest = require("../utils/validateRequest.util");

exports.userChangeDetails = async (req, res, next) => {

    try {
    
        validateRequest(req)

        let findUser = await Users.findOne({ email: req.body.email }).select({ email: 1, status: 1 });

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.status === false || findUser.status === null){
            let error = new Error("Account is disabled.");
            error.statusCode = 501;
            throw error;
        }

        let updateDetails = await Users.findOneAndUpdate(
            { 
                email: req.body.email
            },
            {
                $set: {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "address": {
                        "primaryAddressLine": req.body.address.primaryAddressLine,
                        "secondaryAddressLine": req.body.address.secondaryAddressLine,
                        "city": req.body.address.city,
                        "province": req.body.address.province,
                        "postalCode": req.body.address.postalCode,
                    },
                    "phoneNumber": req.body.phoneNumber,
                    "dateOfBirth": req.body.dateOfBirth
                }
            }
        ).select({ _id: 1 });

        res.status(200).send({
            message: "User details has been updated",
            response: updateDetails
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
    
};


exports.deactivateUser = async (req, res, next) => {

    try {
    
        validateRequest(req)

        let findUser = await Users.findOne({ email: req.body.email }).select({ email: 1, status: 1 });

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.status === false){
            let error = new Error("Account is disabled.");
            error.statusCode = 501;
            throw error;
        }

        let updateDetails = await Users.findOneAndUpdate(
            { 
                email: req.body.email
            },
            {
                $set: {
                    status: false
                }
            }
        ).select({ _id: 1 });

        res.status(200).send({
            message: "User has been deactivated",
            response: updateDetails
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
    
};