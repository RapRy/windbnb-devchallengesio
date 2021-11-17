import React, { useContext } from "react";

import styles from "./_list.module.css";
import { DataContext } from "../../context";
import Item from "./Item";

const List = () => {
  const data = useContext(DataContext);
  return (
    <div className={styles.list_container}>
      <div className={styles.header_container}>
        <h3>Stays in Finland</h3>
        <span>{data.filtered.length}+ stays</span>
      </div>
      {data.filtered.length > 0 ? (
        <div className={styles.items_container}>
          {data.filtered.slice(0, 6).map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </div>
      ) : (
        <h1 className={styles.no_result}>No Results</h1>
      )}
    </div>
  );
};

export default List;
