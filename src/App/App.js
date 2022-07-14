import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Production from "../pages/Employees"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/"  element={<Production/>} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;
