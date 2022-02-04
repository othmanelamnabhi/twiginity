import React from "react";
import HomePage from "./components/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};
