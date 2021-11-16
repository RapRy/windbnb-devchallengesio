import React, { useState } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";

import styles from "./_drawer.module.css";

const Drawer = ({ formData, locations, changeLocation, setShowDrawer }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.drawer_container}>
      <div className={styles.header_container}>
        <p>Edit your search</p>
        <XIcon className={styles.icon} onClick={() => setShowDrawer(false)} />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form_field}>
          <label htmlFor="location">LOCATION</label>
          <input
            type="text"
            value={`${formData.location.city}, ${formData.location.country}`}
            id="location"
            onClick={() => setShow(true)}
            readOnly
          />
        </div>
        <div className={styles.border}></div>
        <div className={styles.form_field}>
          <label htmlFor="guests">GUESTS</label>
          <input
            type="number"
            placeholder="Add guests"
            // defaultValue={formData.guests === 0 ? "" : formData.guests}
            onChange={(e) =>
              changeLocation("guests", { guest: e.target.value })
            }
          />
        </div>
      </div>
      {show && (
        <div>
          {locations.map((location, i) => (
            <div
              className={styles.location_select}
              key={i}
              onClick={() => changeLocation("location", location)}
            >
              <LocationMarkerIcon className={styles.location_icon} />
              {location.city}, {location.country}
            </div>
          ))}
        </div>
      )}
      <div>
        <button type="button" className={styles.button}>
          <SearchIcon className={styles.button_icon} />
          Search
        </button>
      </div>
    </div>
  );
};

export default Drawer;
