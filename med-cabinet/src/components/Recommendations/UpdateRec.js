import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialRecommendations = {
  id: "",
  strain: "",
  flavors: "",
	effects: "",
  rating: "",
  type: "",
  description: "",
	
};
const UpdateRecommendations = props => {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`https://medcabinet2.herokuapp.com/users/lists${id}`)
      .then(res => setRecommendations(res.data))
      .catch(err =>
        console.error(
          "Upateform.js: useEffect: err: ",
          err.message,
          err.response
        )
      );
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    

    setRecommendations({
      ...recommendations,
      [ev.target.strain]: value,
      [ev.target.flavors]: ev.target.value.split(','),
      [ev.target.effects]: ev.target.value.split(','),
      [ev.target.rating]: value,
      [ev.target.type]: value,
      [ev.target.description]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`https://medcabinet2.herokuapp.com/users/lists${recommendations.id}`, recommendations)
      .then(res => {
      const newRecList = props.recommendations.map(rec => {
        if (rec.id === res.data.id) {
            return res.data
        }
        return rec
    })
    props.setRecList(newRecList)
       push(`/`)
      
        })

      .catch(err =>
        console.error(
          "UpdateForm.js: handleSubmit: ",
          err.message,
          err.response
        )
      );
  };

  return (
    <div>
      <h2>Update Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="strain"
          onChange={changeHandler}
          placeholder="strain"
          value={recommendations.strain}
        />
        <div className="baseline" />

        <input
          type="text"
          name="flavors"
          onChange={changeHandler}
          placeholder="flavors"
          value={recommendations.flavors}
        />
        <div className="baseline" />

        <input
          type="text"
          name="effects"
          onChange={changeHandler}
          placeholder="Desired Effects"
          value={recommendations.effects}
        />
        <div className="baseline" />

        <input
          type="text"
          name="rating"
          onChange={changeHandler}
          placeholder="rating"
          value={recommendations.rating}
        />
        <div className="baseline" />

        <input
          type="text"
          name="type"
          onChange={changeHandler}
          placeholder="type"
          value={recommendations.type}
        />
        <div className="baseline" />

        <input
          type="text"
          name="description"
          onChange={changeHandler}
          placeholder="description"
          value={recommendations.rating}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateRec;