const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, isEmpty }= require('../../../errors/HandleError')
const {FutureDateError } = require('../Error/Errors')
const remainingTimeOfYear = require('../utils/remainingTimeOfYear')
const {getDay,getMonth} = require('../utils/dateTimeHelpers')
function validateGregorianDate(inputYear = new Date().getFullYear(), inputMonth = new Date().getMonth() + 1, inputDay = new Date().getDate(),{traveledFuture}={}) {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [inputYear, inputMonth, inputDay];
    let year,month,day;
    // Iterate over each date component (year, month, day)
    dateComponents.forEach((component, index) => {
        isEmpty(component, 'Year, month, and day must not Empty.')
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
    const endYear = new Date(nowYear , 11, 31)
    // Convert the time difference to days, hours, minutes, and seconds
    const remaining = remainingTimeOfYear()
    if (day > 31) {
        throw new FutureDateError(day, 'Invalid day value. Days cannot be greater than 31.',nowDay);
    }
    if (month > 12) {
        throw new FutureDateError(month, 'Invalid month value. Months cannot be greater than 12.',nowMonth);
    }
    if (nowYear < year) {
        throw new FutureDateError(year, `The year ${year} cannot be in the future. Please enter a previous or current year.`,nowYear);
    }
    if (nowMonth < month) {
        throw new FutureDateError(month, `The month ${month} cannot be in the future. Please enter a previous or current month.`,nowMonth);
    }
    if (nowDay < day) {
        throw new FutureDateError(day, `The day ${day} cannot be in the future. Please enter a previous or current day.`,nowDay);
    }
    let formatMonth,formatDay
    if (nowMonth < 10) {
        formatMonth = `0${nowMonth}`
    }
    if (nowDay <10) {
        formatDay = `0${nowDay}`
    }
    //  Prepare result object
     const result = {
        format : `${nowYear}-${formatMonth ? formatMonth : nowMonth}-${formatDay ? formatDay : nowDay}`,
        currentDateTime: {
            year: nowYear,
            month: { monthOfYear: nowMonth, monthName: getMonth() },
            day: { dayOfMonth: nowDay, dayOfWeek: getDay() }
        },
        timeLeftUntilEndOfYear: {
            months: remaining.month,
            days: remaining.days,
            hours: remaining.hours,
            minutes: remaining.minutes,
            seconds: remaining.seconds,
        },
        traveledFuture : false,
        hasValidInput : ','
    };
    return result
}
const year = 2024;
const month = 1;
const day = 25;
console.log(validateGregorianDate()); 