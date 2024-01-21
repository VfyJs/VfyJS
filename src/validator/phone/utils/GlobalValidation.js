const {getTelResource,readPhoneCodeData} = require("../config/phoneDataHandler")
const { trimmedValue } = require('../../../common/validationConstants')
const { TypesCheck, isEmpty, validateLength, ifFalsyValue }= require('../../../errors/HandleError')
const inputValidator = require('../../../utils/inputValidator')
const MAX_LENGTH_CODE = 10
const MIN_LENGTH_CODE = 1
const MAX_LENGTH_PHONE_NUMBER = 25
const MIN_LENGTH_PHONE_NUMBER = 6

/**
 * Validates a given value based on specified criteria.
 *
 * @param {string|number} value - The value to be validated.
 * @param {number} min - The minimum length allowed.
 * @param {number} max - The maximum length allowed.
 * @param {string} [ContentError=String] - The type of content being validated (default is 'String').
 * @returns {string} - The trimmed and validated value.
 */
function ChecKValue(value, min, max, ContentError = String) {
    // Convert value to a number for additional validation
    const numberCode = +value;
    const validator = inputValidator(numberCode);

    // Check for empty value
    isEmpty(value, `${ContentError} should not be empty. Please provide a valid ${ContentError}.`);

    // Validate length
    validateLength(value, min, max, `Invalid ${ContentError} length. The ${ContentError} should be between ${min} and ${max} characters.`);

    // Check for valid types
    TypesCheck(value, ['string', 'number'], `Invalid ${ContentError}. ${ContentError} should be a string or a number.`);

    // Check for numeric characters
    ifFalsyValue(validator.hasNumeric(), `Invalid ${ContentError} format. The ${ContentError} should contain numeric characters.`);

    // Convert to string if the value is a number
    if (typeof value === 'number') {
        value = `${value}`;
    }

    // Trim and return the validated value
    return trimmedValue(value);
}
/**
 * Represents the result of validating a phone code.
 * @typedef {Object} PhoneCodeValidationResult
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} iso - Validated ISO code.
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @example
 * const validatedCode = await hasCode('98');
 * if (validatedCode) {
 *    console.log(validatedCode.code); // Validated phone code
 *    console.log(validatedCode.country); // Validated country
 *    console.log(validatedCode.iso); // Validated ISO code
 *    console.log(validatedCode.hasCode); // true
 * } else {
 *    console.log('Invalid phone code');
 * }
 */
async function hasCode(code) {
    // Validate the code using ChecKValue function
    const validatedValue = ChecKValue(code, MIN_LENGTH_CODE, MAX_LENGTH_CODE, 'Code');

    // Fetch phone code data
    const phoneCodeData = await readPhoneCodeData();

    // Check for error fetching data
    ifFalsyValue(phoneCodeData, 'Error fetching phone code data. Please try again later.');

    // Retrieve phone codes, iso codes, and countries
    const phoneCodes = phoneCodeData.phoneCodes;
    const isoCodes = phoneCodeData.isoCodes;
    const countries = phoneCodeData.countries;

    // Find the index of the validated code
    const index = phoneCodes.indexOf(validatedValue);

    // Return information if valid, otherwise false
    return index !== -1 ? {
        code: phoneCodes[index],
        country: countries[index],
        iso: isoCodes[index],
        hasCode: true
    } : false;
}
/**
 * Represents the result of validating a phone number.
 * @typedef {Object} PhoneNumberValidationResult
 * @property {string} phone - Validated phone number.
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 * @example
 * const validatedPhoneNumber = hasPhone('9115291407');
 * if (validatedPhoneNumber) {
 *    console.log(validatedPhoneNumber.phone); // Validated phone number
 *    console.log(validatedPhoneNumber.hasPhone); // true
 * } else {
 *    console.log('Invalid phone number');
 * }
 */

function hasPhone(phone) {
    // Validate the phone number using ChecKValue function
    const validatedPhoneNumber = ChecKValue(phone, MIN_LENGTH_PHONE_NUMBER, MAX_LENGTH_PHONE_NUMBER, "Phone Number");

    // Return information if valid, otherwise false
    return validatedPhoneNumber ? {
        phone: validatedPhoneNumber,
        hasPhone: true
    } : false;
}

function getContinent(code,phone){

}
/**
 * Represents the result of validating both country code and phone number.
 * @typedef {Object} ValidationResult
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} iso - Validated ISO code.
 * @property {string} phone - Validated phone number.
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 */
/**
 * Validates both country code and phone number and returns information if both are valid.
 *
 * @param {string|number} code - The country code to be validated.
 * @param {string|number} phone - The phone number to be validated.
 * @returns {ValidationResult} - An object with validated information.
 * @throws Will throw an error if validation fails.
 */
async function GlobalVal(code, phone) {
    try {
        // Validate country code and phone number
        const validatedCode = await hasCode(code);
        const validatedPhone = await hasPhone(phone);

        // Check for validation failures
        ifFalsyValue(validatedCode, 'Failed to validate country code.');
        ifFalsyValue(validatedPhone, 'Failed to validate phone number.');

        // Return validated information
        return {
            code: validatedCode.code,
            country: validatedCode.country,
            iso: validatedCode.iso,
            phone: validatedPhone.phone,
            hasCode: validatedCode.hasCode,
            hasPhone: validatedPhone.hasPhone,
        };
    } catch (error) {
        // Log unexpected errors and throw a generic error message
        console.error('An unexpected error occurred:', error);
        throw new Error('Internal server error. Please try again later.');
    }
}
GlobalVal('98','9115291407').then(result =>{
    console.log(result);
})
// Export GlobalVal function
module.exports = GlobalVal;