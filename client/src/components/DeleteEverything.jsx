import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Container, Alert, Grid, Stack, AlertTitle } from "@mui/material";

import { CustomH2, CustomCheckbox, CustomFormControlLabel } from "./StyledComponents";
import LoadingButton from "./LoadingButton";

import { FileUploader } from "./FileUploader";
import SimpleBackdrop from "./Backdrop";
import ProgressBar from "./ProgressBar";

import { useAuth } from "./AuthProvider";
import ErrorOrNoResults from "./ErrorOrNoResults";

import { deletionState, reducer } from "../../common/shared-state";

export default function DeleteEverything() {
  const [state, setState] = useReducer(reducer, { ready: true });
  const [loading, setLoading] = useState(false);
  const { socket, handleLogoutClick } = useAuth();
  let [searchParams] = useSearchParams();

  const isExpired = searchParams.get("session") === "expired";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const filename = event.target.elements.tweetjs.value;

    axios
      .delete("/tweets/delete-tweet-js", {
        data: { filename },
        withCredentials: true,
      })
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return handleLogoutClick(undefined, true);
        }

        setState({ type: deletionState.error, message: error.response.data.message });
      });
  };

  useEffect(() => {
    if (!socket) return;
    socket.connect();

    socket.on(deletionState.deleting, (data) => {
      setState(data);
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [socket]);

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
                  md: "3.75em",
                },
                textAlign: {
                  xs: "center",
                  md: "initial",
                },
              }}>
              Delete everything
            </CustomH2>
            <ul className='li-spacing white ul-margin'>
              <li>Submit your Twitter data file for processing to delete more tweets.</li>
              <li>
                Please read the upload instructions for details on where to get this file
                from.
              </li>
            </ul>
            {state.ready ? (
              <form onSubmit={handleSubmit}>
                <Stack spacing={5}>
                  <FileUploader />

                  <CustomFormControlLabel
                    control={<CustomCheckbox id='acceptTerms' required />}
                    label='I understand deleted tweets cannot be recovered.'
                  />
                  <LoadingButton loadingState={loading} />
                </Stack>
              </form>
            ) : null}
            <SimpleBackdrop state={state} />
          </Stack>
          {state?.deleting ? (
            <ProgressBar
              tweetsProcessed={state.increment}
              numberOfTweets={state.numberOfTweets}
              messages={state?.deleteError}
            />
          ) : null}
          {state?.error ? (
            <ErrorOrNoResults
              error={state.error ? true : false}
              message={state.message}
              setState={setState}
              setLoading={setLoading}
            />
          ) : null}
        </Container>
      </Grid>
      <Grid item xs={12} md={1} xl={4}></Grid>
    </Grid>
  );
}
