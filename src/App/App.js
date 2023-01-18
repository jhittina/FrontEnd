import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "../pages/Employees";
import SignIn from "../pages/Signins/Signin";
import Production from "../pages/Production";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/production" element={<Production />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
