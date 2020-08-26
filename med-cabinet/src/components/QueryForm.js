import React, { useEffect } from "react";
import "./QueryForm.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
const schema = yup.object().shape({
  form: yup.string(),
  ailment: yup.string().required("⮙ enter an ailment"),
  effects: yup.string().required("⮙ enter desired effects"),
  flavor: yup.string().required("⮙ enter a flavor"),
  type: yup.string().required("⮙ choose a type"),
});
export default function QueryForm(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    props.setQuery(data);
  };
  useEffect(() => document.querySelector("#ailment").focus(), []);
  return (
    <form className="queryForm" onSubmit={handleSubmit(onSubmit)}>
      <h2>what are looking for?</h2>
      {["ailment", "effects", "flavor"].map((q) => {
        return (
          <label htmlFor={q} key={q}>
            <p>{q}</p>
            <input
              id={q}
              type="text"
              name={q}
              autoComplete="off"
              ref={register}
            ></input>
            <p className="formError">{errors[q]?.message}</p>
          </label>
        );
      })}
      <label htmlFor="type" key="type">
        <p>type:</p>
        <select id="type" name="type" ref={register}>
          <option value="indica">indica</option>
          <option value="sativa">sativa</option>
          <option value="hybrid">hybrid</option>
        </select>
      </label>
      <p className="formError">{errors.form?.message}</p>
      <button type="submit">Search ⮚</button>
    </form>
  );
}
