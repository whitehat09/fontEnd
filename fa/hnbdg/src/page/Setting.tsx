import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { getProfile, updateUser } from "../features/profile/profileSlice";
import { getCurrentUser } from "../features/articles/articleSlice";
import { storage } from "../firebase/firebase";

interface dataToSend {
  image?: string;
  username?: string;
  bio?: string;
  email?: string;
  password?: string;
}
const settingValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .max(25, "Must be 25 characters or less")
    .required(),
  username: Yup.string().max(25, "Must be 25 characters or less").required(),
  password: Yup.string().min(6, "Must have 6 or more characters"),

  bio: Yup.string(),
});

const Setting = () => {
  const [image, setImage] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const { isLogin } = useAppSelector((state: RootState) => state.login);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.articleReducer
  );
  const { profile, errorMessage } = useAppSelector(
    (state: RootState) => state.profileReducer
  );
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    } else {
      dispatch({
        type: getCurrentUser.type,
      });
    }
  }, [isLogin, history, dispatch]);
  const username = currentUser?.username;
  useEffect(() => {
    if (username) {
      dispatch({
        type: getProfile.type,
        payload: username,
      });
    }
  }, [username, dispatch]);

  const initialValues = {
    email: currentUser.email || "",
    username: profile.username || "",
    password: "",
    image: profile.image || "",
    bio: profile.bio || "",
  };

  const handleImageChange = (e: any) => {
    setShowProgress(true);
    const image = e.target.files[0];
    setImage(e.target.files[0]);
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        setTimeout(() => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        }, 2000);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
          });
      }
    );
  };

  return (
    <div>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={settingValidationSchema}
                onSubmit={(values) => {
                  if (imageUrl !== "") {
                    values.image = imageUrl;
                  }
                  const { image, username, bio, email, password } = values;
                  let data: dataToSend = {
                    image,
                    username,
                    bio,
                    email,
                    password,
                  };
                  if (values.password === "") {
                    data = { image, username, bio, email };
                  }
                  dispatch({
                    type: updateUser.type,
                    payload: data,
                  });
                  setTimeout(() => {
                    if (!errorMessage.username && !errorMessage.email) {
                      history.push(`/profile/${values.username}`);
                    }
                  }, 500);
                }}
              >
                {(
                  form: FormikProps<{
                    email: string;
                    username: string;
                    password?: string;
                    image?: string;
                    bio?: string;
                  }>
                ) => (
                  <Form>
                    {!form.errors.image && (
                      <img
                        src={imageUrl === "" ? form.values.image : imageUrl}
                        alt="profile"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          display: "block",
                          margin: "0 auto 16px",
                        }}
                      />
                    )}
                    {image === null ? "" : ""}
                    <div className="form-group">
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleImageChange}
                      />
                      {showProgress && (
                        <progress value={progress} max="100"></progress>
                      )}
                    </div>
                    <span className="error">
                      {errorMessage.username
                        ? "username is already taken!"
                        : ""}
                    </span>
                    <div className="form-group">
                      <Field
                        className="form-control form-control-lg mb-2"
                        type="text"
                        placeholder="Your Name"
                        name="username"
                      />
                      {form.touched.username && form.errors.username && (
                        <div className="error">{form.errors.username}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <Field
                        className="form-control form-control-lg "
                        as="textarea"
                        rows={8}
                        placeholder="Short bio about you"
                        name="bio"
                      />{" "}
                      {form.touched.bio && form.errors.bio && (
                        <div className="error">{form.errors.bio}</div>
                      )}
                    </div>
                    <span className="error">
                      {errorMessage.email ? "email is already taken!" : ""}
                    </span>
                    <div className="form-group">
                      <Field
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                        name="email"
                      />{" "}
                      {form.touched.email && form.errors.email && (
                        <div className="error">{form.errors.email}</div>
                      )}
                    </div>
                    <div>
                      <Field
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                        name="password"
                      />{" "}
                      {form.touched.password && form.errors.password && (
                        <div className="error">{form.errors.password}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Update Settings
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

export default Setting;
