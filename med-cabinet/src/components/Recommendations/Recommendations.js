import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import RecCard from "./RecCard";


function Recommendations({ addToSavedList, setRecList }) {
  const { push } = useHistory();
  const [recommendations, setRecommendations] = useState(null);
  
  const params = useParams();

  const fetchRecommendations = (id) => {
    axios
      .get(`strainapi.evanbusse.com/sxxwZnj`)
      .then((res) => 
      setRecommendations(res.data)
      
      )
      .catch((err) => console.log(err.response));
  };

  const saveRecommendations = () => {
    addToSavedList(movie);
  };
  const getNewList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => 
        setRecList(res.data)
        )
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log("delete", res.data);
        // this.setMovie({movie: res.data});
        getNewList();
        push(`/`);
        
      })
      .catch(err =>
        console.error("Recommendations.js: handleDelete: err: ", err.message, err.response)
      );
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  


  if (!recommendations) {
    return <div>Loading recommendation information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={Recommendations} />

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