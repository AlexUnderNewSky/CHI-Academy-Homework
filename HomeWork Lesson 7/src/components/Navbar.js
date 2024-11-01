import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import InfoIcon from "@mui/icons-material/Info";

const Navbar = ({ darkMode }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: 240,
      "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
      backgroundColor: "#282c34",
    }}
  >
    <List>
      <ListItem
        button
        component={Link}
        to="/"
        sx={{
          "&:hover": {
            backgroundColor: "#3f51b5",
            "& .MuiListItemIcon-root": {
              color: "white",
            },
            "& .MuiListItemText-primary": {
              color: "white",
            },
          },
          color: darkMode ? "white" : "black", 
        }}
      >
        <ListItemIcon sx={{ color: darkMode ? "white" : "black" }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem
        button
        component={Link}
        to="/heroes"
        sx={{
          "&:hover": {
            backgroundColor: "#3f51b5",
            "& .MuiListItemIcon-root": {
              color: "white",
            },
            "& .MuiListItemText-primary": {
              color: "white",
            },
          },
          color: darkMode ? "white" : "black",
        }}
      >
        <ListItemIcon sx={{ color: darkMode ? "white" : "black" }}>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Heroes" />
      </ListItem>

      <ListItem
        button
        component={Link}
        to="/about"
        sx={{
          "&:hover": {
            backgroundColor: "#3f51b5",
            "& .MuiListItemIcon-root": {
              color: "white",
            },
            "& .MuiListItemText-primary": {
              color: "white",
            },
          },
          color: darkMode ? "white" : "black",
        }}
      >
        <ListItemIcon sx={{ color: darkMode ? "white" : "black" }}>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </List>
  </Drawer>
);

export default Navbar;
