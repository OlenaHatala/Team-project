export const NAME_REGEX = /^[A-z][A-z-_]{1,15}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
export const MOBILE_NUMBER_REGEX =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateUserData = (userData) => {
  const v1 = NAME_REGEX.test(userData.name);
  const v2 = NAME_REGEX.test(userData.surname);
  const v3 = MOBILE_NUMBER_REGEX.test(userData.mobileNum);
  const v4 = EMAIL_REGEX.test(userData.email);

  if (!v1) {
    return "First name should have 2 to 16 letters.";
  }

  if (!v2) {
    return "Last name should have 2 to 16 letters.";
  }

  if (!v3) {
    return "Phone number is not valid.";
  }

  if (!v4) {
    return "Email is not valid.";
  }
  return "ok";
};

export const validateRegisterName = (name) => {
  if (!NAME_REGEX.test(name)) {
    return "Should have 2 to 16 letters.";
  }
  return "ok";
}

export const validateRegisterEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return "Enter a valid email.";
  }
  return "ok";
}

export const validateRegisterMobileNum = (number) => {
  if (!MOBILE_NUMBER_REGEX.test(number)) {
    return "Enter a valid mobile number.";
  }
  return "ok";
}

export const validateRegisterPassword = (password) => {
  if (!PWD_REGEX.test(password)) {
    return "8 to 24 characters.+Must include uppercase and lowercase letters and a number.";
  }
  return "ok";
}

export const validateRegisterPasswordConfirm = (password, confirm) => {
  if (password !== confirm) {
    return "Must match the first password input field.";
  }
  return "ok";
}
