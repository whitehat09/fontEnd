import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { logout } from "../features/Login/loginSlice";
import "./header.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state: RootState) => {
    return state.login;
  });
  const { currentUser } = useAppSelector((state: RootState) => {
    return state.articleReducer;
  });
  const username = currentUser?.username;

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            HNBDG
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
            </li>

            {isLogin ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/editor">
                    <i className="ion-compose"></i>&nbsp;New Article
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <div className=" header-dropdown">
                    <NavLink
                      className="nav-link header-dropdown"
                      to={`/profile/${username}`}
                    >
                      {username}
                    </NavLink>
                    <div className="header-dropdown-content">
                      <NavLink
                        to="/"
                        onClick={() => dispatch({ type: logout.type })}
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={() =>
                      dispatch({
                        type: logout.type,
                      })
                    }
                  >
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Register"
                    onClick={() =>
                      dispatch({
                        type: logout.type,
                      })
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
