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
  const userData = getUserData();

  return (
    <div className="account-details">
      <Card>
        <UserForm user={userData}/>
      </Card>
    </div>
  );
}

export default EditAccountPage;
