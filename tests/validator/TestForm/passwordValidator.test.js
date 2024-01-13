const passwordValidator = require("../../../src/validator/validate_form/passwordValidator");

describe("validates a password with at least 8 characters", () => {
  test("should return true for a valid password", () => {
    const validPassword = "MAHDI23!@4";
    const isValid = passwordValidator(validPassword,{
      minLength : 5,
      maxLength : 20,
      lowerCase : false,
  });

    expect(isValid).toBe(true);
  });

  test("should return false for an invalid password", () => {
    const invalidPassword = "Pwd";
    const isValid = passwordValidator(invalidPassword);

    expect(isValid).toBe(false);
  });
});
