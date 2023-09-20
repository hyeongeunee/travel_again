import React, { useState } from "react";

import { useLocation } from "react-router-dom";

export default function MapContent({ day }) {
  const location = useLocation();
  // console.log(location);
  // console.log(selectedItems)
  const selectedItems = location.state ? location.state.selectedItems : null;
  console.log(selectedItems[0][0].title);
  return (
    <div className="map-footer">
      {selectedItems[day].map((item, index) => (
        <div class="number-list">
          <p className="number-icon">{index+1}</p>
          <p className="footer-text">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
