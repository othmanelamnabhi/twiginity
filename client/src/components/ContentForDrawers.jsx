import { Button } from "@mui/material";
import { Twitter } from "@mui/icons-material";

import DrawerAvatar from "./DrawerAvatar";
import { DrawerAuthenticated } from "./DrawerAuthenticatedMenuItems";
import { CustomToolbar } from "./StyledComponents";

import { useAuth } from "./AuthProvider";

export const ContentForDrawers = ({
  handleClick,
  nestedListUnfolded,
  drawerSetState = null,
}) => {
  const { authenticatedUser: user, handleSignInClick } = useAuth();
  return (
    <>
      <CustomToolbar />
      <DrawerAvatar />

      {user?.authenticated ? (
        <DrawerAuthenticated
          handleClick={handleClick}
          nestedListState={nestedListUnfolded}
          drawerSetState={drawerSetState}
        />
      ) : (
        <Button
          variant='contained'
          startIcon={<Twitter />}
          onClick={handleSignInClick}
          sx={{
            backgroundColor: "#1DA1F2",
            borderRadius: 0,
          }}
          size='large'>
          Sign in with Twitter
        </Button>
      )}
    </>
  );
};
