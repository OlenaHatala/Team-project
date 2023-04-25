import Card from "../../common/UI/Card";
import AuthHeader from "../../common/components/AuthHeader";
import { RegisterForm } from "..";
import classes from '../../common/styles/authPage.module.css';

function Register() {
  return (
    <>
      <AuthHeader />
      <div className={classes["authform-container"]}>
        <Card>
          <RegisterForm />
        </Card>
      </div>
    </>
  );
}

export default Register;
