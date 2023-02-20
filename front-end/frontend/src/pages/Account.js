import UserForm from "../components/UserForm";
import Card from "../components/UI/Card";

import useAuth from "../hooks/useAuth";

function EditAccountPage() {

  const { name: firstname, surname: lastname, email, mobileNum: number } = useAuth();

  // const userData = {
  //   firstname: auth.name,
  //   lastname: auth.surname,
  //   email: auth.email,
  //   number: auth.mobileNum,
  // };

  return (
    <div className="account-details">
      <Card>
        <UserForm user={{firstname, lastname, email, number}}/>
      </Card>
    </div>
  );
}

export default EditAccountPage;
