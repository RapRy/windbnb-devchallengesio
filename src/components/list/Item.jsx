import React from "react";
import { StarIcon } from "@heroicons/react/solid";

import styles from "./_item.module.css";

const Item = ({ item }) => {
  return (
    <div>
      <div className={styles.image_container}>
        <img src={item.photo} alt={item.city} />
      </div>
      <div className={styles.details_container}>
        {item.superHost && (
          <span className={styles.super_host}>SUPER HOST</span>
        )}
        <p>
          {item.type}
          {item.beds !== null ? `, ${item.beds} beds` : ""}
        </p>
        <span className={styles.rating_container}>
          <StarIcon className={styles.star} />
          {item.rating}
        </span>
      </div>
      <div>
        <p className={styles.title}>{item.title}</p>
      </div>
    </div>
  );
};

export default Item;
