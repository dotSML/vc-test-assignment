import React, { useEffect, useState } from "react";
//@ts-ignore
import * as Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./login.css";
import {
  SET_AUTH_IS_AUTHENTICATED,
  SET_AUTH_TOKEN
} from "./actions/authActions";
import fetchLogin from "./fetch/fetchLogin";

const Login: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(5)
      .required()
      .error(new Error("Password has to be at least 5 characters long"))
  });

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, []);

  const handleLogin = () => {
    setErrorMsg("");
    const { error, validate } = validationSchema.validate({
      email: email,
      password: password
    });
    if (error) {
      return setErrorMsg(error.message);
    }
    fetchLogin(email, password)
      .then((result: any) => {
        console.log(result);
        const token = result.data.token;
        if (!token) {
          throw new Error("No token provided!");
        }
        localStorage.setItem("token", token);
        dispatch(SET_AUTH_TOKEN(token));
        dispatch(SET_AUTH_IS_AUTHENTICATED(true));
        history.push("/");
        toast.success("Login success!");
      })
      .catch(err => {
        setErrorMsg("Invalid credentials!");
        console.log(err);
      });
  };

  return (
    <div className="login-prompt">
      <h2 className="login-prompt--header">LOGIN</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="login-prompt-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="login-prompt-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          className="login-prompt-btn"
          type="submit"
          data-testid="login-btn"
        >
          {loading ? "LOADING..." : "LOGIN"}
        </button>
      </form>
      {errorMsg ? <div className="login-prompt-error">{errorMsg}</div> : ""}

      <div className="login-prompt-signup">
        <Link to="/signup">New user? Click here to sign up!</Link>
      </div>
    </div>
  );
};

export default Login;
