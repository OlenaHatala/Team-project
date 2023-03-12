const NAME_REGEX = /^[A-z][A-z-_]{1,15}$/;
const MOBILE_NUMBER_REGEX =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateUserData = (userData) => {
  const v1 = NAME_REGEX.test(userData.firstname);
  const v2 = NAME_REGEX.test(userData.lastname);
  const v3 = MOBILE_NUMBER_REGEX.test(userData.number);
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
