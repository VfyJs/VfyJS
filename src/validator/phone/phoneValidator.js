const {GlobalVal}= require('./utils/GlobalValidation')
const AsiaPhoneNumber = require('./continents/Asia')
const AfricaPhoneNumber = require('./continents/Africa')
const OceaniaPhoneNumber = require('./continents/Oceania')
const EuropePhoneNumber = require('./continents/Europe')
const NorthAmericaPhoneNumber = require('./continents/America/north')
async function validatePhoneNumber(code,phone){
  const informationPhone = await GlobalVal(code,phone)
  switch(informationPhone.continent){
    case "Asia":
      return AsiaPhoneNumber(informationPhone)
    case "Africa":
      return AfricaPhoneNumber(informationPhone)
    case "Oceania":
      return OceaniaPhoneNumber(informationPhone)
    case "Europe":
      return EuropePhoneNumber(informationPhone)
    case "North America":
      return NorthAmericaPhoneNumber(informationPhone)
  }
}
validatePhoneNumber('52', '1800123456').then(result => {
  console.log(result);
});
module.exports = validatePhoneNumber;
