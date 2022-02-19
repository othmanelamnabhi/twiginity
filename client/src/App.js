import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Drawer, Box, AppBar, Typography, IconButton, Avatar } from "@mui/material";
import { CustomToolbar } from "./components/StyledComponents";
import { Menu } from "@mui/icons-material";

import UnauthenticatedHome from "./components/UnauthenticatedHome";
import DeleteRecentTweets from "./components/DeleteRecentTweets";
import DeleteEverything from "./components/DeleteEverything";
import { ContentForDrawers } from "./components/ContentForDrawers";

import { useAuth, RequireAuth } from "./components/AuthProvider";

const drawerWidth = 400;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [nestedListUnfolded, setNestedListUnfolded] = useState(true);

  const { authenticatedUser: user } = useAuth();

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
          <Route exact path='/' element={<UnauthenticatedHome />} />
          <Route
            exact
            path='/delete-recent'
            element={
              <RequireAuth>
                <DeleteRecentTweets />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/delete-everything'
            element={
              <RequireAuth>
                <DeleteEverything />
              </RequireAuth>
            }
          />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
