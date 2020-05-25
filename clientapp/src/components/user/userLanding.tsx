import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./userLanding.css";
import jwt from "jwt-decode";
import { AppState } from "../../store/store";
import { SET_AUTH_USER_DATA } from "../auth/actions/authActions";
import fetchUser from "../auth/fetch/fetchUser";
import { User } from "../auth/types/user";

const UserLanding: React.FC<{ isAuth: boolean; token: string }> = ({
  isAuth,
  token
}) => {
  const history = useHistory();
  const userData = useSelector<AppState, User>(state => state.auth.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      setLoading(true);
      const decodedToken: { userId: number; token: string } = jwt(token);
      fetchUser(decodedToken.userId).then(response => {
        dispatch(SET_AUTH_USER_DATA(response.data.user));
        setLoading(false);
      });
    } else {
      history.push("/login");
    }
  }, [isAuth]);

  return (
    <React.Fragment>
      {!loading ? (
        <div className="user_landing">
          <h2 className="user_lading-welcome">You are logged in!</h2>
          <div className="user_landing-name">
            <span style={{ fontWeight: "bold" }}>UserID - </span>
            {userData.id}
          </div>
          <div className="user_landing-name">
            <span style={{ fontWeight: "bold" }}>First Name - </span>
            {userData.firstName}
          </div>
          <div className="user_landing-name">
            <span style={{ fontWeight: "bold" }}>Last Name - </span>
            {userData.lastName}
          </div>
          <div className="user_landing-name">
            <span style={{ fontWeight: "bold" }}>Email - </span>
            {userData.email}
          </div>
          <button className="user_landing-btn">
            <Link to="/signout">Signout</Link>
          </button>
        </div>
      ) : (
        "Loading user data..."
      )}
    </React.Fragment>
  );
};

export default UserLanding;
