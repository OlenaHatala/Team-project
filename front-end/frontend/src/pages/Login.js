import Card from "../modules/common/UI/Card";
import AuthHeader from "../modules/common/components/AuthHeader";
import { LoginForm } from "../modules/auth";

function Login() {
  return (
    <>
      {/*<AuthHeader />*/}
      <section className="auth-page">
        <Card>
          <LoginForm />
        </Card>
      </section>
    </>
  );
}

export default Login;
