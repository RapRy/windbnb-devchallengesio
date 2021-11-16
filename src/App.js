import React, { useEffect, useState } from "react";

import "./_app.css";
import Header from "./components/header/Header";
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
      <DataContext.Provider value={{ apartments, setApartments, filtered }}>
        <Header />
      </DataContext.Provider>
    </div>
  );
};

export default App;
