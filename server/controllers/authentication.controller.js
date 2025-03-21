const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/user.model");

exports.userSignUp = async (req, res, next) => {
    try {

        let userData = await Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            financial: req.body.financial,
            email: req.body.email,
            password: await bcrypt.hash(process.env.PASSWORD_DEFAULT, Number(process.env.PASSWORD_HASHING)),
            phone_number: req.body.phone_number,
            department: req.body.department,
            designation: req.body.designation,
            immediate_supervisor: req.body.immediate_supervisor,
            start_date: req.body.start_date
        });

        res.status(200).send({
            message: "Account has been created.",
            respnse: userData
        });
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);
    }
};


exports.userSignIn = async (req, res, next) => {
    try {

        let findUser = await Users.findOne({ email: req.body.email });

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.status === false){
            let error = new Error("Either Account has been disabled or not yet verified.");
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