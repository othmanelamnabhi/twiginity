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

export const deletionState = {
  processing: "processing",
  deleting: "deleting",
  queuing: "queuing",
  error: "error",
  noResults: "no results",
  ready: "ready",
};

export function reducer(
  state,
  { type, tweetCount, message, deleteError, tweetId, username, increment, numberOfTweets }
) {
  switch (type) {
    case deletionState.ready:
      return { ready: true };
    case deletionState.processing:
      return { processing: true, tweetCount };
    case deletionState.deleting:
      console.log("deletionState.deleting old => ", state.deleteError);
      console.log("deletionState.deleting new => ", deleteError);
      let arrayOfErrors = state.deleteError !== undefined ? [...state.deleteError] : [];

      if (deleteError !== undefined)
        arrayOfErrors.push({ tweetId, deleteError, username });

      return {
        deleting: true,
        increment: (state.increment ?? 0) + increment,
        numberOfTweets,
        deleteError: arrayOfErrors,
      };
    case deletionState.queuing:
      return {}; // define data for this state
    case deletionState.error:
      return { error: true, message }; // define data for this state
    case deletionState.noResults:
      return {
        noResults: true,
      }; // define data for this state

    default:
      throw new Error();
  }
}

export default function DeleteEverything() {
  const [state, setState] = useReducer(reducer, { ready: true });
  const [loading, setLoading] = useState(false);
  const { socket, handleLogoutClick } = useAuth();
  let [searchParams] = useSearchParams();

  const isExpired = searchParams.get("session") === "expired";

  console.log("DeleteEverything => ", state);

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

    socket.on("connect", () => {
      console.log("socket.io client connected! => ", socket.id);
    });

    socket.on(deletionState.deleting, (data) => {
      console.log("socket ID => ", socket.id);
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
              load
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
