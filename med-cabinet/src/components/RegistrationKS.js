import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import moment from "moment";
import axios from "axios";
import * as yup from "yup";
import "./RegistrationKS.scss";

//name, email, password, zip code, b-day/age check (over 21)
const schema = yup.object().shape({
  form: yup.string(),
  name: yup.string().required("↑ enter your name"),
  email: yup
    .string()
    .email("↑ enter a valid email address")
    .required("↑ enter your email address"),
  zipcode: yup
    .string()
    .matches(/^[0-9]{5}$/, "↑ enter a valid zip code")
    .required("↑ enter a valid zip code"),
  username: yup
    .string()
    .required("↑ enter a username")
    .min(3, "↑ username too short"),
  password: yup
    .string()
    .required("↑ enter a password")
    .min(5, "↑ enter a strong password"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "↑ passwords don't match")
    .required("↑ confirm password")
    .typeError("test"),
  birthDate: yup
    .date("↑ enter your birthdate")
    .typeError("↑ enter your birthdate")
    .required("↑ enter your birthdate")
    .test("at least 21 years old", "↑ you are too young!", (value) => {
      return moment().diff(moment(value), "years") >= 21;
    })
    .test("younger than 120 years old", "↑ you are too old!", (value) => {
      return moment().diff(moment(value), "years") <= 120;
    }),
});

function RegistrationKS(props) {
  const { register, handleSubmit, setError, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("submit");
    axios
      .post("https://medcabinet2.herokuapp.com/auth/register/", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((r) => console.log(r))
      .catch((e) => {
        setError("form", {
          type: "manual",
          message: e.message,
        });
      });
    console.log(data.username);
  };
  const nameRef = useRef();
  useEffect(() => nameRef.current.focus(), []);
  return (
    <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
      <h2>register as a new user</h2>
      {/* name, email, password, zip code, b-day/age check (over 21) */}
      <label htmlFor="name">
        <p>your name:</p>
        <input
          id="name"
          type="text"
          name="name"
          ref={(e) => {
            register(e);
            nameRef.current = e; // you can still assign to ref
          }}
        ></input>
        <p className="formError">{errors.name?.message}</p>
      </label>
      <label htmlFor="email">
        <p>email address:</p>
        <input id="email" type="email" name="email" ref={register}></input>
        <p className="formError">{errors.email?.message}</p>
      </label>
      <label htmlFor="zipcode">
        <p>your zip code:</p>
        <input id="zipcode" type="text" name="zipcode" ref={register}></input>
        <p className="formError">{errors.zipcode?.message}</p>
      </label>
      <label htmlFor="username">
        <p>choose a username:</p>
        <input id="username" type="text" name="username" ref={register}></input>
        <p className="formError">{errors.username?.message}</p>
      </label>
      <label htmlFor="password">
        <p>create a password:</p>
        <input
          id="password"
          type="password"
          name="password"
          ref={register}
        ></input>
        <p className="formError">{errors.password?.message}</p>
      </label>
      <label htmlFor="passwordConfirm">
        <p>confirm password:</p>
        <input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          ref={register}
        ></input>
        <p className="formError">{errors.passwordConfirm?.message}</p>
      </label>
      <label htmlFor="birthDate">
        <p>your birthdate:</p>
        <input
          id="birthDate"
          type="date"
          name="birthDate"
          ref={register}
          defaultValue={undefined}
        ></input>
        <p className="formError">{errors.birthDate?.message}</p>
      </label>
      <p className="formError">{errors.form?.message}</p>
      <button type="submit">register!</button>
    </form>
  );
}
export default RegistrationKS;
