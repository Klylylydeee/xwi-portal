const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/user.model");

const validateRequest = require("../utils/validateRequest.util");

exports.userSignUp = async (req, res, next) => {

    try {
        
        validateRequest(req)

        let userData = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: {
                primaryAddressLine: req.body.address.primaryAddressLine,
                secondaryAddressLine: req.body.address.secondaryAddressLine,
                city: req.body.address.city,
                province: req.body.address.province,
                postalCode: req.body.address.postalCode,
            },
            financial: {
                bank: req.body.financial.bank,
                bankAccount: req.body.financial.bankAccount,
                salary: req.body.financial.salary
            },
            email: req.body.email,
            password: await bcrypt.hash(process.env.PASSWORD_DEFAULT, Number(process.env.PASSWORD_HASHING)),
            phoneNumber: req.body.phoneNumber,
            department: req.body.department,
            designation: req.body.designation,
            immediateSupervisor: req.body.immediateSupervisor,
            startDate: req.body.startDate,
            dateOfBirth: req.body.dateOfBirth
        });

        res.status(200).send({
            message: "Account has been created.",
            response: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
            }
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }

};


exports.userSignIn = async (req, res, next) => {

    try {

        validateRequest(req)

        let findUser = await Users.findOne({ email: req.body.email }).select({
            firstName: 1,
            lastName: 1,
            email: 1,
            password: 1,
            department: 1,
            designation: 1,
            status: 1
        });

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

        const validate = await bcrypt.compare(req.body.password, findUser.password);

        if(!validate){
            let error = new Error("Password does not match.");
            error.statusCode = 501;
            throw error;
        };

        const token = await jwt.sign({
            findUser
        }, process.env.JWT_BACKEND, { 
            expiresIn: "7d",
            algorithm: "HS512"
        });

        res.status(200).send({
            message: "Login sucessful.",
            jwt: token
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
    
};



exports.userForgotPassword = async (req, res, next) => {

    try {

        validateRequest(req);

        let findUser = await Users.findOne({ email: req.body.email });

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

        let defaultPassword = await Users.findOneAndUpdate(
            { 
                email: req.body.email,
                status: true
            },
            {
                $set: {
                    "password": await bcrypt.hash(process.env.PASSWORD_DEFAULT, Number(process.env.PASSWORD_HASHING))
                }
            }
        ).select({ email: 1 });

        res.status(200).send({
            message: "Password has been reset to default password",
            response: defaultPassword
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
    
};