import Card from "../components/UI/Card";
import AuthHeader from "../components/auth/AuthHeader";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <>
      <AuthHeader />
      <section className="auth-page">
        <Card>
          <LoginForm />
        </Card>
      </section>
    </>
  );
}

export default Login;
