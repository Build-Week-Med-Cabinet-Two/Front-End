import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
const availableTypes = ["Indica", "Sativa", "Hybrid"];
const availableIntakes = ["Vape", "Edible", "Smoke", "Topical"];
export default function QueryForm(props) {
  const schema = yup.object().shape({
    form: yup.string(),
    listName: yup
      .string()
      .required("⮙ name this collection")
      .notOneOf(
        props.lists.map((l) => l.listName),
        "⮙ a collection with that name already exists"
      ), //TODO: detect unique name by mapping the list of lists in parent's state!
    intakes: yup.array().required("⮙ choose intake method(s)"),
    types: yup.array().required("⮙ choose type(s)"),
    issues: yup.string().required("⮙ include issue(s) you want to treat"),
    strain: yup.string(),
    effect: yup.string().required("⮙ include effect(s) you desire"),
    flavor: yup.string(),
  });
  const [submitButton, setSubmitButton] = useState({
    enabled: true,
    text: "Submit",
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setSubmitButton({ enabled: false, text: "...hang on!" });
    axiosWithAuth(props.user.token)
      .post("/users/add-list", data)
      .then((r) => {
        if (r.status === 200) {
          const newList = {
            listName: r.data.list.name,
            effect: r.data.list.effect,
            intakes: r.data.list.intakes,
            issues: r.data.list.issues,
            strain: r.data.list.strain,
          };
          props.setLists([...props.lists, newList]);
          props.exitPopup();
        }
      })
      .catch((e) => {
        console.log(e);
        setSubmitButton({ enabled: true, text: "Submit" });
      });
  };
  useEffect(() => document.querySelector("#listName").focus(), []);
  return (
    <form className="popup" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="listName">
        <p>give this collection a unique name:</p>
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
            <p>{q}:</p>
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
      <label>
        <p>intake:</p>
        <div className="row">
          {availableIntakes.map((intake, index) => {
            return (
              <label htmlFor={`intakes[${index}]`} key={`intakes[${index}]`}>
                <input
                  type="checkbox"
                  name="intakes"
                  id={`intakes[${index}]`}
                  value={intake}
                  ref={register}
                />
                {intake}
              </label>
            );
          })}
        </div>
        <p className="formError">{errors.types?.message}</p>
      </label>
      <label>
        <p>type:</p>
        <div className="row">
          {availableTypes.map((type, index) => {
            return (
              <label htmlFor={`types[${index}]`} key={`types[${index}]`}>
                <input
                  type="checkbox"
                  name="types"
                  id={`types[${index}]`}
                  value={type}
                  ref={register}
                />
                {type}
              </label>
            );
          })}
        </div>
        <p className="formError">{errors.types?.message}</p>
      </label>
      <p className="formError">{errors.form?.message}</p>
      <button type="submit" disabled={!submitButton.enabled}>
        {submitButton.text}
      </button>
    </form>
  );
}
