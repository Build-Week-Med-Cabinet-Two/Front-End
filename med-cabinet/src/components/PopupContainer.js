import React, { useEffect, useCallback } from "react";
import "./PopupContainer.scss";
export default function PopupContainer(props) {
  const keyHandler = useCallback(
    (e) => {
      e.key === "Escape" && props.exitPopup();
    },
    [props]
  );
  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [keyHandler]);
  return (
    <div
      className="popupContainer"
      onClick={(e) => {
        e.preventDefault();
        props.exitPopup();
      }}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>
          <span>{props.title}</span>
          <button
            className="closeButton"
            onClick={(e) => {
              e.preventDefault();
              props.exitPopup();
            }}
          >
            X
          </button>
        </h2>
        {props.children}
      </div>
    </div>
  );
}
