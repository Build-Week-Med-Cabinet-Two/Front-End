import React, { useEffect, useState } from "react";
import "./MyCollections.scss";
import PopupContainer from "./PopupContainer";
import QueryForm from "./QueryForm";
import DisplayList from "./DisplayList";
import axiosWithAuth from "../utils/axiosWithAuth";
export default function MyCollections(props) {
  const [lists, setLists] = useState([]); //array of objects from api
  const [popup, setPopup] = useState({
    visible: false,
    title: "",
    component: null,
  }); //popup form to create list
  const exitPopup = () =>
    setPopup({ visible: false, title: "", component: null });
  useEffect(() => {
    axiosWithAuth
      .get("/users/lists")
      .then((r) => setLists(r.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="myCollections">
      {popup.visible && (
        <PopupContainer
          exitPopup={exitPopup}
          title={popup.title}
          component={popup.component}
        />
      )}
      <h2>my collections</h2>
      <div className="collectionWrapper">
        <button
          className="flatButton"
          onClick={() =>
            setPopup({
              visible: true,
              title: "create new collection",
              component: (
                <QueryForm
                  exitPopup={exitPopup}
                  lists={lists}
                  setLists={setLists}
                />
              ),
            })
          }
        >
          +
        </button>
        {lists.map((list, index) => (
          <button
            key={`${list.listName}-${index}`}
            className="flatButton"
            onClick={() =>
              setPopup({
                visible: true,
                title: `Collection: ${list.listName}`,
                component: (
                  <DisplayList
                    listName={list.listName}
                    exitPopup={exitPopup}
                    lists={lists}
                    setLists={setLists}
                  />
                ),
              })
            }
          >
            {list.listName}
          </button>
        ))}
      </div>
    </div>
  );
}
