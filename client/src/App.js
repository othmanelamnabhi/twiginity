import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Drawer, Toolbar } from "@mui/material";

import UnauthenticatedHome from "./components/UnauthenticatedHome";
import DeleteRecentTweets from "./components/DeleteRecentTweets";
import DeleteEverything from "./components/DeleteEverything";
import DrawerAvatar from "./components/DrawerAvatar";
import { DrawerAuthenticated } from "./components/DrawerAuthenticatedMenuItems";
import { DrawerUnauthenticated } from "./components/DrawerUnauthenticatedMenuItems";

import { useAuth } from "./components/AuthProvider";

const drawerWidth = 300;

function App() {
  const [nestedListUnfolded, setNestedListUnfolded] = useState(true);

  const { authenticatedUser: user } = useAuth();

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
            <DrawerUnauthenticated />
          )}
        </Drawer>
      </div>

      <div
        style={{
          backgroundColor: "#202020",
          flexGrow: 1,
          paddingTop: "40px",
          minHeight: "100vh",
        }}>
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
