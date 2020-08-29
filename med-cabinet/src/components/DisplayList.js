import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import "./DisplayList.scss";
export default function DisplayList(props) {
  const [listItems, setListItems] = useState([]);
  const [deleteButton, setDeleteButton] = useState({
    disabled: false,
    text: "delete this collection",
  });
  const [expandedItems, setExpandedItems] = useState([]);
  useEffect(() => {
    axiosWithAuth(props.user.token)
      .get(`/users/list/${props.listName}`)
      .then((r) => {
        setListItems(r.data.results);
      })
      .catch((e) => console.log(e));
  }, [props.listName, props.user.token]);
  const deleteList = (listName) => {
    setDeleteButton({ disabled: true, text: "...deleting" });
    axiosWithAuth(props.user.token)
      .delete(`/users/delete-list`, { data: { listName: listName } })
      .then((r) => {
        props.exitPopup();
        props.setLists(
          props.lists.filter((list) => list.listName !== listName)
        );
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className="listContainer">
        {listItems.length === 0 && <p>... loading</p>}
        {listItems.map((item, index) => {
          return (
            <div key={item.Strain} className="strainCard">
              <h3>
                {item.Strain} ({item.Type})
              </h3>
              <p>
                <span className="label">Effects</span>: {item.Effects}
              </p>
              <p>
                <span className="label">Flavor</span>: {item.Flavor}
              </p>
              {expandedItems.includes(index) ? (
                <>
                  <p>
                    <span className="label">Description:</span>{" "}
                    {item.Description}
                  </p>
                  <button
                    className="collapse"
                    onClick={() =>
                      setExpandedItems(expandedItems.filter((i) => i !== index))
                    }
                  >
                    ⮙
                  </button>
                </>
              ) : (
                <button
                  className="expand"
                  onClick={() => setExpandedItems([...expandedItems, index])}
                >
                  ⮛
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="listToolbar">
        <button
          onClick={() => {
            deleteList(props.listName);
          }}
          disabled={deleteButton.disabled}
        >
          {deleteButton.text}
        </button>
      </div>
    </>
  );
}
