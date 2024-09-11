import React, { useEffect } from "react";
import Cube from "./components/Cube";
import "./styles/styles.css";

const App = () => {
  useEffect(() => {
    // Add any additional logic here if needed
  }, []);

  return (
    <div className="app">
      <Cube />
    </div>
  );
};

export default App;
