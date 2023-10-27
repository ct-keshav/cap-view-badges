import validator from "validator";

export const validate = (value) => {

    if (validator.isURL(value)) {
        return true;
    }
    return false;
}
