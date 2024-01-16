"use strict";
/**
 * Validates a password based on specified criteria.
 *
 * @typedef {Object} PasswordOptions
 * @property {Object} options - Options for customizing validation criteria.
 * @property {Object} options.minLength - Minimum length requirements for the password.
 * @property {number} options.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} options.maxLength - Maximum length requirements for the password.
 * @property {number} options.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} options.uppercase - Uppercase letter requirements for the password.
 * @property {boolean} options.uppercase.required - Whether uppercase letters are required.
 * @property {string} options.uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} options.lowercase - Lowercase letter requirements for the password.
 * @property {boolean} options.lowercase.required - Whether lowercase letters are required.
 * @property {string} options.lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} options.number - Numeric digit requirements for the password.
 * @property {boolean} options.number.required - Whether numeric digits are required.
 * @property {string} options.number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} options.specialCharacter - Special character requirements for the password.
 * @property {boolean} options.specialCharacter.required - Whether special characters are required.
 * @property {string} options.specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} options.alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} options.alphabetic.required - Whether alphabetic characters are required.
 * @property {string} options.alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} options.whitespace - Whitespace requirements for the password.
 * @property {boolean} options.whitespace.required - Whether whitespace is not allowed.
 * @property {string} options.whitespace.errorMessage - Error message for whitespace validation failure.
 */

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
 * @property {Object} lowercase - Lowercase letter requirements for the password.
 * @property {boolean} lowercase.required - Whether lowercase letters are required.
 * @property {string} lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the password.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} specialCharacter - Special character requirements for the password.
 * @property {boolean} specialCharacter.required - Whether special characters are required.
 * @property {string} specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} alphabetic.required - Whether alphabetic characters are required.
 * @property {string} alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} whitespace - Whitespace requirements for the password.
 * @property {boolean} whitespace.required - Whether whitespace is not allowed.
 * @property {string} whitespace.errorMessage - Error message for whitespace validation failure.
 */


const { MAX_LENGTH, MIN_LENGTH, trimmedValue } = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const {handleValidationError} = require('../../errors/HandleError')
const createValidationOptions = require('../../utils/handleOption')
/**
 * Validates a password based on the provided options.
 *
 * @param {string} value - The password string to be validated.
 * @param {options} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { password } = require("vfyjs");
 * const isValid = password("StrongPwd@123", { minLength: 8, uppercase: true, number: true });
 * console.log(isValid); // true
 */
function validatePassword(value, options = {}) {
  // Input validation functions
  if(typeof value !=='string'){
    throw new Error("The first input should only be a string!!")
  }
  const validator = inputValidator(value);
  // Destructuring options with default values and error messages
  const optionName = ['minlength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'alphabetic', 'whitespace'];
const optionValidations = [validator.hasMinLength(MIN_LENGTH), validator.hasMaxLength(MAX_LENGTH), true, true, true, true, true, false];
const msgError = [
  'Password must be at least 8 characters long.',
  'Password cannot exceed 20 characters.',
  'Password must contain at least one uppercase letter.',
  'Password must contain at least one lowercase letter.',
  'Password must have at least one number.',
  'Password must contain at least one special character such as (@#$%^&*).',
  'Input must contain at least one alphabetic character.',
  'Password cannot contain whitespace.'
];
  let objectOPtion =  createValidationOptions(optionName,optionValidations,msgError)
  const lowercase = objectOPtion.lowercase
  const uppercase = objectOPtion.uppercase
  const number = objectOPtion.number
  const specialCharacter = objectOPtion.specialCharacter
  const alphabetic = objectOPtion.alphabetic
  const whitespace = objectOPtion.whitespace
  const minLength = objectOPtion.minlength
  const maxLength = objectOPtion.maxLength
  console.log('lowercase =>', lowercase);
  console.log('uppercase =>', uppercase);
  console.log('number =>', number);
  console.log('specialCharacter =>', specialCharacter);
  console.log('alphabetic =>', alphabetic);
  console.log('whitespace =>', whitespace);
  console.log('minLength =>', minLength);
  console.log('maxLength =>', maxLength);
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
 * @property {Object} lowercase - Lowercase letter requirements for the password.
 * @property {boolean} lowercase.required - Whether lowercase letters are required.
 * @property {string} lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the password.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} specialCharacter - Special character requirements for the password.
 * @property {boolean} specialCharacter.required - Whether special characters are required.
 * @property {string} specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} alphabetic.required - Whether alphabetic characters are required.
 * @property {string} alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} whitespace - Whitespace requirements for the password.
 * @property {boolean} whitespace.required - Whether whitespace is not allowed.
 * @property {string} whitespace.errorMessage - Error message for whitespace validation failure.
 */

  // Additional validation checks
  handleValidationError(uppercase.required ? validator.hasUppercase() : true, uppercase.errorMessage);
  handleValidationError(lowercase.required ? validator.hasLowerCase() : true , lowercase.errorMessage)
  handleValidationError(number.required ? validator.hasNumber() : true , number.errorMessage)
  handleValidationError(specialCharacter.required ? validator.hasSpecialCharacter() : true , specialCharacter.errorMessage)
  handleValidationError(alphabetic.required ? validator.hasAlphabetic() : true , alphabetic.errorMessage)
  // Check and trim whitespace if necessary
  // let whitespaceCheck = whitespace.required ? validator.hasWhitespace() : !validator.hasWhitespace();
  //   if (!whitespaceCheck) {
  //   value = trimmedValue(value);
  //   whitespaceCheck = true;
  // } 
  //   console.log('value =>',value);
  //   // Convert string values to numbers for minLength and maxLength

  // if (typeof minLength.value === 'string' || typeof minLength.value === 'string') {
  //   minLength.value = +minLength.value;
  //   maxLength.value =+maxLength.value
  // }
  // // Check if minLength and maxLength are valid numbers
  // if (
  //   typeof minLength.value !== 'undefined' &&
  //   typeof maxLength.value !== 'undefined' &&
  //   (typeof minLength.value !== 'boolean') &&
  //   (typeof maxLength.value !== 'boolean') &&
  //   (typeof minLength.value !== 'number' || typeof maxLength.value !== 'number')
  // ) {
  //   throw new Error("min or max Length just for true or false");
  // }
  
  // // Check if the password length is within the specified range
  // if (
  //   typeof minLength.value === 'number' &&
  //   typeof maxLength.value === 'number' &&
  //   (value.length < minLength.value || value.length > maxLength.value)
  // ) {
  //   throw new Error(`Password length must be between ${minLength.value} and ${maxLength.value} characters.`);
  // }
  // Final validation check
  // const isValid =
  // minLength &&
  // maxLength &&
  // (uppercase.required ? validator.hasUppercase() : true) &&
  // (lowercase.required ? validator.hasLowerCase() : true) &&
  // (number.required ? validator.hasNumber() : true) &&
  // (specialCharacter.required ? validator.hasSpecialCharacter() : true) &&
  // (alphabetic.required ? validator.hasAlphabetic() : true) &&
  // whitespaceCheck;

  // return isValid;
}

const result = validatePassword('sdaa@@#asd354A3%#!w')
console.log('result =>', result);
module.exports = validatePassword;
