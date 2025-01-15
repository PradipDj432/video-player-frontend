import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home"; // Your home component
import Post from "./pages/Post"; // Your post component
import User from "./pages/User"; // Your user component
import Upload from "./pages/Upload"; // Your upload component
import About from "./pages/About"; // Your about component
import { styled } from "@mui/material/styles";
import Profile from "./pages/Profile";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 240 : 73, // Adjust based on drawer state
    marginTop: 65,
  })
);

function App() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <NavBar open={open} handleDrawerToggle={handleDrawerToggle} />
      <Main open={open}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/user" element={<User />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
