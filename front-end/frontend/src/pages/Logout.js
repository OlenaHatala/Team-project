import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userMobileNumber');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSurname');
    localStorage.removeItem('expiration');
    return redirect('/');
}