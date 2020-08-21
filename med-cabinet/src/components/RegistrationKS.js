import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import moment from "moment";
import * as yup from "yup";
import "./RegistrationKS.scss";

//name, email, password, zip code, b-day/age check (over 21)
const schema = yup.object().shape({
  name: yup.string().required("↑ enter your name"),
  email: yup
    .string()
    .email("↑ enter a valid email address")
    .required("↑ enter your email address"),
  zipcode: yup
    .string()
    .matches(/^[0-9]{5}$/, "↑ enter a valid zip code")
    .required("↑ enter a valid zip code"),
  password: yup
    .string()
    .min(5, "↑ enter a strong password")
    .required("↑ enter a password"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "↑ passwords don't match")
    .required("↑ confirm your password")
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
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);
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
        <p>confirm your password:</p>
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
      <button type="submit">register!</button>
    </form>
  );
}
export default RegistrationKS;
