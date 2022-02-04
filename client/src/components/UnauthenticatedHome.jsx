import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { Twitter } from "@mui/icons-material";

export default function UnauthenticatedHome({ authdata: { authenticated } }) {
  return (
    <Box>
      <Container>
        <Typography variant='h1'>
          Delete tweets from your Twitter feed in bulk to protect your privacy or make a
          fresh start.
        </Typography>
        <ul>
          <li>
            Due to Twitter’s API limitations, you can only fetch and delete from the 3.200
            most recent tweets.
          </li>
          <li>
            To circumvent that limitation, you can upload the “tweet.js” file present in
            your Twitter data file.
          </li>
        </ul>
        <Alert severity='warning' variant='filled'>
          With Twitter API v2 now released, the rate limits have been drastically reduced.
          on v1.1 you could delete thousands of tweets whereas now, you’re limited to 50
          tweets every 15 minutes.
        </Alert>

        {!authenticated ? (
          <Button variant='contained' startIcon={<Twitter />}>
            Sign in with Twitter
          </Button>
        ) : null}
      </Container>
    </Box>
  );
}
