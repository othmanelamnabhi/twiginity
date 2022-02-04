import { useAuth } from "./AuthProvider";

import { ListItemIcon, ListItemButton, List, ListItemText } from "@mui/material";

import Twitter from "@mui/icons-material/Twitter";

export const DrawerUnauthenticated = () => {
  const { handleSignInClick } = useAuth();
  return (
    <List>
      <ListItemButton onClick={handleSignInClick}>
        <ListItemIcon>
          <Twitter />
        </ListItemIcon>
        <ListItemText primary='Login to Start' />
      </ListItemButton>
    </List>
  );
};
