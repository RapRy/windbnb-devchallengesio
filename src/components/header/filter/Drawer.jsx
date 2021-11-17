import React, { useState, useContext } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";

import styles from "./_drawer.module.css";
import { FilterContext } from "../../../context";
import GuestInput from "./GuestInput";

const Drawer = () => {
  const { formData, changeLocation, filterItems, setShowDrawer, locations } =
    useContext(FilterContext);
  const [showLocation, setShowLocation] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  const toggleLocation = () => {
    if (showGuests) setShowGuests(false);
    setShowLocation(true);
  };

  const toggleGuests = () => {
    if (showLocation) setShowLocation(false);
    setShowGuests(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <form action="/" onSubmit={filterItems}>
      <div className={styles.drawer_container}>
        <div className={styles.drawer}>
          <div className={styles.header_container}>
            <p>Edit your search</p>
            <XIcon className={styles.icon} onClick={closeDrawer} />
          </div>
          <div className={styles.form_container}>
            <div className={styles.form_field}>
              <label htmlFor="location">LOCATION</label>
              <input
                type="text"
                value={`${formData.location.city}, ${formData.location.country}`}
                id="location"
                onClick={toggleLocation}
                readOnly
              />
            </div>
            <div className={styles.border}></div>
            <div className={styles.form_field}>
              <label htmlFor="guests">GUESTS</label>
              <input
                type="text"
                id="guests"
                placeholder="Add guests"
                value={
                  formData.guests.total === 0
                    ? "Add guests"
                    : formData.guests.total > 1
                    ? `${formData.guests.total} guests`
                    : `${formData.guests.total} guest`
                }
                onClick={toggleGuests}
                readOnly
              />
            </div>
          </div>
          {showLocation && (
            <div>
              {locations.map((location, i) => (
                <div
                  className={styles.location_select}
                  key={i}
                  onClick={() => changeLocation(location)}
                >
                  <LocationMarkerIcon className={styles.location_icon} />
                  {location.city}, {location.country}
                </div>
              ))}
            </div>
          )}
          {showGuests && (
            <div>
              <GuestInput
                heading="Adults"
                description="Ages 13 or above"
                action="adults"
              />
              <GuestInput
                heading="Children"
                description="Ages 2 - 12"
                action="children"
              />
            </div>
          )}
          <div>
            <button type="submit" className={styles.button}>
              <SearchIcon className={styles.button_icon} />
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Drawer;
