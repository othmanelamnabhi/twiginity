import { useAuth } from "./AuthProvider";

import { ListItemIcon, ListItemButton, List, ListItemText } from "@mui/material";

import Twitter from "@mui/icons-material/Twitter";

export const DrawerUnauthenticated = () => {
  const { handleSignInClick } = useAuth();
  return (
    <List sx={{ color: "white" }}>
      <ListItemButton
        onClick={handleSignInClick}
        sx={{
          backgroundColor: "#1DA1F2",
        }}>
        <ListItemIcon>
          <Twitter sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary='Login to Start' />
      </ListItemButton>
    </List>
  );
};
