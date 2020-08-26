import React from "react";
import "./QueryForm.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
const schema = yup.object().shape({
  form: yup.string(),
  ailment: yup.string(),
  effects: yup.string(),
  flavor: yup.string(),
  type: yup.string(),
});
export default function QueryForm(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    props.setQuery(data);
  };
  return (
    <form className="queryForm" onChange={handleSubmit(onSubmit)}>
      <h2>what are looking for?</h2>
      {["ailment", "effects", "flavor", "type"].map((q) => {
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
          </label>
        );
      })}
      <p className="formError">{errors.form?.message}</p>
    </form>
  );
}
