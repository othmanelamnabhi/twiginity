import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Drawer, Toolbar, Button } from "@mui/material";
import { Twitter } from "@mui/icons-material";

import UnauthenticatedHome from "./components/UnauthenticatedHome";
import DeleteRecentTweets from "./components/DeleteRecentTweets";
import DeleteEverything from "./components/DeleteEverything";
import DrawerAvatar from "./components/DrawerAvatar";
import { DrawerAuthenticated } from "./components/DrawerAuthenticatedMenuItems";

import { useAuth } from "./components/AuthProvider";

const drawerWidth = 400;

function App() {
  const [nestedListUnfolded, setNestedListUnfolded] = useState(true);

  const { authenticatedUser: user, handleSignInClick } = useAuth();

  function handleClick() {
    setNestedListUnfolded((nestedListUnfolded) => !nestedListUnfolded);
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#D62246",
            },
          }}
          variant='permanent'
          anchor='left'>
          <Toolbar />
          <DrawerAvatar authdata={user} />

          {user?.authenticated ? (
            <DrawerAuthenticated
              handleClick={handleClick}
              nestedListState={nestedListUnfolded}
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
        </Drawer>
      </div>

      <div
        style={{
          backgroundColor: "#202020",
          flexGrow: 1,
          minHeight: "100vh",
        }}>
        <Toolbar />
        <Routes>
          <Route exact path='/' element={<UnauthenticatedHome authdata={user} />} />
          <Route exact path='/delete-recent' element={<DeleteRecentTweets />} />
          <Route exact path='/delete-everything' element={<DeleteEverything />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
