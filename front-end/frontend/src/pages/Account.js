//import { useRouteLoaderData } from "react-router-dom";
import { useState } from "react";

import { API_URL } from "../config/urls";
import UserForm from "../components/UserForm";
import Card from "../components/UI/Card";

function getUserData() {
  return {
    firstname: localStorage.getItem("userName"),
    lastname: localStorage.getItem("userSurname"),
    email: localStorage.getItem("userEmail"),
    number: localStorage.getItem("userMobileNumber"),
  };
}

function EditAccountPage() {
  //const { user } = useRouteLoaderData("user-detail");
  const userData = getUserData();

  return (
    <div className="account-details">
      <Card>
        <UserForm method="patch" user={userData}/>
      </Card>
    </div>
  );
}

export async function loader({ request }) {
  console.log("hi1");
  const id = localStorage.getItem("userId");
  return fetch(`${API_URL}/events/user/` + id);
}

export async function action({ request }) {
  return { message: "acc successful!" };
}

export default EditAccountPage;
