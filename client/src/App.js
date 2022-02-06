import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import {
  Drawer,
  Button,
  Box,
  AppBar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { CustomToolbar } from "./components/StyledComponents";
import { Twitter, Menu } from "@mui/icons-material";

import UnauthenticatedHome from "./components/UnauthenticatedHome";
import DeleteRecentTweets from "./components/DeleteRecentTweets";
import DeleteEverything from "./components/DeleteEverything";
import DrawerAvatar from "./components/DrawerAvatar";
import { DrawerAuthenticated } from "./components/DrawerAuthenticatedMenuItems";

import { useAuth } from "./components/AuthProvider";

const drawerWidth = 400;

const ContentForDrawers = ({
  user,
  handleClick,
  handleSignInClick,
  nestedListUnfolded,
  drawerSetState = null,
}) => {
  return (
    <>
      <CustomToolbar />
      <DrawerAvatar authdata={user} />

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
          }}
          size='large'>
          Sign in with Twitter
        </Button>
      )}
    </>
  );
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [nestedListUnfolded, setNestedListUnfolded] = useState(true);

  const { authenticatedUser: user, handleSignInClick } = useAuth();

  function handleDrawerToggle() {
    setMobileOpen((mobileOpen) => !mobileOpen);
  }

  function handleClick() {
    setNestedListUnfolded((nestedListUnfolded) => !nestedListUnfolded);
  }

  return (
    <div style={{ display: "flex" }}>
      <AppBar
        position='fixed'
        sx={{
          display: {
            md: "none",
          },
          backgroundColor: "#B23842",
        }}>
        <CustomToolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}>
            <Menu />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            Twiginity
          </Typography>
          {user.authenticated ? (
            <Avatar
              alt='Profile picture'
              src={user.user.profilePicture}
              sx={{ width: 70, height: 70 }}
            />
          ) : null}
        </CustomToolbar>
      </AppBar>
      <Drawer
        sx={{
          width: `80%`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: `80%`,
            boxSizing: "border-box",
            backgroundColor: "#D62246",
          },
          display: {
            md: "none",
          },
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant='temporary'
        anchor='left'>
        <ContentForDrawers
          handleSignInClick={handleSignInClick}
          user={user}
          handleClick={handleClick}
          nestedListUnfolded={nestedListUnfolded}
          drawerSetState={handleDrawerToggle}
        />
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          width: `${drawerWidth}px`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: `${drawerWidth}px`,
            boxSizing: "border-box",
            backgroundColor: "#D62246",
          },
          display: {
            xs: "none",
            md: "block",
          },
        }}
        open>
        <ContentForDrawers
          handleSignInClick={handleSignInClick}
          user={user}
          handleClick={handleClick}
          nestedListUnfolded={nestedListUnfolded}
        />
      </Drawer>

      <Box
        style={{
          backgroundColor: "#202020",
          flexGrow: 1,
          minHeight: "100vh",
        }}>
        <CustomToolbar />
        <Routes>
          <Route exact path='/' element={<UnauthenticatedHome authdata={user} />} />
          <Route exact path='/delete-recent' element={<DeleteRecentTweets />} />
          <Route exact path='/delete-everything' element={<DeleteEverything />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
