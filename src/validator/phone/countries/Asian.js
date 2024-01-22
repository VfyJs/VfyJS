const {generateValidationResult , validationFormats,extractInfoValue} = require('../utils/FormatValidation')
exports.iran = (values) => {
    const { code, phone, patterns,hasCode,hasPhone } = extractInfoValue(values)
    const format = [ `0${phone}`,`+${code}0${phone}`, `0${phone}`]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false);
  };

exports.China = (values)=>{
    const { hasCode,patterns,hasPhone,phone} = extractInfoValue(values)
    const format = [phone, phone, `0${phone}`, phone];
    const hasValidFormat =validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.HongKongAndMacau = (values)=>{
    const {hasCode,hasPhone,patterns,phone }= extractInfoValue(values)
    const format = [phone]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.India = (values)=>{
    const { code,hasCode,hasPhone,patterns,phone } = extractInfoValue(values)
    const LandlinePhone = phone.split(phone.length - 4)
    const sectionOne = LandlinePhone[0]
    const sectionTwo = LandlinePhone[1]
    const landline = `${sectionOne}-${sectionTwo}`;
    let tollFree = phone
    const hasStartWithOne =  tollFree.startsWith("1")
    const numbers = tollFree.split('800')[1]
    const hasSixNumber = /^\d{6}$/.test(numbers)
    let format;
    if (hasStartWithOne && hasSixNumber) {
        format = [`+${code}${phone}`,phone,landline,tollFree]
    }else{
        format = [`+${code}${phone}`,phone,landline,false]
    }
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.Japan = (values)=>{
    const {code,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    const FourDigits = phone.substring(0, 4);
    const TwoDigits = phone.substring(4,6);
    const threeDigits = phone.substring(6);
    const formattedPhoneNumber = `${FourDigits}-${TwoDigits}-${threeDigits}`;

    const TwoDigitsLandLine = phone.substring(0,2)
    const FourDigitsLandLine = phone.substring(2,6)
    const FourDigitsLandLine2 = phone.substring(6)
    const hasStartZero = phone.startsWith("0")
    let format;
    if (hasStartZero) {
        const formattedLandLineNumber = `${TwoDigitsLandLine}-${FourDigitsLandLine}-${FourDigitsLandLine2}`
        format = [formattedPhoneNumber,phone,formattedLandLineNumber]
    }else{
        format = [formattedPhoneNumber,phone,false]
    }
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}