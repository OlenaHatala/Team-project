import Card from "../../common/UI/Card";
import AuthHeader from "../../common/components/AuthHeader";
import { LoginForm } from "..";
import classes from '../../common/styles/authPage.module.css';

function Login() {
  return (
    <>
      <AuthHeader />
      <div className={classes["authform-container"]}>
        <Card>
          <LoginForm />
        </Card>
      </div>
    </>
  );
}

export default Login;
