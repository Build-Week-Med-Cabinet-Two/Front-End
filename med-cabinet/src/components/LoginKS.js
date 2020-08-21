import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import "./LoginKS.scss";

//name, email, password, zip code, b-day/age check (over 21)
const schema = yup.object().shape({
  email: yup
    .string()
    .email("↑ enter a valid email address")
    .required("↑ enter your email address"),
  password: yup.string().required("↑ enter a password"),
});

function LoginKS(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);
  };
  const emailRef = useRef();
  useEffect(() => emailRef.current.focus(), []);
  return (
    <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <h2>log in</h2>
      <label htmlFor="email">
        <p>your email:</p>
        <input
          id="email"
          type="email"
          name="email"
          ref={(e) => {
            register(e);
            emailRef.current = e;
          }}
        ></input>
        <p className="formError">{errors.email?.message}</p>
      </label>
      <label htmlFor="password">
        <p>your password:</p>
        <input
          id="password"
          type="password"
          name="password"
          ref={register}
        ></input>
        <p className="formError">{errors.password?.message}</p>
      </label>
      <button type="submit">log in!</button>
    </form>
  );
}
export default LoginKS;
