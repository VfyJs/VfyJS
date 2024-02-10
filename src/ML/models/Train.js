const { Binary, isEmail } = require("../../../index");

const trainTrueEmail = [
  "john.doe@example.com",
  "jane_smith1234@gmail.com",
  "bob123@yahoo.co.uk",
  "alice-123@example.net",
  "info@company.com",
  "support@website.org",
  "user@email-domain.io",
  "sales@mycompany.biz",
  "customer.service@example.us",
  "webmaster@example.edu",
];
const trainFalseEmail = [
  "example.com",
  "john.doe@example",
  "@example.com",
  " john.doe@example_com",
  "john.doe@example#com",
  "john.doe@.example.com",
  " john.doe@example.com@",
  " john.doe@example..com",
  ".john.doe@example.com",
];
const trainEmails = [
  { truthy: trainTrueEmail, isValid: 1 },
  { falsy: trainFalseEmail, isValid: 0 },
];
class Train {
  constructor(trainingData) {
    this.features = [];
    this.labels = [];
    this.model = {
      weights: [0.1, 0.5, -0.2],
      bias: 0.0,
    };
    for (const iterator of trainingData) {
      const { truthy, falsy, isValid } = iterator;
      const features = { truthy, falsy };
      this.features.push(features);
      this.labels.push(isValid);
    }

    const learningRate = 0.01;
    const numIterations = 100;
    for (let iter = 0; iter < numIterations; iter++) {
      for (let i = 0; i < this.features.length; i++) {
        const prediction = this.predict(this.model, this.features[i]);
        const error = this.labels[i] - prediction;
        for (let j = 0; j < this.model.weights.length; j++) {
          this.model.weights[j] += learningRate * error * this.features[i][j];
        }
        this.model.bias += learningRate * error;
      }
    }

    return this.model;
  }
  predict() {
    let prediction = this.model.bias;
    for (let i = 0; i < this.model.weights.length; i++) {
        prediction += this.model.weights[i] * this.features[i];
    }
    return 
  }
  calculation(data) {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumXSquare = 0;
    for (let i = 0; i < data.length; i++) {
      const { x, y } = data[i];
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXSquare += x * x;
    }
    this.length = data.length;
    this.model.slope =
      (this.length * sumXY - sumX * sumY) /
      (this.length * sumXSquare - sumX * sumX);
    this.model.intercept = (sumX - this.model.slope * sumX) / this.length;

    return this.model;
  }
}

new Train(trainEmails);
class TrainValidate {
  constructor(rules, trainingData) {
    this.result = {};
    this.rule = rules;
    this.trainModel = new Train(trainingData);

    // for (const key in rules) {
    //   if (rules.hasOwnProperty(key)) {
    //     const rule = rules[key];
    //     this.validation(rule);
    //     const predicted = this.predict(rule);
    //     this.result[key] = predicted >= 0 && predicted <= 100;
    //   }
    // }
    return this.result;
  }
  //   predict(rule) {
  //     const { slope, intercept } = this.trainModel.model;
  //     return slope * rule + intercept;
  //   }
  //   validation(key) {
  //     // this.
  //   }
}
module.exports = TrainValidate;
