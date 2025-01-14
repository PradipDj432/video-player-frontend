import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import User from "../pages/User";
import Upload from "../pages/Upload";
import About from "../pages/About";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/user" element={<User />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default RoutesComponent;
