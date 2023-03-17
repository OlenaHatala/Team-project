export const fromRegisterToServer = (userData) => {
    return {
        email: userData.email,
        mobile_number: userData.mnumber,
        name: userData.firstname,
        surname: userData.lastname,
        password: userData.pwd
    }
}