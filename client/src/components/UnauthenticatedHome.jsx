import { Button, Container, Alert, Grid, Stack, AlertTitle } from "@mui/material";
import { Twitter } from "@mui/icons-material";

import { useAuth } from "./AuthProvider";
import { CustomH2 } from "./StyledComponents";

import { useSearchParams } from "react-router-dom";

export default function UnauthenticatedHome() {
  const {
    handleSignInClick,
    authenticatedUser: { authenticated },
  } = useAuth();

  let [searchParams] = useSearchParams();

  const isExpired = searchParams.get("session") === "expired";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1} xl={1}></Grid>
      <Grid item xs={12} md={10} xl={7}>
        <Container>
          <Stack spacing={5}>
            {isExpired ? (
              <Alert severity='error'>
                <AlertTitle>Session Expired</AlertTitle>
                Your tokens are no longer valid. Please <strong>login</strong> again!
              </Alert>
            ) : null}
            <CustomH2
              variant='h2'
              sx={{
                fontSize: {
                  xs: "2em",
                  md: "2.5em",
                },
                textAlign: {
                  xs: "center",
                  md: "initial",
                },
              }}>
              Delete tweets from your Twitter feed in bulk to protect your privacy or make
              a fresh start.
            </CustomH2>
            <ul className='li-spacing white'>
              <li>
                Due to Twitter’s API limitations, you can only fetch and delete from the
                3.200 most recent tweets.
              </li>
              <li>
                To circumvent that limitation, you can upload the “tweet.js” file present
                in your Twitter data file.
              </li>
            </ul>
            <Alert severity='warning' variant='filled'>
              With Twitter API v2 now released, the new (and very low) rate limits will
              render the "delete" feature of this app almost useless. So use it while you
              can !
            </Alert>

            {!authenticated ? (
              <Button
                variant='contained'
                startIcon={<Twitter />}
                onClick={handleSignInClick}
                sx={{
                  backgroundColor: "#1DA1F2",
                }}>
                Sign in with Twitter
              </Button>
            ) : null}
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={12} md={1} xl={4}></Grid>
    </Grid>
  );
}
