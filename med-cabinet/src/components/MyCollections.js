import React, { useEffect, useState } from "react";
import "./MyCollections.scss";
// import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
export default function MyCollections(props) {
  const [lists, setLists] = useState([]); //array of objects from api

  useEffect(() => {
    axiosWithAuth
      .get("/users/lists")
      .then((r) => setLists(r.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="myCollections">
      <h2>my collections</h2>
      {lists.map((list) => (
        <button key={`list${list.listName}`} className="flatButton">
          {list.listName}
        </button>
      ))}
    </div>
  );
}
