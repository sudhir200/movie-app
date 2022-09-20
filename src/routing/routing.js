import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "../pages/movies/movies";
import Header from "../components/header/header";

function Routing(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact element={<Movies />} path={"/movies"} />
          <Route exact element={<Movies />} path={"/"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
