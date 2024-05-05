import Validator from "validator";
import isEmpty from "is-empty";

export const validateRegisterInput = (data) => {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
        errors.first_name = "FirstName must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "FirstName is required";
    }
    if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
        errors.last_name = "LastName must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "LastName is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be atleast 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
export default validateRegisterInput;
