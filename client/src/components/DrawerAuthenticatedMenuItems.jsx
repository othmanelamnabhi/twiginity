import {
  ListItemIcon,
  ListItemButton,
  List,
  ListItemText,
  Collapse,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const DrawerAuthenticated = ({ handleClick, nestedListState }) => {
  const { handleLogoutClick } = useAuth();
  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary='Delete Tweets' />
        {nestedListState ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={nestedListState} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }} to='/delete-recent' component={RouterLink}>
            <ListItemIcon>
              <AutoDeleteIcon />
            </ListItemIcon>
            <ListItemText primary='Most Recent' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} to='/delete-everything' component={RouterLink}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText primary='Everything' />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </List>
  );
};
