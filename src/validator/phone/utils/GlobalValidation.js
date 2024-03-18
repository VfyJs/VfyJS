"use strict";
const {getTelResource,readPhoneCodeData} = require("../config/phoneDataHandler")
const { trimmedValue } = require('../../../common/validationConstants')
const { TypesCheck, isEmpty, validateLength, ifFalsyValue, ifTruthyValue }= require('../../../errors/HandleError')
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
    if (typeof (value) === 'number') {
        value = `${value}`;
    }
    const hasSpecialChar = inputValidator(value).hasSpecialCharacter()
    ifTruthyValue(hasSpecialChar,'Special characters are not allowed.')
    //  trim validated value
    value = trimmedValue(value)
    // Check for empty value
    isEmpty(value, `${ContentError} should not be empty. Please provide a valid ${ContentError}.`);
    // Check for valid types
    TypesCheck(value, ['string', 'number'], `Invalid ${ContentError}. ${ContentError} should be a string or a number.`);
    // Convert value to a string
    const stringValue = String(value);

    // Check if it starts with '0'
    const startsWithZero = stringValue.startsWith('0');
    
    let numberCode = +value;
    
    const validator = inputValidator(numberCode);
    // Check for numeric characters
    ifFalsyValue(validator.hasNumeric(), `Invalid ${ContentError} format. The ${ContentError} should contain numeric characters.`);
    // Convert to string if the value is a number
    if (typeof (numberCode) === 'number') {
        numberCode = `${numberCode}`;

    }
    if (startsWithZero) {
        numberCode = "0"+numberCode
    }
    if (typeof (value) === 'number') {
        value = `${value}`;
    }
    if (numberCode.length !== value.length) {
        throw new Error(`${ContentError} length mismatch after conversion to a number.`);
    }  
    // Validate length
    validateLength(numberCode, min, max, `Invalid ${ContentError} length. The ${ContentError} should be between ${min} and ${max} characters.`);
    //  return the validated value
    return numberCode;
}
/**
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
/**
 * Represents the result of validating a phone code.
 *
 * @param {string|number} code - The phone code to be validated.
 * @returns {Promise<PhoneCodeValidationResult|boolean>} - An object with validated information or false if invalid.
 */
async function hasCode(code) {
    // Validate the code using ChecKValue function
    const validatedValue = ChecKValue(code, MIN_LENGTH_CODE, MAX_LENGTH_CODE, 'Code');
    
    const isFind = await findEqualCodes(validatedValue)
    // console.log('isFind =>',isFind);
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
    if (isFind.length > 0) {
        return isFind;  // Return the array when there are matching codes
    } else {
        return index !== -1 ? {
            code: phoneCodes[index],
            country: countries[index],
            iso: isoCodes[index],
            hasCode: true,
            code: validatedValue,
        } : false;
    }
}
/**
 * Finds phone codes that match specified criteria and retrieves associated information.
 *
 * @async
 * @function
 * @param {string|number} code - The code to search for matches.
 * @returns {Promise<Array<Object>>} - An array of objects containing ISO codes, phone codes, and countries.
 * @throws {Error} - Throws an error if there is an issue fetching phone code data.
 *
 * @example
 * const equalCodes = ["1"];
 * const matchingCodes = await findEqualCodes(equalCodes);
 * console.log(matchingCodes);
 */
async function findEqualCodes(code){
    let equalCodes=["1","7"]
    // Fetch phone code data
    const phoneCodeData = await readPhoneCodeData();
    // Check for error fetching data
    ifFalsyValue(phoneCodeData, 'Error fetching phone code data. Please try again later.');

    // Retrieve phone codes, iso codes, and countries
    const phoneCodes = phoneCodeData.phoneCodes;
    const isoCodes = phoneCodeData.isoCodes;
    const countries = phoneCodeData.countries;
     // Use reduce to accumulate matching codes
     const matchingData = phoneCodes.reduce((accumulator, value, index) => {
        if (equalCodes.includes(value) && +value === +code) {
            const isoCode = isoCodes[index];
            const country = countries[index];
            accumulator.push({ isoCode, code: value, country});
        }
        return accumulator;
    }, []);
    return matchingData
    
}
/**
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
/**
 * Represents the result of validating a phone number.
 *
 * @param {string|number} phone - The phone number to be validated.
 * @returns {PhoneNumberValidationResult|boolean} - An object with validated information or false if invalid.
 */
