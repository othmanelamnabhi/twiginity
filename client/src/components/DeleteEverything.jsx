import axios from "axios";
import { useEffect, useReducer } from "react";
import { io } from "socket.io-client";

import { Container, Alert, Grid, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  CustomH2,
  CustomCheckbox,
  CustomFormControlLabel,
  CustomButton,
} from "./StyledComponents";

import { FileUploader } from "./FileUploader";

import { useAuth } from "./AuthProvider";

export const deletionState = {
  processing: "processing",
  deleting: "deleting",
  queuing: "queuing",
  error: "error",
  noResults: "no results",
};

export function reducer(
  state,
  { type, tweetCount, progress, tweetNumber, message, deleteError }
) {
  switch (type) {
    case deletionState.processing:
      return { processing: true, tweetCount };
    case deletionState.deleting:
      return { deleting: true, progress, tweetNumber, deleteError };
    case deletionState.queuing:
      return {}; // define data for this state
    case deletionState.error:
      return { error: true, message }; // define data for this state
    case deletionState.noResults:
      return {
        noResults: true,
        message: "No tweets answering to these criteria were found",
      }; // define data for this state

    default:
      throw new Error();
  }
}

export default function DeleteEverything() {
  const [state, setState] = useReducer(reducer);
  const {
    authenticatedUser: {
      user: { twitterId },
    },
  } = useAuth();

  console.log("state right now => ", state);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filename = event.target.elements.tweetjs.value;

    axios
      .delete("/tweets/delete-tweet-js", {
        data: { filename },
        withCredentials: true,
      })
      .catch((error) =>
        setState({ type: deletionState.error, message: error.response.data.message })
      );
  };

  useEffect(() => {
    const socket = io(`https://127.0.0.1:5001?twitterId=${twitterId}`); // solve the proxying issue for socket.io

    socket.on("connect", () => {
      console.log("socket.io client connected! => ", socket.id);
    });

    socket.on(deletionState.processing, (data) => {
      console.log("socket ID => ", socket.id);
      setState(data);
    });

    socket.on(deletionState.deleting, (data) => {
      console.log("socket ID => ", socket.id);
      setState(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [twitterId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1} xl={1}></Grid>
      <Grid item xs={12} md={10} xl={7}>
        <Container>
          <Stack spacing={5}>
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
            <ul className='li-spacing white'>
              <li>Submit your Twitter data file for processing to delete more tweets.</li>
              <li>
                Please read the upload instructions for details on where to get this file
                from.
              </li>
            </ul>
            <Alert severity='warning' variant='filled'>
              With Twitter API v2 now released, the new rate limits will render the
              "delete" feature of this app almost useless. So use it while you can !
            </Alert>
            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <FileUploader />

                <CustomFormControlLabel
                  control={<CustomCheckbox id='acceptTerms' required />}
                  label='I understand deleted tweets cannot be recovered.'
                />
                <CustomButton variant='contained' startIcon={<Delete />} type='submit'>
                  Delete
                </CustomButton>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={12} md={1} xl={4}></Grid>
    </Grid>
  );
}
