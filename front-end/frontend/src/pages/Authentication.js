import { json, redirect, Link } from "react-router-dom";

import AuthForm from "../components/AuthForm";

import Card from "../components/UI/Card";

import { API_URL } from "../config/urls";

function AuthenticationPage() {
  return (
    <>
      <div className="auth-page__logo">
        <Link to='/'><p>Loggions</p>
        <span>Home</span></Link>
      </div>
      <div className="auth-page__form">
        <Card>
          <AuthForm />
        </Card>
      </div>
    </>
  );
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    authData.mobile_number = data.get("number");
    authData.name = data.get("firstname");
    authData.surname = data.get("lastname");
    mode = 'register';
  }

  console.log(authData);
  console.log('fetch start');


  const response = await fetch(`${API_URL}/api/auth/` + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authentificate user." }, { status: 500 });
  }

  console.log('fetch end');

  const resData = await response.json();
  const token = 'test token';
  const userId = resData.user._id;

  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("userEmail", resData.user.email);
  localStorage.setItem("userSurname", resData.user.surname);
  localStorage.setItem("userName", resData.user.name);
  localStorage.setItem("userMobileNumber", resData.user.mobile_number);

  console.log(token);
  console.log(userId);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
