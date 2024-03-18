const inputValidator = require("../../utils/inputValidator");

/**
 * Validator class for validating input values.
 */
class Validator {
  /**
   * Constructs a new Validator instance.
   * @param {string} field - The field name to be validated.
   */
  constructor(field) {
    this.field = field;
    // Initialize the validator with the provided field
    this._validator = inputValidator(field);
  }

  /**
   * Validates if the input value contains only alphanumeric characters.
   * @param {string} value - The value to be validated.
   * @returns {boolean} - True if the value contains only alphanumeric characters, otherwise false.
   */
  isAlphaNumeric(value) {
    if (!this._validator || typeof this._validator.hasAlphanumeric !== 'function') {
      throw new Error('Input validator or hasAlphanumeric method not available.');
    }
    return this._validator.hasAlphanumeric(value);
  }

  /**
   * Validates if the input value contains only numeric characters.
   * @param {string} value - The value to be validated.
   * @returns {boolean} - True if the value contains only numeric characters, otherwise false.
   */
  isNumeric(value) {
    if (!this._validator || typeof this._validator.hasNumeric !== 'function') {
      throw new Error('Input validator or hasNumeric method not available.');
    }
    return this._validator.hasNumeric(value);
  }

  /**
   * Placeholder method for validation. To be implemented by subclasses.
   * @abstract
   * @throws {Error} - Method not implemented error.
   */
  validate() {
    throw new Error("Method not implemented.");
  }
  /**
   * Checks if the input value is entirely uppercase.
   * @param {string} value - The value to be checked.
   * @returns {boolean} - True if the value is entirely uppercase, otherwise false.
   */
  isUppercase(value) {
    return /^[A-Z]+$/.test(value);
  }

  /**
   * Checks if the input value is entirely lowercase.
   * @param {string} value - The value to be checked.
   * @returns {boolean} - True if the value is entirely lowercase, otherwise false.
   */
  isLowerCase(value) {
    return /^[a-z]+$/.test(value);
  }
}

module.exports = Validator;
