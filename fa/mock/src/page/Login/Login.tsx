import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { logIn } from "../../features/auth/authSlice";
import { facebookProvider, googleProvider } from "../../firebase/authMethods";
import { auth } from "../../firebase/config";
import socialMediaAuth from "../../firebase/service/auth";
import addDocument from "../../firebase/service/addDocument"; // add db

const Login = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state: RootState) => {
    return state.authReducer;
  });
  const handleOnClick = async (provider: any) => {
    const res = await socialMediaAuth(provider);
  };

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((res: any) => {
      if (res) {
        let data = {
          displayName: res.displayName,
          email: res.email,
          photoURL: res.photoURL,
          uid: res.uid,
          providerId: res.providerId,
        };
        addDocument("users", data);

        dispatch({ type: logIn.type, payload: data });

        history.push("/");
        return;
      }
      if (isLogin) {
        history.push("/");
      }

      //clean
      return () => {
        unsubscibed();
      };
    });
  }, [isLogin, history, dispatch]);
  return (
    <>
      <section>
        <div className="container">
          <div className="row p-2 d-flex justify-content-center flex-column text-center align-items-center">
            <h2>Đăng nhập</h2>
            <button
              type="button"
              style={{ maxWidth: "100xp" }}
              className="btn btn-primary col-4 my-2"
              onClick={() => handleOnClick(facebookProvider)}
            >
              Bằng facebook
            </button>{" "}
            <button
              type="button"
              style={{ maxWidth: "100xp" }}
              className="btn btn-primary col-4 my-2"
              onClick={() => handleOnClick(googleProvider)}
            >
              Bằng google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
