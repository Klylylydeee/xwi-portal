const { validationResult } = require("express-validator");

module.exports = validateRequest = (request) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        let resErrors = errors.errors
            .map((currError) => {
                return currError.path;
            })
            .join(", ")
            .concat(" is required.");
        if (Object.getOwnPropertyNames(errors.errors).length > 1) {
            let numVal = resErrors.lastIndexOf(",");
            let splitVal = resErrors.split("");
            splitVal[numVal] = " and";
            resErrors = splitVal.join("");
        }
        let error = new Error(`Missing parameters: ${resErrors}`);
        error.statusCode = 400;
        throw error;
    }
};