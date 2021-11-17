import React, { useContext, useRef } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";

import { FilterContext } from "../../../context";
import styles from "./_guestInput.module.css";

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
    <div className={styles.container}>
      <div className={styles.header_container}>
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.input_container}>
        <button type="button" onClick={decrease}>
          <MinusIcon className={styles.icon} />
        </button>
        <input
          type="number"
          value={formData.guests[action]}
          ref={ref}
          readOnly
        />
        <button type="button" onClick={increase}>
          <PlusIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default GuestInput;
