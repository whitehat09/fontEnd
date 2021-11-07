import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {  showHeaderUser } from "../../features/auth/authSlice";

import { Formik, Field, Form, FormikProps } from "formik";
import * as Yup from "yup";
import "./style.css";
import { Link } from "react-router-dom";
import { signInAdmin } from "../../features/admin/adminSlice";
const LoginAdmin = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoginAdmin } = useAppSelector((state: RootState) => {
    return state.adminReducer;
  });
  useEffect(() => {
    dispatch({ type: showHeaderUser.type });
    if (isLoginAdmin) {
      history.push("/admin/dashboardproducts");
    }
  }, [isLoginAdmin, history,dispatch]);
  let firstvalue = {
    email: "",
    password: "",
  };
  const validate = Yup.object().shape({
    email: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required !"),
    password: Yup.string()
      .min(6, "Must have 6 or more characters")
      .required("Required !"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row p-2 d-flex justify-content-center flex-column text-center align-items-center">
            <h2>Đăng nhập</h2>

            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="fadeIn first">
                  <i className="far fa-user-circle my-4" id="icon"></i>
                </div>
                <Formik
                  enableReinitialize
                  initialValues={firstvalue}
                  validationSchema={validate}
                  onSubmit={(values) => {
                    dispatch({ type: signInAdmin.type, payload: values });
                  }}
                >
                  {(
                    form: FormikProps<{
                      email: string;
                      password: string;
                    }>
                  ) => (
                    <Form>
                      <Field
                        type="text"
                        id="exampleFieldEmail"
                        className="fadeIn second"
                        name="email"
                        placeholder="Tài khoản"
                        aria-describedby="emailHelp"
                      />
                      {form.touched.email && form.errors.email && (
                        <div className="error">{form.errors.email}</div>
                      )}
                      <Field
                        type={showPassword ? "text" : "password"}
                        //type="text"

                        id={showPassword ? "text" : "password"}
                        //type="Password"
                        className="fadeIn third"
                        name="password"
                        placeholder="Mật khẩu"
                        // id="exampleFieldPassword"
                        aria-describedby="passwordHelp"
                      />
                      <i
                        className="fas fa-eye icon-eye fadeIn third"
                        onClick={togglePasswordVisiblity}
                      ></i>
                      {form.touched.password && form.errors.password && (
                        <div className="error">{form.errors.password}</div>
                      )}
                      <input
                        type="submit"
                        className="fadeIn fourth"
                        value="Đăng nhập"
                      />
                    </Form>
                  )}
                </Formik>

                <div id="formFooter">
                  <Link to="/" className="underlineHover">
                    Về trang người dùng ?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginAdmin;
