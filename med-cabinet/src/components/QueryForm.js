import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
const availableTypes = ["Indica", "Sativa", "Hybrid"];
const availableIntakes = ["Vape", "Edible", "Smoke", "Topical"];
const schema = yup.object().shape({
  form: yup.string(),
  listName: yup.string().required("⮙ name this collection"), //TODO: detect unique name by mapping the list of lists in parent's state!
  intakes: yup.string().oneOf(availableIntakes, "⮙ choose intake method"),
  types: yup.string().oneOf(availableTypes, "⮙ choose a type"),
  issues: yup.string(),
  strain: yup.string(),
  effect: yup.string(),
  flavor: yup.string(),
});
console.log(schema);
export default function QueryForm(props) {
  const [submitButton, setSubmitButton] = useState({
    enabled: true,
    text: "Submit",
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    props.setQuery(data);
  };
  useEffect(() => document.querySelector("#listName").focus(), []);
  return (
    <form className="queryForm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="listName">
        <p>collection name</p>
        <input
          id="listName"
          type="text"
          name="listName"
          autoComplete="listName"
          ref={register}
        />
        <p className="formError">{errors.listName?.message}</p>
      </label>

      {["issues", "strain", "effect", "flavor"].map((q) => {
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
      <label htmlFor="intake">
        <p>type:</p>
        <select id="intake" name="intake" ref={register}>
          {availableIntakes.map((i) => (
            <option value={i} key={`type-${i}`}>
              {i}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="types">
        <p>type:</p>
        <select id="types" name="types" ref={register}>
          {availableTypes.map((t) => (
            <option value={t} key={`type-${t}`}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <p className="formError">{errors.form?.message}</p>
      <button type="submit">Search ⮚</button>
    </form>
  );
}
