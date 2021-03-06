import React, { useEffect, useState } from "react";

import "./_app.css";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { DataContext } from "./context";

const App = () => {
  const [apartments, setApartments] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("./api/stays.json")
      .then((res) => res.json())
      .then((data) => {
        setApartments(data);
        setFiltered(data);
      });
  }, []);

  return (
    <div className="main_container">
      <DataContext.Provider
        value={{ apartments, setApartments, filtered, setFiltered }}
      >
        <Header />
        <List />
      </DataContext.Provider>
      <p className="footer-text">
        created by <span>Ryan</span> - decChallenges.io
      </p>
    </div>
  );
};

export default App;
