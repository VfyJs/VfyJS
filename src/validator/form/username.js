"use strict";

/**
 * Options for customizing password validation criteria.
 *
 * @typedef {Object} options
 * @property {Object} minLength - Minimum length requirements for the password.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the password.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the password.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} number - Lowercase letter requirements for the password.
 * @property {boolean} number.required - Whether lowercase letters are required.
 * @property {string} number.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} NonAlphanumeric - Numeric digit requirements for the password.
 * @property {boolean} NonAlphanumeric.required - Whether numeric digits are required.
 * @property {string} NonAlphanumeric.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} trim - Special character requirements for the password.
 * @property {boolean} trim.required - Whether special characters are required.
 * @property {string} trim.errorMessage - Error message for special character validation failure.
 * @property {Object} repeat - Alphabetic character requirements for the password.
 * @property {boolean} repeat.required - Whether alphabetic characters are required.
 * @property {string} repeat.errorMessage - Error message for alphabetic character validation failure.
 */

const {MAX_LENGTH,MIN_LENGTH,trimmedValue,} = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const createValidationOptions = require('../../utils/handleOption')
const { handleValidationError } = require("../../errors/HandleError");
/**
 * Validates a password based on the provided options.
 *
 * @param {string} value - The password string to be validated.
 * @param {options} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { username } = require("vfyjs");
 * const isValid = username("StringUsername123");
 * console.log(isValid); // true
 */
function validateUsername(username, options = {}) {
    const validator = inputValidator(username);
    const optionName = ['minLength', 'maxLength', 'uppercase','number','NonAlphanumeric','trim','repeat']
    const validation = 
    [
        validator.hasMinLength(MIN_LENGTH),
        validator.hasMaxLength(MAX_LENGTH),
        validator.hasUppercase(),
        validator.hasNumber(),
        validator.hasNonAlphanumeric(),
        validator.hasWhitespace(),
        validator.hasRepeat()
    ]
    const messageError = 
    [
        'Username must be at least 8 characters long.',
        'Username cannot exceed 64 characters.',
        'Username must contain at least one uppercase letter.',
        'Username must have at least one number.',
        'Username must not contain non-alphanumeric characters.',
        'Username cannot contain whitespace.',
        'Username must not have consecutive repeated characters.'
    ]
    let objectOption = createValidationOptions(optionName,validation,messageError)
    objectOption = {...objectOption, ...options}
    const {minLength,
        maxLength,
        uppercase,
        number,
        NonAlphanumeric,
        trim,
        repeat } = objectOption
    handleValidationError(uppercase.required ? validator.hasUppercase() : true  , uppercase.errorMessage)
    handleValidationError(number.required , number.errorMessage)
    if(NonAlphanumeric.required && (!trim.required && !trim)){
        handleValidationError(!NonAlphanumeric.required, NonAlphanumeric.errorMessage)
    }
    if (repeat.required) {
        handleValidationError(!repeat.required ? validator.hasRepeat() : true, repeat.errorMessage)
    }
    let checkWhiteSpace = !trim.required || trim
    
    if(!checkWhiteSpace){
        username = trimmedValue(username)
        checkWhiteSpace = true
    }
    let minValue = typeof minLength.value == 'number' ? minLength.value : minLength;
    let maxValue = typeof maxLength.value == 'number' ? maxLength.value : maxLength;
    const min = minValue ? minValue : MIN_LENGTH
    const max = maxValue ? maxValue : MAX_LENGTH
    if (typeof minValue === 'string' || typeof maxValue === 'string') {
        minValue = +minValue;
        maxValue =+maxValue
    }
    if (typeof min === 'number' &&typeof max === 'number' &&(username.length < min || username.length > max)){
        throw new Error("Invalid configuration for minLength or maxLength. They must be either true, false, or a numeric value or string.");
    }
    if(typeof max === 'number' && username.length > max){
        throw new Error('Username length exceeds the maximum allowed length.');
    }
    
    if (
    typeof minValue !== 'undefined' &&
    typeof maxValue !== 'undefined' &&
    (typeof minValue !== 'boolean') &&
    (typeof maxValue !== 'boolean') &&
    (typeof minValue !== 'number' && typeof max !== 'number')
    ) {
    throw new Error("min or max Length just for true or false");
    }
    
    const isValid = min && max && (uppercase.required ? validator.hasUppercase() : true) && (number.required ? validator.hasNumber() : true)  && (NonAlphanumeric ? validator.hasAlphanumeric() : true) && checkWhiteSpace && repeat.required ? validator.hasRepeat() : true
    return isValid;
}

const result = validateUsername('stringsername123',{
    minLength : 20, trim : false, repeat: false
})


console.log('result =>', result);
module.exports = validateUsername;