import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useAuth } from "./AuthProvider";

export default function DrawerAvatar() {
  const {
    authenticatedUser: { user, authenticated },
  } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2em",
      }}>
      <Avatar
        src={authenticated ? `${user.profilePicture}` : null}
        sx={{ width: 150, height: 150 }}
      />
      <Typography
        variant='h4'
        sx={{
          width: "80%",
          textAlign: "center",
          color: "white",
          fontSize: {
            xs: "1.7em",
            md: "2.125em",
          },
        }}
        marginTop={2}
        noWrap>
        {authenticated ? `@${user.username}` : "Twiginity"}
      </Typography>
    </div>
  );
}