function hasPhone(phone) {
    try {
        // Validate the phone number using ChecKValue function
        const validatedPhoneNumber = ChecKValue(phone, MIN_LENGTH_PHONE_NUMBER, MAX_LENGTH_PHONE_NUMBER, "Phone Number");

        // Return information if valid
        return {
            isValid: true,
            phone: validatedPhoneNumber
        };
    } catch (error) {
        // Return error if validation fails
        return {
            isValid: false,
            error: error.message
        };
    }
}
/**
 * @typedef {Object} ContinentInfoResult
 * @property {string} continent - The continent associated with the phone code.
 * @property {Array} patterns - An array of formatting patterns for the phone code.
 *   Each pattern is an object with 'type' and 'pattern' properties.
 * @example
 * const continentInfo = await getContinentInfo('98');
 * if (continentInfo) {
 *    console.log(continentInfo.continent); // Continent information
 *    console.log(continentInfo.patterns); // Formatting patterns
 * } else {
 *    console.log('Invalid phone code');
 * }
 */

/**
 * Represents the result of retrieving continent and formatting patterns information for a phone code.
 *
 * @async
 * @param {string|number} code - The phone code for which continent information is retrieved.
 * @returns {Promise<ContinentInfoResult|boolean>} - An object with continent and patterns information or false if invalid.
 */
async function getContinentInfo(code) {
    try {
        const phoneData = await getTelResource();
        const index = phoneData.phoneCodes.indexOf(code);
        // Return information if valid, otherwise false
        return index !== -1 ? {
            continent: phoneData.continent[index],
            patterns: phoneData.format[index],
        } : false;
    } catch (error) {
        // Log unexpected errors and throw a generic error message
        throw new Error('Internal server error. Please try again later.');
    }
}
/**
 * @typedef {Object} ValidationResult
 * @property {string} continent - Validated continent.
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} iso - Validated ISO code.
 * @property {string} phone - Validated phone number.
 * @property {Array} patterns - An array of formatting patterns for the phone code.
 *   Each pattern is an object with 'type' and 'pattern' properties.
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 */
/**
 * Validates both country code and phone number and returns information if both are valid.
 *
 * @param {string|number} code - The country code to be validated.
 * @param {string|number} phone - The phone number to be validated.
 * @returns {Promise<ValidationResult>}  - An object with validated information.
 * @throws Will throw an error if validation fails.
 */

async function GlobalVal(code, phone) {
        // Validate country code and phone number
        const validatedCode = await hasCode(code);
        const validatedPhone = await hasPhone(phone);
        // Check for validation failures
        ifFalsyValue(validatedCode, 'Failed to validate country code.');
        ifFalsyValue(validatedPhone, 'Failed to validate phone number.');
        if (Array.isArray(validatedCode)) {
            const uniqueValues = validatedCode.reduce((acc, obj) => {
                acc.code = obj.code;
                if (!acc.isoCode) {
                    acc.isoCode = [];
                }
                if (!acc.country) {
                    acc.country = [];
                }
                if (!acc.isoCode.includes(obj.isoCode)) {
                    acc.isoCode.push(obj.isoCode);
                }
                if (!acc.country.includes(obj.country)) {
                    acc.country.push(obj.country);
                }
                return acc;
            }, {});
            const ContinentInfo =await getContinentInfo(uniqueValues.code)
            return{
                continent : ContinentInfo.continent,
                code : uniqueValues.code,
                country : uniqueValues.country,
                iso : uniqueValues.isoCode,
                phone : validatedPhone.phone,
                patterns: ContinentInfo.patterns,
                hasCode: true,
                duplicateCodes : true,
                hasPhone: validatedPhone.hasPhone,
            }
            // return uniqueValues
        }else{
            const ContinentInfo =await getContinentInfo(validatedCode.code)
            // Return validated information
            return {
                continent : ContinentInfo.continent,
                code: validatedCode.code,
                country: validatedCode.country,
                iso: validatedCode.iso,
                phone: validatedPhone.phone,
                patterns: ContinentInfo.patterns,
                hasCode: validatedCode.hasCode,
                hasPhone: validatedPhone.hasPhone,
                duplicateCodes : false,
            };
        }
}
module.exports = {
    hasCode,
    hasPhone,
    getContinentInfo,
    GlobalVal,
    ChecKValue,
    findEqualCodes
};