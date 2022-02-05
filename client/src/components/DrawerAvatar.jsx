import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function DrawerAvatar({ authdata: { authenticated, user, error } }) {
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
        sx={{ width: "80%", textAlign: "center", color: "white" }}
        marginTop={2}
        noWrap>
        {authenticated ? `@${user.username}` : "Twiginity"}
      </Typography>
    </div>
  );
}
