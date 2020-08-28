import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import axios from "axios";
import * as yup from "yup";
import "./LoginKS.scss";

//name, email, password, zip code, b-day/age check (over 21)
const schema = yup.object().shape({
  form: yup.string(),
  username: yup.string().required("↑ enter your username"),
  password: yup.string().required("↑ enter your password"),
});

function LoginKS(props) {
  const { register, handleSubmit, setError, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);
  const onSubmit = (data) => {
    setSubmitButtonEnabled(false);
    axios
      .post("https://medcabinet2.herokuapp.com/auth/login/", {
        username: data.username,
        password: data.password,
      })
      .then((r) => {
        setSubmitButtonEnabled(true);
        if (r.data.token) {
          props.setUser({ username: data.username, token: r.data.token });
          localStorage.setItem("token", r.data.token);
          localStorage.setItem("username", data.username);
        } else {
          setError("form", { type: "manual", message: "unknown error" });
        }
      })
      .catch((e) => {
        setSubmitButtonEnabled(true);
        setError("form", { type: "manual", message: "server error" });
      });
  };
  const usernameRef = useRef();
  useEffect(() => usernameRef.current.focus(), []);
  return (
    <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <h2>log in</h2>
      <label htmlFor="username">
        <p>username:</p>
        <input
          id="username"
          type="text"
          name="username"
          autoComplete="username"
          ref={(e) => {
            register(e);
            usernameRef.current = e;
          }}
        ></input>
        <p className="formError">{errors.username?.message}</p>
      </label>
      <label htmlFor="password">
        <p>password:</p>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          ref={register}
        ></input>
        <p className="formError">{errors.password?.message}</p>
      </label>
      <p className="formError">{errors.form?.message}</p>
      {submitButtonEnabled ? (
        <button type="submit">log in!</button>
      ) : (
        <button type="submit" disabled>
          ...hang on
        </button>
      )}
    </form>
  );
}
export default LoginKS;
