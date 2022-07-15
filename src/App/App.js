import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Production from "../pages/Employees"
import SignIn from "../pages/Signins/Signin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/"  element={<SignIn/>} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;
