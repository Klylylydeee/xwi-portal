const { Schema, model } = require("mongoose");

const moment = require("moment");

const userRole = require("../services/user.services");

const validator = require("validator");

const userAccountSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2
        },
        lastName: {
            type: String,
            required: true,
            min: 2
        },
        address: {
            type: {
                primaryAddressLine:{
                    type: String,
                    required: true
                },
                secondaryAddressLine:{
                    type: String,
                    required: true
                },
                city:{
                    type: String,
                    required: true
                },
                province:{
                    type: String,
                    required: true
                },
                postalCode:{
                    type: Number,
                    required: true
                }
            }
        }, 
        financial: {
            type: {
                bank:{
                    type: String,
                    enum: {
                        values: [
                            "Unionbank",
                            "RCBC"
                        ],
                        message: "Bank does not exists."
                    },
                    required: true
                },
                bankAccount:{
                    type: Number,
                    required: true
                },
                salary:{
                    type: Number,
                    required: true
                },
                semiMonthly: {
                    type: Number
                }
            }
        }, 
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: 'Email is not a valid email.',
                isAsync: false
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 5
        },
        phoneNumber: {
            type: String,
            match: /^(639)\d{9}$/,
            required: true
        },
        department: {
            type: String,
            enum: {
                values: userRole.xtremeWorksDepartments,
                message: "Department does not exists."
            },
            required: true
        },
        designation: {
            type: String,
            enum: {
                values: [
                    ...userRole.administrationDesignation,
                    ...userRole.dataCenterDesignation,
                    ...userRole.executiveDesignation,
                    ...userRole.financeDesignation,
                    ...userRole.humanResourceDesignation,
                    ...userRole.networkDesignation,
                    ...userRole.posDesignation,
                    ...userRole.webDesignation
                ],
                message: "Designation does not exists."
            },
            required: true
        },
        immediateSupervisor: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            required: true,
            min: "2000-01-01"
        },
        endDate: {
            type: Date,
            min: "2000-01-01"
        },
        dateOfBirth: {
            type: Date,
            required: true,
            min: "1950-01-01"
        }
    },
    {
        timestamps: { 
            currentTime: () => {
                return moment().format();
            }
        }
    }
);

userAccountSchema.pre(
    "save", 
    async function(next) {
        this.financial.semiMonthly = this.financial.salary/2;
        next();
    }
); 

const Users = model("users", userAccountSchema);

module.exports = Users;