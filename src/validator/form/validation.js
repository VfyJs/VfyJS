const  { NotType, isEmpty, validationsLength, validateLengthRange } =require( "../../errors/Error.js")

/**
 * Common validation for fields like password, email, and username.
 * @param {*} value - The value to validate.
 * @param {string} format - The format being validated (e.g., "password", "email", "username").
 * @param {number} [min=8] - The minimum length allowed for the value.
 * @param {number} [max=8] - The maximum length allowed for the value.
 * @throws {ValidationError} Throws a validation error if the value does not meet the criteria.
 */
function validateCommon(input, format, min = 8, max = 64) {
  try {
    const value = input.value ? input.value : input;
    // Common validation: Value should not be empty
    isEmpty(value, `${format} is not empty`);

    // Common validation: Value should be a string
    NotType(value, "string", `Please enter a valid ${format}`);

    // Trim the value to remove leading and trailing spaces
    value.trim();

    // Common validation: Validate length of the value
    validateLengthRange(value,min,max,`Value must be between ${min} and ${max} long.e`)
    return value;
  } catch (error) {
    // Append the field name to the error message
    error.message = `${format}: ${error.message}`;
    throw error;
  }
}
module.exports= validateCommon