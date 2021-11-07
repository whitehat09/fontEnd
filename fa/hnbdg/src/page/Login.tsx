import { Formik, Field, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser, logout } from "../features/Login/loginSlice";
import { RootState } from "../app/store";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLogin, errorLogin } = useAppSelector((state: RootState) => {
    return state.login;
  });

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);
  const validate = Yup.object().shape({
    email: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required !"),
    password: Yup.string()
      .min(6, "Must have 6 or more characters")
      .required("Required !"),
  });
  let firstvalue = {
    email: "",
    password: "",
  };

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <div>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Login</h1>
              <p className="text-xs-center">
                <Link
                  to="/Register"
                  onClick={() => dispatch({ type: logout.type })}
                >
                  Need an account?
                </Link>
              </p>
              <span className="error">
                {errorLogin ? "wrong email and password" : null}
              </span>
              <Formik
                enableReinitialize
                initialValues={firstvalue}
                validationSchema={validate}
                onSubmit={(values) => {
                  dispatch({ type: getUser.type, payload: values });
                }}
              >
                {(
                  form: FormikProps<{
                    email: string;
                    password: string;
                  }>
                ) => (
                  <Form>
                    <fieldset className="form-group">
                      <Field
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                        name="email"
                        id="exampleFieldEmail"
                        aria-describedby="emailHelp"
                      />
                      {form.touched.email && form.errors.email && (
                        <div className="error">{form.errors.email}</div>
                      )}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        className="form-control form-control-lg"
                        type={showPassword ? "text" : "Password"}
                        placeholder="Password"
                        name="password"
                        id="exampleFieldPassword"
                        aria-describedby="passwordHelp"
                      />
                      <i
                        className="fas fa-eye icon-eye"
                        onClick={togglePasswordVisiblity}
                      ></i>

                      {form.touched.password && form.errors.password && (
                        <div className="error">{form.errors.password}</div>
                      )}
                    </fieldset>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Sign in
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
