import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  SET_AUTH_IS_AUTHENTICATED,
  SET_AUTH_TOKEN
} from "./actions/authActions";

const Signout: React.FC = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(SET_AUTH_TOKEN(""));
    dispatch(SET_AUTH_IS_AUTHENTICATED(false));
    history.push("/login");
  }, []);

  return null;
};

export default Signout;
