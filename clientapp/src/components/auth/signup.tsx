import React, { useEffect, useState } from "react";
import "./login.css"; //Using same styles, since almost 100% overlap
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// @ts-ignore
import * as Joi from "joi-browser";
import fetchSignup from "./fetch/fetchSignup";

const Signup: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, []);

  const validationSchema = Joi.object({
    email: Joi.string()
      .required()
      .error(new Error("Email is required")),
    firstName: Joi.string()
      .min(2)
      .required()
      .error(new Error("First name has to be at least 2 characters long")),
    lastName: Joi.string()
      .min(2)
      .required()
      .error(new Error("Last name has to be at least 2 characters long")),
    password: Joi.string()
      .min(5)
      .required()
      .error(new Error("Password has to be at least 5 characters long"))
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = () => {
    setErrorMsg("");
    const { error, validate } = validationSchema.validate({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
    if (error) {
      return setErrorMsg(error.message);
    }
    fetchSignup({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
      .then(response => {
        toast.success("Creating an user - SUCCESS!");
        return history.push("/login");
      })
      .catch(err => {
        setErrorMsg(err.response.data.message);
      });
  };

  return (
    <div className="login-prompt">
      <h2 className="login-prompt--header">SIGNUP</h2>
      <div className="login-prompt-form-group">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </div>
      <div className="login-prompt-form-group">
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>
      <div className="login-prompt-form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="login-prompt-form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {errorMsg ? <div className="login-prompt-error">{errorMsg}</div> : ""}
      <button className="login-prompt-btn" onClick={handleSignup}>
        SIGNUP
      </button>
    </div>
  );
};

export default Signup;
