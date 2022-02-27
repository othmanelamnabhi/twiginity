import { NavLink } from "react-router-dom";

import {
  ListItemIcon,
  ListItemButton,
  List,
  ListItemText,
  Collapse,
} from "@mui/material";

import { useLocation } from "react-router-dom";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "./AuthProvider";

export const DrawerAuthenticated = ({ handleClick, nestedListState, drawerSetState }) => {
  const { handleLogoutClick } = useAuth();
  const { pathname } = useLocation();

  return (
    <List sx={{ color: "white" }}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DeleteIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary='Delete Tweets' />
        {nestedListState ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={nestedListState} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              "&:hover": { color: "inherit" },
              "&:focus": { color: "inherit", textDecoration: "none" },
            }}
            style={({ isActive }) => {
              return {
                color: isActive ? "#B23842" : "",
                backgroundColor: isActive ? "white" : "",
              };
            }}
            to='/delete-recent'
            component={NavLink}
            onClick={drawerSetState}>
            <ListItemIcon>
              <AutoDeleteIcon
                className={pathname === "/delete-recent" ? "red" : "white"}
              />
            </ListItemIcon>
            <ListItemText primary='Most Recent' />
          </ListItemButton>
          <ListItemButton
            sx={{
              pl: 4,
              "&:hover": { color: "inherit" },
              "&:focus": { color: "inherit", textDecoration: "none" },
            }}
            style={({ isActive }) => {
              return {
                color: isActive ? "#B23842" : "",
                backgroundColor: isActive ? "white" : "",
              };
            }}
            to='/delete-everything'
            component={NavLink}
            onClick={drawerSetState}>
            <ListItemIcon>
              <DeleteForeverIcon
                className={pathname === "/delete-everything" ? "red" : "white"}
              />
            </ListItemIcon>
            <ListItemText primary='Everything' />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </List>
  );
};
