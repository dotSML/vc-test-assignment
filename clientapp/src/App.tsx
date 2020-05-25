import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/signup";
import UserLanding from "./components/user/userLanding";
import { useSelector, useDispatch } from "react-redux";
import Signout from "./components/auth/signout";
import { AuthReducerStateType } from "./components/auth/reducers/authReducer";
import { AppState } from "./store/store";
import {
  SET_AUTH_IS_AUTHENTICATED,
  SET_AUTH_TOKEN
} from "./components/auth/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector<
    AppState,
    AuthReducerStateType
  >(state => state.auth);
  useEffect(() => {
    const token: string = localStorage.getItem("token") || "";
    if (token) {
      dispatch(SET_AUTH_TOKEN(token));
      dispatch(SET_AUTH_IS_AUTHENTICATED(true));
    }
  }, []);

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ fontSize: "1rem" }}
      />

      <Router>
        <Switch>
          <Route exact path="/">
            <UserLanding isAuth={isAuthenticated} token={token} />
          </Route>
          <Route path="/login">
            <Login isAuth={isAuthenticated} />
          </Route>
          <Route path="/signup">
            <Signup isAuth={isAuthenticated} />
          </Route>
          <Route exact path="/signout">
            <Signout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
