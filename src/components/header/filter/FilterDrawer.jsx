import React, { useContext, useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import styles from "./_filterDrawer.module.css";
import { DataContext } from "../../../context";

import Drawer from "./Drawer";

const FilterDrawer = () => {
  const data = useContext(DataContext);
  const [formData, setFormData] = useState({
    location: { city: "", country: "" },
    guests: 0,
  });
  const [locations, setLocations] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const changeLocation = (action, payload) => {
    switch (action) {
      case "location":
        const location = { city: payload.city, country: payload.country };
        setFormData((prev) => ({ ...prev, location }));
        break;
      case "guests":
        setFormData((prev) => ({ ...prev, guests: parseInt(payload.guest) }));
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (data.apartments.length > 0 && formData.location.city === "") {
      setFormData({
        location: {
          city: data.apartments[0].city,
          country: data.apartments[0].country,
        },
        guests: 0,
      });

      const uniqueLocations = data.apartments.filter(
        (elem, index, self) =>
          index === self.findIndex((el) => el.city === elem.city)
      );

      setLocations(uniqueLocations);
    }
    // eslint-disable-next-line
  }, [data.apartments]);

  return (
    <>
      <div
        className={styles.filter_container}
        onClick={() => setShowDrawer(true)}
      >
        <div className={styles.location_container}>
          <span>
            {formData.location.city}, {formData.location.country}
          </span>
        </div>
        <div className={styles.border}></div>
        <div className={styles.guest_container}>
          <span className={formData.guests > 0 ? styles.with_guests : ""}>
            {formData.guests === 0 ? "Add guests" : formData.guests}
          </span>
        </div>
        <div className={styles.border}></div>
        <div className={styles.search_container}>
          <SearchIcon className={styles.search_icon} />
        </div>
      </div>
      {showDrawer && (
        <Drawer
          formData={formData}
          locations={locations}
          changeLocation={changeLocation}
          setShowDrawer={setShowDrawer}
        />
      )}
    </>
  );
};

export default FilterDrawer;
