import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, signupUser } from "../features/Login/loginSlice";
import { RootState } from "../app/store";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLogin, errorSignup } = useAppSelector((state: RootState) => {
    return state.login;
  });

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  const validate = Yup.object().shape({
    username: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required !"),
    email: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required !"),
    password: Yup.string()
      .min(6, "Must have 6 or more characters")
      .required("Required !"),
  });
  let firstvalue = {
    username: "",
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
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link
                  to="/login"
                  onClick={() => dispatch({ type: logout.type })}
                >
                  Have an account?
                </Link>
              </p>

              {/* <ul className="error-messages">
                <li>That email is already taken</li>
              </ul> */}

              <Formik
                enableReinitialize
                initialValues={firstvalue}
                validationSchema={validate}
                onSubmit={(values) => {
                  dispatch({ type: signupUser.type, payload: values });
                }}
              >
                {(
                  form: FormikProps<{
                    username: string;
                    email: string;
                    password: string;
                  }>
                ) => (
                  <Form>
                    <fieldset className="form-group">
                      <span className="error">
                        {errorSignup.username
                          ? "Your name already exists"
                          : null}
                      </span>
                      <Field
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Your name"
                        name="username"
                        id="exampleFieldusername"
                        aria-describedby="usernameHelp"
                      />
                      {form.touched.username && form.errors.username && (
                        <div className="error">{form.errors.username}</div>
                      )}
                    </fieldset>
                    <fieldset className="form-group">
                      <span className="error">
                        {errorSignup.email ? "Email already exists" : null}
                      </span>
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
                        className="fas fa-eye icon-eye-signup"
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
                      Sign up
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

export default Register;
