const { Schema, model } = require("mongoose");

const moment = require("moment");

const userRole = require("../services/user.services");

const validator = require("validator");

const userAccountSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            min: 2
        },
        last_name: {
            type: String,
            required: true,
            min: 2
        },
        address: {
            type: {
                primary_address_line:{
                    type: String,
                    required: true
                },
                secondary_address_line:{
                    type: String,
                    required: true
                },
                city:{
                    type: String,
                    required: true
                },
                state_province_region:{
                    type: String,
                    required: true
                },
                postal_code:{
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
                bank_account:{
                    type: Number,
                    required: true
                },
                salary:{
                    type: Number,
                    required: true
                },
                semi_monthly: {
                    type: Number
                }
            }
        }, 
        email: {
            type: String,
            lowercase: true,
            // unique: true,
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
        phone_number: {
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
        immediate_supervisor: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        start_date: {
            type: Date,
            required: true,
            min: "2000-01-01"
        },
        end_date: {
            type: Date,
            min: "2000-01-01"
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
        this.financial.semi_monthly = this.financial.salary/2;
        next();
    }
); 

const Users = model("users", userAccountSchema);

module.exports = Users;