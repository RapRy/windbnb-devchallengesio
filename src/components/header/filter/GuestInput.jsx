import React, { useContext, useRef } from "react";

import { FilterContext } from "../../../context";

const GuestInput = ({ heading, description, action }) => {
  const { updateGuestsCount, formData } = useContext(FilterContext);
  const ref = useRef();

  const decrease = () => {
    const value = parseInt(ref.current.value);
    if (value === 0) return false;

    updateGuestsCount(action, value - 1);
  };

  const increase = () => {
    const value = parseInt(ref.current.value);
    updateGuestsCount(action, value + 1);
  };

  return (
    <div>
      <div>
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
      <div>
        <button type="button" onClick={decrease}>
          -
        </button>
        <input
          type="number"
          value={formData.guests[action]}
          ref={ref}
          readOnly
        />
        <button type="button" onClick={increase}>
          +
        </button>
      </div>
    </div>
  );
};

export default GuestInput;
