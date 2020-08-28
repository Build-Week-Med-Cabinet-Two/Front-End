import React, { useEffect, useState } from "react";
import axios from "axios";
//import axiosWithAuth from "../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import RecCard from "./RecCard";


function Recommendations({ addToSavedList, setRecList }) {
  const { push } = useHistory();
  const [recommendations, setRecommendations] = useState(null);
  
  const params = useParams();

  const fetchRecommendations = (id) => {
    axios
      .get(`https://medcabinet2.herokuapp.com/users/lists${id}`)
      .then((res) => 
      setRecommendations(res.data)
      
      )
      .catch((err) => console.log(err.response));
  };

  const saveRecommendations = () => {
    addToSavedList(recommendations);
  };
  const getNewList = () => {
    axios
      .get("https://medcabinet2.herokuapp.com/users/lists")
      .then(res => 
        setRecList(res.data)
        )
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`https://medcabinet2.herokuapp.com/users/lists${params.id}`)
      .then(res => {
        console.log("delete", res.data);
        // this.setRecomendations({recommendations: res.data});
        getNewList();
        push(`/`);
        
      })
      .catch(err =>
        console.error("Recommendations.js: handleDelete: err: ", err.message, err.response)
      );
  };

  useEffect(() => {
    fetchRecommendations(params.id);
  }, [params.id]);

  


  if (!recommendations) {
    return <div>Loading recommendation information...</div>;
  }

  return (
    <div className="save-wrapper">
      <RecCard Recommendation={Recommendations} />

      <div className="save-button" onClick={saveRecommendations}>
        Save
      </div>
      <button
        className="md-button"
        onClick={() => push(`/update-recommendations/${recommendations.id}`)}
      >
        Edit
      </button>
      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Recommendations;