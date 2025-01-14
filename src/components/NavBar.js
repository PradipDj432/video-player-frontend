import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Home, PostAdd, Person, CloudUpload, Info } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import RoutesComponent from "../routes/Routes";
// Drawer settings
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { name: "home", label: "Home", icon: <Home /> },
    { name: "post", label: "Post", icon: <PostAdd /> },
    { name: "user", label: "User", icon: <Person /> },
    { name: "upload", label: "Upload", icon: <CloudUpload /> },
    { name: "about", label: "About", icon: <Info /> },
  ];

  const activeColor = "#1976d2";
  const inactiveColor = "#000000";

  return (
    <div style={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Video Player Application
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <CustomDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabs.map((tab) => (
            <ListItem
              button
              onClick={() => handleTabClick(tab.name)}
              selected={activeTab === tab.name}
              component={Link}
              to={`/${tab.name}`}
              key={tab.name}
            >
              <ListItemIcon
                sx={{
                  color: activeTab === tab.name ? activeColor : inactiveColor,
                }}
              >
                {tab.icon}
              </ListItemIcon>
              <ListItemText
                primary={tab.label}
                sx={{
                  color: activeTab === tab.name ? activeColor : inactiveColor,
                  fontWeight: "bolder",
                }}
              />
            </ListItem>
          ))}
        </List>
      </CustomDrawer>

      {/* Main content area */}
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
          marginLeft: open ? 0 : -1 * drawerWidth + 60,
          marginTop: 60,
          transition: "margin 0.3s",
        }}
      >
        <RoutesComponent />
      </div>
    </div>
  );
}
