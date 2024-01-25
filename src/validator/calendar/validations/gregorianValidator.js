const {getSubstring}  = require('../../phone/utils/FormatValidation')
const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, validationsLen, validateMaxLen, validateMinLen }= require('../../../errors/HandleError')
class FutureDateError extends Error {
    constructor(invalidDate, message, currentDate) {
        super(message);
        this.invalidDate = invalidDate; 
        this.currentDate = currentDate; 
    }
}
function validateGregorianDate(inputYear, inputMonth, inputDay) {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [inputYear, inputMonth, inputDay];
    let year,month,day;
    // Iterate over each date component (year, month, day)
    dateComponents.forEach((component, index) => {
        // Check if the component is of type 'number' or 'string'
        TypesCheck(component, ['number', 'string'], 'Year, month, and day must be either numbers or strings.');

        // Check for the presence of special characters in the date component
        const validator = inputValidator(component);
        const hasSpecialChar = validator.hasSpecialCharacter();
        const hasAlphabetic = validator.hasAlphabetic();

        // Display error message if special characters are found
        ifTruthyValue(hasSpecialChar, 'Year, month, or day cannot contain special characters.');

        // Display error message if alphabetic characters are found
        ifTruthyValue(hasAlphabetic, 'The value cannot contain alphabetic characters.');

        // Convert the date component to a string
        dateComponents[index] = component.toString();

        // Update the date component with the trimmed string representation
        dateComponents[index] = trimmedValue(dateComponents[index])
        // Assign values from the array to individual variables
        year = +dateComponents[0]
        month = +dateComponents[1]
        day = +dateComponents[2]
    })
    // Get the current date
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate();
    
    if (nowYear < year) {
        throw new FutureDateError(year, `The year ${year} cannot be in the future. Please enter a previous or current year.`,nowYear);
    }
    if (nowMonth < month) {
        throw new FutureDateError(year, `The month ${month} cannot be in the future. Please enter a previous or current month.`,nowMonth);
    }
    if (nowDay < day) {
        throw new FutureDateError(year, `The day ${day} cannot be in the future. Please enter a previous or current day.`,nowDay);
    }

}
const year = 2025;
const month = 12;
const day = 1;
console.log(validateGregorianDate(year, month, day)); 