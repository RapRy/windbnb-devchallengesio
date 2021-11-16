import React from "react";

import brand from "../../assets/logo.png";
import styles from "./_header.module.css";

import FilterDrawer from "./filter/FilterDrawer";

const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.brand_container}>
        <a href="/">
          <img src={brand} alt="windbnb" />
        </a>
      </div>
      <FilterDrawer />
    </div>
  );
};

export default Header;
