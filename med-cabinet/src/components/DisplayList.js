import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import "./DisplayList.scss";
export default function DisplayList(props) {
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    axiosWithAuth
      .get(`/users/list/${props.listName}`)
      .then((r) => {
        setListItems(r.data.results);
      })
      .catch((e) => console.log(e));
  }, [props.listName]);
  /*
    Description: "Cinex, a hybrid of parents Cinderella 99 and Vortex, has a mixture of flavors ranging from sweet citrus to earthy skunk. The effects are clear-headed and uplifting, perfect for building a positive mindset and stimulating creative energy. Consumers enjoy Cinex for its ability to suppress pain and depression."
Effects: "Energetic,Uplifted,Happy,Focused,Euphoric"
Flavor: "Earthy,Citrus,Sweet"
Strain: "Cinex"
Type: "sativa"
*/
  return (
    <div className="listContainer">
      {listItems.length === 0 && <p>... loading</p>}
      {listItems.map((item) => {
        return (
          <div key={item.Strain} className="strainCard">
            <h3>
              {item.Strain} ({item.Type})
            </h3>
            <p>Effects: {item.Effects}</p>
            <p>Flavor: {item.Flavor}</p>
          </div>
        );
      })}
    </div>
  );
}
