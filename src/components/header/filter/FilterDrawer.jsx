import React, { useContext, useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import styles from "./_filterDrawer.module.css";
import { DataContext, FilterContext } from "../../../context";

import Drawer from "./Drawer";

const FilterDrawer = () => {
  const data = useContext(DataContext);
  const [formData, setFormData] = useState({
    location: { city: "", country: "" },
    guests: { adults: 0, children: 0, total: 0 },
  });
  const [locations, setLocations] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const changeLocation = (payload) => {
    const location = { city: payload.city, country: payload.country };
    setFormData((prev) => ({ ...prev, location }));
  };

  const updateGuestsCount = (action, payload) => {
    switch (action) {
      case "adults":
        const guestsAdults = {
          ...formData.guests,
          adults: payload,
          total: formData.guests.children + payload,
        };
        setFormData((prev) => ({ ...prev, guests: guestsAdults }));
        break;
      case "children":
        const guestsChildren = {
          ...formData.guests,
          children: payload,
          total: formData.guests.adults + payload,
        };
        setFormData((prev) => ({ ...prev, guests: guestsChildren }));
        break;
      default:
        return false;
    }
  };

  const filterItems = (e) => {
    e.preventDefault();
    const items = data.apartments.filter((item) => {
      if (
        item.city === formData.location.city &&
        item.country === formData.location.country
      ) {
        if (formData.guests.total > 0) {
          if (item.maxGuests === formData.guests.total) {
            return item;
          } else {
            return false;
          }
        } else if (formData.guests.total === 0) {
          return false;
        } else {
          return item;
        }
      }

      return false;
    });

    data.setFiltered(items);

    if (showDrawer) setShowDrawer(false);
  };

  useEffect(() => {
    if (data.apartments.length > 0 && formData.location.city === "") {
      setFormData({
        location: {
          city: data.apartments[0].city,
          country: data.apartments[0].country,
        },
        guests: { adults: 0, children: 0, total: 0 },
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
      <div className={styles.filter_container}>
        <div
          className={styles.location_container}
          onClick={() => setShowDrawer(true)}
        >
          <span>
            {formData.location.city}, {formData.location.country}
          </span>
        </div>
        <div className={styles.border}></div>
        <div
          className={styles.guest_container}
          onClick={() => setShowDrawer(true)}
        >
          <span className={formData.guests.total > 0 ? styles.with_guests : ""}>
            {formData.guests.total === 0
              ? "Add guests"
              : formData.guests.total > 1
              ? `${formData.guests.total} guests`
              : `${formData.guests.total} guest`}
          </span>
        </div>
        <div className={styles.border}></div>
        <div className={styles.search_container} onClick={filterItems}>
          <SearchIcon className={styles.search_icon} />
        </div>
      </div>
      {showDrawer && (
        <FilterContext.Provider
          value={{
            formData,
            locations,
            setShowDrawer,
            filterItems,
            changeLocation,
            updateGuestsCount,
          }}
        >
          <Drawer />
        </FilterContext.Provider>
      )}
    </>
  );
};

export default FilterDrawer;
