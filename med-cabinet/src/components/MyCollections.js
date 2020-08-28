import React, { useEffect, useState } from "react";
import "./MyCollections.scss";
import PopupContainer from "./PopupContainer";
import QueryForm from "./QueryForm";
import axiosWithAuth from "../utils/axiosWithAuth";
export default function MyCollections(props) {
  const [lists, setLists] = useState([]); //array of objects from api
  const [popup, setPopup] = useState({ visible: false, title: "" }); //popup form to create list
  const exitPopup = () => setPopup({ visible: false, title: "" });
  useEffect(() => {
    axiosWithAuth
      .get("/users/lists")
      .then((r) => setLists(r.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="myCollections">
      {popup.visible && (
        <PopupContainer exitPopup={exitPopup} title={popup.title}>
          <QueryForm exitPopup={exitPopup} lists={lists} setLists={setLists} />
        </PopupContainer>
      )}
      <h2>my collections</h2>
      <div className="collectionWrapper">
        <button
          className="flatButton"
          onClick={() =>
            setPopup({ visible: true, title: "create new collection" })
          }
        >
          +
        </button>
        {lists.map((list, index) => (
          <button key={`${list.listName}-${index}`} className="flatButton">
            {list.listName}
          </button>
        ))}
      </div>
    </div>
  );
}
