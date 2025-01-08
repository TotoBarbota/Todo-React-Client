import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAuth } from "../security/AuthContex";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function LoginPage() {
  const [username, setUsername] = useState("Toto");
  const [password, setPassword] = useState("");

  const [authenticationFailed, setAuthenticationFailed] = useState(false);

  const navigate = useNavigate();
  const authContext = useAuth();

  async function checkSubmit(values: any) {
    if (await authContext.login(values.username, values.password)) {
      setAuthenticationFailed(false);
      navigate(`/welcome`);
    } else {
      setAuthenticationFailed(true);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={checkSubmit}
        validate={() => {
          const errors: any = {};
          if (authenticationFailed) {
            errors.username = "Invalid credentials";
          }
          return errors;
        }}
      >
        {(props) => (
          <Form>
            <ErrorMessage
              name="username"
              component="div"
              className="alert alert-danger"
            />
            <fieldset>
              <Field type="text" name="username" placeholder="Username" />
            </fieldset>
            <fieldset>
              <Field type="password" name="password" placeholder="Password" />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                onClick={() => {
                  checkSubmit(props.values);
                }}
              >
                Login
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
}
